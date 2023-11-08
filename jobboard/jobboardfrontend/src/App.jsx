import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Homepage from './pages/Homepage'
import { Route, Routes } from 'react-router-dom'
import EmployerAuthenticaiton from './components/auth/EmployerAuthenticaiton'
import CandidateAuthentication from './components/auth/CandidateAuthentication'
import JobCreation from './pages/JobCreation'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Routes>
      <Route path="/" element={<Homepage/>}/>
      <Route path="/empauth" element={<EmployerAuthenticaiton/>}/>
      <Route path="/canauth" element={<CandidateAuthentication/>}/>
      <Route path="/createjob" element={<JobCreation/>}/>
      <Route path="/applyjob/:id" element={<Homepage/>}/>
      <Route path="/canprof/:id" element={<Homepage/>}/>
      <Route path="/empprof/:id" element={<Homepage/>}/>


    </Routes>
    </>
  )
}

export default App
