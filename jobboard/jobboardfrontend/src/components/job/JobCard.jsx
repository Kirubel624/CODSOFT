import React from 'react';
import { Card, Tag, Space, Typography } from 'antd';
import { ClockCircleOutlined, DollarCircleOutlined, EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import Button from '../common/Button';

const { Text } = Typography;

const JobCard = ({ job }) => {
  const {
    title,
    description,
    location,
    employmentType,
    skillsRequired,
    company,
    jobType,
    applications
  } = job;

 // Tailwind CSS color classes for border and text
// Tailwind CSS color classes for border and text
const colors = ['blue-500', 'green-500', 'yellow-500', 'orange-500'];

 // Function to randomly pick a color from the array
 const getRandomColor = (colors) => {
   const randomIndex = Math.floor(Math.random() * colors.length);
   return colors[randomIndex];
 };
 const randomColor = getRandomColor(colors);

  return (
    <Card className="mb-4 shadow shadow-gray-200 drop-shadow- drop-shadow-sm hover:drop-shadow-md hover:shadow hover:shadow-gray-300 hover:cursor-pointer">
   <div className="flex justify-between items-center">   
          <img
            src={`https://ui-avatars.com/api/?name=${company.companyName}`}
            alt={`Avatar of ${company.companyName}`}
            className="w-12 h-12 rounded-full mr-2"
          /> 
          <div className='flex flex-col'>
          <p className=''>{company.companyName}</p><h2 className=" font-semibold">{title}</h2>

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
          <p className='text-sm text-gray-400'>{description}</p>
        </div>
        <Button style="bg-[#00A49E] text-white px-4 py-1 rounded mt-2" text={"Apply Now"}/>
      </Space>
    </Card>
  );
};

export default JobCard;
