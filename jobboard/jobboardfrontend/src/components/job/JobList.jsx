import React from 'react';
import { Row, Col } from 'antd';
import JobCard from './JobCard';

const JobList = ({ jobs }) => {
  console.log(jobs,"inside jobs list")
  return (
  
    <Row className='overflow-hidden w-[100%] ' gutter={[16, 16]}>
   
      {jobs.map((job) => (
        <Col key={job._id} xs={24} sm={24} md={12} lg={7}>
          <JobCard job={job} />
        </Col>
      ))}
    </Row>
   
  );
};

export default JobList;
