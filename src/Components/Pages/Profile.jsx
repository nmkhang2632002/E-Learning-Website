import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import { Button, Form, Input, notification } from "antd";
import { useSelector } from "react-redux";

export default function Profile() {
  const [form] = Form.useForm();
  const accountInfo = useSelector((state) => state?.account?.user?.user);

  useEffect(() => {
    if (accountInfo) {
      form.setFieldsValue({
        username: accountInfo.username,
        email: accountInfo.email,
        phoneNumber: accountInfo.phoneNumber,
        dateOfBirth: accountInfo.dateOfBirth,
        role: accountInfo.role,
      });
    }
  }, [form, accountInfo]);

  const onFinish = (values) => {
    // Update user data in localStorage
    const updatedAccounts = JSON.parse(localStorage.getItem("Accounts")).map(
      (account) => {
        if (account.username === accountInfo.username) {
          return { ...account, ...values };
        }
        return account;
      }
    );
    localStorage.setItem("Accounts", JSON.stringify(updatedAccounts));

    notification.success({
      message: "Success",
      description: "User information updated successfully!",
    });
  };

  return (
    <>
      <Navbar />

      <section className="vh-150" style={{ backgroundColor: "#f4f5f7" }}>
        <MDBContainer className="py-5 h-100">
          <MDBRow className="justify-content-center align-items-center h-100">
            <MDBCol lg="6" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <MDBRow className="g-0">
                  <MDBCol
                    md="4"
                    className="gradient-custom text-center text-white"
                    style={{
                      borderTopLeftRadius: ".5rem",
                      borderBottomLeftRadius: ".5rem",
                    }}
                  >
                    <MDBCardImage
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                      alt="Avatar"
                      className="my-5"
                      style={{ width: "80px" }}
                      fluid
                    />
                    <MDBTypography tag="h5" style={{ fontStyle: "italic" }}>
                      {accountInfo.username}
                    </MDBTypography>
                    <MDBCardText>Web Designer</MDBCardText>
                    <MDBIcon far icon="edit mb-5" />
                  </MDBCol>
                  <MDBCol md="8">
                    <MDBCardBody className="p-4">
                      <MDBTypography tag="h6">Information</MDBTypography>
                      <hr className="mt-0 mb-4" />
                      <Form form={form} onFinish={onFinish} layout="vertical">
                        <MDBRow className="pt-1">
                          <MDBCol size="6" className="mb-3">
                            <Form.Item
                              name="username"
                              label="Username"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your username!",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <Form.Item
                              name="email"
                              label="Email"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your email!",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <Form.Item
                              name="phoneNumber"
                              label="Phone Number"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your phone number!",
                                },
                              ]}
                            >
                              <Input />
                            </Form.Item>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <Form.Item
                              name="dateOfBirth"
                              label="Date of Birth"
                              rules={[
                                {
                                  required: true,
                                  message: "Please input your date of birth!",
                                },
                              ]}
                            >
                              <Input type="date" />
                            </Form.Item>
                          </MDBCol>
                          <MDBCol size="6" className="mb-3">
                            <Form.Item name="role" label="Role">
                              <Input disabled value={accountInfo.role} />
                            </Form.Item>
                          </MDBCol>
                        </MDBRow>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">
                            Update Info
                          </Button>
                        </Form.Item>
                      </Form>
                    </MDBCardBody>
                  </MDBCol>
                </MDBRow>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
      <Footer />
    </>
  );
}
