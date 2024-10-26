import { useState, useEffect } from "react";
import { Modal, Button, Card, Space, QRCode, notification } from "antd";
import { useSelector } from "react-redux";
import { useAccount } from "../../redux/slice/accountSlice";
import { useNavigate } from "react-router-dom";

export default function Coursestructure({ course }) {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [timeoutDuration, setTimeoutDuration] = useState(60);
  const { user } = useAccount();

  const showModal = () => {
    setIsModalVisible(true);
    setButtonDisabled(true); // Reset button disabled state
    setTimeoutDuration(60); // Reset timeout duration
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

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
      {course ? (
        <div
          className="col-lg-4 col-md-6 wow fadeInUp"
          data-wow-delay="0.1s"
          style={{ width: "100%" }}
        >
          <div className="course-item bg-light" style={{ height: "100%" }}>
            <div className="position-relative overflow-hidden">
              <img
                src={course.picture}
                alt={course.name}
                style={{ objectFit: "cover", width: "100%", height: "200px" }}
              />
              <div className="w-100 d-flex justify-content-center position-absolute bottom-0 start-0 mb-4">
                <Button
                  type="primary"
                  onClick={() => {
                    if (course.isPuchrase) {
                      navigate(`/courses/${course.courseId}/lesson`);
                      return;
                    }
                    if (!user.UserId) {
                      navigate("/signin");
                    } else {
                      navigate("/Pay", {
                        state: {
                          totalMoney: course.money,
                          courseId: course.courseId,
                        },
                      });
                    }
                  }}
                >
                  {course.isPuchrase ? "Go to Study" : "Buy Now"}
                </Button>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">${course.money}</h3>
              <div className="mb-3">
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small className="fa fa-star text-primary" />
                <small>{course.review}</small>
              </div>
              <h5 className="mb-4">{course.name}</h5>
            </div>
            <div className="d-flex border-top">
              <small className="flex-fill text-center border-end py-2">
                <i className="fa fa-user-tie text-primary me-2" />
                {course.createBy}
              </small>
              <small className="flex-filsl text-center border-end py-2">
                <i className="fa fa-clock text-primary me-2" />
                {course.timeLearning} hours
              </small>
              <small className="flex-fill text-center py-2">
                <i className="fa fa-user text-primary me-2" />
                {course.totalstudent} Students
              </small>
            </div>
          </div>
        </div>
      ) : (
        <p>No course available</p>
      )}

      <Modal
        title="Payment Information"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        {course && (
          <Card>
            <p>
              <strong>Bank Name:</strong> ĐINH NHẬT NAM{" "}
            </p>
            <p>
              <strong>Account Number:</strong> 07812344595
            </p>
            <p>
              <strong>Amount:</strong> ${course.money}
            </p>
            <p>
              <strong>QR Code for Payment:</strong>
            </p>
            <Space direction="vertical" align="center">
              <QRCode value={"-"} />
            </Space>
            <p style={{ color: "red", marginTop: "15px" }}>
              <strong>Note:</strong> The QR code will expire in 60 seconds.
              Please complete the payment within 1 minute.
            </p>
            <Button
              type={buttonDisabled ? "default" : "primary"}
              disabled={buttonDisabled}
              style={{
                backgroundColor: buttonDisabled ? "#d9d9d9" : "#52c41a",
                color: buttonDisabled ? "#999" : "#fff",
                marginTop: "20px",
                width: "100%",
              }}
              onClick={() => {
                if (!buttonDisabled) {
                  handleCancel(); // Close the modal
                  window.location.href = course.join; // Navigate to the course study page
                }
              }}
            >
              {buttonDisabled
                ? `Pending... (${timeoutDuration}s)`
                : "Go to Study"}
            </Button>
          </Card>
        )}
      </Modal>
    </>
  );
}
