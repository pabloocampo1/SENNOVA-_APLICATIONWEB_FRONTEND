import { Box, Button, Checkbox, FormControlLabel, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import logoSennova from "../../assets/images/sennova_logo_sin_fondo.png"
import { Link } from 'react-router-dom';
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { Google } from '@mui/icons-material';

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => console.log("✅", tokenResponse),
        onError: () => console.log("❌ Error"),
    });

    const handleSubmit = () => {
        const authDto = {
            "username": username,
           "password": password
        }
        
    }

    return (
        <Box sx={{
            width: { xs: "85%", md: "60%", lg:"40%"},
            height: { xs: "80%", md: "70%" },
            bgcolor: "white",
            borderRadius: "15px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            pl: "50px",
            pr: "50px",
        }}>

            <Box sx={{ mt: "20px" }}>
                <img src={logoSennova} width={300} alt="logo sennova" />
            </Box>

            <Box component={"form"} onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <Typography variant="h2" sx={{ fontWeight: "700", textAlign: "center", pt: "20px" }}>Bienvenido</Typography>
                <Typography variant='body1' sx={{ textAlign: "center", opacity: "0.70", pt: "5px" }}>Ingresa tu usuario y contraseña para ingresar al sistema</Typography>


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

                <Button type='submit' sx={{ width: "100%", mt: "50px" }} variant='outlined'>Iniciar sesion</Button>

                <Typography sx={{ fontSize: "0.90rem", mt: "20px" }}>O tambien puedes:</Typography>

                <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<Google />}
                    onClick={() => login()}
                    sx={{
                        width: "100%",
                        backgroundColor: "#39A900",
                        color: "#eeeeeeff",
                        mt: "20px",

                    }}
                >
                    Iniciar sesión con Google
                </Button>

            </Box>

        </Box>
    );
};

export default LoginPage;