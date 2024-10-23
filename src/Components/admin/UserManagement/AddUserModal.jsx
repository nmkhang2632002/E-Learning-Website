import { Form, Input } from 'antd';

const AddUserForm = () => {

    const [form] = Form.useForm();

    return (
        <>
            <Form
                form={form}
                layout="vertical"
                name="create_user_form"
                initialValues={{ remember: true }}
            >
                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input placeholder="Enter full name" />
                </Form.Item>
                <Form.Item
                    name="phoneNumber"
                    label="Phone Number"
                    rules={[{ required: true, message: 'Please input your phone number!' }]}
                >
                    <Input placeholder="Enter phone number" />
                </Form.Item>
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, message: 'Please input a valid email!', type: 'email' }]}
                >
                    <Input placeholder="Enter email" />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password placeholder="Enter password" />
                </Form.Item>
            </Form>
        </>
    )
}

export default AddUserForm