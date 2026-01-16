import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    Stack,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import logoSennova from "../../assets/images/sennova_logo_sin_fondo.png";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { Google } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";

import api from "../../service/axiosService";
import TitleSoftware from "../../components/TitleSoftware";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        state: false,
        text: "",
    });
    const theme = useTheme();

    const [isLoanding, setIsLoanding] = useState(false);

    const { signIn, signInWithGoogle } = useAuth();

    const handleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const res = await api.post("/auth/signIn/google", { token });
            console.log(res);

            signInWithGoogle(res.data);
        } catch (err) {
            setError({
                state: true,
                text: `Error Google login : ${err}`,
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoanding(true);
        setError({ state: false, text: "" });

        try {
            const response = await signIn(username, password);

            if (!response?.status) {
                setError({
                    state: true,
                    text: "Credenciales inválidas",
                });
            }
        } catch (error) {
            console.error(error);
            setError({
                state: true,
                text: `Error de conexión o servidor`,
            });
        } finally {
            setIsLoanding(false);
        }
    };

    return (
        <Box
            sx={{
                width: { xs: "100%", md: "90%", lg: "30%" },
                height: { xs: "100%", md: "80%", lg: "70%" },
                bgcolor: "white",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                pl: "50px",
                pr: "50px",
                border: `1px solid ${theme.palette.primary.main}`,
            }}
        >
            <Box sx={{ mt: "20px" }}>
                <img src={logoSennova} width={300} alt="logo sennova" />
            </Box>

            <Box
                component={"form"}
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        fontWeight: "700",
                        textAlign: "center",
                        pt: "20px",
                        color: "black",
                    }}
                >
                    Bienvenido
                </Typography>
                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                        opacity: "0.70",
                        pt: "2px",

                        color: "black",
                    }}
                >
                    Ingresa tu usuario y contraseña para ingresar al sistema
                </Typography>
                <TitleSoftware />

                <Stack spacing={2} sx={{ width: "100%", mt: { xs: 4, md: 5 } }}>
                    <TextField
                        fullWidth
                        id="username"
                        label="Usuario"
                        variant="outlined"
                        placeholder="Ingresa tu nombre de usuario"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#f5f5f5",
                                color: "#000",
                                "& fieldset": {
                                    borderColor: "#ccc",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#39A900",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#39A900",
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "#666",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#39A900",
                            },
                        }}
                    />

                    <TextField
                        fullWidth
                        id="password"
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                        placeholder="Ingresa tu contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                backgroundColor: "#f5f5f5",
                                color: "#000",
                                "& fieldset": {
                                    borderColor: "#ccc",
                                },
                                "&:hover fieldset": {
                                    borderColor: "#39A900",
                                },
                                "&.Mui-focused fieldset": {
                                    borderColor: "#39A900",
                                },
                            },
                            "& .MuiInputLabel-root": {
                                color: "#666",
                            },
                            "& .MuiInputLabel-root.Mui-focused": {
                                color: "#39A900",
                            },
                        }}
                    />
                </Stack>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <FormControlLabel
                        sx={{
                            "& .MuiFormControlLabel-label": {
                                color: "primary.main",
                            },
                        }}
                        control={<Checkbox defaultChecked />}
                        label="Guardar sesion"
                    />

                    <Link
                        to={"forgot-password"}
                        style={{ color: "black", opacity: "0.70" }}
                    >
                        Olvide mi contraseña
                    </Link>
                </Box>
                {error.state && (
                    <Typography sx={{ color: "red" }}>{error.text}</Typography>
                )}

                <Button
                    disabled={isLoanding}
                    type="submit"
                    variant="contained" // El "contained" suele verse mejor para la acción principal
                    sx={{
                        width: "100%",
                        mt: "40px",
                        bgcolor: "#39A900", // Color verde SENA
                        "&:hover": { bgcolor: "#2e8600" },
                    }}
                >
                    {isLoanding ? "Cargando..." : "Iniciar sesión"}
                </Button>

                <Typography
                    sx={{ fontSize: "0.90rem", mt: "20px", color: "black" }}
                >
                    O tambien puedes:
                </Typography>

                <Box sx={{ mt: "10px", mb: "30px" }}>
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() =>
                            console.log("Error al iniciar con Google")
                        }
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default LoginPage;
