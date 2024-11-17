import { Descriptions, Col, Row, Card } from "antd";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { GetUserById } from "../../apis/Users/user";

const UserProfile = () => {
  const { Meta } = Card;
  const [userInfo, setUserInfo] = useState({});

  // Get Token and decode it
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");

      if (token) {
        const userInfoToken = jwtDecode(token); // Decode the JWT
        const userInfoById = await GetUserById(userInfoToken.UserId); // Fetch user info by ID
        setUserInfo(userInfoById?.data);
      }
    };

    fetchUserData();
  }, []); // Empty dependency array to run only on component mount

  const items = [
    {
      key: "1",
      label: "UserName",
      children: userInfo.fullName, // Dynamic or fallback value
    },
    {
      key: "2",
      label: "Telephone",
      children: userInfo.phoneNumber, // Dynamic or fallback value
    },
    {
      key: "3",
      label: "Email",
      children: userInfo.email, // Dynamic or fallback value
    },
    {
      key: "4",
      label: "Role",
      span: 2,
      children: userInfo.role, // Dynamic or fallback value
    },
    {
      key: "5",
      label: "Wallet",
      children: userInfo.monney ? `${userInfo.monney} VND` : "empty", // Dynamic or fallback value
    },
  ];

  return (
    <>
      <Row>
        <Col span={17}>
          <Descriptions title="User Info" layout="vertical" items={items} />
        </Col>
      </Row>
    </>
  );
};

export default UserProfile;
