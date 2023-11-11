import { Card, Col, Row, Space, Typography } from 'antd'
import React, { useEffect, useState } from 'react'
import { ClockCircleOutlined, DollarCircleOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import axios from 'axios';
import { BounceLoader } from "react-spinners";

const { Text } = Typography;

const JobApplicants = () => {
    const[jobs,setJobs]=useState()
    const[loading,setLoading]=useState(true)
    const [color, setColor] = useState("#00A49E");

    const userID=localStorage.getItem('userID');
    useEffect(()=>{
        const cancelToken=axios.CancelToken.source()
    api.get(`job/employer/postedjobs/${userID}`,{cancelToken:cancelToken.token}).then((job)=>{
        setJobs(job.data)
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
    console.log(jobs)
  return (
    <Row className='overflow-hidden w-[100%] ' gutter={[16, 16]}>
      


        {loading?<div className="flex flex-col items-center">
            <h1 className="pb-4">Loading...</h1>
            <BounceLoader
              color={color}
              loading={loading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>:
            jobs.map((job)=>(
              <Col key={job?.company?._id} xs={24} sm={12} md={8} lg={8}>
                <Card className="mb-4 shadow shadow-gray-200 drop-shadow- drop-shadow-sm hover:drop-shadow-md hover:shadow hover:shadow-gray-300 hover:cursor-pointer">
                <div className="flex justify-between items-center">   
<div className='flex justify-around'>
                       <img
                         src={`https://ui-avatars.com/api/?name=${job?.company?.companyName}`}
                         alt={`Avatar of ${job?.company?.companyName}`}
                         className="w-12 h-12 rounded-full mr-2"
                       /> 
                       <div className='flex flex-col pl-2'>
                       <p className=''>{job?.company.companyName}</p><h2 className=" font-semibold">{job?.title}</h2>
             </div>
                       </div>
                     
                         <div className="ml-2 border whitespace-nowrap border-[#00A49E] px-2 py-1 text-[#00A49E]">
                       <p>{job?.employmentType}</p>
                     </div>  
                     
             
                     </div>
                 
                   
                  
               <Space direction="vertical" className="mt-2 w-full">
                     <div className="flex items-center">
                       <EnvironmentOutlined className="mr-2" />
                       <Text strong>{job?.location}</Text>
                     </div>
                    
                     <div className="flex items-center">
                       <p className='text-sm text-gray-400 mb-4 truncate'>{job?.description}</p>
                     </div>
              <Link to={`/viewjob/${job?._id}`} className="bg-[#00A49E] text-white px-4 py-2 rounded">View</Link>
             <div className='flex justify-between pt-2'> 
             <div className='flex'>
                <Text className='pr-4' strong> Status:</Text>
               {/* <p className='border border-blue-500 text-blue-500 px-4 py'>{job?.status.toUpperCase()}</p> */}
               </div>
               {/* <p>Application Date: {job?.applicationDate.slice(0,10)}</p> */}
               </div>   
                   </Space> 
                 </Card> 
                  </Col>
           ) )
        }
          

    </Row>

  )
}

export default JobApplicants
