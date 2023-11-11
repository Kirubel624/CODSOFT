import React from 'react';
import { Form, Input, Select, Button } from 'antd';
import api from '../../utils/api';

const { Option } = Select;

const EmployerAuthentication = () => {
  const onFinish = (values) => {
    console.log('Form values:', values);
    // You can send the form data to your server for processing here.
    api.post("user/employer/register",values).then((response)=>{
      console.log(response)
      if (response.status === 200 || response.status === 201) {
        // Successful response
        console.log("Response:", response);
        message.success("Successfully registered");
        let email=values.email;
        let password=values.password;
        const registrationData = { email,password };
    storeRegistrationData(registrationData);
        navigate('/login')
        setFilePreview(null);
      } else {
       
      }
    })
    .catch((error) => {
      // Handle network errors or other issues
      console.error("Error:", error);
      message.error("Failed to register");
    });
  };

  return (
    <Form
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      onFinish={onFinish}
      className="mt-24 px-24 flex flex-col justify-center items-center boder-2 boder-red-900"
    >
      <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
       
        
        <div className="w-full lg:w-1/2">
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter the email' },
              { type: 'email', message: 'Invalid email address' },
            ]}
            className='pr-8'
          >
            <Input className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full lg:w-1/2">
          <Form.Item
            label="Password"
            name="password"
            rules={[
              { required: true, message: 'Please enter a password' },
              { type: 'password', message: 'Invalid password' },
              { min: 8, message: 'Minimum password length is 8 characters' },

            ]}
            className='pr-8'
          >
            <Input.Password className="w-full" type='password'/>
          </Form.Item>
        </div>
      </div>
      <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
      <div className="w-full lg:w-1/2">
          <Form.Item
            label="Company Name"
            name="companyName"
            rules={[{ required: true, message: 'Please enter the company name' }]}
            className='pr-8'
          >
            <Input className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full lg:w-1/2">
          <Form.Item
            label="Industry"
            name="industry"
            rules={[{ required: true, message: 'Please enter the industry' }]}
            className='pr-8'
          >
            <Input className="w-full" />
          </Form.Item>
        </div>
       
      </div>
      <div className="flex flex-wrap w-full justify-center">
      <div className="w-full lg:w-1/2">
          <Form.Item
            label="Location"
            name="location"
            rules={[{ required: true, message: 'Please enter the location' }]}
            className='pr-8'
          >
            <Input className="w-full" />
          </Form.Item>
        </div>
        <div className="w-full lg:w-1/2">
          <Form.Item
            label="Company Size"
            name="companySize"
            rules={[
              { required: true, message: 'Please select the company size' },
            ]}
            className='pr-8'
          >
            <Select className="w-full">
              <Option value="Small">Small</Option>
              <Option value="Medium">Medium</Option>
              <Option value="Large">Large</Option>
              {/* Add more options as needed */}
            </Select>
          </Form.Item>
        </div>

        
      </div>
      <div className="flex flex-wrap w-full justify-center">
      <div className="w-full lg:w-1/2">
          <Form.Item
            label="Contact Number"
            name="contactNumber"
            rules={[
              { required: true, message: 'Please enter the contact number' },
            ]}
            className='pr-8'
          >
            <Input className="w-full" />
          </Form.Item>
        </div>
      <div className="w-full lg:w-1/2">
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: 'Please enter a description' }]}
        >
          <Input.TextArea className="w-full" />
        </Form.Item>
      </div>
      </div>
      {/* You can add more fields as needed using Form.Item components */}
      <Form.Item className='self-start'>
        <Button type="primary" htmlType="submit" className='bg-[#00A49E]'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployerAuthentication;
