import React from 'react';
import { Row, Col } from 'antd';
import JobCard from './JobCard';

const JobList = ({ jobs }) => {
  console.log(jobs,"inside jobs list")
  return (
    <div className='mt-4'>
        <h2 className="text-4xl font-bold mb-8 text-black">
  Latest <span className="text-[#003366]">Jobs</span>
</h2>
    <Row className='overflow-hidden w-[100%] ' gutter={[16, 16]}>
   
      {jobs.map((job) => (
        <Col key={job._id} xs={24} sm={12} md={8} lg={7}>
          <JobCard job={job} />
        </Col>
      ))}
    </Row>
    </div>
  );
};

export default JobList;
