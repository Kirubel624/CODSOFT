import axios from "axios";

const api = axios.create({
  baseURL: "https://quiztime-wjxb.onrender.com",
});

export default api;
