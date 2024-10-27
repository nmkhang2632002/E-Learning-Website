import { jwtDecode } from 'jwt-decode'; // Correct the import of jwtDecode
import { useState, useEffect } from 'react';
import { GetCourseById, GetUserCourseById } from '../../apis/Coures/course';
import { Card, Col, Descriptions, Image, Row } from 'antd';
import dayjs from 'dayjs'; // For date formatting if needed

const UserCourse = () => {
    const [userId, setUserId] = useState(null); // Initialize with null instead of undefined
    const [courseIdList, setCourseIdList] = useState([]);
    const [courseList, setCourseList] = useState([]);

    // Get Token and decode it
    useEffect(() => {
        const fetchUserData = () => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const userInfoToken = jwtDecode(token);
                setUserId(userInfoToken.UserId);
            }
        };
        fetchUserData();
    }, []); // Empty dependency array to run only on component mount

    // Get Course IDs by User ID
    useEffect(() => {
        const fetchUserCourseId = async () => {
            if (userId) {
                try {
                    const userCourseId = await GetUserCourseById(userId);
                    const fetchedCourses = userCourseId?.data || [];
                    setCourseIdList(fetchedCourses);
                } catch (error) {
                    console.error("Error fetching user course IDs:", error);
                }
            }
        };
        fetchUserCourseId();
    }, [userId]); // Add userId as a dependency to run when it's updated

    // Fetch Course Details By ID
    useEffect(() => {
        const fetchUserCourseList = async () => {
            if (courseIdList.length > 0) {
                try {
                    const courseDetails = await Promise.all(
                        courseIdList.map(async (course) => {
                            const courseDetail = await GetCourseById(course.courseId);
                            return { ...course, courseDetail: courseDetail.data }; // Get the actual course detail from the response
                        })
                    );
                    setCourseList(courseDetails);
                } catch (error) {
                    console.error("Error fetching course details:", error);
                }
            }
        };
        fetchUserCourseList();
    }, [courseIdList]); // Add courseIdList as a dependency to run when it's updated

    return (
        <>
            {courseList.length === 0 ? (
                <p>No courses available</p>
            ) : (
                courseList.map((course) => {
                    const courseData = course.courseDetail; // courseDetail is already the actual data
                    return (
                        <Card
                            key={course.courseId}
                            title={courseData.name}
                            style={{ width: '100%', margin: '20px 0' }}
                        >
                            <Row gutter={[16, 16]}>
                                <Col span={5}>
                                    <Image
                                        width={100}
                                        src={courseData.picture}
                                        alt={courseData.name}
                                    />
                                </Col>
                                <Col span={17}>
                                    <Descriptions title="Course Information" bordered layout='vertical'>
                                        <Descriptions.Item label="Course ID">{courseData.courseId}</Descriptions.Item>
                                        <Descriptions.Item label="Name">{courseData.name}</Descriptions.Item>
                                        <Descriptions.Item label="Author">{courseData.createBy}</Descriptions.Item>
                                        {/* <Descriptions.Item label="Create Date">
                                            {dayjs(courseData.createDate).format('YYYY-MM-DD')}
                                        </Descriptions.Item> */}
                                        <Descriptions.Item label="Learning Time">{courseData.timeLearning} hours</Descriptions.Item>
                                        <Descriptions.Item label="Category ID">{courseData.cateId || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Category Name">{courseData.cateName || 'N/A'}</Descriptions.Item>
                                        <Descriptions.Item label="Price">{courseData.money ? `${courseData.money} USD` : 'Free'}</Descriptions.Item>
                                    </Descriptions>
                                </Col>
                            </Row>
                        </Card>
                    );
                })
            )}
        </>
    );
};

export default UserCourse;
