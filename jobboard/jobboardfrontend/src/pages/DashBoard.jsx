import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Form, Input, Card, Tabs, message } from "antd";
import EmployerProfileForm from './EmployerProfile';
import CandidateProfileForm from './CandidateProfile';
import JobCreation from './JobCreation';
import api from '../utils/api';
import AppliedJobs from '../components/job/AppliedJobs';
import JobApplicants from '../components/job/JobApplicants';

const DashBoard = () => {
    const[userDataC,setUserDataC]=useState()
    const[userDataE,setUserDataE]=useState()
    const[loading,setLoading]=useState(true)
    const [color, setColor] = useState("#00A49E");
  const [activeKeyC, setActiveKeyC] = useState("account");
  const [activeKeyE, setActiveKeyE] = useState("account");
  const role=localStorage.getItem("role");
console.log(userDataC)
  const handleTabChangeC = (key) => {
    setActiveKeyC(key);
  };
  const handleTabChangeE = (key) => {
    setActiveKeyE(key);
  };
  console.log(userDataE,"userdate E")
    const userID=localStorage.getItem('userID')
useEffect(()=>{
  const cancelToken=axios.CancelToken.source()
api.get(`user/${role==="candidate"?"candidate":"employer"}/${userID}`,{cancelToken:cancelToken.token}).then((user)=>{
  role==="candidate"?setUserDataC(user.data):setUserDataE(user.data)
  setLoading(false)
}).catch((err)=>{
  if(axios.isCancel(err)){
    console.log("Request canceled");
  }else{
    console.log("Request error");
  }
})
return ()=>{
  cancelToken.cancel()
}
},[])
const candidateTabs=[
  {
    key:"account",
    label:"Account",
    children:(<CandidateProfileForm initialValues={userDataC}/>)
  },
  {
    key:"applied",
    label:"Applied jobs",
    children:(<AppliedJobs userData={userDataC} appliedJobs={userDataC?.jobApplications}/>) 
  }
]
const employerTabs=[
  {
    key:"account",
    label:"Account",
    children:(<EmployerProfileForm initialValues={userDataE} />)
  },
  {
    key:"applications",
    label:"Job applicants",
    children:(<JobApplicants/>) 
  },
  {
    key:"create",
    label:"Create job",
    children:(<JobCreation/>)
  }
]
  return (
    <div className='p-24'>
      {
       !loading&& userDataC?.role==="candidate"?<p>
           <Tabs className="w-full" items={candidateTabs} activeKey={activeKeyC} onChange={handleTabChangeC}>
           </Tabs>
        </p>:<p>
        <Tabs className="w-full" items={employerTabs} activeKey={activeKeyE} onChange={handleTabChangeE}>
        </Tabs>

        </p>
      }
    </div>
  )
}

export default DashBoard
