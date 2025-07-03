
import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3032";

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`, // Use the variable here
  withCredentials: true,
});



api.interceptors.request.use(
  (config) => {
    //  token from local storage
    const token = localStorage.getItem("accessToken");
    if (token) {
      // If the token exists
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config; 
  },
  (error) => {
    
    return Promise.reject(error);
  }
);

export default api;
