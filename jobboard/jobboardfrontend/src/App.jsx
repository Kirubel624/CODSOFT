import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import EmployerAuthenticaiton from './components/auth/EmployerAuthentication'
import CandidateAuthentication from './components/auth/CandidateAuthentication'
import JobCreation from './pages/JobCreation'
import NavBar from './components/common/NavBar'
import Authentication from './components/auth/Authentication'
import LoginForm from './components/auth/LoginForm'
import { useSelector } from 'react-redux'
import JobApplication from './pages/JobApplication'
import JobDetail from './pages/JobDetail'
import DashBoard from './pages/DashBoard'
import Jobs from './pages/Jobs'

function App() {
  const [count, setCount] = useState(0)
  const role=localStorage.getItem("role")
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <>
    <NavBar/>
    <Routes>
         <Route path="/" element={ isLoggedIn&&<DashBoard/>}/>
      <Route path="/jobs" element={<Jobs/>}/>
   
      <Route path="/login" element={<LoginForm/>}/>

      <Route path="/roleauth" element={<Authentication/>}/>

      <Route path="/employer-registration" element={<EmployerAuthenticaiton/>}/>
      <Route path="/candidate-registration" element={<CandidateAuthentication/>}/>
      <Route path="/createjob" element={
        isLoggedIn&&role=="employer"&&
        <JobCreation/>}/>
      <Route path="/applyjob/:id" element={<JobApplication/>}/>
      <Route path="/viewjob/:id" element={<JobDetail/>}/>
      <Route path="/jobdetail/:id" element={<JobDetail/>}/>
      {/* <Route path="/canprof/:id" element={<Homepage/>}/>
      <Route path="/empprof/:id" element={<Homepage/>}/> */}


    </Routes>
    </>
  )
}

export default App
