import axios, { AxiosInstance } from "axios";

// Create an Axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_REACT_APP_API_BASE_URL || "http://localhost:3000/",
  timeout: 10000,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
