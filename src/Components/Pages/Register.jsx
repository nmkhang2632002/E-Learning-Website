import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button, Form, Input, notification, DatePicker, Select } from "antd";
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  LoadingOutlined,
  CheckOutlined,
  PhoneOutlined,
  IdcardOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import api from "../../utils/axios-custom";

export default function Register() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  // useState
  const [isLoading, SetIsLoading] = useState(true);

  // API SignUp Function
  const onFinish = async (values) => {
    const { fullName, email, password, phoneNumber } = values;

    try {
      const key = "updatable"; // A key to close the notification later
      notification.open({
        key,
        message: "Please Hold",
        description: "Sign-up in progress...",
        icon: <LoadingOutlined />,
        duration: 0, // Keep it open until updated
      });
      const res = await api.post("/User", {
        fullName,
        email,
        password,
        role: "student",
        phoneNumber,
      });

      // Simulate delay for signup process (optional)
      setTimeout(() => {
        // Update the notification with success status
        notification.open({
          key,
          message: "Success",
          description: "Sign-up completed successfully!",
          icon: <CheckOutlined style={{ color: "#52c41a" }} />,
        });

        // Navigate to the login page
        navigate("/signin");
      }, 3000);
    } catch (error) {
      console.error("Sign-up failed: ", error);
      notification.error({
        message: "Failed Sign Up",
        description: "Something went wrong",
      });
    } finally {
      SetIsLoading(false);
    }
  };

  const validatePassword = ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(
        new Error("The two passwords that you entered do not match!")
      );
    },
  });

  return (
    <>
      <Navbar />
      <div className="m-5" style={{ minHeight: "70vh" }}>
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Sign Up Page
          </h6>
          <h1 className="mb-5">User Register Page</h1>
        </div>
        <div
          className="singin container"
          style={{
            height: "50vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Form Register */}
          <Form
            form={form}
            name="signup"
            initialValues={{
              remember: true,
            }}
            style={{
              width: "100%",
              maxWidth: "500px",
            }}
            onFinish={onFinish}
            className="animated slideInLeft"
          >
            {/* Full Name */}
            <Form.Item
              name="fullName"
              rules={[
                { required: true, message: "Please input your Full Name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Full Name"
                required
              />
            </Form.Item>

            {/* Phone Number */}
            <Form.Item
              name="phoneNumber"
              rules={[
                { required: true, message: "Please input your Phone Number!" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Phone Number"
                required
              />
            </Form.Item>

            {/* Email */}
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" required />
            </Form.Item>

            {/* Password */}
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
              hasFeedback
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
                required
              />
            </Form.Item>

            {/* Confirm Password */}
            <Form.Item
              name="confirmPassword"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please confirm your Password!" },
                validatePassword,
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Confirm Password"
                required
              />
            </Form.Item>

            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Sign Up
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}
