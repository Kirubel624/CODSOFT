import { Card, Space, Typography, Row, Col } from 'antd'
import React from 'react'
import { ClockCircleOutlined, DollarCircleOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { Text } = Typography;

const AppliedJobs = ({userData,appliedJobs}) => {
    // const[]
    console.log(appliedJobs)
  return (
    <Row className='overflow-hidden w-[100%] ' gutter={[16, 16]}>
      
   

      
        {
            appliedJobs.map((job)=>(
              
              <Col key={job._id} xs={24} sm={12} md={8} lg={9}>
                <Card
                 className="mb-4 shadow shadow-gray-200 drop-shadow- drop-shadow-sm hover:drop-shadow-md hover:shadow hover:shadow-gray-300 hover:cursor-pointer"
                 >
                <div className="flex justify-between items-center">   
<div className='flex justify-around'>
                       <img
                         src={`https://ui-avatars.com/api/?name=${job?.job?.company?.companyName}`}
                         alt={`Avatar of ${job?.job?.company?.companyName}`}
                         className="w-12 h-12 rounded-full mr-2"
                       /> 
                       <div className='flex flex-col pl-2'>
                       <p className=''>{job?.job?.company.companyName}</p><h2 className=" font-semibold">{job?.job?.title}</h2>
             </div>
                       </div>
                     
                         <div className="ml-2 border whitespace-nowrap border-[#00A49E] px-2 py-1 text-[#00A49E]">
                       <p>{job?.job?.employmentType}</p>
                     </div>  
                     
             
                     </div>
                 
                   
                  
               <Space direction="vertical" className="mt-2 w-full">
                     <div className="flex items-center">
                       <EnvironmentOutlined className="mr-2" />
                       <Text strong>{job?.job?.location}</Text>
                     </div>
                    
                     <div className="flex items-center">
                       <p className='text-sm text-gray-400 mb-4 truncate'>{job?.job?.description}</p>
                     </div>
              <Link to={`/viewjob/${job?.job?._id}`} className="bg-[#00A49E] text-white px-4 py-2 rounded">View</Link>
             <div className='flex justify-between items-center pt-2'> 
             <div className='flex items-center'>
                <Text className='pr-4 text' strong> Status:</Text>
               <p className='border border-blue-500 text-blue-500 px-4 py-2 w'>{job?.status.toUpperCase()}</p></div>
               <p>Applied on: {job?.applicationDate.slice(0,10)}</p>
               </div>   
                   </Space> 
                 </Card> 
                  </Col>
           ) )
        }
       
    </Row>
  )
}

export default AppliedJobs
