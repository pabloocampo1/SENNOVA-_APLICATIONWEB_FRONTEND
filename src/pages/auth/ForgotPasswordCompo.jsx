import {
    Box,
    Button,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import logoSennova from "../../assets/images/sennova_logo_sin_fondo.png";
import api from "../../service/axiosService";
import ButtonBack from "../../components/ButtonBack";
import { Link, Navigate } from "react-router-dom";
const ForgotPasswordCompo = () => {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSentCode, setIsSentCode] = useState(false);
    const [error, setError] = useState({ state: false, text: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError({ state: false, text: "" });

        try {
            const res = await api.post("/auth/password/reset-token", {
                email,
            });

            setIsSentCode(true);
        } catch (error) {
            console.error(error);

            setError({
                state: true,
                text: "No pudimos procesar tu solicitud. Inténtalo más tarde.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                width: { xs: "90%", md: "450px" },
                p: { xs: 3, md: 5 },
                bgcolor: "white",
                borderRadius: "15px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
                boxShadow: "0px 10px 30px rgba(0,0,0,0.1)",
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "3%",
                    left: "2%",
                }}
            >
                <ButtonBack text="Inicio sesion" />
            </Box>
            <Box sx={{ mb: 3 }}>
                <img src={logoSennova} width={220} alt="logo sennova" />
            </Box>

            <Typography
                variant="h5"
                sx={{ fontWeight: "700", mb: 1, color: "primary.main" }}
            >
                ¿Olvidaste tu contraseña?
            </Typography>

            <Typography
                variant="body2"
                sx={{ textAlign: "center", color: "text.secondary", mb: 3 }}
            >
                Ingresa tu correo electrónico y te enviaremos las instrucciones
                para restablecer tu acceso.
            </Typography>

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ width: "100%", display: "flex", flexDirection: "column" }}
            >
                <TextField
                    fullWidth
                    type="email"
                    label="Correo electrónico"
                    variant="outlined"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isSentCode || isLoading}
                    sx={{ mb: 3 }}
                />

                <Button
                    fullWidth
                    variant="contained"
                    type="submit"
                    disabled={isLoading || isSentCode}
                    sx={{ py: 1.5, fontWeight: "bold" }}
                >
                    {isLoading
                        ? "Enviando..."
                        : isSentCode
                        ? "Correo enviado"
                        : "Restablecer contraseña"}
                </Button>
            </Box>

            {(isSentCode || error.state) && (
                <Typography
                    variant="caption"
                    sx={{
                        mt: 2,
                        textAlign: "center",
                        color: error.state ? "error.main" : "success.main",
                        fontWeight: "500",
                    }}
                >
                    {error.state
                        ? error.text
                        : "Si el correo está registrado, recibirás un mensaje en los próximos minutos."}
                </Typography>
            )}

            {isSentCode && (
                <Box sx={{ mt: 3, textAlign: "center" }}>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        ¿No recibiste el correo?{" "}
                        <span
                            style={{
                                color: theme.palette.primary.main,
                                cursor: "pointer",
                                textDecoration: "underline",
                            }}
                        >
                            Reenviar código
                        </span>
                    </Typography>
                </Box>
            )}

            <Typography
                variant="caption"
                sx={{ mt: 4, color: "text.disabled", textAlign: "center" }}
            >
                Si presentas problemas persistentes, contacta al soporte técnico
                o a un administrador del sistema.
            </Typography>
        </Box>
    );
};

export default ForgotPasswordCompo;
