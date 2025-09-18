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
        "position": "",
        "imageProfile": "",
        "role": "",
        "preferencesNotification": null,
        "email": "",
        "lastSession": ""
    })
    const [loading, setLoading] = useState(true);


    const getToken = () => {
        return token;
    }

    const signIn = async (username, password) => {
        localStorage.removeItem("SectionName");
        localStorage.removeItem("PathName");

        try {
            const authRequest = { "username": username, "password": password };
            console.log(authRequest);
            const response = await api.post("/auth/signIn", authRequest);

            const data = response.data;


            console.log(data);

            setAuthObject({
                username: data.username,
                name: data.name,
                isAuthenticate: data.status,
                position: data.position,
                imageProfile: data.imageProfile,
                role: data.authorities,
                preferencesNotification: data.userPreferenceResponse,
                email: data.email,
                lastSession: data.lastSession
            })

            if (data.accessToken) {
                setToken(data.accessToken);
                navigate("/system");
            }

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
                    position: objectResponse.position,
                    imageProfile: objectResponse.imageProfile,
                    role: objectResponse.authorities,
                    preferencesNotification: objectResponse.userPreferenceResponse,
                    email: objectResponse.email,
                    lastSession: objectResponse.lastSession
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
                        "imageProfile": "",
                        "position": "",
                        "role": "",
                        "preferencesNotification": null,
                        "email": null,
                        "lastSession":""
                    })
                    setToken("")
                    localStorage.removeItem("SectionName");
                    localStorage.removeItem("PathName");
                }

            } catch (error) {
                alert("Ocurrio un error al intentar cerrar sesion, por favor, notificar este error.")
                console.error(error);
            }
        }

        fetchLogout()
    }

    const tryRefresh = async () => {
        try {
            const res = await api.post("/auth/refresh/token");
            setToken(res.data.accessToken);
            setAuthObject({
                username: res.data.username,
                name: res.data.name,
                isAuthenticate: res.data.status,
                position: res.data.position,
                imageProfile: res.data.imageProfile,
                role: res.data.authorities,
                preferencesNotification: res.data.userPreferenceResponse,
                email: res.data.email,
                lastSession: res.data.lastSession
            });
        } catch (err) {
            console.log("No se pudo refrescar el token", err);
            setToken("");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        tryRefresh();
    }, []);

    useEffect(() => {
        injectTokenGetter(() => token);
        injectTokenSetter(setToken);
    }, [token]);


    useEffect(() => {
        if (!loading && token === "") {
            navigate("/signIn");
        }
    }, [token, loading, navigate]);



    return (
        <AuthContext.Provider value={{ token, setToken, getToken, signIn, logout, authObject, loading, signInWithGoogle, setAuthObject }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);
