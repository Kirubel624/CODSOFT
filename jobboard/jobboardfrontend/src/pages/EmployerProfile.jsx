import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import api from '../utils/api';
import axios from 'axios';

const EmployerProfileForm = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();
  const id=localStorage.getItem('userID');
  const [loading,setLoading]=useState(false)
console.log(initialValues,"*(******")
  const onFinish = (values) => {
    setLoading(true)
    const cancelToken=axios.CancelToken.source()
    api.patch(`user/employer/${id}`,values,{cancelToken:cancelToken.token}).then((response) =>{
      if(response.status === 200 || response.status ===201){
        setLoading(false)
        message.success("Profile updated successfully")
      }else{
        setLoading(false)
        message.error("An error occurred while updating")
      }
    }).catch((error) => {
      if(axios.isCancel(err)){
        console.log("Request canceled")
      }else {
        consosle.log("Request error")
      }
    })
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
        <Input/>
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input/>
      </Form.Item>

      <Form.Item label="Industry" name="industry">
        <Input/>
      </Form.Item>

      <Form.Item label="Location" name="location">
        <Input/>
      </Form.Item>

      <Form.Item label="Contact Number" name="contactNumber">
        <Input />
      </Form.Item>

      <Form.Item label="Company Size" name="companySize">
        <Input />
      </Form.Item>

      <Form.Item label="Description" name="description">
        <Input.TextArea />
      </Form.Item>

      <Form.Item>
        <Button className="bg-[#00A49E] text-white" htmlType="submit">
          {loading? <svg
       className="animate-spin -ml-1 mr-3 h-5 w-full text-white text-center"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
     >
       <circle
         className="opacity-25"
         cx="12"
         cy="12"
         r="10"
         stroke="currentColor"
         strokeWidth="4"
       ></circle>
       <path
         className="opacity-75"
         fill="currentColor"
         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6-2.687-6-6z"
       ></path>
     </svg>:"Update"}
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EmployerProfileForm;
