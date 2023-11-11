import axios from "axios";

const api = axios.create({
  baseURL: "https://joby-s63h.onrender.com/",
});

export default api;
