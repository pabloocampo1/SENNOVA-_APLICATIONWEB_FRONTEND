import axios from "axios";

let getTokenFn;
let setTokenFn;

export const injectTokenGetter = (fn) => {
    getTokenFn = fn;
};

export const injectTokenSetter = (fn) => {
    setTokenFn = fn;
};

const api = axios.create({
    baseURL: "http://sennovaback.duckdns.org/api/v1",
    withCredentials: true,
});

export const publicApi = axios.create({
    baseURL: "http://sennovaback.duckdns.org/api/v1",
    withCredentials: false,
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
    (error) => Promise.reject(error),
);

// Interceptor de respuesta
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (originalRequest.url.includes("/auth/refresh/token")) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            console.log("Se intentó refrescar el token...");

            try {
                const res = await api.post("/auth/refresh/token");
                const newAccessToken = res.data.accessToken;
                if (setTokenFn) {
                    setTokenFn(newAccessToken);
                }

                originalRequest.headers = {
                    ...(originalRequest.headers || {}),
                    Authorization: `Bearer ${newAccessToken}`,
                };

                return axios.request(originalRequest);
            } catch (refreshError) {
                console.error("No se pudo refrescar el token:", refreshError);
                if (setTokenFn) setTokenFn("");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default api;
