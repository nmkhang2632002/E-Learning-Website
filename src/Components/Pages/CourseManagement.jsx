import { Button, Space, Table, Image, Typography, Input, notification } from 'antd';
import { useEffect, useState } from 'react';

// Main
const CourseManagement = () => {
    const { Search } = Input;
    const { Title } = Typography;

    // useState
    const [getAllCourses, setGetAllCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);

    // useEffect to load data from localStorage on mount
    useEffect(() => {
        const storedMern = JSON.parse(localStorage.getItem('MernStackCourses')) || [];
        const storedFullStack = JSON.parse(localStorage.getItem('FullStackCourses')) || [];
        const storeProgramming = JSON.parse(localStorage.getItem('ProgrammingCourses')) || [];
        const storeFreeCourses = JSON.parse(localStorage.getItem('FreeCourses')) || [];

        // Combine all courses into one array
        const combinedCourses = [...storedMern, ...storedFullStack, ...storeProgramming, ...storeFreeCourses];

        // Update the state with the combined courses
        setGetAllCourses(combinedCourses);
        setFilteredCourses(combinedCourses); // Also set the initial filtered courses
    }, []);

    // Search function
    const onSearch = (value) => {
        const filtered = getAllCourses.filter((course) =>
            course.title.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCourses(filtered);
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

    const columns = [
        {
            title: 'Picture',
            dataIndex: 'img',
            key: 'img',
            render: (img) => (
                <Image
                    width={100}
                    src={img}
                />
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
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
            dataIndex: 'teachername',
            key: 'teachername',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Total Students',
            dataIndex: 'totalstudent',
            key: 'totalstudent',
            render: (text) => <a>{text}</a>,
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
            <Table columns={columns} dataSource={filteredCourses} rowKey="title" />
        </>
    );
};

export default CourseManagement;
