import React, { useEffect, useState } from 'react';
import { Card, Tag, Space, Typography, Button, Modal, Form, Input, message, Row, Col, Select } from 'antd';
import { UploadOutlined, DollarCircleOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { BounceLoader } from "react-spinners";
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import ResumeViewer from '../components/job/resumeViewer';
import {InfoCircleOutlined, CalendarOutlined} from '@ant-design/icons'
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
    const response = await api.patch('job/', {
      userId,
      jobId,
      status,
    });
    console.log(response);

    message.success(response.data.message);

    const updatedApplications = job.applications.map((applicant) => {
      if (applicant.candidate._id === userId) {
        return { ...applicant, applicationStatus: status };
      }
      return applicant;
    });

    setJob((prevJob) => ({ ...prevJob, applications: updatedApplications }));
  } catch (error) {
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
        <div className='flex flex-col'><button onClick={goBack}>
      <img width={28} src={BackIcon}/>
    </button>  <h2 className="text-xl pt-4 font-semibold">{job.title}</h2>   </div>     
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
    
          >
            <Space direction="vertical" className="w-full">
                 <div className='flex flex-col pt-4'>
                <Text strong>About this role </Text>
                <Text className='text-[#9AA2A8] pt-2'>{job.description}</Text>
              </div>
              
      
              <div className='flex flex-col'>
                <Text strong>Salary </Text>
                <Text className='text-[#9AA2A8] pt-2'>${job.salary} per year</Text>
              </div>
              <div className='flex flex-col'>
                <Text strong>Skills: </Text>
                <ul className="list-disc pl-4  pt-2">
                {
job.skillsRequired.map((skill)=>(
    <li className='text-[#9AA2A8]' key={skill}>
    {skill}
  </li>)
)
                }
                                </ul>

              </div>
              <div className='flex flex-col'>
                <Text strong>Application deadline </Text>
                <Text className='text-[#9AA2A8] pt-2'><CalendarOutlined/> {job.applicationDeadline.slice(0,10)}</Text>
              </div>
              <div>
                <Text strong>Benefits </Text>
                <ul className='pl-4 list-disc text-[#9AA2A8] pt-2'>
                {
                    job.benefits.map((benefit)=>(
<li key={benefit}>{benefit}</li>
                    ))
                }
                </ul>
              </div>
              <div>
                <Text strong>Responsibilities: </Text>
                <ul className="list-disc pl-4 text-[#9AA2A8] pt-2">
                {
                    job.responsibilities.map((benefit)=>(


  <li>{benefit}</li>

                    ))
                }
                </ul>
              </div>
              <div>
                <Text strong>Qualifications: </Text>
                <ul className="list-disc pl-4 text-[#9AA2A8] pt-2">
                {
                    job.qualifications.map((benefit)=>(
<li key={benefit}>{benefit}</li>
                    ))
                }
                </ul>

              </div>
              <div className='flex flex-col'>
                <Text strong>Published date </Text>
                <Text className='text-[#9AA2A8] pt-2'><CalendarOutlined/> {job.publishedDate.slice(0,10)}</Text>
              </div>
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

      </div>}</div>
    );
  };
  
  export default JobApplication;