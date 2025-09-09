import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

// interceptor para meter JWT automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // manejar logout o refresh token
    }
    return Promise.reject(error);
  }
);

export default api;
