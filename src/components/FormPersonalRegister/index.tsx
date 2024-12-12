import React, { useState, useEffect } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc, getDocs } from "firebase/firestore";
import axios from "axios";
import {
  Input,
  Select,
  Button,
  Row,
  Col,
} from "antd";
import "./form-personal.css"
import { RiSendPlaneFill } from "react-icons/ri";
import upload from "../../assets/image/selectFile.png"
import { FaFile } from "react-icons/fa";

const { Option } = Select;
const JobApplicationForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    birthDate: "",
    email: "",
    phone: "",
    school: "",
    major: "",
    registrationType: "",
    executionType: "",
    source: "",
    cvFile: null as File | null,
    position: "",
  });
  const [fileName, setFileName] = useState(""); 

  const [positions, setPositions] = useState<any[]>([]);

  useEffect(() => {
    const fetchJobs = async () => {
      const jobsCollection = collection(db, "jobs");
      const jobSnapshot = await getDocs(jobsCollection);
      const jobs = jobSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPositions(jobs);
    };

    fetchJobs();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, cvFile: e.target.files[0] });
      setFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.cvFile) {
      const formDataFile = new FormData();
      formDataFile.append("file", formData.cvFile);
      formDataFile.append("upload_preset", "Project-Alta");

      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/da2alfbg9/upload",
          formDataFile
        );

        const cvUrl = response.data.secure_url;

        await addDoc(collection(db, "jobApplications"), {
          ...formData,
          cvFile: cvUrl,
          createdAt: new Date(),
        });

        alert("Ứng tuyển thành công!");
        setFormData({
          fullName: "",
          birthDate: "",
          email: "",
          phone: "",
          school: "",
          major: "",
          registrationType: "",
          executionType: "",
          source: "",
          cvFile: null,
          position: "",
        });
      } catch (error) {
        console.error("Lỗi khi upload file hoặc lưu dữ liệu:", error);
        alert("Đã xảy ra lỗi. Vui lòng thử lại!");
      }
    } else {
      alert("Vui lòng upload CV!");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      style={{ marginTop: "20px" }}
    >
      <div style={{ margin: "10px 5px" }}>
        <label style={{ marginBottom: "10px" }}>Chọn file: </label>
      </div>
      <div>
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          id="fileInput"
          onChange={handleFileChange}
          required
          style={{ display: "none" }}
        />
        <label htmlFor="fileInput" style={{ cursor: "pointer" }}>
          <img src={upload} alt="Upload File" />
        </label>{" "}
      </div>
      {fileName && (
        <div style={{ marginTop: "10px" }}>
          <strong>Đã chọn file: </strong>
         <FaFile style={{ fontSize: "25px", color: "rgb(255, 90, 0)"}}/> {fileName}
        </div>
      )}

      <Row>
        <Col span={12}>
          <div style={{ margin: "10px 5px" }}>
            <label>Họ và tên:</label>
            <Input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>
        </Col>
        <Col span={12}>
          {" "}
          <div style={{ margin: "10px 5px" }}>
            <label>Trường đang học:</label>
            <Input
              type="text"
              name="school"
              value={formData.school}
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {" "}
          <div style={{ margin: "10px 5px" }}>
            <label>Ngày sinh:</label>
            <input
              type="date"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                height: "30px",
                border: "1px solid #ccc",
                borderRadius: "4px",
                marginTop: "10px",
              }}
            />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ margin: "10px 5px" }}>
            <label>Chuyên ngành:</label>
            <Input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
              style={{ marginTop: "10px" }}
            />
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div style={{ margin: "10px 5px" }}>
            <label>Chọn vị trí ứng tuyển:</label>
            <Select
              value={formData.position}
              onChange={(value) =>
                setFormData({ ...formData, position: value })
              }
              style={{ width: "100%", marginTop: "10px" }}
            >
              <Option value="">Chọn</Option>
              {positions.map((position) => (
                <Option key={position.id} value={position.jobName}>
                  {position.companyName} - {position.jobName}
                </Option>
              ))}
            </Select>
          </div>
        </Col>
        <Col span={12}>
          {" "}
          <div style={{ margin: "10px 5px" }}>
            <label>Hình thức đăng ký:</label>
            <Select
              value={formData.registrationType}
              onChange={(value) =>
                setFormData({ ...formData, registrationType: value })
              }
              style={{ width: "100%", marginTop: "10px" }}
            >
              <Option value="online">Online</Option>
              <Option value="offline">Offline</Option>
            </Select>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {" "}
          <div style={{ margin: "10px 5px" }}>
            <label>Địa chỉ email:</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: "100%", marginTop: "10px" }}
            />
          </div>
        </Col>
        <Col span={12}>
          <div style={{ margin: "10px 5px" }}>
            <label>Hình thức thực hiện:</label>
            <Select
              value={formData.executionType}
              onChange={(value) =>
                setFormData({ ...formData, executionType: value })
              }
              style={{ width: "100%", marginTop: "10px" }}
            >
              <Option value="full-time">Toàn thời gian</Option>
              <Option value="part-time">Bán thời gian</Option>
            </Select>
          </div>
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          {" "}
          <div style={{ margin: "10px 5px" }}>
            <label>Điện thoại:</label>
            <Input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              style={{ width: "100%", marginTop: "10px" }}
            />
          </div>
        </Col>
        <Col span={12}>
          {" "}
          <div style={{ margin: "10px 5px" }}>
            <label>Biết trang tuyển dụng từ đâu:</label>
            <Select
              value={formData.source}
              onChange={(value) => setFormData({ ...formData, source: value })}
              style={{ width: "100%", marginTop: "10px" }}
            >
              <Option value="friend">Bạn bè</Option>
              <Option value="social-media">Mạng xã hội</Option>
              <Option value="other">Khác</Option>
            </Select>
          </div>
        </Col>
      </Row>

      <Button
        style={{
          backgroundColor: "rgb(255, 90, 0)",
          color: "white",
          fontSize: "15px",
          margin: "10px 5px",
        }}
        htmlType="submit"
      >
        Gửi <RiSendPlaneFill />
      </Button>
    </form>
  );
};

export default JobApplicationForm;
