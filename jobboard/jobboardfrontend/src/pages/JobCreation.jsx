import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, message } from 'antd';
import axios from 'axios';
import Button from '../components/common/Button';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';
const { Option } = Select;
const JobCreation = () => {
    const [form] = Form.useForm();
    const companyID=localStorage.getItem('userID')
    const navigate=useNavigate()
    const availableBenefits = [
      'Health Insurance',
      'Flexible Schedule', 
      'Retirement Plan'
    ];
    const availableResponsibilities = [
      'Project management',
      'Team collaboration',
      'Client communication',
    ];
    const availableQualifications = [
      'Bachelor’s degree',
      'Master’s degree',
      'Ph.D.',
      'Certification in relevant field',
    ];
    const onFinish = (values) => {
    // Send a POST request to your server with the form data using Axios
    console.log(values)
    const formData=new FormData()
    // Append each field to the formData
  formData.append('title', values.title);
  formData.append('description', values.description);
  formData.append('location', values.location);
  formData.append('employmentType', values.employmentType);
  formData.append('salary', values.salary);
  formData.append('experienceLevel', values.experienceLevel);
  formData.append('skillsRequired', values.skillsRequired.join(',')); // Convert array to comma-separated string
  formData.append('applicationDeadline', values.applicationDeadline.format('YYYY-MM-DD'));
  formData.append('jobType', values.jobType);
  formData.append('benefits', values.benefits.join(',')); // Convert array to comma-separated string
  formData.append('responsibilities', values.responsibilities.join(',')); // Convert array to comma-separated string
  formData.append('qualifications', values.qualifications.join(',')); // Convert array to comma-separated string
    api.post(`job/${companyID}`, values)
      .then((response) => {
        console.log('Server Response:', response);

    // Check if there's a response status
    if (response.status) {
      if (response.data.status === 200 || response.data.status === 201) {
        message.success('Job submitted successfully!');
        navigate('/jobs')

      } else {
        // Handle other status codes or errors
        message.error('Failed to submit job. Please try again.');
      }
    } else {
      // If there's no status, log a warning
      console.warn('No status found in the response.');
    }

      })
      .catch((error) => {
        // Handle any errors that occurred during the request
    console.error('Error submitting application:', error);
    message.error('Failed to submit application. Please try again.');
      });
  };
  return (
    <div className='flex flex-wrap justify-center items-center '>
      <Form form={form} name="job_form" 
        onFinish={onFinish}
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
        className='w-full'
      >
        <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
        <div className="w-full lg:w-1/2">
      <Form.Item
        name="title"
        label="Title"
        rules={[
          {
            required: true,
            message: 'Please enter the job title',
          },
        ]}
        className='pr-8'
      >
        <Input />
      </Form.Item>
      </div>
      <div className="w-full lg:w-1/2">

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
      </div>
      </div>
      <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">

      <div className="w-full lg:w-1/2">
     
      <Form.Item name="location" label="Location" className='pr-8'>
        <Input />
      </Form.Item>
</div>
 <div className="w-full lg:w-1/2">
      <Form.Item name="employmentType" label="Employment Type">
        <Select placeholder="Select job type">
          <Option value="Full-time">Full-time</Option>
          <Option value="Part-time">Part-time</Option>
          <Option value="Contract">Contract</Option>
          <Option value="Temporary">Temporary</Option>
          <Option value="Temporary">Internship</Option>

        </Select>
      </Form.Item>
      </div>
      </div>

      <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
      <div className="w-full lg:w-1/2">

      <Form.Item name="salary" label="Salary"
      rules={[
      { required: true, message: 'Please enter salary'},
    ]}
className='pr-8'
      >
        <Input placeholder='Enter salary' type='number'/>
      </Form.Item>
      </div>
      <div className="w-full lg:w-1/2">
      <Form.Item label="Experience Level" name="experienceLevel">
        <Select placeholder="Select experience level">
          <Option value="Entry Level">Entry Level</Option>
          <Option value="Mid Level">Mid Level</Option>
          <Option value="Senior Level">Senior Level</Option>
        </Select>
      </Form.Item>
      </div>
      </div>
      <Form.Item name="skillsRequired" label="Skills Required">
        <Select 
        mode="tags"
        style={{ width: '100%' }}
        tokenSeparators={[',']}
        placeholder="Add skills (e.g., Java, JavaScript, Python)"
        />
      </Form.Item>
      <div className="flex flex-wrap w-full boder-2 boder-red-700 justify-center">
      <div className="w-full lg:w-1/2">
      <Form.Item name="applicationDeadline" label="Application Deadline" className='pr-8'>
        <DatePicker className='w-full' />
      </Form.Item>
</div>
<div className="w-full lg:w-1/2">
      <Form.Item label="Job Type" name="jobType">
      <Select placeholder="Add job type (eg.onsite, remote.)">
          <Option value="Full-time">Remote</Option>
          <Option value="Part-time">On-site</Option>
          <Option value="Contract">Hybrid</Option>
        </Select>
      </Form.Item>
      </div>
      </div>
      <Form.Item name="benefits" label="Benefits">
      <Select mode="tags" placeholder="Add benefits" tokenSeparators={[',']}>
          {availableBenefits.map((benefit) => (
            <Option key={benefit} value={benefit}>
              {benefit}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="responsibilities" label="Responsibilities">
      <Select mode="tags" placeholder="Add responsibilities" tokenSeparators={[',']}>
          {availableResponsibilities.map((responsibility) => (
            <Option key={responsibility} value={responsibility}>
              {responsibility}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="qualifications" label="Qualifications">
      <Select mode="tags" placeholder="Add qualifications" tokenSeparators={[',']}>
          {availableQualifications.map((qualification) => (
            <Option key={qualification} value={qualification}>
              {qualification}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
      <Button text="Submit" style='bg-[#00A49E] text-white px-4 py-2 rounded w-20 self-center  ' type="submit"/>

      </Form.Item>
    </Form>
    </div>
  )
}

export default JobCreation
