import Navbar from './Navbar';
import Footer from './Footer';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
// import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { doLoginAction } from '../../redux/slice/slice';
import { Accounts } from '../../apis/FakeData/Users/Account';
import { useDispatch } from 'react-redux';
import { doLoginAction } from '../../redux/slice/slice';

export default function Sign() {
    // const dispatch = useDispatch();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Login API Function
    const onFinish = async (values) => {
        const { email, password } = values;
        // console.log('====================================');
        // console.log("Email:", email);
        // console.log("password:", password);
        // console.log('====================================');

        // Retrieve accounts from localStorage
        const storedAccounts = JSON.parse(localStorage.getItem('Accounts')) || [];

        // Check if the user exists and the password matches
        const user = storedAccounts.find(account =>
            account.email === email && account.password === password
        );

        if (user) {
            // Dispatch the login action
            dispatch(doLoginAction({
                user: user,
                // isAuth: true
            }));

            // Navigate based on user role
            if (user.role === 'admin' || user.role === 'instructor') {
                navigate('/admin'); // Navigate to admin route
                notification.success({
                    message: 'Login Successfully',
                });
            } else {
                navigate('/'); // Navigate to default user route
            }
        } else {
            // Show notification for invalid credentials
            notification.error({
                message: 'Login Failed',
                description: 'Incorrect email or password. Please try again.',
            });
        }
    };

    return (
        <>
            <Navbar />
            <div className="m-4">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">Sign In Page</h6>
                    <h1 className="mb-5">Sign In</h1>
                </div>
                <div className="signin container" style={{ height: "50vh", width: '100%', display: 'flex', justifyContent: "center" }}>
                    {/* Form Login */}
                    <Form
                        name="login"
                        initialValues={{ remember: true }}
                        style={{ width: '100%', maxWidth: "500px" }}
                        onFinish={onFinish}
                        className='animated slideInRight'
                    >
                        <Form.Item
                            name="email"
                            rules={[{ required: true, message: 'Please input your email!' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Email" />
                        </Form.Item>
                        <Form.Item
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
                        </Form.Item>
                        <Form.Item>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <Form.Item name="remember" valuePropName="checked" noStyle>
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <a href="">Forgot password</a>
                            </div>
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
    );
}
