import { Input, notification, Table, Typography, Modal } from "antd";
import { useEffect, useState } from "react";
import styled from "styled-components";
import api from "../../utils/axios-custom";
import { formatNumberWithDots } from "../../utils/formatPrice";

const { Title } = Typography;

// Custom Table Row Styling for alternating row colors
const StyledTable = styled(Table)`
  .ant-table-thead > tr > th {
    background-color: black;
    color: white;
    font-weight: bold;
  }
  .ant-table-tbody > tr:nth-child(odd) {
    background-color: #f9f9f9;
  }
  .ant-table-tbody > tr:nth-child(even) {
    background-color: white;
  }
`;

const PaymentPage = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [bankCode, setBankCode] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get("Payment/all-Payment");
        setPayments(response.data.sort((a, b) => b.paymentId - a.paymentId));
        setFilteredPayments(response.data);
      } catch (error) {
        console.error("Error fetching payments:", error);
        notification.error({
          message: "Error fetching payments",
          description: "Could not load payments. Please try again later.",
        });
      }
    };
    fetchPayments();
  }, []);

  // Handle search input change
  const onSearch = (value) => {
    setSearchQuery(value);
    if (value === "") {
      setFilteredPayments(payments); // Reset if search is cleared
    } else {
      const filtered = payments.filter(
        (payment) =>
          payment.userId.toLowerCase().includes(value.toLowerCase()) ||
          payment.paymentId.toString().includes(value) ||
          payment.title.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredPayments(filtered);
    }
  };

  // Handle click on "Detail Payment" link
  const onDetailClick = async (record) => {
    try {
      const response = await api.get(
        `Payment/detail-payment?orderCode=${record}`
      );
      console.log(response.data);
      setBankCode(response.data.data);
      setOpenModal(true);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      notification.error({
        message: "Error fetching payment details",
        description: "Could not load payment details. Please try again later.",
      });
    }
  };
  const columns = [
    {
      title: "Payment ID",
      dataIndex: "paymentId",
      key: "paymentId",
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Full Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Amount",
      dataIndex: "money",
      key: "money",
      render: (amount) => {
        return formatNumberWithDots(amount) + " VND";
      }, // Format as currency
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => new Date(date).toLocaleDateString(), // Format date
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Detail Payment",
      dataIndex: "bankCode",
      key: "bankCode",
      render: (record) => {
        return (
          <p
            color="blue"
            style={{ cursor: "pointer" }}
            onClick={() => onDetailClick(record)}
          >
            View Details
          </p>
        );
      },
    },
  ];

  return (
    <>
      <div>
        <Title level={2}>Payment List</Title>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <Input.Search
          placeholder="Search by User ID, Payment ID, or Title"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
        />
      </div>

      <StyledTable
        columns={columns}
        dataSource={filteredPayments}
        rowKey={(record) => record.paymentId}
      />
      {bankCode && (
        <Modal
          title="Payment Details"
          visible={openModal}
          onCancel={() => setOpenModal(false)}
          footer={null}
        >
          <p>
            <strong>ID:</strong> {bankCode.id}
          </p>
          <p>
            <strong>Order Code:</strong> {bankCode.orderCode}
          </p>
          <p>
            <strong>Amount:</strong> {bankCode.amount}
          </p>
          <p>
            <strong>Amount Paid:</strong> {bankCode.amountPaid}
          </p>
          <p>
            <strong>Amount Remaining:</strong> {bankCode.amountRemaining}
          </p>
          <p>
            <strong>Status:</strong> {bankCode.status}
          </p>
          <p>
            <strong>Created At:</strong>{" "}
            {new Date(bankCode.createdAt).toLocaleString()}
          </p>
        </Modal>
      )}
    </>
  );
};

export default PaymentPage;
