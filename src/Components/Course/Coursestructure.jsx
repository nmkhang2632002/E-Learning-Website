import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useAccount } from "../../redux/slice/accountSlice";
import api from "../../utils/axios-custom";
import { formatNumberWithDots } from "../../utils/formatPrice";

export default function Coursestructure({ course }) {
  const navigate = useNavigate();
  const { user } = useAccount();

  const handlePayment = async () => {
    const response = await api.post("Payment/add-Payment", {
      userId: user.UserId,
      money: course.money * 1000,
      title: "Payment for course",
    });
    const url = await response.data;
    localStorage.setItem("courseId", JSON.stringify(course?.courseId));
    if (url) {
      window.location = url;
    }
  };

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
                      handlePayment();
                    }
                  }}
                >
                  {course.isPuchrase ? "Go to Study" : "Buy Now"}
                </Button>
              </div>
            </div>
            <div className="text-center p-4 pb-0">
              <h3 className="mb-0">
                {formatNumberWithDots(course.money * 1000)}vnd
              </h3>
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
    </>
  );
}
