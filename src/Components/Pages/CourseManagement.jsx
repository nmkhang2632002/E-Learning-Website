import { Button, Space, Table, Image, Typography, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import { GetAllCourses } from '../../apis/Coures/course';

// Main
const CourseManagement = () => {
    const { Search } = Input;
    const { Title } = Typography;

    // useState
    const [getAllCourses, setGetAllCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    // Fetch API All Courses
    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const response = await GetAllCourses();
                setGetAllCourses(response.data);
                setFilteredCourses(response.data);
            } catch (error) {
                console.error('Error fetching accounts:', error);
                notification.error({
                    message: 'Error fetching accounts',
                    description: 'Could not load accounts. Please try again later.',
                });
            }
        }
        fetchAllCourses();
    }, []);


    // Handle search input change
    const onSearch = (value) => {
        setSearchQuery(value);
        if (value === '') {
            setFilteredCourses(getAllCourses); // Reset if search is cleared
        } else {
            const filtered = getAllCourses.filter(getAllCourses =>
                getAllCourses.name.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredCourses(filtered);
        }
    };

    // Delete a course
    const deleteCourse = (title) => {
        const updatedCourses = getAllCourses.filter(course => course.title !== title);
        setGetAllCourses(updatedCourses); // Update state
        setFilteredCourses(updatedCourses); // Also update filtered state
        // Update localStorage if needed
        localStorage.setItem('MernStackCourses', JSON.stringify(updatedCourses)); // Assuming all courses are from MernStack
        notification.success({
            type: 'success',
            message: 'Delete successfully',
            duration: 2,
        })
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
            title: 'Picture',
            dataIndex: 'picture',
            key: 'picture',
            render: (img) => (
                <Image
                    width={100}
                    src={img}
                />
            ),
        },
        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Fee',
            dataIndex: 'price',
            key: 'price',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Teacher',
            dataIndex: 'createBy',
            key: 'createBy',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Durations',
            dataIndex: 'timeLearning',
            key: 'timeLearning',
            render: (text) => <a>{text} hours</a>,
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger onClick={() => deleteCourse(record.title)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    return (
        <>
            {/* Header */}
            <div>
                <Title level={2}>LIST OF COURSE</Title>
            </div>

            {/* Top-Bar Btn*/}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Search
                    placeholder="Search Course by Name"
                    allowClear
                    enterButton="Search"
                    size="large"
                    onSearch={onSearch}
                    style={{ margin: '20px 20px 20px 0px', width: '33%' }}
                />
            </div>
            <br />
            <Table
                columns={columns}
                dataSource={filteredCourses} rowKey="title"
                pagination={{
                    pageSize: 5,
                    onChange: onPageChange,
                }}
            />
        </>
    );
};

export default CourseManagement;
