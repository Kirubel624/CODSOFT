import React, { useEffect, useState } from "react";
import Button from "./Button";
// import { ReactComponent as QuizStats } from "../../assets/quizstats.svg";
// import { ReactComponent as QuizDuel } from "../../assets/quizduel.svg";
import HamburgerMenu  from "../../assets/hamburger.svg";
import { Link } from "react-router-dom";
import { Collapse, Drawer, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
// import AuthenticationPage from "../auth/Authentication";
import { logout } from "../../redux/reducers/authReducer";
// import { ReactComponent as HomeIcon } from "../../assets/home.svg";
// import { ReactComponent as QuizIcon } from "../../assets/q.svg";
// import { ReactComponent as LeaderBoardIcon } from "../../assets/leaderboard.svg";
// import { ReactComponent as LogOutIcon } from "../../assets/lgout.svg";

const NavBar = () => {
  const [screenSizeWidth, setScreenSizeWidth] = useState(window.innerWidth);
  const [isModalOpenAuthentication, setIsModalOpenAuthentication] =
    useState(false);
  const [open, setOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const menuItems = ["Option 1", "Option 2", "Option 3"];
  const { Panel } = Collapse;
  const dispatch = useDispatch();

  const showModalAuthentication = () => {
    setIsModalOpenAuthentication(true);
    setOpen(false)
  };

  const handleCancelAuthentication = () => {
    setIsModalOpenAuthentication(false);
  };

  const onClose = () => {
    setOpen(false);
  };
  // Navy Blue: #003366
  // Light Gray: #F5F5F5
  // White: #FFFFFF
  // Teal or Mint Green: #00A49E
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  const username = localStorage.getItem("username");
  useEffect(() => {
    if (isLoggedIn) {
      setIsModalOpenAuthentication(false);
    }
  }, [isLoggedIn]);


  useEffect(()=>{
    const handleResize=()=>{
      setScreenSizeWidth(window.innerWidth)
    }
    window.addEventListener("resize",handleResize)

    return ()=>{
      window.removeEventListener("resize",handleResize)
    }
  },[screenSizeWidth])
  return (
    <div className="bg-[#F5F5F5] boder-2 boder-blue-600 font-medium w-full flex flex-row justify-between items-center p-3 fixed top-0 z-50 backdrop-blur-md bg-white/30">
      <Link to="/" className="flex flex-row pl-6">
        {/* <QuizDuel /> */}
        {/* <QuizStats /> */}
        <img className="w-[84px]" src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1699517656/g2ulzit4tk6qb5en4cmn.png"/>
      </Link>
     
      <div className="relative inline-block group">
        <span className=" cursor-pointer flex flex-row items-center">
        {screenSizeWidth<1024&&!isLoggedIn&&
        <>
       
        </>
                }
          <div className="pr-4 lg:hidden " onClick={() => setOpen(true)}>
             
            <img src={HamburgerMenu} />
          </div>
        </span>
      </div>
      {screenSizeWidth >= 1024 && (
        <>
          <div className="flex flex-row boder-2 boder-red-400 justify-start pr- items-center w-[55vw]">
            {/* <div className='flex flex-row'><QuizDuel/><QuizStats/>  </div>  */}
            <div className="w-[30vw] pl-10 flex flex-row justify-evenly">
            <Link to="/">
                <p className="">Dashboard</p>
              </Link>
              <Link to="/jobs">
                <p className="">Jobs</p>
              </Link>
              <div
                className={`flex flex-row items-center hover:cursor-pointer`}
              >
                <div className="relative inline-block group">
                  <span className="group-hover:block cursor-pointer">
                  <Link to="/createquiz">
                      <p className="text-base  font-medium hover:font-medium hover:cursor-pointer whitespace-nowrap">
                        About
                      </p>
                    </Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className=" flex flex-row justify- ">
            {!isLoggedIn ? (
              <>
              <Link
              className="bg-[#00A49E] text-white px-5 py-2 mr-4 rounded-full"
              to='/login'>Login</Link>
                <Link
              className="bg-white text-[#00A49E] px-5 py-2 mr-24 rounded-full"
              to='/roleauth'>Sign up</Link>
              </>
            ) : (
              <div>
                Hi, {username}
                <Button
                  style="bg-white px-5 py-2 ml-4 mr-4 rounded-xl"
                  text="Logout"
                  onClick={() => dispatch(logout())}
                />
              </div>
            )}
            <Modal
              onCancel={handleCancelAuthentication}
              footer={null}
              open={isModalOpenAuthentication}
            >
              {/* <AuthenticationPage /> */}
            </Modal>
          </div>
        </>
      )}

      <Drawer
        title=""
        placement="right"
        onClose={onClose}
        open={open}
       
      >
       { isLoggedIn &&<div className="flex items-center mb-10"> <img
            src={`https://ui-avatars.com/api/?name=${username}`}
            alt={`Avatar of ${username}`}
            className="w-12 h-12 rounded-full mr-2"
          />
          <div className="flex flex-col"><p>Hey</p><p className="font-medium text-base">{username?.charAt(0)?.toUpperCase() + username?.slice(1)}</p></div></div> }
        <Link className="brder-2 border-red-400 flex items-center mb-3" onClick={()=>setOpen(false)}  to="/">
         {/* <HomeIcon/> */}
         <p className="pl-4">Dashboard</p>
        </Link>
      <Link to="/jobs" onClick={()=>setOpen(false)} className="flex items-center boder-2 border-red-400 mb-3">
        {/* <QuizIcon/>  */}
        <p className="pl-4">Jobs</p>
       </Link> 
       <Link to='/about' onClick={()=>setOpen(false)}  className="flex items-center ">
        {/* <LeaderBoardIcon/> */}
        <p className="pl-4">About</p></Link>
       {!isLoggedIn ? (
              <div className="flex flex-col pt-4 justify-start items-center">
                  <Link
              className="bg-[#00A49E] text-white px-5 py-2 w-full text-center mr- rounded-lg"
              to='/login'
              onClick={()=>setOpen(false)}
              >Login</Link>
                <Link
              className="bg-white text-[#00A49E] px-5 py-2 mr- rounded-full"
              to='/roleauth'
              onClick={()=>setOpen(false)}
              >Sign up</Link>
              </div>
            ) : (
              <div className="flex flex-col">
               
               <div>
               <Button
                  style="py-2 rounded-xl"
                  text={<div className="flex items-center">
                    {/* <LogOutIcon/> */}
                    <p className="pl-4">Logout</p> </div>}
                  onClick={() => dispatch(logout())}
                />
               </div>
              </div>
            )}
      
      </Drawer>

      <Modal
        onCancel={handleCancelAuthentication}
        footer={null}
        width={800}
        title="Get started"
        open={isModalOpenAuthentication}
      >
        {/* <AuthenticationPage /> */}
      </Modal>
    </div>
  );
};

export default NavBar;
