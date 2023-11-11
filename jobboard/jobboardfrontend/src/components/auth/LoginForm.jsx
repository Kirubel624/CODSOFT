import React, { useEffect, useState } from 'react';
import { Form, Input, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'antd/es/form/Form';
import { loginAsync } from '../../redux/reducers/authReducer';
import { useRegistrationData } from '../../context/RegistrationDataContext';

const LoginForm = () => {
    const [form]=Form.useForm()
     const dispatch=useDispatch();
     const { registrationData } = useRegistrationData();
// Set initial values for the form fields using the registration data
const initialValues = {
  email: registrationData?.email || '',
  password: registrationData?.password || '',
};

 const { loading, error } = useSelector((state) => state.auth);
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
const [screenSize,setScreenSize]=useState(window.innerWidth)
const navigate=useNavigate()
useEffect(()=>{
    const handleResize=()=>{
        setScreenSize(window.innerWidth)
    }
    window.addEventListener('resize',handleResize)

    return()=>{
        window.removeEventListener('resize',handleResize)
    }
},[screenSize])
  const onFinish = (values) => {
    // Handle login logic here
    console.log('Received values:', values);
    dispatch(loginAsync(values)).then((action) => {
        if (loginAsync.fulfilled.match(action)) {
     
          message.success("Login successful!", 2);
  
  
          setUserLogin({email: "", password: "" });
          form.resetFields(); // Reset the login form
          navigate('/')
        } else if (loginAsync.rejected.match(action)) {
          // Handle registration error here
          const errorPayload = action.payload;
          if (errorPayload === "A custom error message that indicates conflict") {
            // Handle conflict, e.g., show an error message.
            message.error("Invalid credentials.", 3);
          } else {
            // Handle other registration errors as needed.
            message.error("Invalid credentials.", 3);
          }
        }
      })
      .catch((error) => {
        // Handle any additional error cases here
        message.error("Login failed.", 3);
      });
  };

  return (
    <div
    className="pt- flex flex-wrap justify-between items-center boder boder-red-900"
    
    >
        <div className='lg:w-[50vw] md:w-[40vw] sm:w-[40vw] w-full pt-24 sm:pt-0 md:pt-0 lg:pt-24 md:h-screen sm:h-screen lg:h-screen boder boder-red-900 flex text-center flex-col lg:text-start justify-center items-center bg-white text-[#003366]'>
        <div className=' flex flex-wrap justify-center items-start boder boder-red-800'>

            {/* <img className='self-start w-[100px]' src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1699510544/xef63b5vosl8zwqmbkm1.png"/> */}
            
      <div className='ml-8 flex flex-col'> <h1 className=' font-bold text-4xl'>
            Welcome back!
        </h1>      
          <p>Sign in to continue your job search journey.</p>
          <p className='pt-8'>If you don't have an account</p>
        <p>you can <Link className='font-bold underline' to="/roleauth">Register here!</Link></p>  
        
</div> 
        <img className='hidden lg:block bordr brder-red-800 self-start xl:pt-0 animate-float pt-10' width={300} src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1699513473/hydpayfh7fpnmstnhckl.png"/>

        </div>
        {/* <div className='self-end flex justify-around'>
 
            <img className=' w-[200px]' src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1699504901/kjtmridzwgc1ersnwdep.webp"/>
        <img className='w-[200px]'  src="https://res.cloudinary.com/dvqawl4nw/image/upload/v1699504894/ehmdumweoza0lvz1lwr0.webp"/>
        </div> */}
        
        </div>
    <Form
      name="login-form"
      initialValues={initialValues}
      onFinish={onFinish}
      className='lg:w-[40vw] md:w-[60vw] sm:w-[60vw] w-full p-24 flex flex-col justify-center items-center boder boder-red-900'
      form={form}
    >
        <h1 className='text-3xl font-bold text-center pb-10'>Login</h1>
      <Form.Item
        name="email"
        rules={[
          { required: true, message: 'Please enter your email' },
          { type: 'email', message: 'Invalid email address' },
        ]}
        className='w-full'

      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please enter your password' }]}
        className='w-full'
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
    
        />
      </Form.Item>

      <Form.Item className='text-center w-full boder'>
        <Button text={loading?
       <svg
       className="animate-spin -ml-1 mr-3 h-5 w-full text-white text-center"
       xmlns="http://www.w3.org/2000/svg"
       fill="none"
       viewBox="0 0 24 24"
     >
       <circle
         className="opacity-25"
         cx="12"
         cy="12"
         r="10"
         stroke="currentColor"
         strokeWidth="4"
       ></circle>
       <path
         className="opacity-75"
         fill="currentColor"
         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 6.627 5.373 12 12 12v-4c-3.313 0-6-2.687-6-6z"
       ></path>
     </svg>
        :"Login"} type="submit" style="rounded bg-[#00A49E] w-full py-2 px-4 hover:text-white text-white"/>
         
 
    
      </Form.Item>
    </Form>
    </div>
  );
};

export default LoginForm;
