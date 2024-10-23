import { Button, Form, Input, Modal, notification, Space, Table, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import { PlusOutlined } from '@ant-design/icons';
import { DoAddNewUser } from '../../apis/Users/user';

const UserManagement = () => {
    const { Title } = Typography;
    const { Search } = Input;
    const [form] = Form.useForm();

    // useState
    const [accounts, setAccounts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to store search input
    const [filteredAccounts, setFilteredAccounts] = useState([]); // State for filtered data
    const [currentPage, setCurrentPage] = useState(1);

    const [isModalVisible, setIsModalVisible] = useState(false);


    // useEffect to load data from API on mount
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                const response = await axios.get('https://localhost:7222/api/User');
                setAccounts(response.data);
                setFilteredAccounts(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                notification.error({
                    message: 'Error fetching accounts',
                    description: 'Could not load accounts. Please try again later.',
                });
            }
        };

        fetchAccounts(); // Call the fetchAccounts function
    }, []);

    // Handle search input change
    const onSearch = (value) => {
        setSearchQuery(value);
        if (value === '') {
            setFilteredAccounts(accounts); // Reset if search is cleared
        } else {
            const filtered = accounts.filter(account =>
                account.fullName.toLowerCase().includes(value.toLowerCase()) ||
                account.email.toLowerCase().includes(value.toLowerCase()) ||
                account.phoneNumber.includes(value)
            );
            setFilteredAccounts(filtered);
        }
    };

    // Handle Create New User
    const onFinish = async (values) => {
        console.log("Form submit:", values);


        try {
            const { fullName, phoneNumber, email, password } = values;

            const DoCreateUser = await DoAddNewUser(fullName, phoneNumber, email, password)
            console.log('====================================');
            console.log("DoCreateUser", DoCreateUser);
            console.log('====================================');
            if (DoCreateUser.status === 201) {
                notification.success({
                    message: 'Create New User Successfully',
                    duration: 2
                })
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
            notification.error({
                message: 'Create New User Failed',
                duration: 2
            })
        }
    };


    // Delete An Account (This assumes you have a delete endpoint)
    const deleteAccount = async (id) => {
        try {
            await axios.delete(`https://localhost:7222/api/User/${id}`); // Adjust the URL according to your API
            const updatedAccounts = accounts.filter(account => account.userId !== id);
            setAccounts(updatedAccounts);
            setFilteredAccounts(updatedAccounts); // Update filtered list after deletion
            notification.success({
                message: 'Delete successfully',
                duration: 2,
            });
        } catch (error) {
            console.error('Error deleting account:', error);
            notification.error({
                message: 'Error deleting account',
                description: 'Could not delete account. Please try again later.',
            });
        }
    };

    // Handle page change
    const onPageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render: (text, record, index) => {
                // Calculate row number based on current page
                return (currentPage - 1) * 5 + (index + 1);
            },
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
            key: 'fullName',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
            render: (_, { role }) => {
                let color;
                switch (role.trim()) {
                    case 'Student':
                        color = 'blue';
                        break;
                    case 'Admin':
                        color = 'red';
                        break;
                    default:
                        color = 'geekblue'; // Default color if role doesn't match
                }
                return (
                    <Tag color={color} key={role}>
                        {role.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: 'Phone Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type='primary'
                        danger ghost
                        onClick={() => deleteAccount(record.userId.trim())} // Use userId instead of _id
                        disabled={record.role.trim() === 'Admin'} // Disable button if role is admin
                    >
                        Delete account
                    </Button>
                </Space>
            ),
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    return (
        <>
            {/* Header */}
            <div>
                <Title level={2}>LIST OF ACCOUNTS</Title>
            </div>

            {/* Top-Bar Search */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Search
                    placeholder="Search Account by Name"
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{ margin: '20px 20px 20px 0', width: '33%' }}
                    onSearch={onSearch} // Call onSearch when user submits
                />
                <Button
                    icon={<PlusOutlined />}
                    size={'large'}
                    type="primary"
                    style={{ width: 'fit-content', margin: '20px', backgroundColor: '#1677FF' }}
                    onClick={showModal}
                >
                    Create Account
                </Button>
            </div>

            {/* Table */}
            <Table
                columns={columns}
                dataSource={filteredAccounts}
                rowKey={(record) => record.userId.trim()}
                pagination={{
                    pageSize: 5,
                    onChange: onPageChange,
                }}
            />

            {/* Modal Create New User */}
            <Modal
                title="Create New User"
                visible={isModalVisible}
                okText="Submit"
                cancelText="Cancel"
                footer={[]}
            >

                <Form
                    onFinish={onFinish}
                    form={form}
                    layout="vertical"
                    name="create_user_form"
                    initialValues={{ remember: true }}
                >
                    <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[{ required: true, message: 'Please input your full name!' }]}
                    >
                        <Input placeholder="Enter full name" />
                    </Form.Item>
                    <Form.Item
                        name="phoneNumber"
                        label="Phone Number"
                        rules={[{ required: true, message: 'Please input your phone number!' }]}
                    >
                        <Input placeholder="Enter phone number" />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        label="Email"
                        rules={[{ required: true, message: 'Please input a valid email!', type: 'email' }]}
                    >
                        <Input placeholder="Enter email" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Enter password" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 8,
                            span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserManagement;
