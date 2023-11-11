import React, { useEffect, useState } from 'react';
import { Card, Tag, Space, Typography, Button, Modal, Form, Input, message, Row, Col, Select } from 'antd';
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

    const[loading,setLoading]=useState(true)
  //   const[userData,setUserData]=useState()
  // const [selectedFile, setSelectedFile] = useState();

    const[job,setJob]=useState()
    const[status,setStatus]=useState()
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
// useEffect(()=>{
//     const cancelToken=axios.CancelToken.source()
// api.get(`user/candidate/${userID}`,{cancelToken:cancelToken.token}).then((user)=>{
//     setUserData(user.data)
//     setSelectedFile(userData?.resume)
// }).catch((err)=>{
//     if(axios.isCancel(err)){
//         console.log("Request cancelled")
//     }else{
//         console.log("Request error")
//     }
// })
// return()=>{
//     cancelToken.cancel()
// }
// },[])
console.log(job?.applications)

const handleUpdateStatus = async (userId, jobId, status) => {
  console.log("****************function called update status");
  try {
    // Send a request to update the application status
    const response = await api.patch('job/', {
      userId,
      jobId,
      status,
    });
    console.log(response);

    // Handle success
    message.success(response.data.message);

    // Update the local state with the new application status
    const updatedApplications = job.applications.map((applicant) => {
      if (applicant.candidate._id === userId) {
        return { ...applicant, applicationStatus: status };
      }
      return applicant;
    });

    setJob((prevJob) => ({ ...prevJob, applications: updatedApplications }));
  } catch (error) {
    // Handle error
    console.error('Error updating application status:', error);
    message.error('Failed to update application status');
  }
};



  const colors = ['blue-500', 'green-500', 'yellow-500', 'orange-500'];
const role=localStorage.getItem('role')

 const getRandomColor = (colors) => {
   const randomIndex = Math.floor(Math.random() * colors.length);
   return colors[randomIndex];
 };
 const randomColor = getRandomColor(colors);
 const navigate = useNavigate();

 const goBack = () => {
   navigate(-1); // Equivalent to history.goBack()
 };

    return (
        <div className='pt-24 px-10'>
      {loading?<div className="flex flex-col items-center">
            <h1 className="pb-4">Loading...</h1>
            <BounceLoader
              color={color}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>:<Card className="mb-4">
          <button onClick={goBack}>
      <img width={32} src={BackIcon}/>
    </button>
          <div className='flex flex-row items-center'>  <img
            src={`https://ui-avatars.com/api/?name=${job?.company?.companyName}`}
            alt={`Avatar of ${job?.company?.companyName}`}
            className="w-12 h-12 rounded-full mr-2"
          /> <p>{job.company.companyName}</p>
              </div>
        <h2 className="text-xl font-semibold">{job.title}</h2>      
          <Form
            name="applicationForm"
    
          >
            <Space direction="vertical" className="w-full">
            

              <div className='flex flex-col'>
                <Text strong>Job Title: </Text>
                <Text>{job.title}</Text>
              </div>
                 <div className='flex flex-col'>
                <Text strong>Job Description: </Text>
                <Text className='text-gray-00'>{job.description}</Text>
              </div>
              <div className='flex flex-col'>
                <Text strong>Location: </Text>
                <Text>{job.location}</Text>
              </div>
              <div className='flex flex-col'>
                <Text strong>Employment type: </Text>
                <Text>{job.employmentType}</Text>
              </div>
              <div className='flex flex-col'>
                <Text strong>Job type: </Text>
                <Text>{job.jobType}</Text>
              </div>
              <div className='flex flex-col'>
                <Text strong>Salary: </Text>
                <Text>${job.salary} per year</Text>
              </div>
              <div className='flex flex-col'>
                <Text strong>Experience level: </Text>
                <Text>{job.experienceLevel}</Text>
              </div>
              <div className='flex flex-col'>
                <Text strong>Skills: </Text>
                <ul className="list-disc pl-4">
                {
job.skillsRequired.map((skill)=>(
    <li key={skill}>
    {skill}
  </li>)
)
                }
                                </ul>

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
                <ul className="list-disc pl-4">
                {
                    job.responsibilities.map((benefit)=>(


  <li>{benefit}</li>

                    ))
                }
                </ul>
              </div>
              <div>
                <Text strong>Qualifications: </Text>
                <ul className="list-disc pl-4">
                {
                    job.qualifications.map((benefit)=>(
<li key={benefit}>{benefit}</li>
                    ))
                }
                </ul>

              </div>
              <div>
                <Text strong>Published date: </Text>
                <Text>{job.publishedDate.slice(0,10)}</Text>
              </div>
              {/* Add other job details as needed */}
           { role==="employer"&& userID===job?.company?._id&& <div>
                <Text strong>Applicants: </Text>
                <Row className='overflow-hidden w-[100%] ' gutter={[16, 16]}>

                  {job?.applications?.map((applicant)=>(
        <Col key={job._id} xs={24} sm={12} md={8} lg={24}>

  <Card className="my-4 shadow shadow-gray-200 drop-shadow- drop-shadow-sm hover:drop-shadow-md hover:shadow hover:shadow-gray-300 hover:cursor-pointer">
  <div>
  <Text strong>Name: </Text><p>{applicant.candidate.name}</p>
  <Text strong>Email: </Text><p>{applicant.candidate.email}</p>
  <Text strong>Phone number: </Text><p>{applicant.candidate.phone}</p>
                <Text strong>Resume: </Text>
              
                <a className='text-[#00A49E] underline ' href={`https://docs.google.com/gview?url=${applicant?.resume}&embedded=true`} target='_blank'>Resume</a>
              </div>
  <div>
  <Text strong>Cover letter:       
                </Text>
                <p>{applicant?.coverLetter}</p>
  <Text strong>Application date:       
                </Text>
                <p>{applicant?.applicationDate.slice(0,10)}</p>
  <Text strong>Application status:       
                </Text>
                <p>{applicant?.applicationStatus}</p>
  </div>
   {/* Add a form to update the application status */}
   <div className="mt-2">

    
          <select className="w-full mb-4 p-2 border rounded-md transition duration-300 focus:border-blue-500 focus:outline-none" placeholder="Select status" onChange={(e)=>setStatus(e.target.value)}>
            <option value="applied">Applied</option>
            <option value="under review">Under Review</option>
            <option value="interviewing">Interviewing</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>

      
          <Button className='bg-[#00A49E] text-white' onClick={()=>{handleUpdateStatus(applicant.candidate._id,job._id,status)}}>
            Update Status
          </Button>


                  </div>
  </Card>
  </Col>


                ))}</Row>
              </div>}
            </Space>
  
            <Form.Item>
            
            </Form.Item>
          </Form>

      </Card>}</div>
    );
  };
  
  export default JobApplication;