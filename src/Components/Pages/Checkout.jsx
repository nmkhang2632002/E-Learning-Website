import axios from "axios";
import React, { useEffect, useState } from "react";
import api from "../../utils/axios-custom";
import { useLocation, useNavigate } from "react-router-dom";
import { useAccount } from "../../redux/slice/accountSlice";

const Checkout = () => {
  const [paypalClientId, setPaypalClientId] = useState(
    "Ae4QUDSIYQBgDP21YokxKKBkyq9rsAVwcVPiayrkzYuw5YcVmKuVbGanrMyMvggLX9aqjYU5l7ImGdBv"
  );
  const { user } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const totalMoney = data?.totalMoney;
  const courseId = data?.courseId;
  // const [deliveryAddress, setDeliveryAddress] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");
  const [notification, setNotification] = useState("");
  useEffect(() => {
    // const fetchData = async () => {
    //   try {
    //     const result = await api.get("/api/checkout-data");
    //     setDeliveryAddress(result.data.deliveryAddress);
    //     setPhoneNumber(result.data.phoneNumber);
    //     setTotalMoney(result.data.totalMoney);
    //   } catch (error) {
    //     console.error("Error fetching checkout data:", error);
    //     setNotification("Failed to load checkout data.");
    //   }
    // };

    // fetchData();
    // /api/UserCourse/get-all-UserCourse
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${paypalClientId}&currency=USD`;
    script.onload = () => {
      window.paypal
        .Buttons({
          createOrder: async () => {
            try {
              const response = await api.post("/api/Paypal/create-order", {
                amount: data?.totalMoney,
              });
              return response.data.orderID; // Trả về order ID
            } catch (error) {
              console.error("Error creating order:", error);
              setNotification("Failed to create order.");
              return Promise.reject(); // Để tránh việc tiếp tục đến onApprove
            }
          },
          onApprove: async (data) => {
            try {
              const response = await api.post("/api/Paypal", {
                orderID: data.orderID,
              });
              if (response.data === "Successs") {
                const response = await api.post(
                  `/api/UserCourse/add-UserToCourse?Courseid=${courseId}&UserID=${user?.UserId}`
                );
                if (response.data) {
                  setNotification("The order is created successfully!");
                  navigate("/courses");
                }
              } else {
                setNotification("Failed to create the order!");
              }
            } catch (error) {
              console.error("Error completing order:", error);
              setNotification("Failed to complete the order.");
            }
          },
          onCancel: () => {
            setNotification("Order Canceled!");
          },
          onError: () => {
            setNotification("Error occurred during payment!");
          },
        })
        .render("#paypal-button-container");
    };

    script.onerror = () => {
      setNotification("Failed to load PayPal SDK.");
    };

    document.body.appendChild(script);

    // Cleanup to avoid memory leaks
    return () => {
      document.body.removeChild(script);
    };
  }, [paypalClientId]);

  return (
    <div className="p-5" style={{ backgroundColor: "#08618d" }}>
      <div
        className="mx-auto p-3 bg-light rounded border"
        style={{ maxWidth: "420px" }}
      >
        <h2 className="text-center mb-5">Complete your order</h2>
        <div className="mb-3">
          <label className="form-label">Total Money</label>
          <input
            type="text"
            className="form-control"
            value={`${totalMoney} $`}
            readOnly
          />
        </div>

        {/* Thông báo */}
        <div id="notification-container">
          {notification && (
            <div
              className={`alert ${
                notification.includes("success")
                  ? "alert-success"
                  : "alert-danger"
              }`}
              role="alert"
            >
              {notification}
            </div>
          )}
        </div>

        {/* PayPal Button */}
        <div id="paypal-button-container"></div>
      </div>
    </div>
  );
};

export default Checkout;
