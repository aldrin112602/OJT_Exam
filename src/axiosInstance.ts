import axios, { AxiosInstance } from 'axios';

// Create an Axios instance with default configurations
const axiosInstance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_REACT_APP_API_BASE_URL || 'http://localhost:3000/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
