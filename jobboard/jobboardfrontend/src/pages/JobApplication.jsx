import React, { useEffect, useState } from 'react';
import { Card, Tag, Space, Typography, Button, Modal, Form, Input, message } from 'antd';
import { UploadOutlined, DollarCircleOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { BounceLoader } from "react-spinners";
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import ResumeViewer from '../components/job/resumeViewer';
import {InfoCircleOutlined} from '@ant-design/icons'
import BackIcon from '../assets/back.svg'

const { Text } = Typography;

const JobApplication = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const[loading,setLoading]=useState(true)
    const[userData,setUserData]=useState()
  const [selectedFile, setSelectedFile] = useState();
const navigate=useNavigate()
    const[job,setJob]=useState()
    const location=useLocation()
    const id=location.pathname.split("/")[2]
    const userID=localStorage.getItem("userID")
const [color, setColor] = useState("#00A49E");

useEffect(()=>{
    const cancelToken=axios.CancelToken.source()
api.get(`job/${id}`,{cancelToken:cancelToken.token}).then((job)=>{
    setJob(job.data)
    setLoading(false)
}).catch((err)=>{
    if(axios.isCancel(err)){
        console.log("Request cancelled")
    }else{
        console.log("Request error")
    }
})
return()=>{
    cancelToken.cancel()
}
},[])
useEffect(()=>{
    const cancelToken=axios.CancelToken.source()
api.get(`user/candidate/${userID}`,{cancelToken:cancelToken.token}).then((user)=>{
    setUserData(user.data)
    setSelectedFile(userData?.resume)
}).catch((err)=>{
    if(axios.isCancel(err)){
        console.log("Request cancelled")
    }else{
        console.log("Request error")
    }
})
return()=>{
    cancelToken.cancel()
}
},[])
    console.log(job,"job^^^^^^^^^^^^^^^^^^^^^^^^^")
    const previousResumeUrl = "https://example.com/previous-resume.pdf";
  
    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };
  
    const onFinish = (values) => {
      console.log(values);
      const formData=new FormData()
       formData.append('coverLetter', values.coverLetter);
       formData.append('jobId', id);
       formData.append('candidateId', userID);
       formData.append('status', "applied");
       formData.append('applicationDate', new Date().toISOString());
       formData.append('resume', selectedFile);
   api.post('job/',formData).then((response)=>{
    console.log('Server Response:', response);
    if (response.status) {
      if (response.status === 200 || response.status === 201) {
        message.success('Application submitted successfully!');
        navigate('/')
      } else {
        message.error('Failed to submit application. You may have already applied for the job.');
      }
    } else {
      console.warn('No status found in the response.');
    }

  })
  .catch(error => {
    console.error('Error submitting application:', error);
    message.error('Failed to submit application. Please try again.');
  });
     
    };
  
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };

  const colors = ['blue-500', 'green-500', 'yellow-500', 'orange-500'];
const role=localStorage.getItem('role')

 const getRandomColor = (colors) => {
   const randomIndex = Math.floor(Math.random() * colors.length);
   return colors[randomIndex];
 };
 const randomColor = getRandomColor(colors);
 const onFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file,"^^^^^the file^^^^^^^^")
    setSelectedFile(file);
    console.log(selectedFile)
  };
  const goBack = () => {
    navigate(-1);
  };
    return (
        <div className='pt-24 px-24'>
      {loading?<div className="flex flex-col items-center">
            <h1 className="pb-4">Loading...</h1>
            <BounceLoader
              color={color}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>:<div className="mb-4">
          <div className='flex flex-col'>
          <button onClick={goBack}>
      <img width={24} src={BackIcon}/>
    </button>  
      </div>  
        <h2 className="text-xl font-semibold pt-4">{job.title}</h2>
        <div className='flex mt-4 flex-row items-center'> 
           <img
            src={`https://ui-avatars.com/api/?name=${job?.company?.companyName}`}
            alt={`Avatar of ${job?.company?.companyName}`}
            className="w-16 h-16 rounded-full mr-2"
          /> 
          <div className='flex flex-col justify-center'>


          <div className='flex flex-row'>
            <p>{job.company.companyName}</p>
            <div className='pl-2 flex flex-row'>
            <EnvironmentOutlined className="mr-1" />
                <Text>{job.location}</Text>
              </div>
            </div>


            <div className='flex flex-row pt-2'>
<Tag> <Text>{job.employmentType}</Text></Tag>
<Tag>    <Text>{job.jobType}</Text></Tag>
<Tag>     <Text>{job.experienceLevel}</Text></Tag>
            </div></div>
              </div>
  
  
       
          <Form
            name="applicationForm"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Space direction="vertical" className="w-full">
              <div>
                <Text strong>Job Title: </Text>
                <Text>{job.title}</Text>
              </div>
                 <div>
                <Text strong>Job Description: </Text>
                <Text className='text-gray-00'>{job.description}</Text>
              </div>
              <div>
                <Text strong>Location: </Text>
                <Text>{job.location}</Text>
              </div>
              <div>
                <Text strong>Employment type: </Text>
                <Text>{job.employmentType}</Text>
              </div>
              <div>
                <Text strong>Job type: </Text>
                <Text>{job.jobType}</Text>
              </div>
              <div>
                <Text strong>Salary: </Text>
                <Text>${job.salary} per year</Text>
              </div>
              <div>
                <Text strong>Experience level: </Text>
                <Text>{job.experienceLevel}</Text>
              </div>
              <div>
                <Text strong>Skills: </Text>
                {
job.skillsRequired.map((skill)=>(
    <Tag key={skill} className={`bg-${randomColor} text-${randomColor} border border-${randomColor}`}>
    {skill}
  </Tag>)
)
                }
                
              </div>
              <div>
                <Text strong>Application deadline: </Text>
                <Text>{job.applicationDeadline.slice(0,10)}</Text>
              </div>
              <div>
                <Text strong>Benefits: </Text>
                {
                    job.benefits.map((benefit)=>(
<Tag className={`bg-${randomColor} text-${randomColor} border border-${randomColor}`} key={benefit}>{benefit}</Tag>
                    ))
                }
              </div>
              <div>
                <Text strong>Responsibilities: </Text>
                <ul className="list-disc">
                {
                    job.responsibilities.map((benefit)=>(


  <li>{benefit}</li>

                    ))
                }
                </ul>
              </div>
              <div>
                <Text strong>Qualifications: </Text>
                {
                    job.qualifications.map((benefit)=>(
<Tag className={`bg-${randomColor} text-${randomColor} border border-${randomColor}`} key={benefit}>{benefit}</Tag>
                    ))
                }
              </div>
              <div>
                <Text strong>Published date: </Text>
                <Text>{job.publishedDate.slice(0,10)}</Text>
              </div>
              <div>
                <Text strong>Resume:
   
                
                </Text>
                <p className='text-sm italic'><InfoCircleOutlined className='text-[#00A49E]'/> (The Resume you previously uploaded when you registered will be used for your job application if you dont pick a new one.)</p>
                <a className='text-[#00A49E] underline ' href={`https://docs.google.com/gview?url=${userData?.resume}&embedded=true`} target='_blank'>Resume</a>
               
                <Form.Item label="" name="resume" className='pt-4'>
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
            accept=".pdf, .doc, .docx" // Specify the accepted file types
            onChange={onFileChange}
          />
          </div>
        </Form.Item>
        {selectedFile &&(
          <p>{selectedFile.name}</p>
        )}
              <div>


  {/* <ResumeViewer pdfUrl={userData?.resume} /> */}
</div>
              </div>
              <div>
                <Text strong>Cover Letter:</Text>
                <Form.Item
                  name="coverLetter"
                  rules={[
                    {
                      required: true,
                      message: 'Please enter your cover letter!',
                    },
                  ]}
                >
                  <Input.TextArea rows={4} placeholder="Enter your cover letter" />
                </Form.Item>
              </div>
            </Space>
  
            <Form.Item>
              <Button className='bg-[#00A49E] text-white' htmlType="submit">
                Submit Application
              </Button>
            </Form.Item>
          </Form>

      </div>}</div>
    );
  };
  
  export default JobApplication;