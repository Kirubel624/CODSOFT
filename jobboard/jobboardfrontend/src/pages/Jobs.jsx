import React,{useState, useEffect} from 'react'
import JobList from '../components/job/JobList'
import axios from 'axios'
import api from '../utils/api'
import { BounceLoader } from "react-spinners";
const Jobs = () => {
const [jobs,setJobs]=useState()
const[isLoading,setIsLoading] = useState(true)
const [color, setColor] = useState("#00A49E");
  useEffect(()=>{
    const cancelToken=axios.CancelToken.source()
    api.get('job/',{cancelToken:cancelToken.token}).then((res)=>{
      setJobs(res.data)
      setIsLoading(false)
      console.log(res.data)
    }).catch((err)=>{
      if(axios.isCancel(err)){
        console.log("Request cancelled")
      }else{
        console.log("Request error")
      }
    })
    return ()=>{
      cancelToken.cancel()
    }
  },[])
  return (
    <div className='flex flex-col pl-20'>
    <div className='flex flex-row items-center justify-between pt-24'>
      <div>
        <h1 className='text-[#003366] text-4xl lg:text-[3.2rem] font-bold pb-4 leading-[1.2]'>
            Find the right fit for you.
        </h1>
        <p className='font-base text-base text-gray-400 pb-4'>Your dream job is right around the corner</p>
      <div className='flex'> 
      <input type='text' 
        className='rounded-l-xl py-2 px-4  lg:px-5 lg:py-3 border-[1px] border-gray-400 w-[50vw] lg:w-[30vw] z-9'
        /><button className='text-white bg-[#00A49E] border-[1px] border-[#00A49E] py-2 px-4  lg:px-5 lg:py-3 rounded-r-xl'>Search</button></div> 
      </div>
      <div className='lg:block w-[50vw] hidden'>
        <img width={300} className="w-[50vw]" src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1699378170/znzx3auo6grfahpibwam.png" alt="Image of guy pointing"/>
      </div>
      
    </div>
    <div>
       {!isLoading ?
       
       <div className='my-8'>
       <h2 className="text-4xl font-bold mb-8 text-black">
 Latest <span className="text-[#003366]">Jobs</span>
</h2><JobList jobs={jobs}/> </div>
       : <div className="flex flex-col items-center">
            <h1 className="pb-4">Loading...</h1>
            <BounceLoader
              color={color}
              loading={isLoading}
              size={50}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>}
      </div>
    </div>
  )
}

export default Jobs
