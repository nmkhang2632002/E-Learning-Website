import { Input, notification, Table, Typography, Tag } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import api from "../../utils/axios-custom";

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

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await api.get("Payment/all-Payment");
        setPayments(response.data);
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
      title: "Amount",
      dataIndex: "money",
      key: "money",
      render: (amount) => `$${amount.toFixed(2)}`, // Format as currency
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
    </>
  );
};

export default PaymentPage;
