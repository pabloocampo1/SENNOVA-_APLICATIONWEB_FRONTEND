/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import api, { injectTokenGetter } from "../service/axiosService";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();



export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [authObject, setAuthObject] = useState({
        "username": "",
        "name": "",
        "isAuthenticate": false,
        "role": ""
    })
    const [loading, setLoading] = useState(true);

    const getToken = () => {
        return token;
    }

    const signIn = async (username, password) => {

        try {
            const authRequest = { "username": username, "password": password };
            console.log(authRequest);
            const response = await api.post("/auth/signIn", authRequest);

            const data = response.data;

            if (data.accessToken) {
                setToken(data.accessToken);
                navigate("/system");
            }

            setAuthObject({
                username: data.username,
                name: data.name,
                isAuthenticate: data.status,
                role: data.authorities
            })

        } catch (error) {

            return {
                "status": false,
                "message": error.response.data.message
            };
        }
    };

    const logout = async () => {
        const fetchLogout = async () => {
            try {
                const username = authObject.username;
                const response = await api.post("/auth/logout", null, {
                    params: { username: username }
                })

                if (response.status !== 200) {
                    alert("Ocurrio un error al intentar cerrar sesion, por favor, notificar este error.")
                } else {
                    localStorage.removeItem("token")
                    setAuthObject({
                        "username": "",
                        "name": "",
                        "isAuthenticate": false,
                        "role": ""
                    })
                }

            } catch (error) {
                alert("Ocurrio un error al intentar cerrar sesion, por favor, notificar este error.")
                console.error(error);
            }
        }

        fetchLogout()
    }


    useEffect(() => {

        const tryRefresh = async () => {
            try {
                console.log("hola");

                const res = await api.post("/auth/refresh/token");
                console.log(res);

                setToken(res.data.accessToken);
                setAuthObject({
                    username: res.data.username,
                    name: res.data.name,
                    isAuthenticate: res.data.status,
                    role: res.data.authorities
                })
            } catch (err) {
                console.log("No se pudo refrescar el token", err);
            } finally {
                setLoading(false);
            }
        };

        tryRefresh();
        injectTokenGetter(() => token);
        console.log(authObject);

    }, []);



    return (
        <AuthContext.Provider value={{ token, setToken, getToken, signIn, logout, authObject, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
