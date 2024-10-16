import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Button, Form, Input, notification, DatePicker, Select } from 'antd';
import { LockOutlined, UserOutlined, MailOutlined, LoadingOutlined, CheckOutlined, PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

export default function Register() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // useState
    const [isLoading, SetIsLoading] = useState(true);

    // API SignUp Function
    const onFinish = async (values) => {
        const { username, email, password, role, phoneNumber, dateOfBirth } = values;

        try {
            // Retrieve existing accounts from localStorage
            const storedAccounts = localStorage.getItem('Accounts');
            const accounts = storedAccounts ? JSON.parse(storedAccounts) : [];

            // Create a new user account object
            const newAccount = {
                _id: { $oid: new Date().getTime().toString() }, // Generating a simple unique ID
                username,
                email,
                password,
                role,
                phoneNumber,
                dateOfBirth: dayjs(dateOfBirth).format('YYYY-MM-DD'), // Format date to string
                __v: 0, // Default version
                isAuthenticated: true, // Default isAuthenticated
            };

            // Add the new account to the accounts array
            accounts.push(newAccount);

            // Save updated accounts array to localStorage
            localStorage.setItem('Accounts', JSON.stringify(accounts));

            // Display loading notification
            const key = 'updatable'; // A key to close the notification later
            notification.open({
                key,
                message: 'Please Hold',
                description: 'Sign-up in progress...',
                icon: <LoadingOutlined />,
                duration: 0, // Keep it open until updated
            });

            // Simulate delay for signup process (optional)
            setTimeout(() => {
                // Update the notification with success status
                notification.open({
                    key,
                    message: 'Success',
                    description: 'Sign-up completed successfully!',
                    icon: <CheckOutlined style={{ color: '#52c41a' }} />,
                });

                // Navigate to the login page
                navigate('/signin');
            }, 3000);

        } catch (error) {
            console.error("Sign-up failed: ", error);
            notification.error({
                message: 'Failed Sign Up',
                description: 'Something went wrong',
            });
        } finally {
            SetIsLoading(false);
        }
    };

    // Validate Re-enter password
    const validateRePassword = (rule, value, callback) => {
        const { getFieldValue } = form;

        if (value && value !== getFieldValue('password')) {
            callback('Password does not match!');
        } else {
            callback();
        }
    };

    return (
        <>
            <Navbar />
            <div className="m-5" style={{ minHeight: "70vh" }}>
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">Sign Up Page</h6>
                    <h1 className="mb-5">User Register Page</h1>
                </div>
                <div className="singin container" style={{ height: "50vh", width: '100%', display: 'flex', justifyContent: "center" }}>

                    {/* Form Register */}
                    <Form
                        form={form}
                        name="signup"
                        initialValues={{
                            remember: true,
                        }}
                        style={{
                            width: '100%',
                            maxWidth: "500px",
                        }}
                        onFinish={onFinish}
                        className='animated slideInLeft'
                    >
                        {/* Username */}
                        <Form.Item
                            name="username"
                            rules={[{ required: true, message: 'Please input your Username!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" required />
                        </Form.Item>

                        {/* Email */}
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your Email!' }]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" required />
                        </Form.Item>

                        {/* Password */}
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your Password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" required />
                        </Form.Item>

                        {/* Re-enter Password */}
                        <Form.Item
                            name="re-password"
                            rules={[
                                { required: true, message: 'Please re-enter your Password!' },
                                { validator: validateRePassword },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Re-enter password" />
                        </Form.Item>

                        {/* Role */}
                        <Form.Item
                            name="role"
                            rules={[{ required: true, message: 'Please select a role!' }]}
                        >
                            <Select placeholder="Select a role">
                                <Select.Option value="student">Student</Select.Option>
                                <Select.Option value="instructor">Instructor</Select.Option>
                                <Select.Option value="admin">Admin</Select.Option>
                            </Select>
                        </Form.Item>

                        {/* Phone Number */}
                        <Form.Item
                            name="phoneNumber"
                            rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="Phone Number" required />
                        </Form.Item>

                        {/* Date of Birth */}
                        <Form.Item
                            name="dateOfBirth"
                            rules={[{ required: true, message: 'Please select your Date of Birth!' }]}
                        >
                            <DatePicker placeholder="Select Date of Birth" style={{ width: '100%' }} required />
                        </Form.Item>

                        {/* Submit Button */}
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
