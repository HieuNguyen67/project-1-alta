// googleDrive.ts
import { useEffect } from "react";
import { gapi } from "gapi-script";

const CLIENT_ID =
  "272067934117-kvfhdl2jtgma8vuo9g7kb6osf14q8mji.apps.googleusercontent.com";
const API_KEY = "AIzaSyBjV_lmtGTGefWvH43SwsFaZNs3O7bvmU8";
const SCOPE = "https://www.googleapis.com/auth/drive.file";

export const useGoogleDrive = () => {
  useEffect(() => {
    function initClient() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPE,
      });
    }
    gapi.load("client:auth2", initClient);
  }, []);

  const authenticate = () => {
    gapi.auth2.getAuthInstance().signIn();
  };

  const uploadFile = (file: File) => {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append("file", file);

      const request = gapi.client.drive.files.create({
        resource: { name: file.name },
        media: { body: file },
        fields: "id",
      });

      request.execute((file: { id: string }) => {
        if (file.id) {
          resolve(file);
        } else {
          reject("Error uploading file");
        }
      });
    });
  };

  return { authenticate, uploadFile };
};
