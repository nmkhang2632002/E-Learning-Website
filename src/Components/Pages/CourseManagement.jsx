import {
  Button,
  Space,
  Table,
  Image,
  Typography,
  Input,
  notification,
  Modal,
  Form,
  InputNumber,
  DatePicker,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import api from "../../utils/axios-custom";
import { useAccount } from "../../redux/slice/accountSlice";
// Main
const CourseManagement = () => {
  const { Search } = Input;
  const { Title } = Typography;

  // useState
  const [getAllCourses, setGetAllCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [getAllCategories, setGetAllCategories] = useState([]);
  const [modal, setModal] = useState("");

  const isUpdateModalVisible = modal === "update-course";
  const isCreateModalVisible = modal === "create-course";
  const isDeleteModalVisible = modal === "delete-course";

  const getAllCategoriesRequest = async () => {
    try {
      const response = await api.get("/api/Category/all-category");
      if (response.data) {
        setGetAllCategories(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenModal = (modal) => {
    setModal(modal);
  };
  const handleCloseModal = () => {
    setModal("");
  };

  const getAllCoursesData = async () => {
    try {
      const response = await api.get("/api/Course/all-course");
      if (response.data) {
        setGetAllCourses(response.data);
        setFilteredCourses(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllCoursesData();
    getAllCategoriesRequest();
  }, []);

  // Search function
  const onSearch = (value) => {
    const filtered = getAllCourses.filter((course) =>
      course.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredCourses(filtered);
  };

  // Delete a course
  const deleteCourse = (title) => {};

  const columns = [
    {
      title: "ID",
      dataIndex: "courseId",
      key: "courseId",
    },
    {
      title: "Picture",
      dataIndex: "picture",
      key: "picture",
      render: (img) => <Image width={100} src={img} />,
    },
    {
      title: "Title",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Time Learning",
      dataIndex: "timeLearning",
      key: "timeLearning",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Create Date",
      dataIndex: "createDate",
      key: "createDate",
      render: (text) => <p>{new Date(text).toLocaleDateString()}</p>,
    },
    {
      title: "Actions",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleOpenModal("update-course")}
          />
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => deleteCourse(record.title)}
          />
        </Space>
      ),
    },
  ];

  return (
    <>
      {/* Header */}
      <div>
        <Title level={2}>LIST OF COURSE</Title>
      </div>

      {/* Top-Bar Btn*/}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Search
          placeholder="Search Course by Name"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearch}
          style={{ margin: "20px 20px 20px 0px", width: "33%" }}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => handleOpenModal("create-course")}
        >
          Create Course
        </Button>
      </div>
      <br />

      <Table columns={columns} dataSource={filteredCourses} rowKey="title" />

      <AddCourseModal
        isModalVisible={isUpdateModalVisible}
        onClose={handleCloseModal}
        getAllCategories={getAllCategories}
      />
    </>
  );
};

export default CourseManagement;

const AddCourseModal = ({ isModalVisible, onClose, getAllCategories }) => {
  const { user } = useAccount();
  const [form] = Form.useForm();

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const newCourse = {
        ...values,
        createDate: values.createDate.toISOString(),
        createBy: user.UserName,
      };
      const response = await api.post("/api/Course/add-course", newCourse);
      if (response.data) {
        setGetAllCourses([...getAllCourses, response.data]);
        setFilteredCourses([...getAllCourses, response.data]);
        notification.success({
          type: "success",
          message: "Course added successfully",
          duration: 2,
        });
        handleCancel();
        form.resetFields();
      }
    } catch (error) {
      console.log(error);
      notification.error({
        type: "error",
        message: "Failed to add course",
        duration: 2,
      });
    }
  };

  const handleCancel = () => {
    onClose();
    form.resetFields();
  };

  return (
    <Modal
      title="Add New Course"
      open={isModalVisible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Course Name"
          rules={[{ required: true, message: "Please input the course name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="createDate"
          label="Create Date"
          rules={[
            { required: true, message: "Please select the create date!" },
          ]}
        >
          <DatePicker />
        </Form.Item>

        <Form.Item
          name="timeLearning"
          label="Time Learning"
          rules={[
            { required: true, message: "Please input the time learning!" },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          name="cateId"
          label="Category"
          rules={[{ required: true, message: "Please select the category!" }]}
        >
          <Select>
            {getAllCategories.map((category) => (
              <Select.Option
                key={category.idcategory}
                value={category.idcategory}
              >
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="picture"
          label="Picture URL"
          rules={[{ required: true, message: "Please input the picture URL!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};
