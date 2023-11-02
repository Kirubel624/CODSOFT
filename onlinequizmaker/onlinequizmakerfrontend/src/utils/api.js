import axios from "axios";

const api = axios.create({
  baseURL: "http://quiztime-wjxb.onrender.com/",
});

export default api;
