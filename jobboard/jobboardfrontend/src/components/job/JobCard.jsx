import React from 'react';
import { Card, Tag, Space, Typography } from 'antd';
import { ClockCircleOutlined, DollarCircleOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import Button from '../common/Button';
import { Link, useNavigate } from 'react-router-dom';

const { Text } = Typography;
let id=""
const JobCard = ({ job }) => {
  const {
    _id,
    title,
    description,
    location,
    employmentType,
    skillsRequired,
    company,
    jobType,
    applications
  } = job;



const role=localStorage.getItem('role')

 const navigate = useNavigate();

 const handleApplyNowClick = () => {
   navigate('/applyjob', { state: { jobData: job } });
 };
 const dataToPass = { name: 'John Doe', age: 25 };
  return (
    <Card className="mb-4 shadow shadow-gray-200 drop-shadow- drop-shadow-sm hover:drop-shadow-md hover:shadow hover:shadow-gray-300 hover:cursor-pointer">
   <div className="flex flex-row justify-between items-center">   
  <div className='flex flex-row'>
          <img
            src={`https://ui-avatars.com/api/?name=${company.companyName}`}
            alt={`Avatar of ${company.companyName}`}
            className="w-12 h-12 mr-2 rounded-full"
          /> 
           <div className="flex flex-col justify-start items-start"> 
            <p className='overflow-clip overflow-ellipsis'>{company.companyName}</p><h2 className=" font-semibold">{title}</h2>
            </div> 
          </div>
          <div className='flex justify-start flex-col'>
        

          </div>
        
            <div className="ml-2 border whitespace-nowrap border-[#00A49E] px-2 py-1 text-[#00A49E]">
          <p>{employmentType}</p>
        </div>  
        

        </div>
    
      
     
      <Space direction="vertical" className="mt-2 w-full">
        <div className="flex items-center">
          <EnvironmentOutlined className="mr-2" />
          <Text strong>{location}</Text>
        </div>
       
        <div className="flex items-center">
          <p className='text-sm text-gray-400 mb-4 truncate'>{description}</p>
        </div>
       {role==="employer"? <Link to={`/viewjob/${_id}`} className="bg-[#00A49E] text-white px-4 py-2 rounded">View</Link>
       :<Link 
       to={`/applyjob/${_id}`}
     
        className="bg-[#00A49E] text-white px-4 py-2 rounded">Apply Now</Link>}
      </Space>
    </Card>
  );
};

export default JobCard;
