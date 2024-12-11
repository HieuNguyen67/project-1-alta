import React, { useState } from "react";
import { db } from "../../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { Input, Button, Form, notification, Col, Row, Modal } from "antd";
import { RiSendPlaneFill } from "react-icons/ri";

const FormBusinessRegister: React.FC = () => {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [docId, setDocId] = useState("");

  const handleSubmit = async (values: {
    email: string;
    address: string;
    companyName: string;
    managerName: string;
    companyPhone: string;
    managerPhone: string;
  }) => {
    try {
      const docRef = await addDoc(collection(db, "business-register"), {
        email: values.email,
        address: values.address,
        companyName: values.companyName,
        managerName: values.managerName,
        companyPhone: values.companyPhone,
        managerPhone: values.managerPhone,
        createdAt: new Date(),
      });

      setDocId(docRef.id); 
      setIsModalVisible(true); 
      form.resetFields();
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to add company.",
      });
    }
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  return (
    <div style={{ margin: "50px auto" }}>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          email: "",
          address: "",
          companyName: "",
          managerName: "",
          companyPhone: "",
          managerPhone: "",
        }}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please enter email" }]}
              style={{ margin: "16px" }}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Địa chỉ công ty"
              name="address"
              rules={[{ required: true, message: "Please enter address" }]}
              style={{ margin: "16px" }}
            >
              <Input placeholder="Nhập Địa chỉ công ty" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="Tên doanh nghiệp"
              name="companyName"
              rules={[{ required: true, message: "Please enter company name" }]}
              style={{ margin: "16px" }}
            >
              <Input placeholder="Nhập Tên doanh nghiệp" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Người quản lý"
              name="managerName"
              rules={[{ required: true, message: "Please enter manager name" }]}
              style={{ margin: "16px" }}
            >
              <Input placeholder="Nhập Người quản lý" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              label="Điện thoại công ty"
              name="companyPhone"
              rules={[
                { required: true, message: "Please enter company phone" },
              ]}
              style={{ margin: "16px" }}
            >
              <Input placeholder="Nhập Điện thoại công ty" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Điện thoại người quản lý"
              name="managerPhone"
              rules={[
                { required: true, message: "Please enter manager phone" },
              ]}
              style={{ margin: "16px" }}
            >
              <Input placeholder="Nhập Điện thoại người quản lý" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button
            style={{
              backgroundColor: "rgb(255, 90, 0)",
              color: "white",
              fontSize: "15px",
              margin: "16px",
            }}
            htmlType="submit"
          >
            Gửi <RiSendPlaneFill />
          </Button>
        </Form.Item>
      </Form>

      <Modal
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleOk}
        okText="OK"
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
      >
        <h1
          style={{ color: "#F26D21", fontWeight: "bold", textAlign: "center" }}
        >
          Thông báo
        </h1>
        <p style={{ textAlign: "center" }}>
          Bạn đã nộp đơn ứng tuyển thành công.
        </p>
        <p style={{ textAlign: "center" }}>
          Vui lòng đợi phản hồi từ công ty qua mail của bạn!
        </p>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={handleOk}
            style={{ background: "#EDEDED", padding: "20px" }}
          >
            Đóng
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default FormBusinessRegister;
