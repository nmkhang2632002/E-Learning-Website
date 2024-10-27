import { Button, Input, notification, Space, Table, Tag, Typography, Modal, Form, Select } from 'antd'; 
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
// import { PlusOutlined } from '@ant-design/icons';
// import { DoAddNewUser } from '../../apis/Users/user';

const UserManagement = () => {
    const { Title } = Typography;
    const { Search } = Input;
    const { Option } = Select;

    // useState
    const [accounts, setAccounts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredAccounts, setFilteredAccounts] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false); // Modal state
    const [newUser, setNewUser] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        password: '',
        role: ''
    }); // State for new user input

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

    // Handle input change for new user
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser({ ...newUser, [name]: value });
    };

    // Handle role change from dropdown
    const handleRoleChange = (value) => {
        setNewUser({ ...newUser, role: value });
    };

    // Handle modal visibility
    // const showModal = () => {
    //     setIsModalVisible(true);
    // };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Handle adding new user
    const handleAddUser = async () => {
        try {
            const response = await axios.post('https://localhost:7222/api/User', newUser);
            setAccounts([...accounts, response.data]); // Add the new user to the list
            setFilteredAccounts([...accounts, response.data]); // Update filtered accounts
            notification.success({
                message: 'User added successfully',
                duration: 2,
            });
            setIsModalVisible(false); // Close modal after success
        } catch (error) {
            console.error('Error adding user:', error);
            notification.error({
                message: 'Error adding user',
                description: 'Could not add user. Please try again later.',
            });
        }
    };

    // Delete An Account
    const deleteAccount = async (id) => {
        try {
            await axios.delete(`https://localhost:7222/api/User/${id}`); 
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
    // const onPageChange = (page) => {
    //     setCurrentPage(page);
    // };

    const columns = [
        // {
        //     title: 'No.',
        //     dataIndex: 'key',
        //     key: 'key',
        //     render: (text, record, index) => {
        //         // Calculate row number based on current page
        //         return (currentPage - 1) * 5 + (index + 1);
        //     },
        // },
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

            {/* Top-Bar Search and Add User Button */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Search
                    placeholder="Search Account by Name"
                    allowClear
                    enterButton="Search"
                    size="large"
                    style={{ margin: '20px 20px 20px 0', width: '33%' }}
                    onSearch={onSearch} // Call onSearch when user submits
                />

                {/* Add User Button */}
                <Button type="primary" onClick={showModal}>
                    Add User
                </Button>
            </div>

            {/* Table */}
            <Table columns={columns} dataSource={filteredAccounts} rowKey={(record) => record.userId.trim()} />

            {/* Modal for Adding New User */}
            <Modal
                title="Add New User"
                visible={isModalVisible}
                onOk={handleAddUser}
                onCancel={handleCancel}
                okText="Add"
                cancelText="Cancel"
            >
                <Form layout="vertical">
                    <Form.Item label="Full Name">
                        <Input name="fullName" value={newUser.fullName} onChange={handleInputChange} />
                    </Form.Item>

                    <Form.Item label="Phone Number">
                        <Input name="phoneNumber" value={newUser.phoneNumber} onChange={handleInputChange} />
                    </Form.Item>

                    <Form.Item label="Email">
                        <Input name="email" value={newUser.email} onChange={handleInputChange} />
                    </Form.Item>

                    <Form.Item label="Password">
                        <Input.Password name="password" value={newUser.password} onChange={handleInputChange} />
                    </Form.Item>

                    <Form.Item label="Role">
                        <Select value={newUser.role} onChange={handleRoleChange}>
                            <Option value="Teacher">Teacher</Option>
                            <Option value="Student">Student</Option>
                            <Option value="Staff">Staff</Option>
                            <Option value="Manager">Manager</Option>
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UserManagement;
