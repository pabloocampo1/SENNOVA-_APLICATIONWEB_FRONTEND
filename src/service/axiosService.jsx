
import axios from "axios";




let getTokenFn; 

export const injectTokenGetter = (fn) => {
  getTokenFn = fn;
};



const api = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    if (getTokenFn) {
      const token = getTokenFn(); 
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
