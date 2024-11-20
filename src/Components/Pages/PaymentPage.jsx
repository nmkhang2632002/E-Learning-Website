import {
  Input,
  notification,
  Table,
  Typography,
  Modal,
  Spin,
  Select,
} from "antd";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import api from "../../utils/axios-custom";
import { formatNumberWithDots } from "../../utils/formatPrice";
import { LoadingOutlined } from "@ant-design/icons";

const { Title } = Typography;
const { Option } = Select;

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
  const [filteredPayments, setFilteredPayments] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [bankCode, setBankCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const payment = useRef(null);
  useEffect(() => {
    const fetchPayments = async () => {
      setLoading(true);
      try {
        const response = await api.get("Payment/all-Payment");
        setFilteredPayments(response.data);
        payment.current = response.data;
      } catch (error) {
        console.error("Error fetching payments:", error);
        notification.error({
          message: "Error fetching payments",
          description: "Could not load payments. Please try again later.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPayments();
  }, []);

  const onSearch = (event) => {
    const { value } = event.target;
    if (!value) {
      setFilteredPayments(payment.current);
      return;
    }
    const filtered = payment.current.filter(
      (payment) =>
        payment.paymentId.toString().includes(value.toLowerCase()) ||
        payment.userId.toString().includes(value.toLowerCase()) ||
        payment.title.toString().includes(value.toLowerCase())
    );
    setFilteredPayments(filtered);
  };

  const onStatusFilter = (value) => {
    if (!value) {
      setFilteredPayments(payment.current);
      return;
    }
    const filtered = payment.current.filter(
      (payment) => payment.status === value
    );
    setFilteredPayments(filtered);
  };
  // Handle click on "Detail Payment" link
  const onDetailClick = async (record) => {
    try {
      const response = await api.get(
        `Payment/detail-payment?orderCode=${record}`
      );
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
      title: "Status",
      dataIndex: "status",
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

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Full viewport height to center vertically
        }}
      >
        <Spin indicator={<LoadingOutlined spin />} size="large" />
      </div>
    );
  }

  return (
    <>
      <div>
        <Title level={2}>Payment List</Title>
      </div>
      <div className="search-filter-container">
        <Input.Search
          className="search-input"
          placeholder="Search by User ID, Payment ID, or Title"
          allowClear
          enterButton="Search"
          size="large"
          onChange={onSearch}
        />
        <Select
          className="select-filter"
          placeholder="Filter by Status"
          allowClear
          onChange={onStatusFilter}
        >
          <Option value="PENDING">PENDING</Option>
          <Option value="PAID">PAID</Option>
          <Option value="CANCELLED">CANCELLED</Option>
        </Select>
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
          {bankCode.id && (
            <p>
              <strong>ID:</strong> {bankCode.id}
            </p>
          )}
          {bankCode.orderCode && (
            <p>
              <strong>Order Code:</strong> {bankCode.orderCode}
            </p>
          )}
          {bankCode.amount && (
            <p>
              <strong>Amount:</strong> {bankCode.amount}
            </p>
          )}
          {bankCode.amountPaid > 0 && (
            <p>
              <strong>Amount Paid:</strong> {bankCode.amountPaid}
            </p>
          )}
          {bankCode.amountRemaining > 0 && (
            <p>
              <strong>Amount Remaining:</strong> {bankCode.amountRemaining}
            </p>
          )}
          {bankCode.status && (
            <p>
              <strong>Status:</strong> {bankCode.status}
            </p>
          )}
          {bankCode.createdAt && (
            <p>
              <strong>Created At:</strong>
              {new Date(bankCode.createdAt).toLocaleString()}
            </p>
          )}
          {bankCode.transactions && bankCode.transactions.length > 0 && (
            <div>
              <h4>Transactions</h4>
              {bankCode.transactions.map((transaction, index) => (
                <div key={index}>
                  {transaction.accountNumber && (
                    <p>
                      <strong>Account Number:</strong>{" "}
                      {transaction.accountNumber}
                    </p>
                  )}
                  {transaction.amount && (
                    <p>
                      <strong>Amount:</strong> {transaction.amount}
                    </p>
                  )}
                  {transaction.counterAccountBankName && (
                    <p>
                      <strong>Counter Account Bank Name:</strong>{" "}
                      {transaction.counterAccountBankName}
                    </p>
                  )}
                  {transaction.counterAccountName && (
                    <p>
                      <strong>Counter Account Name:</strong>{" "}
                      {transaction.counterAccountName}
                    </p>
                  )}
                  {transaction.counterAccountNumber && (
                    <p>
                      <strong>Counter Account Number:</strong>{" "}
                      {transaction.counterAccountNumber}
                    </p>
                  )}
                  {transaction.description && (
                    <p>
                      <strong>Description:</strong> {transaction.description}
                    </p>
                  )}
                  {transaction.reference && (
                    <p>
                      <strong>Reference:</strong> {transaction.reference}
                    </p>
                  )}
                  {transaction.transactionDateTime && (
                    <p>
                      <strong>Transaction DateTime:</strong>{" "}
                      {new Date(
                        transaction.transactionDateTime
                      ).toLocaleString()}
                    </p>
                  )}
                  {transaction.virtualAccountName && (
                    <p>
                      <strong>Virtual Account Name:</strong>{" "}
                      {transaction.virtualAccountName}
                    </p>
                  )}
                  {transaction.virtualAccountNumber && (
                    <p>
                      <strong>Virtual Account Number:</strong>{" "}
                      {transaction.virtualAccountNumber}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </Modal>
      )}
    </>
  );
};

export default PaymentPage;
