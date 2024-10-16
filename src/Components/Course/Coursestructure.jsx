import { useState, useEffect } from 'react';
import { Modal, Button, Card, Space, QRCode, notification } from 'antd';
import { useSelector } from 'react-redux';

export default function Coursestructure({ course }) {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [buttonDisabled, setButtonDisabled] = useState(true);
    const [timeoutDuration, setTimeoutDuration] = useState(60);
    // const [text, setText] = useState('https://ant.design/');


    // set biến 'account' chứa all
    // const account = useSelector(state => state?.account?.user?.user);

    // set biến 'userSelector' chứa thông tin đã đăng nhập
    const accountInfo = useSelector(state => state?.account?.user?.user);
    // Show modal when the user clicks "Buy Now"
    const showModal = (course) => {
        setSelectedCourse(course);
        setIsModalVisible(true);
        setButtonDisabled(true); // Reset button disabled state
        setTimeoutDuration(60); // Reset timeout duration
    };

    // Handle modal close
    const handleCancel = () => {
        setIsModalVisible(false);
    };

    // Start countdown timer for enabling the button
    useEffect(() => {
        let timer;
        if (isModalVisible && timeoutDuration > 0) {
            timer = setInterval(() => {
                setTimeoutDuration((prev) => prev - 1);
            }, 1000);
        }
        if (timeoutDuration === 0) {
            setButtonDisabled(false);
        }

        return () => clearInterval(timer); // Cleanup timer on component unmount
    }, [isModalVisible, timeoutDuration]);


    return (
        <>
            {course && course.length > 0 ? (
                course.map((data) => (
                    <div key={data.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay={data.time}>
                        <div className="course-item bg-light">
                            <div className="position-relative overflow-hidden">
                                <img className="img-fluid" src={data.img} alt="" />
                                <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                                    {/* Conditional button for "Buy Now" or "Learn Now" */}
                                    <Button
                                        type="primary"
                                        onClick={() => {
                                            if (!accountInfo || !accountInfo.isAuthenticated) {
                                                // If user is not authenticated
                                                notification.warning({
                                                    message: 'Login Required',
                                                    description: 'Please log in to buy the course.',
                                                });
                                                window.location.href = '/signin'; // Redirect to login page
                                                return;
                                            }

                                            if (data.purchased) {
                                                showModal(data); // Show modal for payment
                                            } else {
                                                // Redirect to course page if the course is not purchased
                                                window.location.href = data.join;
                                            }
                                        }}
                                    >
                                        {data.purchased ? 'Buy Now' : 'Learn Now'}
                                    </Button>
                                </div>
                            </div>
                            <div className="text-center p-4 pb-0">
                                <h3 className="mb-0">{data.price}</h3>
                                <div className="mb-3">
                                    <small className="fa fa-star text-primary" />
                                    <small className="fa fa-star text-primary" />
                                    <small className="fa fa-star text-primary" />
                                    <small className="fa fa-star text-primary" />
                                    <small className="fa fa-star text-primary" />
                                    <small>{data.review}</small>
                                </div>
                                <h5 className="mb-4">{data.title}</h5>
                            </div>
                            <div className="d-flex border-top">
                                <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-user-tie text-primary me-2" />{data.teachername}
                                </small>
                                <small className="flex-fill text-center border-end py-2">
                                    <i className="fa fa-clock text-primary me-2" />{data.duration}
                                </small>
                                <small className="flex-fill text-center py-2">
                                    <i className="fa fa-user text-primary me-2" />{data.totalstudent} Students
                                </small>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <p>No courses available</p>
            )}

            {/* Modal for Bank Info and QR Code */}
            <Modal
                title="Payment Information"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null} // No default footer
            >
                {selectedCourse && (
                    <Card>
                        <p><strong>Bank Name:</strong> ĐINH NHẬT NAM </p>
                        <p><strong>Account Number:</strong> 07812344595</p>
                        <p><strong>Amount:</strong> {selectedCourse.price}</p>
                        <p><strong>QR Code for Payment:</strong></p>
                        <Space direction="vertical" align="center">
                            <QRCode value={'-'} />
                        </Space>
                        {/* Expiration Note */}
                        <p style={{ color: 'red', marginTop: '15px' }}>
                            <strong>Note:</strong> The QR code will expire in 60 seconds. Please complete the payment within 1 minute.
                        </p>

                        {/* Button at the bottom of the modal */}
                        <Button
                            type={buttonDisabled ? 'default' : 'primary'}
                            disabled={buttonDisabled}
                            style={{
                                backgroundColor: buttonDisabled ? '#d9d9d9' : '#52c41a',
                                color: buttonDisabled ? '#999' : '#fff',
                                marginTop: '20px',
                                width: '100%',
                            }}
                            onClick={() => {
                                if (!buttonDisabled) {
                                    handleCancel(); // Close the modal
                                    window.location.href = selectedCourse.join; // Navigate to the course study page
                                }
                            }}
                        >
                            {buttonDisabled ? `Pending... (${timeoutDuration}s)` : 'Go to Study'}
                        </Button>
                    </Card>
                )}
            </Modal>
        </>
    );
}
