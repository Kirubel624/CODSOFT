import { saveData, clearToken } from "./tokenService";
import api from "../utils/api";
export const login = async (email, password) => {
  try {
    const response = await api.post("/user/login", { email, password });
    saveData(response.data);
    return response.data.token;
  } catch (error) {
    throw error;
  }
};
export const register = async (username, email, password) => {
  // Perform the API call to register the user
  try {
    // Make the API request and handle the response
    const response = await api.post("/user/register", { username, email, password  });

    // Check if the registration was successful
   

      console.log("registration returned data", response);
      // saveData(response.data);
      return response;
  
  } catch (error) {
    throw new Error("Registration failed");
  }
};
