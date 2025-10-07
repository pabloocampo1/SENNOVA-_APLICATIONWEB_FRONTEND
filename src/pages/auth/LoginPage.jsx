import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import logoSennova from "../../assets/images/sennova_logo_sin_fondo.png"
import { Link } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { Google } from '@mui/icons-material';
import { useAuth } from '../../context/AuthContext';
import SimpleBackdrop from '../../components/SimpleBackDrop';
import api from '../../service/axiosService';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const [isLoanding, setIsLoanding] = useState(false);
    const [messageErrorSignIn, setMessageErrorSignIn] = useState(false);
    const { signIn, signInWithGoogle } = useAuth();

    const handleSuccess = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const res = await api.post("/auth/signIn/google", { token });
            console.log(res);

            signInWithGoogle(res.data)

        } catch (err) {
            console.error("Error Google login:", err);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoanding(true)

        const fetchAuth = async (username, password) => {

            try {
                const response = await signIn(username, password);
              
                if (!response.status) {
                    setError(true)
                    setMessageErrorSignIn(response.message);
                }

            } catch (error) {
                console.error(error);
            
                setError(true)
            }
        }

        fetchAuth(username, password)

        setIsLoanding(false)
    }

    return (
        <Box sx={{
            width: { xs: "85%", md: "60%", lg: "30%" },
            height: { xs: "80%", md: "70%", lg: "65%" },
            bgcolor: "white",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            pl: "50px",
            pr: "50px",
        }}>
            {isLoanding && (<SimpleBackdrop open={isLoanding} />)}
            <Box sx={{ mt: "20px" }}>
                <img src={logoSennova} width={300} alt="logo sennova" />
            </Box>

            <Box component={"form"} onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <Typography variant="h2" sx={{ fontWeight: "700", textAlign: "center", pt: "20px", color: "black" }}>Bienvenido</Typography>
                <Typography variant='body1' sx={{ textAlign: "center", opacity: "0.70", pt: "2px", color: "black" }}>Ingresa tu usuario y contraseña para ingresar al sistema</Typography>


                <Stack spacing={2} sx={{ width: "100%", mt: { xs: 6, md: 8 } }}>
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
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }} >
                    <FormControlLabel sx={{
                        "& .MuiFormControlLabel-label": {
                            color: "primary.main",
                        },
                    }} control={<Checkbox defaultChecked />} label="Guardar sesion" />

                    <Link to={"/"} style={{ color: "black", opacity: "0.70" }}>Olvide mi contraseña</Link>

                </Box>
                {error && (<Typography sx={{ color: "red" }}>{messageErrorSignIn}</Typography>)}

                <Button type='submit' sx={{ width: "100%", mt: "40px" }} variant='outlined'>Iniciar sesion</Button>

                <Typography sx={{ fontSize: "0.90rem", mt: "20px", color: "black" }}>O tambien puedes:</Typography>

                <Box sx={{ mt: "10px" }}>
                    <GoogleLogin
                        onSuccess={handleSuccess}
                        onError={() => console.log("Error al iniciar con Google")}
                    />
                </Box>

            </Box>

        </Box>
    );
};

export default LoginPage;