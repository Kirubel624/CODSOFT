import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.8.120:9000/",
});

export default api;
