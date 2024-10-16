import { Button, Input, notification, Space, Table, Tag, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { Accounts } from '../../apis/FakeData/Users/Account';

const UserManagement = () => {
    const { Title } = Typography;
    const { Search } = Input;

    // useState
    const [accounts, setAccounts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(''); // State to store search input
    const [filteredAccounts, setFilteredAccounts] = useState([]); // State for filtered data

    // useEffect to load data from localStorage on mount
    useEffect(() => {
        const storedAccounts = JSON.parse(localStorage.getItem('Accounts')) || [];
        setAccounts(storedAccounts);
        setFilteredAccounts(storedAccounts); // Initially, all accounts are displayed
    }, []);

    // Handle search input change
    const onSearch = (value) => {
        setSearchQuery(value);
        if (value === '') {
            setFilteredAccounts(accounts); // Reset if search is cleared
        } else {
            const filtered = accounts.filter(account =>
                account.username.toLowerCase().includes(value.toLowerCase()) ||
                account.email.toLowerCase().includes(value.toLowerCase()) ||
                account.phoneNumber.includes(value)
            );
            setFilteredAccounts(filtered);
        }
    };

    // Delete An Account
    const deleteAccount = (id) => {
        const updatedAccounts = accounts.filter(account => account._id.$oid !== id);
        localStorage.setItem('Accounts', JSON.stringify(updatedAccounts));
        setAccounts(updatedAccounts);
        setFilteredAccounts(updatedAccounts); // Update filtered list after deletion
        notification.success({
            type: 'success',
            message: 'Delete successfully',
            duration: 2,
        })
    };

    const columns = [
        {
            title: 'Username',
            dataIndex: 'username',
            key: 'username',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Date of Birth',
            key: 'dateOfBirth',
            dataIndex: 'dateOfBirth',
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
                switch (role) {
                    case 'student':
                        color = 'blue';
                        break;
                    case 'instructor':
                        color = 'green';
                        break;
                    case 'admin':
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
                        onClick={() => deleteAccount(record._id.$oid)}
                        disabled={record.role === 'admin'} // Disable button if role is admin
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
                <Title level={2}>LIST OF ACCOUNT</Title>
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
            <Table columns={columns} dataSource={filteredAccounts} rowKey={(record) => record._id.$oid} />
        </>
    );
};

export default UserManagement;
