import { Button, Space, Table, Image, Typography, Input, notification, Modal, Form, Upload, List, Select } from 'antd';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';
import { GetAllCourses } from '../../apis/Coures/course';

// Main
const CourseManagement = () => {
  const { Search } = Input;
  const { Title } = Typography;

    // useState
    const [getAllCourses, setGetAllCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // For controlling course modal visibility
    const [isLessonModalOpen, setIsLessonModalOpen] = useState(false); // For controlling lessons modal
    const [lessons, setLessons] = useState([]); // Store lessons for the selected course
    const [selectedCourseName, setSelectedCourseName] = useState(''); // Store selected course name
    const [imageUrl, setImageUrl] = useState(''); // To store uploaded image URL
    const [file, setFile] = useState(null); // For handling file upload
    const [form] = Form.useForm(); // For form data
    const [selectedCourseId, setSelectedCourseId] = useState(null); // Store the selected course ID

    const [isModalLessonOpen, setIsModalLessonOpen] = useState(false);
    const [category, setcategory] = useState([]);

    // useEffect to load data from the API
    useEffect(() => {
        const fetchAllCourses = async () => {
            try {
                const response = await GetAllCourses();
                setGetAllCourses(response.data);
                setFilteredCourses(response.data); // Also set the initial filtered courses
                fetchCategories();
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
    const deleteCourse = async (courseId) => {
        try {
            await axios.delete(`http://localhost:5279/api/Course/delete-course/${courseId}`);
            const updatedCourses = getAllCourses.filter(course => course.courseId !== courseId);
            setGetAllCourses(updatedCourses); // Update state
            setFilteredCourses(updatedCourses); // Also update filtered state
            notification.success({
                message: 'Course deleted successfully',
                duration: 2,
            });
        } catch (error) {
            notification.error({
                message: 'Failed to delete course',
                description: error.message,
            });
        }
    };

    // Handle image upload to Cloudinary
    const handleUpload = async () => {
        if (!file) {
            notification.error({ message: 'Please select a file to upload.' });
            return null;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'My_preset');  // Preset from Cloudinary

        try {
            const uploadResponse = await axios.post(
                'https://api.cloudinary.com/v1_1/dkyv1vp1c/image/upload',  // Your Cloudinary URL
                formData
            );
            setImageUrl(uploadResponse.data.secure_url); // Store uploaded image URL
            return uploadResponse.data.secure_url;
        } catch (error) {
            console.error('Upload Error:', error);
            notification.error({
                message: 'Failed to upload image',
                description: error.message,
            });
            return null;
        }
    };

    // Handle Add Course
    const handleAddCourse = async () => {
        try {
            const courseData = await form.validateFields();
            const uploadedImageUrl = await handleUpload(); // Upload image to Cloudinary

            if (!uploadedImageUrl) return;

            const newCourse = {
                ...courseData,
                picture: uploadedImageUrl,
                createDate: new Date().toISOString(), // Automatically set the current date
            };
            await axios.post('http://localhost:5279/api/Course/add-course', newCourse);
            notification.success({
                message: 'Course added successfully',
            });
            setIsModalOpen(false);
            form.resetFields();
            setImageUrl(''); // Reset image URL after adding course
        } catch (error) {
            notification.error({
                message: 'Failed to add course',
                description: error.message,
            });
        }
    };

    // Fetch lessons for a course
    const viewLessons = async (courseId, courseName) => {
        setSelectedCourseName(courseName);
        try {
            const response = await axios.get(`http://localhost:5279/api/Lesson/Course/${courseId}`);
            setLessons(response.data);
            setIsLessonModalOpen(true);
        } catch (error) {
            notification.error({
                message: 'Failed to fetch lessons',
                description: error.message,
            });
        }
    };

    // Handle Add Lesson
    const handleAddLesson = async () => {
        if (!selectedCourseId) {
            notification.error({ message: 'No course selected' });
            return;
        }

        try {
            const lessonData = await form.validateFields(); // Get the form data
            const uploadedImageUrl = await handleUpload(); // Upload the image to Cloudinary

            if (!uploadedImageUrl) return;

            const newLesson = {
                lessonId: 0, // Lesson ID is 0 for new lessons
                courseId: selectedCourseId, // Assign selected courseId to the lesson
                detail: lessonData.detail, // Assign lesson detail from form
                picture: uploadedImageUrl, // Use the uploaded image URL
            };

            console.log("check" + newLesson.courseId);
            await axios.post('http://localhost:5279/api/Lesson', newLesson); // Call API to add lesson
            notification.success({ message: 'Lesson added successfully' });

            // Close the modal and reset values
            setIsModalLessonOpen(false);
            form.resetFields(); // Reset form fields
            setImageUrl(''); // Reset image URL after adding the lesson

            // Refresh the lesson list for the selected course
            viewLessons(selectedCourseId, selectedCourseName);
        } catch (error) {
            notification.error({
                message: 'Failed to add lesson',
                description: error.message,
            });
        }
    };



    // Fetch categories from API
    const fetchCategories = async () => {
        try {
            const response = await axios.get('http://localhost:5279/api/Category/all-Category');
            setcategory(response.data); // Update state with the fetched categories
            // console.log(category+"check");
        } catch (error) {
            notification.error({
                message: 'Error fetching categories',
                description: error.message,
            });
        }
    };


    const columns = [
        {
            title: 'Picture',
            dataIndex: 'picture',
            key: 'picture',
            render: (img) => (
                <Image
                    width={100}
                    src={img ? img : 'https://via.placeholder.com/100'}
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
            title: 'Money', // New column for Money
            dataIndex: 'money',
            key: 'money',
            render: (text) => <a>{text}</a>, // Adjust as necessary to format the display
        },
        {
            title: 'Category', // New column for Category
            dataIndex: 'cateId',
            key: 'cateId',
            render: (text) => <a>{text}</a>, // Adjust as necessary to format the display
        },
        {
            title: 'Actions',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Button type="primary" onClick={() => viewLessons(record.courseId, record.name)}>
                        View Lessons
                    </Button>
                    <Button variant="contained" onClick={() => {
                        setSelectedCourseId(record.courseId);
                        setIsModalLessonOpen(true);
                    }}>
                        Add Lesson
                    </Button>
                    <Button danger onClick={() => deleteCourse(record.courseId)}>
                        Delete
                    </Button>
                </Space>
            ),
        },
    ];

    // Rest of your component code...


    const uploadProps = {
        beforeUpload: (file) => {
            setFile(file);
            return false;
        },
        multiple: false,
    };

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
                <div>
                    <Button type="primary" onClick={() => setIsModalOpen(true)}>
                        Add Course
                    </Button>

                </div>
            </div>
            <br />
            <Table columns={columns} dataSource={filteredCourses} rowKey="courseId" />

            {/* Add Course Modal */}
            <Modal
                title="Add New Course"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleAddCourse}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="name"
                        label="Course Name"
                        rules={[{ required: true, message: 'Please input the course name!' }]}
                    >
                        <Input placeholder="Enter course name" />
                    </Form.Item>
                    <Form.Item
                        name="createBy"
                        label="Teacher"
                        rules={[{ required: true, message: 'Please input the teacher name!' }]}
                    >
                        <Input placeholder="Enter teacher name" />
                    </Form.Item>
                    <Form.Item
                        name="timeLearning"
                        label="Time (Hours)"
                        rules={[{ required: true, message: 'Please input the learning time!' }]}
                    >
                        <Input type="number" placeholder="Enter time in hours" />
                    </Form.Item>
                    <Form.Item
                        name="price"
                        label="Price ($)" // Added Price Field in Form
                        rules={[{ required: true, message: 'Please input the price!' }]}
                    >
                        <Input type="number" placeholder="Enter course price" />
                    </Form.Item>
                    <Form.Item
                        name="cateId"
                        label="Category"
                        rules={[{ required: true, message: 'Please select a category!' }]}>
                        <Select placeholder="Select a category">
                            {category.length > 0 ? (
                                category.map(cat => (
                                    <Select.Option key={cat.idcategory} value={cat.idcategory}>
                                        {cat.name}
                                    </Select.Option>
                                ))
                            ) : (
                                <Select.Option disabled>No categories available</Select.Option>
                            )}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Picture">
                        <Upload {...uploadProps} listType="picture-card">
                            {imageUrl ? (
                                <img src={imageUrl} alt="course" style={{ width: '100%' }} />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

            {/* View Lessons Modal */}
            <Modal
                title={`Lessons for ${selectedCourseName}`}
                open={isLessonModalOpen}
                onCancel={() => setIsLessonModalOpen(false)}
                footer={null}
                width={800}
            >
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: (page) => {
                            console.log(page);
                        },
                        pageSize: 5,
                    }}
                    dataSource={lessons}
                    renderItem={lesson => (
                        <List.Item
                            key={lesson.lessonId}
                            extra={
                                <Image
                                    width={150}
                                    src={lesson.picture ? lesson.picture : 'https://via.placeholder.com/150'} // Fallback image
                                    alt={lesson.detail}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={lesson.detail} // Show the lesson detail
                                description={`Lesson ID: ${lesson.lessonId}`}
                            />
                        </List.Item>
                    )}
                />
            </Modal>


            <Modal
                title="Add New Lesson"
                open={isModalLessonOpen}
                onCancel={() => setIsModalLessonOpen(false)}
                onOk={handleAddLesson}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="detail"
                        label="Detail"
                        rules={[{ required: true, message: 'Please input the detail for the lesson!' }]}
                    >
                        <Input placeholder="Enter Detail" />
                    </Form.Item>

                    <Form.Item label="Picture">
                        <Upload {...uploadProps} listType="picture-card">
                            {imageUrl ? (
                                <img src={imageUrl} alt="lesson" style={{ width: '100%' }} />
                            ) : (
                                <div>
                                    <PlusOutlined />
                                    <div style={{ marginTop: 8 }}>Upload</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>

        </>
    );
};

export default CourseManagement;
