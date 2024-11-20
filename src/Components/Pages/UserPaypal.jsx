import { Button, Card, Descriptions, Modal } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { GetUserPaypalById } from "../../apis/Paypal/UserPaypal";
import { formatNumberWithDots } from "../../utils/formatPrice";
import api from "../../utils/axios-custom";
import "./UserPaypal.css";
import { jwtDecode } from "jwt-decode";

const UserPaypal = () => {
  const [userId, setUserId] = useState(null);
  const [userPaypalHistory, setUserPaypalHistory] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPaypal, setSelectedPaypal] = useState(null);

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

  const handleModal = () => {
    setIsModalVisible((prev) => !prev);
  };

  const handleStatus = async (bankCode) => {
    handleModal();
    try {
      const rest = await api.get(
        `/Payment/detail-payment?orderCode=${bankCode}`
      );

      if (rest.data) {
        setSelectedPaypal(rest.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch User Paypal History
  useEffect(() => {
    const fetchUserPaypal = async () => {
      try {
        const APIUserPaypal = await api.get(
          `Payment/all-Payment-byUID?uid=${userId}`
        );

        if (APIUserPaypal) {
          const getDataUserPaypal = APIUserPaypal?.data || [];
          setUserPaypalHistory(getDataUserPaypal);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (userId) {
      fetchUserPaypal();
    }
  }, [userId]);

  return (
    <div className="user-paypal-container">
      {userPaypalHistory.length === 0 ? (
        <p className="no-orders">No order available</p>
      ) : (
        userPaypalHistory.map((paypal) => (
          <Card
            key={paypal.paymentId}
            title={
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <p style={{ margin: 0 }}>Payment ID: {paypal.paymentId}</p>
                <Button
                  type="primary"
                  onClick={() => {
                    handleStatus(paypal.bankCode);
                  }}
                >
                  Detail
                </Button>
              </div>
            }
            bordered={true}
            className="user-paypal-card"
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
              <Descriptions.Item label="Description">
                {paypal.description}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {paypal.status}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        ))
      )}
      <Modal
        title="Payment Status"
        visible={isModalVisible}
        onOk={handleModal}
        onCancel={handleModal}
        footer={null}
      >
        {selectedPaypal && (
          <div className="modal-content">
            <div className="modal-header">Payment Details</div>
            <Descriptions column={1} bordered>
              <Descriptions.Item label="ID">
                {selectedPaypal.id}
              </Descriptions.Item>
              <Descriptions.Item label="Order Code">
                {selectedPaypal.orderCode}
              </Descriptions.Item>
              <Descriptions.Item label="Amount">
                {selectedPaypal.amount}
              </Descriptions.Item>
              <Descriptions.Item label="Amount Paid">
                {selectedPaypal.amountPaid}
              </Descriptions.Item>
              <Descriptions.Item label="Amount Remaining">
                {selectedPaypal.amountRemaining}
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                {selectedPaypal.status}
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {dayjs(selectedPaypal.createdAt).format("YYYY-MM-DD HH:mm")}
              </Descriptions.Item>
            </Descriptions>
            {selectedPaypal.transactions &&
              selectedPaypal.transactions.length > 0 && (
                <div className="transaction-section">
                  <div className="transaction-header">Transactions</div>
                  {selectedPaypal.transactions.map((transaction, index) => (
                    <div key={index} className="transaction-item">
                      <Descriptions column={1} bordered>
                        <Descriptions.Item label="Account Number">
                          {transaction.accountNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Amount">
                          {transaction.amount}
                        </Descriptions.Item>
                        <Descriptions.Item label="Counter Account Bank Name">
                          {transaction.counterAccountBankName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Counter Account Name">
                          {transaction.counterAccountName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Counter Account Number">
                          {transaction.counterAccountNumber}
                        </Descriptions.Item>
                        <Descriptions.Item label="Description">
                          {transaction.description}
                        </Descriptions.Item>
                        <Descriptions.Item label="Reference">
                          {transaction.reference}
                        </Descriptions.Item>
                        <Descriptions.Item label="Transaction DateTime">
                          {dayjs(transaction.transactionDateTime).format(
                            "YYYY-MM-DD HH:mm"
                          )}
                        </Descriptions.Item>
                        <Descriptions.Item label="Virtual Account Name">
                          {transaction.virtualAccountName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Virtual Account Number">
                          {transaction.virtualAccountNumber}
                        </Descriptions.Item>
                      </Descriptions>
                    </div>
                  ))}
                </div>
              )}
          </div>
        )}
      </Modal>
    </div>
  );
};

export default UserPaypal;
