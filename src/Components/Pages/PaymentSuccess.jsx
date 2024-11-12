import { CheckCircle } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/css/PaymentSuccessPage.css";
import { doLoginAction } from "../../redux/slice/accountSlice";
import Navbar from "./Navbar";
import api from "../../utils/axios-custom";
const PaymentSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = localStorage.getItem("accessToken");
  const user = jwtDecode(token);

  const addToCourseApi = async () => {
    const courseId = JSON.parse(localStorage.getItem("courseId"));
    const response = await api.post(
      `UserCourse/add-UserToCourse?Courseid=${courseId}&UserID=${user?.UserId}`
    );
    if (response.data) {
      localStorage.removeItem("courseId");
      setTimeout(() => {
        navigate(`/courses/${courseId}/lesson`);
      }, 1000);
    }
  };

  useEffect(() => {
    if (user) {
      dispatch(doLoginAction(user));
      addToCourseApi();
    }
  }, [user]);

  return (
    <div style={{ height: "100vh" }}>
      <Navbar />
      <div className="payment-success-container">
        <div className="success-card">
          <div className="card-header">
            <CheckCircle className="success-icon" />
            <h1 className="success-title">Payment Successful!</h1>
          </div>
          <div className="card-content">
            <p className="success-message">
              Thank you for your purchase. Your order has been processed
              successfully.
            </p>
          </div>
          <div className="card-footer">
            <Link to="/" className="home-button">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
