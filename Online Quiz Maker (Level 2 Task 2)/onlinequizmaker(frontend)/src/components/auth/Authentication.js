import React, { useState, useEffect, useMemo } from "react";
import { Form, Input, Card, Tabs, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { loginAsync, registerAsync } from "../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import { MoonLoader } from "react-spinners";

const { TabPane } = Tabs;

const AuthenticationPage = () => {
  const [activeKey, setActiveKey] = useState("login");
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [userRegister, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [loadingM, setLoadingM] = useState(true);
  const [formL] = Form.useForm();
  const [formR] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);
  const isRegister = useSelector((state) => state.auth.isRegistered);



  // Add an effect to update userLogin when userRegister changes

  

  const onFinishLogin = (values) => {
    // Dispatch loginAsync action with values
    dispatch(loginAsync(values)) .then((action) => {
      if (loginAsync.fulfilled.match(action)) {
   
        message.success("Login successful!", 2);


        setUserLogin({email: "", password: "" });
        formL.resetFields(); // Reset the login form
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
console.log(userLogin,"***************")
  const onFinishRegistration = (values) => {
    dispatch(registerAsync(values))
      .then((action) => {
        console.log("Register Async Action Payload: ", action.payload);
        console.log("Server Response Status Code: ", action.payload.status);
  
        if (registerAsync.fulfilled.match(action)) {
          // Handle successful registration
          message.success("Registration successful. You can login now!", 2);
  
          setActiveKey("login");
          setUserLogin((prevVal) => ({
            ...prevVal,
            email: values.email,
            password: values.password,
          }));

          formL.setFieldsValue({ email: values.email, password: values.password }); // Set the fields in the login form
          setUserRegister({ username: "", email: "", password: "" });
          formR.resetFields(); // Reset the registration form
        } else if (registerAsync.rejected.match(action)) {
          // Handle registration error here
          message.error("User with this email or username already exists.", 3);
        }
      })
      .catch((error) => {
        // Handle any additional error cases here
        message.error("Registration failed.", 3);
      });
  };
  
  

  const handleTabChange = (key) => {
    setActiveKey(key);
  };
console.log(userLogin,"user login")
  return (
    <div className="flex flex-col items-center justify-center mt">
      <div className="w-full min-w-[40vw] flex flex-col items-center max-w-sm">
        <h2 className="text-xl text-black italic font-light text-center py-4">
          Take a Quiz! Test yourself
        </h2>
        <Tabs className="w-full" activeKey={activeKey} onChange={handleTabChange}>
          <TabPane tab="Login" key="login">
            <div className="flex items-center justify-center">
              <div className="max-w-md w-full pb-4">
                <Form
                form={formL}
                  name="loginForm"
                  onFinish={onFinishLogin}
                  initialValues={userLogin} // Set initial values for login form fields
                >
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Invalid email format",
                      },
                      {
                        required: true,
                        message: "Email is required",
                      },
                    ]}
                  >
                    <Input type="email" placeholder="Email" value={userLogin.email} />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is required",
                      },
                      {
                        min: 8,
                        message: "Password must be 8 characters long",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" onChange={(e)=>setUserLogin({...userLogin,password:e.target.value})} value={userLogin.password}/>
                  </Form.Item>
                  <Button
                    type="submit"
                    text={
                      <div className="flex items-center justify-around">
                        {loading && (
                          <MoonLoader
                            loading={loadingM}
                            size={20}
                            aria-label="Loading Spinner"
                            color="#FFFFFF"
                          />
                        )}
                        <p className="px-4">Login</p>
                      </div>
                    }
                    style="bg-[#996CF1] text-white p-2 rounded hover-bg-[#a885ed]"
                  />
                </Form>
              </div>
            </div>
          </TabPane>
          <TabPane tab="Registration" key="registration">
            <div className="flex items-start justify-center">
              <div className="max-w-md w-full pb-4">
                <Form
                form={formR}
                  name="registrationForm"
                  onFinish={onFinishRegistration}
                  initialValues={userRegister} // Set initial values for registration form fields
                >
                  <Form.Item
                    name="username"
                    rules={[
                      {
                        required: true,
                        message: "Username is required",
                      },
                    ]}
                  >
                    <Input placeholder="Username" />
                  </Form.Item>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        message: "Invalid email format",
                      },
                      {
                        required: true,
                        message: "Email is required",
                      },
                    ]}
                  >
                    <Input type="email" placeholder="Email" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Password is required",
                      },
                      {
                        min: 8,
                        message: "Password must be 8 characters long",
                      },
                    ]}
                  >
                    <Input.Password placeholder="Password" />
                  </Form.Item>
                  <Button
                    text={
                      <div className="flex items-center justify-around">
                        {loading && (
                          <MoonLoader
                            loading={loadingM}
                            size={20}
                            aria-label="Loading Spinner"
                            color="#FFFFFF"
                          />
                        )}
                        <p className="px-4">Register</p>
                      </div>
                    }
                    style="bg-[#996CF1] text-white p-2 rounded hover-bg-[#a885ed]"
                  />
                </Form>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </div>
  );
};

export default AuthenticationPage;
