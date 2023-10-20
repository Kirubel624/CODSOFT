import React, { useState } from 'react';
import Button from '../common/Button';
export default function Login() {
  const [user, setUser] = useState({email:"", password:""});
 
  const handleChange=(e)=>{
setUser({
  ...user,
  [e.target.name]:e.target.value
})
  }
  
    const handleLogin = () => {
      // Handle the login logic (e.g., sending data to a server)
      alert(user.email)

    };
  
    return (
      <div className=" flex items-center justify-center ">
        <div className="max-w-md w-full space-y-8 p-8 ">
          <h2 className="text-3xl text-center font-extrabold text-gray-900">Login</h2>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="loginEmail" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="loginEmail"
                name='email'
                className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                value={user.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="loginPassword" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                name='password'
                id="loginPassword"
                className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                value={user.password}
                onChange={handleChange}
              />
            </div>
            <Button
            type="submit"
              text="Login"
              style="bg-[#996CF1] text-white p-2 rounded hover:bg-[#a885ed]"
            />
          </form>
        </div>
      </div>
    );
  }
  