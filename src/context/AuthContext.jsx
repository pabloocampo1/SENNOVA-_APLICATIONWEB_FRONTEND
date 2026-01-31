/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import api, {
    injectTokenGetter,
    injectTokenSetter,
} from "../service/axiosService";
import { useNavigate } from "react-router-dom";

// loggedOut is for block the access to refresh token, if the user logout so, not do the refresh token

// regresh token is for auto login if the refresh token is valid and the user not do logout

export const AuthContext = createContext();

console;

export const AuthContextProvider = ({ children }) => {
    const [token, setToken] = useState("");
    const navigate = useNavigate();
    const [authObject, setAuthObject] = useState({
        username: "",
        name: "",
        isAuthenticate: false,
        position: "",
        imageProfile: "",
        role: "",
        preferencesNotification: null,
        email: "",
        lastSession: "",
        available: false,
    });
    const [loading, setLoading] = useState(true);

    const getToken = () => {
        return token;
    };

    const signIn = async (username, password) => {
        localStorage.removeItem("loggedOut");

        localStorage.removeItem("SectionName");
        localStorage.removeItem("PathName");

        try {
            const authRequest = { username: username, password: password };

            const response = await api.post("/auth/signIn", authRequest);

            const data = response.data;

            setAuthObject({
                username: data.username,
                name: data.name,
                isAuthenticate: data.status,
                position: data.position,
                imageProfile: data.imageProfile,
                role: data.authorities,
                preferencesNotification: data.userPreferenceResponse,
                email: data.email,
                lastSession: data.lastSession,
                available: data.available,
            });

            if (data.accessToken) {
                setToken(data.accessToken);
                navigate("/system");
            }
        } catch (error) {
            return {
                status: false,
                message: error.response.data.message,
            };
        }
    };

    const signInWithGoogle = (objectResponse) => {
        localStorage.removeItem("loggedOut");

        if (objectResponse.status) {
            if (objectResponse.accessToken) {
                setAuthObject({
                    username: objectResponse.username,
                    name: objectResponse.name,
                    isAuthenticate: objectResponse.status,
                    position: objectResponse.position,
                    imageProfile: objectResponse.imageProfile,
                    role: objectResponse.authorities,
                    preferencesNotification:
                        objectResponse.userPreferenceResponse,
                    email: objectResponse.email,
                    lastSession: objectResponse.lastSession,
                    available: objectResponse.available,
                });
                setToken(objectResponse.accessToken);

                navigate("/system");
            }
        }
    };

    const logout = async () => {
        try {
            await api.post("/auth/logout", null, {
                params: { username: authObject.username },
            });
        } catch (e) {
            console.warn("Error logout backend", e);
        } finally {
            setToken("");
            setAuthObject({
                username: "",
                name: "",
                isAuthenticate: false,
                position: "",
                imageProfile: "",
                role: "",
                preferencesNotification: null,
                email: "",
                lastSession: "",
                available: false,
            });

            //  Flag anti-refresh
            localStorage.setItem("loggedOut", "true");

            navigate("/signIn", { replace: true });
        }
    };

    const tryRefresh = async () => {
        if (localStorage.getItem("loggedOut") === "true") {
            setLoading(false);
            return;
        }

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
                lastSession: res.data.lastSession,
                available: res.data.available,
            });
        } catch {
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
            const publicPaths = ["/signIn", "/public", "/"];
            const isPublic = publicPaths.some((path) =>
                window.location.pathname.startsWith(path),
            );

            if (!isPublic) {
                navigate("/signIn");
            }
        }
    }, [token, loading, navigate]);

    return (
        <AuthContext.Provider
            value={{
                token,
                setToken,
                getToken,
                signIn,
                logout,
                authObject,
                loading,
                signInWithGoogle,
                setAuthObject,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
