import React, { useState } from 'react'
import Button from './Button'
import {ReactComponent as QuizStats} from '../../assets/quizstats.svg';
import {ReactComponent as QuizDuel} from '../../assets/quizduel.svg';
import {ReactComponent as DownArrow} from '../../assets/downarrow.svg';
import {ReactComponent as HamburgerMenu} from '../../assets/hamburger.svg';

import { Link } from 'react-router-dom';
import Register from '../auth/RegisterFrom';
import {Collapse, Drawer, Modal} from 'antd';
import Login from '../auth/LoginForm';
import DynamicCollapsible from './DropDown';
const NavBar = () => {
  const logo1=""
  const logo2="../../assets/quizduel.svg"
  
  const logo=<div></div>
  const[dropDownVisibility,setDropDownVisibility]=useState(false)
  const[screenSizeWidth,setScreenSizeWidth]=useState(window.innerWidth)
  const [isModalOpenRegistration, setIsModalOpenRegistration] = useState(false);
  const [isModalOpenLogin, setIsModalOpenLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuItems = ['Option 1', 'Option 2', 'Option 3'];
  const { Panel } = Collapse;

  const showModalRegistration = () => {
    setIsModalOpenRegistration(true);
  };
  const showModalLogin = () => {
    setIsModalOpenLogin(true);
  };

  React.useEffect(()=>{
       function screenSize(){
    const width=window.innerWidth
    setScreenSizeWidth(width)
  }
window.addEventListener('resize',screenSize)

return ()=>{
window.removeEventListener('resize', screenSize)
};
  },[])
  const handleCancelRegistration = () => {
    setIsModalOpenRegistration(false);
  };
  const handleCancelLogin = () => {
    setIsModalOpenLogin(false);
  };

  const onClose = () => {
    setOpen(false);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  return (
    <div className='bg-[#EDDD4A] boder-2 boder-blue-600 font-medium w-full flex flex-row justify-between items-center p-3'>
     
        <div className='flex flex-row pl-6'><QuizDuel/><QuizStats/>  </div> 
      
        <div className="relative inline-block group">
      <span className="group-hover:block cursor-pointer">
      <div className='pr-4 lg:hidden' onClick={()=>setOpen(true)}> <HamburgerMenu/></div> </span>
   
    </div>
     {screenSizeWidth>=1024&&
     <>
      <div className='flex flex-row boder-2 boder-red-400 justify-start pr- items-center w-[55vw]'>
        {/* <div className='flex flex-row'><QuizDuel/><QuizStats/>  </div>  */}

         <div className='w-[30vw] pl-10 flex flex-row justify-evenly'>
   <Link to="/"><p className=''>Home</p></Link>     
     <div className={`flex flex-row items-center hover:cursor-pointer`}>
        
         <div className="relative inline-block group">
      <span className="group-hover:block cursor-pointer">
        <p className=' flex flex-row items-center pb-2 boder-2 boder-red-600'>Quiz
      <div className='boder-2 boder-red-600 p-0'><DownArrow/></div></p></span>
      <div className="hidden absolute rounded-b-md  bg-gray-100 min-w-40 shadow-lg p-4 z-10 group-hover:block">
      <p className='text-base pb-2 font-normal hover:font-medium hover:cursor-pointer whitespace-nowrap'>Take a quiz</p>
      <Link to="/createquiz"><p className='text-base  font-normal hover:font-medium hover:cursor-pointer whitespace-nowrap'>Create quiz</p></Link> 
      </div>
    </div>


      </div>

        <p>Leaderboard</p></div> </div> 
  
        <div className=' flex flex-row justify-end '>
          <Button style="text-[#2c302e] mr-6" text="Login" onClick={showModalLogin}/>
        <Button style="bg-white px-5 py-2 mr-24 rounded-full" text="Registration" onClick={showModalRegistration}/>
        <Modal onCancel={handleCancelRegistration} footer={null} width={600} title="Registration" open={isModalOpenRegistration}>
        <Register/>

      </Modal>
      <Modal onCancel={handleCancelLogin} footer={null} width={600} title="Login" open={isModalOpenLogin}>
        <Login/>

      </Modal>
        </div></>}
       
        <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open}>
       <Link to="/"><p>Home</p></Link> 
        <DynamicCollapsible  title="Quiz" contents={["Take quiz","Create quiz"]} />
        {/* <div className='pl-0 border border-red-400'>
          <p></p>
          <p></p>
        </div> */}

        
        <p>Leaderboard</p>
        <Button style="" text="Login" onClick={showModalLogin}/><br/>
        <Button onClick={showModalRegistration} text="Register"/>

      </Drawer>
      <Modal onCancel={handleCancelRegistration} footer={null} width={600} title="Registration" open={isModalOpenRegistration}>
        <Register/>

      </Modal>
      <Modal onCancel={handleCancelLogin} footer={null} width={600} title="Login" open={isModalOpenLogin}>
        <Login/>

      </Modal>
    </div>
  )
}

export default NavBar
