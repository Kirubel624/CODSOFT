import { saveData, clearToken } from "./tokenService";
import api from "../utils/api";
export const login = async (email, password) => {
  try {
    const response = await api.post("user/login", { email, password });
    saveData(response.data);
    return response.data.token;
  } catch (error) {
    throw error;
  }
};
