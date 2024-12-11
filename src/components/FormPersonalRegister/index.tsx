// import React, { useState, useEffect } from "react";
// import { db } from "../../firebaseConfig"; // Import cấu hình Firebase
// import { collection, addDoc, getDocs } from "firebase/firestore";

// const JobApplicationForm: React.FC = () => {
//   const [jobs, setJobs] = useState<any[]>([]);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     dob: "",
//     jobId: "",
//     email: "",
//     phone: "",
//     school: "",
//     major: "",
//     registerType: "",
//     executionType: "",
//     referralSource: "",
//     cvFile: "",
//   });
//   const [cvFile, setCvFile] = useState<File | null>(null);

//   // Fetch jobs from Firestore
//   useEffect(() => {
//     const fetchJobs = async () => {
//       const querySnapshot = await getDocs(collection(db, "jobs"));
//       const jobsData = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setJobs(jobsData);
//     };

//     fetchJobs();
//   }, []);

//   // Handle input changes
//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // Upload CV to Google Drive
//   const handleDriveUpload = async (file: File) => {
//     // Integrate Google Drive API upload logic here
//     // Replace with uploaded file link
//     const uploadedFileLink =
//       "https://drive.google.com/drive/folders/1HXuSQ7WnH4VifZINa2KcVNrvSTCyyv67?usp=sharing";
//     setFormData({ ...formData, cvFile: uploadedFileLink });
//   };

//   // Handle form submit
//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       const docRef = await addDoc(collection(db, "applications"), formData);
//       console.log("Application submitted with ID: ", docRef.id);
//     } catch (error) {
//       console.error("Error submitting application: ", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>Họ và tên:</label>
//       <input
//         type="text"
//         name="fullName"
//         value={formData.fullName}
//         onChange={handleInputChange}
//         required
//       />

//       <label>Ngày sinh:</label>
//       <input
//         type="date"
//         name="dob"
//         value={formData.dob}
//         onChange={handleInputChange}
//         required
//       />

//       <label>Chọn vị trí ứng tuyển:</label>
//       <select
//         name="jobId"
//         value={formData.jobId}
//         onChange={handleInputChange}
//         required
//       >
//         <option value="">Chọn vị trí</option>
//         {jobs.map((job) => (
//           <option key={job.jobId} value={job.jobId}>
//             {job.jobName} - {job.companyName}
//           </option>
//         ))}
//       </select>

//       <label>Email:</label>
//       <input
//         type="email"
//         name="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         required
//       />

//       <label>Điện thoại:</label>
//       <input
//         type="text"
//         name="phone"
//         value={formData.phone}
//         onChange={handleInputChange}
//         required
//       />

//       <label>Trường đang học:</label>
//       <input
//         type="text"
//         name="school"
//         value={formData.school}
//         onChange={handleInputChange}
//         required
//       />

//       <label>Chuyên ngành:</label>
//       <input
//         type="text"
//         name="major"
//         value={formData.major}
//         onChange={handleInputChange}
//         required
//       />

//       <label>Hình thức đăng ký:</label>
//       <select
//         name="registerType"
//         value={formData.registerType}
//         onChange={handleInputChange}
//         required
//       >
//         <option value="">Chọn hình thức</option>
//         <option value="Online">Online</option>
//         <option value="Offline">Offline</option>
//       </select>

//       <label>Hình thức thực hiện:</label>
//       <select
//         name="executionType"
//         value={formData.executionType}
//         onChange={handleInputChange}
//         required
//       >
//         <option value="">Chọn hình thức</option>
//         <option value="Remote">Remote</option>
//         <option value="Onsite">Onsite</option>
//       </select>

//       <label>Bạn biết trang tuyển dụng này từ đâu?</label>
//       <select
//         name="referralSource"
//         value={formData.referralSource}
//         onChange={handleInputChange}
//         required
//       >
//         <option value="">Chọn nguồn</option>
//         <option value="Facebook">Facebook</option>
//         <option value="Google">Google</option>
//         <option value="Bạn bè giới thiệu">Bạn bè giới thiệu</option>
//       </select>

//       <label>Upload CV:</label>
//       <input
//         type="file"
//         onChange={(e) => setCvFile(e.target.files ? e.target.files[0] : null)}
//         required
//       />

//       <button type="button" onClick={() => handleDriveUpload(cvFile!)}>
//         Upload to Google Drive
//       </button>

//       <button type="submit">Submit</button>
//     </form>
//   );
// };

// export default JobApplicationForm;
import { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useGoogleDrive } from "../../googleDrive";

const ApplicationForm = () => {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [major, setMajor] = useState("");
  const [job, setJob] = useState("");
  const [applyMethod, setApplyMethod] = useState("");
  const [executionMethod, setExecutionMethod] = useState("");
  const [source, setSource] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const { authenticate, uploadFile } = useGoogleDrive();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (file) {
      try {
        await uploadFile(file);
      } catch (error) {
        console.error("File upload failed", error);
      }
    }

    try {
      await addDoc(collection(db, "applications"), {
        name,
        dob,
        email,
        phone,
        school,
        major,
        job,
        applyMethod,
        executionMethod,
        source,
        fileName: file ? file.name : "",
        timestamp: new Date(),
      });
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to submit application");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Họ và tên</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Ngày sinh</label>
        <input
          type="date"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label>Điện thoại</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div>
        <label>Trường đang học</label>
        <input
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
        />
      </div>

      <div>
        <label>Chuyên ngành</label>
        <input
          type="text"
          value={major}
          onChange={(e) => setMajor(e.target.value)}
        />
      </div>

      <div>
        <label>Vị trí ứng tuyển</label>
        <select value={job} onChange={(e) => setJob(e.target.value)}>
        </select>
      </div>

      <div>
        <label>Hình thức đăng ký</label>
        <select
          value={applyMethod}
          onChange={(e) => setApplyMethod(e.target.value)}
        >
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      <div>
        <label>Hình thức thực hiện</label>
        <select
          value={executionMethod}
          onChange={(e) => setExecutionMethod(e.target.value)}
        >
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
        </select>
      </div>

      <div>
        <label>Bạn biết trang tuyển dụng này từ đâu?</label>
        <select value={source} onChange={(e) => setSource(e.target.value)}>
          <option value="google">Google</option>
          <option value="social-media">Social Media</option>
        </select>
      </div>

      <div>
        <label>CV</label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
      </div>

      <div>
        <button type="submit" onClick={authenticate}>
          Submit
        </button>
      </div>
    </form>
  );
};

export default ApplicationForm;
