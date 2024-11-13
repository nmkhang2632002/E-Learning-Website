import Navbar from "./Navbar";
import Footer from "./Footer";
import { Card, Col, Row } from "antd";
import {
  ScheduleOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Link, Outlet } from "react-router-dom";

export default function Profile() {
  return (
    <>
      <Navbar />
      <div style={{ minHeight: "50vh", margin: "5rem 7rem" }}>
        <div className="m-auto">
          <Card
            style={{
              boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
          >
            <Row>
              <Col span={7}>
                <div style={{ width: "80%" }}>
                  <Menu mode="inline" defaultOpenKeys={["sub1", "sub2"]}>
                    <Menu.SubMenu
                      key="sub1"
                      title="Account"
                      icon={<UserOutlined />}
                    >
                      <Menu.Item key="1">
                        <Link
                          className="text-decoration-none"
                          to="/profile/info"
                        >
                          Personal Info Detail
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="2">
                        <Link
                          className="text-decoration-none"
                          to="/profile/course"
                        >
                          Course
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="3">
                        <Link
                          className="text-decoration-none"
                          to="/profile/paypal"
                        >
                          Paypal
                        </Link>
                      </Menu.Item>
                    </Menu.SubMenu>
                    {/* 
                    <Menu.Item key="4" icon={<SettingOutlined />}>
                      <Link className="text-decoration-none" to="#">
                        Change Password
                      </Link>
                    </Menu.Item>

                    <Menu.Item key="5" icon={<SettingOutlined />}>
                      <Link className="text-decoration-none" to="#">
                        Setting
                      </Link>
                    </Menu.Item> */}
                  </Menu>
                </div>
              </Col>
              <Col
                span={17}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <div style={{ width: "100%" }}>
                  <Outlet></Outlet>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
