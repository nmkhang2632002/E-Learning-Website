import { Card, Descriptions } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { GetUserPaypalById } from "../../apis/Paypal/UserPaypal";
import { jwtDecode } from "jwt-decode";
import { formatNumberWithDots } from "../../utils/formatPrice";

const UserPaypal = () => {
  const [userId, setUserId] = useState(null);
  const [userPaypalHistory, setUserPaypalHistory] = useState([]);

  // Get Token and decode it
  useEffect(() => {
    const fetchUserData = () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        const userInfoToken = jwtDecode(token);
        setUserId(userInfoToken.UserId);
      }
    };
    fetchUserData();
  }, []); // Empty dependency array to run only on component mount

  // Fetch User Paypal History
  useEffect(() => {
    const fetchUserPaypal = async () => {
      try {
        const APIUserPaypay = await GetUserPaypalById(userId);

        if (APIUserPaypay) {
          const getDataUserPaypal = APIUserPaypay?.data || [];
          console.log("getDataUserPaypal", getDataUserPaypal);

          setUserPaypalHistory(getDataUserPaypal);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPaypal();
  }, [userId]);

  return (
    <>
      {userPaypalHistory.length === 0 ? (
        <p>No order available</p>
      ) : (
        userPaypalHistory.map((paypal) => (
          <>
            <Card
              title={`Payment ID: ${paypal.paymentId}`}
              bordered={true}
              style={{ width: 400, margin: "20px auto" }}
            >
              <Descriptions column={1} bordered>
                <Descriptions.Item label="User ID">
                  {paypal.userId}
                </Descriptions.Item>
                <Descriptions.Item label="Amount">
                  {formatNumberWithDots(paypal.money)} VND
                </Descriptions.Item>
                <Descriptions.Item label="Date">
                  {dayjs(paypal.date).format("YYYY-MM-DD HH:mm")}
                </Descriptions.Item>
                <Descriptions.Item label="Title">
                  {paypal.title}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </>
        ))
      )}
    </>
  );
};

export default UserPaypal;
