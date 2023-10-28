import React, { useEffect, useState } from "react";
import { Form, Input, Card, Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, registerAsync } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";

const { TabPane } = Tabs;

const AuthenticationPage = () => {
  const [activeKey, setActiveKey] = useState("login");
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [userRegister, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const isRegistered = useSelector((state) => state.auth.isRegistered);

  const handleChangeLogin = (e) => {
    setUserLogin({
      ...userLogin,
      [e.target.name]: e.target.value,
    });
  };

  const onFinishLogin = (e) => {
    e.preventDefault();
    dispatch(loginAsync(userLogin));
  };

  const onFinishRegistration = (e) => {
    e.preventDefault();
    const { username, email, password } = userRegister;
    dispatch(registerAsync({ username, email, password })).then(() => {
      setActiveKey("login");
      message.success("Registration succesful You can login now!");
    });
  };

  const handleTabChange = (key) => {
    setActiveKey(key);
  };

  return (
    <div className="flex flex-col items-center justify-center mt">
      <div
        className="w-full min-w-[40vw] flex flex-col items-center max-w-sm 
        "
      >
        <h2 className="text-xl text-black italic font-light text-center py-4">
          Take a Quiz! Test your self
        </h2>
        <Tabs
          className="w-full"
          activeKey={activeKey}
          onChange={handleTabChange}
        >
          <TabPane tab="Login" key="login">
            <div className=" flex items-center justify-center ">
              <div className="max-w-md w-full pb-4 ">
                <form className="space-y-4" onSubmit={onFinishLogin}>
                  <div>
                    <label
                      htmlFor="loginEmail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="loginEmail"
                      name="email"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      value={userLogin.email}
                      onChange={handleChangeLogin}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="loginPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="loginPassword"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      value={userLogin.password}
                      onChange={handleChangeLogin}
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
          </TabPane>
          <TabPane tab="Registration" key="registration">
            <div className=" flex items-start justify-center">
              <div className="max-w-md w-full pb-4">
                <form className="space-y-4" onSubmit={onFinishRegistration}>
                  <div>
                    <label
                      htmlFor="registrationUsername"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <input
                      type="username"
                      id="registrationUsername"
                      name="username"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      value={userRegister.username}
                      onChange={(e) =>
                        setUserRegister({
                          ...userRegister,
                          username: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="registrationEmail"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="registrationEmail"
                      name="email"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      value={userRegister.email}
                      onChange={(e) =>
                        setUserRegister({
                          ...userRegister,
                          email: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="registrationPassword"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="registrationPassword"
                      className="mt-1 p-2 block w-full rounded-md border border-gray-300"
                      value={userRegister.password}
                      onChange={(e) =>
                        setUserRegister({
                          ...userRegister,
                          password: e.target.value,
                        })
                      }
                    />
                  </div>
                  <Button
                    text="Register"
                    style="bg-[#996CF1] text-white p-2 rounded hover:bg-[#a885ed]"
                  />
                </form>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthenticationPage;
