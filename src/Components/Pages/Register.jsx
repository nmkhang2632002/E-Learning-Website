import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Button, Form, Input, notification } from 'antd'
import { LockOutlined, UserOutlined, MailOutlined, LoadingOutlined, CheckOutlined } from '@ant-design/icons';
import { DoSignUp } from '../../apis/Signup/signup';
import { useNavigate } from 'react-router-dom';


export default function Register() {

    const [form] = Form.useForm();
    const navigate = useNavigate();


    // useState
    const [user, SetUser] = useState();
    const [isLoading, SetIsLoading] = useState(true);
    // useEffect

    // API SignUp Function
    const onFinish = async (values) => {
        const { username, email, password } = values;

        try {
            const res = await DoSignUp(username, email, password);
            // console.log(res);
            if (res?.data) {
                SetUser(res);

                // Display loading notification
                const key = 'updatable'; // A key to close the notification later
                notification.open({
                    key,
                    message: 'Please Hold',
                    description: 'Sign-up in progress...',
                    icon: <LoadingOutlined />,
                    duration: 0, // Keep it open until updated
                });

                // Delay navigation by 3 seconds (3000 ms)
                setTimeout(() => {
                    // Update the notification with success status
                    notification.open({
                        key,
                        message: 'Success',
                        description: 'Sign-up completed successfully!',
                        icon: <CheckOutlined style={{ color: '#52c41a' }} />, // Success icon with green color
                    });

                    // Navigate after notification update
                    navigate('/signin');
                }, 3000); // Adjust the delay as needed
            }
        } catch (error) {
            console.error("Sign-up failed: ", error);
            notification.error({
                message: 'Failed Sign Up',
                description: 'Something wrong',
            });
        } finally {
            SetIsLoading(false);
        }
    }

    // Validate Nhập lại mật khẩu
    const validateRePassword = (rule, value, callback) => {
        const { getFieldValue } = form;

        if (value && value !== getFieldValue('password')) {
            callback('Password is not match!');
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

                    {/* Form Login */}
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
                        <Form.Item
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Username!',
                                },
                            ]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Username" />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Emai!',
                                },
                            ]}
                        >
                            <Input prefix={<MailOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password!',
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} type="password" placeholder="Password" />
                        </Form.Item>
                        <Form.Item
                            name="re-password"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please re-input your Password!',
                                },
                                {
                                    validator: validateRePassword,
                                },
                            ]}
                        >
                            <Input.Password prefix={<LockOutlined />} type="re-password" placeholder="Re-enter password" />
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
    )
}
