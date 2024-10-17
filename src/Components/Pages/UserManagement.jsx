import { Button, Input, notification, Space, Table, Tag, Typography } from 'antd'; 
import { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios

const UserManagement = () => {
    const { Title } = Typography;
    const { Search } = Input;

    // useState
    const [accounts, setAccounts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to store search input
    const [filteredAccounts, setFilteredAccounts] = useState([]); // State for filtered data

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

    const columns = [
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
            </div>

            {/* Table */}
            <Table columns={columns} dataSource={filteredAccounts} rowKey={(record) => record.userId.trim()} />
        </>
    );
};

export default UserManagement;
