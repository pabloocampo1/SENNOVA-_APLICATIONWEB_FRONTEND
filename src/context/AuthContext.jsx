/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import api, { injectTokenGetter, injectTokenSetter } from "../service/axiosService";
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

    const signInWithGoogle = (objectResponse) => {

        if (objectResponse.status) {

            if (objectResponse.accessToken) {
                setAuthObject({
                    username: objectResponse.username,
                    name: objectResponse.name,
                    isAuthenticate: objectResponse.status,
                    role: objectResponse.authorities
                })
                setToken(objectResponse.accessToken);
                console.log(objectResponse);

                navigate("/system");
            }
        }
    }

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
                    setToken("")
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

                const res = await api.post("/auth/refresh/token");
                console.log(res);

                setToken(res.data.accessToken);
                setAuthObject({
                    username: res.data.username,
                    name: res.data.name,
                    isAuthenticate: res.data.status,
                    role: res.data.authorities
                })
                console.log(res);

            } catch (err) {
                console.log("No se pudo refrescar el token, en el useEffect", err);
            } finally {
                setLoading(false);
            }
        };

        tryRefresh();

    }, []);

    useEffect(() => {
        injectTokenGetter(() => token);
        injectTokenSetter(setToken)
        console.log("se actualizo.");
        
    }, [token]);


    useEffect(() => {
        if (token === "") {
            setAuthObject({
                username: "",
                name: "",
                isAuthenticate: false,
                role: ""
            });
            navigate("/signIn");
        }
    }, [token]);



    return (
        <AuthContext.Provider value={{ token, setToken, getToken, signIn, logout, authObject, loading, signInWithGoogle }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
