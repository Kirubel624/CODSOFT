import React, { useEffect } from 'react';
import { Form, Input, Button } from 'antd';

const EmployerProfileForm = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();
console.log(initialValues,"*(******")
  const onFinish = (values) => {
    onSubmit(values);
  };
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [form, initialValues]);

  return (
    <Form
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
      layout="vertical"
    >
      <Form.Item label="Company Name" name="companyName" rules={[{ required: true }]}>
        <Input disabled/>
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input disabled />
      </Form.Item>

      <Form.Item label="Industry" name="industry">
        <Input  disabled/>
      </Form.Item>

      <Form.Item label="Location" name="location">
        <Input  disabled/>
      </Form.Item>

      <Form.Item label="Contact Number" name="contactNumber">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Company Size" name="companySize">
        <Input disabled />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea disabled />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployerProfileForm;
