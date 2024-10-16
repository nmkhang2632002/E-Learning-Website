import {
    PieChartOutlined,
    ProfileOutlined,
    UserOutlined,
    ContainerOutlined
} from '@ant-design/icons';
import { Avatar, Layout, Menu, theme, Breadcrumb, Button, Popconfirm } from 'antd';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { doLogoutAction } from '../../../redux/slice/slice';

const { Content, Sider } = Layout;

const Admin = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // set biến 'userSelector' chứa thông tin đã đăng nhập
    const accountInfo = useSelector(state => state?.account?.user?.user);
    // console.log("account", account)

    // Function xử lý thoát đăng nhập

    // const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Function xử lý thoát đăng nhập
    const handleLogOut = () => {
        console.log('Button Logout clicked')
        // localStorage.removeItem('access_token');
        dispatch(doLogoutAction());
        navigate('/');
    }

    const confirm = (e) => {
        console.log(e);
        handleLogOut();
    };
    const cancel = (e) => {
        console.log(e);
    };

    return (
        <Layout hasSider
            style={{
                // minHeight: '100vh',
            }}
        >
            <Sider width={240} >
                <div className="demo-logo-vertical" style={{ height: 40, }} />
                <div style={{ textAlign: 'center', color: "#fff", marginBottom: "2rem" }}>
                    <div>
                        <Avatar
                            icon={<UserOutlined />}
                            size={50}
                        />
                    </div>
                    <NavLink
                        className="nav-item nav-link"
                        activeClassName="active"
                        style={{ fontSize: ' 16px' }}
                    >
                        Welcome, {accountInfo.username}
                    </NavLink>

                    <Popconfirm
                        description="Are you willing to Logout?"
                        onConfirm={confirm}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger ghost>Logout</Button>
                    </Popconfirm>
                </div>

                {/* Tài khoản Admin */}
                <Menu theme="dark" mode="inline"
                    defaultOpenKeys={['sub1']}>

                    {/* Dashboard */}
                    <Menu.Item key="1" icon={<PieChartOutlined />}>
                        <Link style={{ textDecoration: 'none' }} to="/admin/dashboard">Dashboard</Link>
                    </Menu.Item>

                    <Menu.Item key="2" icon={<ProfileOutlined />}>
                        <Link style={{ textDecoration: 'none' }} to="/admin/user-management">User Management</Link>
                    </Menu.Item>

                    <Menu.Item key="3" icon={<ContainerOutlined />}>
                        <Link style={{ textDecoration: 'none' }} to="/admin/course-management">Course Management</Link>
                    </Menu.Item>
                </Menu>
            </Sider>

            <Layout>
                <Content
                    style={{
                        margin: '0 16px',
                    }}
                >
                    <Breadcrumb
                        style={{
                            margin: '16px 0',
                        }}
                    >
                        {/* <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item> */}
                    </Breadcrumb>

                    <div
                        style={{
                            padding: 24,
                            minHeight: '100vh',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                        }}
                    >
                        <Outlet></Outlet>
                    </div>
                </Content>
                {/* <Footer
                    style={{
                        textAlign: 'center',
                    }}
                >
                    Ant Design ©{new Date().getFullYear()} Created by Ant UED
                </Footer> */}
            </Layout>
        </Layout>
    );
};
export default Admin;