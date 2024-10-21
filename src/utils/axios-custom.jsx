import axios from "axios";

const API_URL = "https://6ae2-14-191-223-23.ngrok-free.app/";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    console.log(config);
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default api;
