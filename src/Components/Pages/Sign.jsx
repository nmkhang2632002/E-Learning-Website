import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, notification } from "antd";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { doLoginAction } from "../../redux/slice/accountSlice";
import api from "../../utils/axios-custom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { toast } from "react-toastify";

export default function Sign() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Login API Function
  const onFinish = async (values) => {
    const { email, password } = values;

    try {
      const response = await api.post(
        `api/Authorize/Login?email=${email}&password=${password}`
      );
      const data = await response.data.data;
      if (data) {
        localStorage.setItem("accessToken", data.accessTokenToken);
        const user = jwtDecode(data.accessTokenToken);
        dispatch(doLoginAction(user));
        if (user.role === "admin" || user.role === "instructor") {
          navigate("/admin");
          toast.success("Login Success");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error fetching checkout data:", error);
      toast.error("Login Failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="m-4">
        <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
          <h6 className="section-title bg-white text-center text-primary px-3">
            Sign In Page
          </h6>
          <h1 className="mb-5">Sign In</h1>
        </div>
        <div
          className="signin container"
          style={{
            height: "50vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {/* Form Login */}
          <Form
            name="login"
            initialValues={{ remember: true }}
            style={{ width: "100%", maxWidth: "500px" }}
            onFinish={onFinish}
            className="animated slideInRight"
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
                <a href="">Forgot password</a>
              </div>
            </Form.Item>
            <Form.Item>
              <Button block type="primary" htmlType="submit">
                Log in
              </Button>
              or <a href="/register">Register now!</a>
            </Form.Item>
          </Form>
        </div>
      </div>
      <Footer />
    </>
  );
}
