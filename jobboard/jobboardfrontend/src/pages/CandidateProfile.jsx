import React from 'react';
import { Form, Input, Button } from 'antd';

const CandidateProfileForm = ({ onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    onSubmit(values);
  };

  return (
    <div className='flex flex-wrap justify-center items-center'>
    <Form
     className=' w-full p-4'
      form={form}
      onFinish={onFinish}
      initialValues={initialValues}
      layout="vertical"
    >
  <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
           <div className="w-full lg:w-1/2">
      <Form.Item className='pr-8' label="Name" name="name" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
</div>
<div className="w-full lg:w-1/2">
      <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
        <Input disabled />
      </Form.Item>
      </div>
      </div>


  <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
<div className="w-full lg:w-1/2">
      <Form.Item className='pr-8' label="Address" name="address">
        <Input />
      </Form.Item>
</div>
<div className="w-full lg:w-1/2">

      <Form.Item label="Phone" name="phone">
        <Input />
      </Form.Item>
          </div>
      </div>
  


      <Form.Item label="Skills" name="skills">
        <Input />
      </Form.Item>

      <Form.Item label="Experience" name="experience">
        <Input />
      </Form.Item>

      <Form.Item label="Education" name="education">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button className='bg-[#00A49E] text-white' htmlType="submit">
          Update
        </Button>
      </Form.Item>
    </Form>
    </div>
  );
};

export default CandidateProfileForm;
