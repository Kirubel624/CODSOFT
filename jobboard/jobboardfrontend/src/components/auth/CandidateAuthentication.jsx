import React, { useState } from 'react';
import { Form, Input, DatePicker, Upload, message, Space, Select,Button,Spin } from 'antd';
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import api from '../../utils/api'
import ButtonC from '../common/Button';
import { useRegistrationData } from '../../context/RegistrationDataContext';
import { useNavigate } from 'react-router-dom';

const CandidateAuthentication = () => {
  const [form] = Form.useForm();
  const [selectedFile, setSelectedFile] = useState(null);
  const { storeRegistrationData } = useRegistrationData();
  const [spinning, setSpinning] = React.useState(false);

  const navigate=useNavigate()
  const onFinish = (values) => {
    setSpinning(true)
    const formData= new FormData()
    formData.append('name', values.name);
formData.append('username', values.username);
formData.append('email', values.email);
formData.append('password', values.password);
formData.append('address', values.address);
formData.append('phone', values.phone);
formData.append('skills', values.skills.join(',')); 
formData.append('experience', JSON.stringify(values.experience)); 
formData.append('education', JSON.stringify(values.education)); 

formData.append('resume', selectedFile);
    console.log('Submitted values:', formData );
    api.post("user/candidate/register",formData).then((response) => {
      console.log(response)
      if (response.status === 200 || response.status === 201) {
        console.log("Response:", response);
        message.success("Successfully registered");
        let email=values.email;
        let password=values.password;
        const registrationData = { email,password };
    storeRegistrationData(registrationData);
    setSpinning(false);
        navigate('/login')

      } else {
    setSpinning(false);
       
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    setSpinning(false);

    });
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file,"^^^^^the file^^^^^^^^")
    setSelectedFile(file);
    console.log(selectedFile)
  };

  return (
    <div className='flex flex-wrap justify-center items-center pt-24'>
       <Spin spinning={spinning} fullscreen />
    <Form
    className=' w-1/2 p-4'
      form={form}
      name="candidate-profile-form"
      onFinish={onFinish}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
           <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">

           <div className="w-full lg:w-1/2">
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please enter your name' }]}
        className='pr-8'
      >
        <Input className='w-full' />
      </Form.Item> 
      </div>
      <div className="w-full lg:w-1/2">
      <Form.Item
        label="Username"
        name="username"
        rules={[
          { required: true, message: 'Please enter your username' },
          { type: 'text', message: 'Please enter a valid username' },
        ]}
      >
        <Input className='w-full' />
      </Form.Item></div>
      </div>
      <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
      <div className="w-full lg:w-1/2">
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Please enter a valid email address' },
        ]}
        className='pr-8'
      >
        <Input className='w-full' />
      </Form.Item>
     </div>
     <div className="w-full lg:w-1/2">
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: 'Please enter your password' },
          { type: "password", message: 'Please enter your password' },

          { min: 8, message: 'Please enter a valid password of length 8' },
          
        ]}
      >
        <Input.Password className='w-full' />
      </Form.Item></div>
      </div>



      <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
      <div className="w-full lg:w-1/2">
<Form.Item label="Address" name="address" rules={[
          { required: true, message: 'Please enter your Address' },
          { type: 'text', message: 'Please enter a valid Address' },
        ]}
        className='pr-8'
        >
        <Input className='w-full' />
      </Form.Item>

</div>
<div className="w-full lg:w-1/2">
      <Form.Item label="Phone" name="phone" rules={[
          { required: true, message: 'Please enter your number' },
          { type: 'text', message: 'Please enter a valid Phone number' },
          { min: 10, message: 'Please enter a valid Phone number' },

        ]}>
        <Input className='w-full' />
      </Form.Item>
</div>
      </div>
  <Form.Item className='w-full' label="Skills" name="skills" rules={[
          { required: true, message: 'Please enter your skills' },
          { type: 'text', message: 'Please enter skills' },
        ]}>
        <Select
    mode="tags"
    style={{ width: '100%' }}
    tokenSeparators={[',']}
    placeholder="Add skills (e.g., Java, JavaScript, Python)"
  />
      </Form.Item>


    
      <Form.Item label="Experience" name="experience">
  <Form.List name="experience">
    {(fields, { add, remove }) => (
      <>
        {fields.map(({ key, name, ...restField }) => (
          <div key={key} className="flex flex-col justify-center items-center boder-2 boder-red-900">
             <MinusCircleOutlined className='self-start pb-4' onClick={() => remove(name)} />
             <div className="boder boder-red-900 flex flex-wrap w-full boder-2 boder-red-700 justify-center">
             
             <div className="w-full lg:w-1/2">
            <Form.Item
              {...restField}
              name={[name, 'jobTitle']}
              className='pr-4'
            >
              <Input className='w-full' placeholder="Job Title" />
            </Form.Item></div>
            <div className="w-full lg:w-1/2">

            <Form.Item
              {...restField}
              name={[name, 'company']}
            >
              <Input className='w-full' placeholder="Company" />
            </Form.Item>
            </div>
            </div>


      <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
      <div className="w-full lg:w-1/2">
            <Form.Item
              {...restField}
              name={[name, 'startDate']}
              className='pr-4'

            >
              <DatePicker className='w-full' placeholder="Start Date" />
            </Form.Item></div>
            <div className="w-full lg:w-1/2">
            <Form.Item
              {...restField}
              name={[name, 'endDate']}
            >
              <DatePicker className='w-full' placeholder="End Date" />
            </Form.Item>
            </div>
            </div>
      <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
      <div className="w-full">
            <Form.Item
              {...restField}
              name={[name, 'description']}
            >
              <Input.TextArea className='w-full' placeholder="Description" />
            </Form.Item>
            </div>
            </div>
          </div>
        ))}
        <Form.Item>
          <Button
            type="dashed"
            onClick={() => add()}
            icon={<PlusOutlined />}
            className=""
          >
            Add Experience
          </Button>
        </Form.Item>
      </>
    )}
  </Form.List>
</Form.Item>

      <Form.Item label="Education" name="education">
  <Form.List name="education">
    {(fields, { add, remove }) => (
      <>
        {fields.map(({ key, name, ...restField }) => (
          <Space key={key} className='flex flex-row' align="baseline">
  
              <Form.Item
              {...restField}
              name={[name, 'degree']}
            >
              <Input placeholder="Degree" />
            </Form.Item>
            <Form.Item
              {...restField}
              name={[name, 'school']}
            >
              <Input placeholder="School" />
            </Form.Item>
       

            
            <Form.Item
              {...restField}
              name={[name, 'graduationDate']}
            >
              <DatePicker placeholder="Graduation Date" />
            </Form.Item>
            <MinusCircleOutlined onClick={() => remove(name)} />
          </Space>
        ))}
        <Form.Item>
          <Button
            type="dashed"
            onClick={() => add()}
            icon={<PlusOutlined />}
          >
            Add Education
          </Button>
        </Form.Item>
      </>
    )}
  </Form.List>


  <Form.Item label="Resume" name="resume">
  <div className="relative">
      <label
        className="bg-[#00A49E] text-white px-4 py-2 rounded cursor-pointer"
        htmlFor="fileInput"
      >
      <UploadOutlined/>  Choose a file
      </label>
          <input
            type="file"
            id="fileInput"
            className="absolute top-0 right-0 m-0 p-0 text-2xl cursor-pointer opacity-0"
            accept=".pdf, .doc, .docx"
            onChange={onFileChange}
          />
          </div>
        </Form.Item>
        {selectedFile &&(
          <p className='pb-4'>{selectedFile.name}</p>
        )}       
      <ButtonC text="Submit" style='bg-[#00A49E] text-white px-4 py-2 rounded w-20 self-center  ' type="submit"/>   
      </Form.Item>
    </Form>
    
    </div>
  );
};

export default CandidateAuthentication;
