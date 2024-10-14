import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Flex, notification } from 'antd';
import { DoLogin } from '../../apis/Login/login';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { doLoginAction } from '../../redux/slice/slice';

export default function Sign() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // useState

    // useEffect

    // Login API Function
    // Login
    const onFinish = async (values) => {
        const { username, password } = (values);
        console.log('username: ', username);
        console.log('mật khẩu: ', password);


        try {
            let accessToken = '';
            // lấy API
            let res = await DoLogin(username, password);
            console.log('Response Login: ', res);

            // set biến token
            accessToken = res.data.token;
            // console.log('token:', accessToken);
            // lưu vào LocalStorage
            localStorage.setItem('Token', accessToken);
            // Goi Redux
            dispatch(doLoginAction({
                // access_token: accessToken,
                account: res.data
            }));
            // Navigate to the home page
            navigate('/');
            // Show a success message
            notification.success({
                type: 'success',
                message: 'Login successfully',
                duration: 2,
            })
        } catch (error) {
            // Log the error for debugging
            console.log(error);

            notification.error({
                message: 'Failed Login',
                description: 'Something wrong.',
                duration: 2,
            });
        }
        return;
    };

    return (
        <>
            <Navbar />

            <div className=" m-4 ">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">Sign In Page</h6>
                    <h1 className="mb-5">Sign In</h1>
                </div>
                <div className="singin container" style={{ height: "50vh", width: '100%', display: 'flex', justifyContent: "center" }}>

                    {/* Form Login */}
                    <Form
                        name="login"
                        initialValues={{
                            remember: true,
                        }}
                        style={{
                            width: '100%',
                            maxWidth: "500px",
                        }}
                        onFinish={onFinish}
                        className='animated slideInRight'
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
                        <Form.Item>
                            <Flex justify="space-between" align="center">
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a href="">Forgot password</a>
                            </Flex>
                        </Form.Item>

                        <Form.Item>
                            <Button block type="primary" htmlType="submit">
                                Log in
                            </Button>
                            or <a href="/register">Register now!</a>
                        </Form.Item>
                    </Form>
                </div>
            </div>

            <Footer />
        </>
    )
}
