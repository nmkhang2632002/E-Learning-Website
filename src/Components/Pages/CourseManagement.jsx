import { Button, Space, Table, Image, Typography, Input, notification } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Main
const CourseManagement = () => {
    const { Search } = Input;
    const { Title } = Typography;

    // useState
    const [getAllCourses, setGetAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    // useEffect to load data from the API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://localhost:7222/api/Course/all-course');
                setGetAllCourses(response.data);
                setFilteredCourses(response.data); // Also set the initial filtered courses
            } catch (error) {
                notification.error({
                    message: 'Failed to fetch courses',
                    description: error.message,
                });
            }
        };

        fetchCourses();
    }, []);

    // Search function
    const onSearch = (value) => {
        const filtered = getAllCourses.filter((course) =>
            course.name.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    // Delete a course
    const deleteCourse = (courseId) => {
        const updatedCourses = getAllCourses.filter(course => course.courseId !== courseId);
        setGetAllCourses(updatedCourses); // Update state
        setFilteredCourses(updatedCourses); // Also update filtered state
        // Here you can call an API to delete the course if needed
        notification.success({
            type: 'success',
            message: 'Course deleted successfully',
            duration: 2,
        });
    };

    const columns = [
        {
            title: 'Picture',
            dataIndex: 'picture',
            key: 'picture',
            render: (img) => (
                <Image
                    width={100}
                    src={img ? img : 'https://via.placeholder.com/100'}  // Fallback to placeholder if image URL is null or invalid
                    alt="Course Image"
                />
            ),
        },
        {
            title: 'Course Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Teacher',
            dataIndex: 'createBy',
            key: 'createBy',
            render: (text) => <a>{text.trim()}</a>,
        },
        {
            title: 'Time (Hours)',
            dataIndex: 'timeLearning',
            key: 'timeLearning',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button danger onClick={() => deleteCourse(record.courseId)}>
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
                <Title level={2}>LIST OF COURSES</Title>
            </div>

            {/* Top-Bar Btn */}
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
            <Table columns={columns} dataSource={filteredCourses} rowKey="courseId" />
        </>
    );
};

export default CourseManagement;
