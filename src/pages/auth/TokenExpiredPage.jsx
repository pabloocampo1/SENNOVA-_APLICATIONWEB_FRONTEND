import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useNavigate } from "react-router-dom";
import logoSennova from "../../assets/images/sennova_logo_sin_fondo.png";

const TokenExpiredPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                p: 2,
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 4, md: 6 },
                    maxWidth: 450,
                    textAlign: "center",
                    borderRadius: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Box sx={{ mb: 4 }}>
                    <img src={logoSennova} width={200} alt="logo sennova" />
                </Box>

                <ErrorOutlineIcon
                    sx={{
                        fontSize: 80,
                        color: "error.main",
                        mb: 2,
                        opacity: 0.8,
                    }}
                />

                <Typography
                    variant="h4"
                    sx={{ fontWeight: 700, mb: 2, color: "text.primary" }}
                >
                    Enlace caducado
                </Typography>

                <Typography
                    variant="body1"
                    sx={{ color: "text.secondary", mb: 4 }}
                >
                    Lo sentimos, el enlace para restablecer tu contraseña ha
                    expirado por seguridad o ya ha sido utilizado. Los enlaces
                    tienen una duración limitada de 15 minutos.
                </Typography>

                <Button
                    fullWidth
                    variant="contained"
                    size="large"
                    onClick={() => navigate("/signIn/forgot-password")}
                    sx={{
                        py: 1.5,
                        fontWeight: "bold",
                        textTransform: "none",
                        fontSize: "1rem",
                    }}
                >
                    Solicitar nuevo enlace
                </Button>

                <Button
                    variant="text"
                    onClick={() => navigate("/login")}
                    sx={{
                        mt: 2,
                        color: "text.secondary",
                        textTransform: "none",
                    }}
                >
                    Volver al inicio de sesión
                </Button>
            </Paper>
        </Box>
    );
};

export default TokenExpiredPage;
