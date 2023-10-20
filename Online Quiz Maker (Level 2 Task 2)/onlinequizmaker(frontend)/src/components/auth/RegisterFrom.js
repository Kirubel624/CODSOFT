import React, { useState } from 'react';
import Button from '../common/Button';

export default function Register() {
    const [user, setUser] = useState({username:"",email:"", password:"",confirmPassword:""});
 
  const handleChange=(e)=>{
setUser({
  ...user,
  [e.target.name]:e.target.value
})
  }
    const handleRegistration = () => {
      // Handle the registration logic (e.g., sending data to a server)
      alert(user.username,user.email)
    };
  
    return (
      

       
      <div className=" flex items-start justify-center">
        <div className="max-w-md w-full space-y-8 p-8">
          <h2 className="text-3xl text-center font-extrabold text-gray-900">Register</h2>
          <form className="space-y-4" onSubmit={handleRegistration}>
          <div>
              <label htmlFor="registrationUsername" className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                type="username"
                id="registrationUsername"
                name='username'
                className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                value={user.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="registrationEmail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="registrationEmail"
                name='email'
                className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                value={user.email}
                onChange={handleChange}
              />
            </div>
           
            <div>
              <label htmlFor="registrationPassword" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name='password'
                id="registrationPassword"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                value={user.password}
                onChange={handleChange}
              />
            </div> <div>
              <label htmlFor="registrationConfirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <input
                type="password"
                name='confirmPassword'
                id="registrationConfirmPassword"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                value={user.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <Button
              text="Register"
              style="bg-[#996CF1] text-white p-2 rounded hover:bg-[#a885ed]"
            />
          </form>
        </div>
      </div>

    );
  }