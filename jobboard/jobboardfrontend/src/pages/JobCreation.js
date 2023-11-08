import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';
import React from 'react'

const JobCreation = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
    // Send a POST request to your server with the form data using Axios
    axios.post('/api/jobs', values)
      .then((response) => {
        // Handle the response as needed
        console.log(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };
  return (
    <>
      <Form form={form} name="job_form" onFinish={onFinish}>
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: 'Please enter the job title',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="description"
        label="Description"
        rules={[
          {
            required: true,
            message: 'Please enter the job description',
          },
        ]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item
        name="company"
        label="Company"
        rules={[
          {
            required: true,
            message: 'Please select the company',
          },
        ]}
      >
        <Select>
          <Option value="companyId1">Company 1</Option>
          <Option value="companyId2">Company 2</Option>
          {/* Add more company options here based on your data */}
        </Select>
      </Form.Item>

      <Form.Item name="location" label="Location">
        <Input />
      </Form.Item>

      <Form.Item name="employmentType" label="Employment Type">
        <Input />
      </Form.Item>

      <Form.Item name="salary" label="Salary">
        <InputNumber />
      </Form.Item>

      <Form.Item name="experienceLevel" label="Experience Level">
        <Input />
      </Form.Item>

      <Form.Item name="skillsRequired" label="Skills Required">
        <Select 
        mode="tags"
        style={{ width: '100%' }}
        tokenSeparators={[',']}
        placeholder="Add skills (e.g., Java, JavaScript, Python)"
        />
      </Form.Item>

      <Form.Item name="educationRequired" label="Education Required">
        <Input />
      </Form.Item>

      <Form.Item name="applicationDeadline" label="Application Deadline">
        <DatePicker />
      </Form.Item>

      <Form.Item name="isRemote" valuePropName="checked">
        <Checkbox>Is Remote</Checkbox>
      </Form.Item>

      <Form.Item name="benefits" label="Benefits">
        <Select mode="tags">
          {/* Add benefits options here based on your data */}
        </Select>
      </Form.Item>

      <Form.Item name="responsibilities" label="Responsibilities">
        <Select mode="tags">
          {/* Add responsibilities options here based on your data */}
        </Select>
      </Form.Item>

      <Form.Item name="qualifications" label="Qualifications">
        <Select mode="tags">
          {/* Add qualifications options here based on your data */}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </>
  )
}

export default JobCreation
