import React from 'react'
import { Link } from 'react-router-dom'

const Authentication = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-3xl font-bold mb-6">Welcome to Joby</h1>
    <p className="text-lg text-gray-600 mb-4">Choose your role:</p>
    <div className="flex space-x-4">
      <Link to="/candidate-registration" className="bg-[#] justify-end text-start flex flex-col items-center text-black hover:bg-[#00A49E] hover:text-white px-6 py-4 rounded  border hover:border-red-[#00A49E] transition duration-300 shadow-md hover:shadow-lg">
      <img className='self-center' width={250} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1699435720/i5zlubr9howams9mc4vb.webp" alt='candidate'/>
   
        <h2 className="text-xl font-semibold self-start flex flex-col items-end">Candidate</h2>
        <p>Apply for Jobs and Manage Your Profile</p>
      </Link>
      <Link to="/employer-registration" className="bg-[#] text-black justify-end text-start flex flex-col items-center hover:bg-[#00A49E] hover:text-white px-6 py-4 rounded  border hover:border-red-[#00A49E] transition duration-300 shadow-md hover:shadow-lg">
        <img className='self-center' width={250} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1699435424/lup77yxjqyjmhxlsmfhy.webp" alt='employer'/>
        <h2 className="text-xl font-semibold self-start">Employer</h2>
        <p>Post Jobs and Manage Your Company Profile</p>
      </Link>
    </div>
  </div>
  )
}

export default Authentication
