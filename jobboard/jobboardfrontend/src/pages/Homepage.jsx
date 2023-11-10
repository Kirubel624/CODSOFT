import React,{useState, useEffect} from 'react'
import JobList from '../components/job/JobList'
import axios from 'axios'
import api from '../utils/api'
import { BounceLoader } from "react-spinners";
const Homepage = () => {
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
    <div className='flex flex-row items-center justify-center pt-24'>
      <div>
        <h1 className='text-[#003366] text-[3.2rem] font-bold pb-4'>
            Find the right fit for you.
        </h1>
        <p className='font-base text-base text-gray-400 pb-4'>Your dream job is right around the corner</p>
      <div> <input type='text' 
        className='rounded-l-xl px-5 py-3 border-[1px] border-gray-400 drop-shadow-lg w-[80vw] lg:w-[30vw] z-9'
        /><button className='text-white bg-[#00A49E] border-[1px] border-[#00A49E]  px-5 py-3 rounded-r-xl'>Search</button></div> 
      </div>
      <div className=''>
        <img src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1699378170/znzx3auo6grfahpibwam.png" alt="Image of guy pointing"/>
      </div>
      
    </div>
    <div>
       {!isLoading ?<JobList jobs={jobs}/>: <div className="flex flex-col items-center">
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

export default Homepage