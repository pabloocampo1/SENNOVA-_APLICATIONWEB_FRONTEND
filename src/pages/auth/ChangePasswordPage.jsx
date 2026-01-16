import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { publicApi } from "../../service/axiosService";
import SimpleBackdrop from "../../components/SimpleBackDrop";

const ChangePasswordPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { token } = useParams();

    const [dataAuthRequest, setDataAuthRequest] = useState({
        token: token,
        newPassword: "",
    });
    const [changePasswordState, setChangePasswordState] = useState(false);
    const navigate = useNavigate();
    const theme = useTheme();
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordShort, setPasswordShort] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const res = await publicApi.post(
                "/auth/password/reset",
                dataAuthRequest
            );
            if (res.status == 204) {
                setChangePasswordState(true);
            }
            console.log(res);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const validateToken = async () => {
        try {
            const res = await publicApi.get(
                `/auth/password/reset-token/${token}`
            );
            if (res.status !== 200) {
                navigate("/signIn/token-expired");
            }
        } catch (error) {
            navigate("/signIn/token-expired");
            console.error(error);
        }
    };

    useEffect(() => {
        validateToken();
    }, []);

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
            {changePasswordState ? (
                <Box sx={{ p: "40px 0px" }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "700",
                            textAlign: "center",
                            mb: "20px",
                            color: "primary.main",
                        }}
                    >
                        ¡Contraseña actualizada!
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            textAlign: "center",
                            color: "text.secondary",
                        }}
                    >
                        Tu contraseña ha sido restablecida con éxito. Ahora
                        puedes iniciar sesión con tus nuevas credenciales.
                    </Typography>

                    <Button
                        onClick={() => navigate("/signIn")}
                        fullWidth
                        variant="contained"
                        sx={{ mt: "20px" }}
                    >
                        Inicio sesion
                    </Button>
                </Box>
            ) : (
                <Box>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: "700",
                            mb: 10,
                            color: "primary.main",
                        }}
                    >
                        Cambiar contraseña
                    </Typography>
                    <SimpleBackdrop open={isLoading} />

                    <Box
                        component={"form"}
                        onSubmit={handleSubmit}
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            mb: 10,
                        }}
                    >
                        <TextField
                            fullWidth
                            type="password"
                            name="newPassword"
                            label="Nueva contraseña"
                            placeholder="Digita tu nueva contraseña"
                            required
                            value={dataAuthRequest.newPassword}
                            error={passwordShort}
                            helperText={
                                passwordShort
                                    ? "La contraseña es demasiado corta (mínimo 8 caracteres)"
                                    : ""
                            }
                            onChange={(e) => {
                                const value = e.target.value;

                                setDataAuthRequest({
                                    ...dataAuthRequest,
                                    newPassword: value,
                                });

                                if (value.length > 0 && value.length < 8) {
                                    setPasswordShort(true);
                                } else {
                                    setPasswordShort(false);
                                }
                            }}
                            sx={{ mb: 2 }}
                        />

                        <TextField
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirma tu nueva contraseña"
                            label="Confirmar contraseña"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={
                                !dataAuthRequest.newPassword ||
                                dataAuthRequest.newPassword !== confirmPassword
                            }
                        >
                            Cambiar contraseña
                        </Button>
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default ChangePasswordPage;
