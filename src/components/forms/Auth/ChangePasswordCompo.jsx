import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import api from "../../../service/axiosService";
import SimpleBackdrop from "../../SimpleBackDrop";
import { AuthContext, useAuth } from "../../../context/AuthContext";

const ChangePasswordCompo = ({ onClose }) => {
    const [isLoanding, setIsLoanding] = useState(false);
    const [dataRequest, setDataRequest] = useState({
        password: "",
        newPassword: "",
    });
    const [confirmPassword, setConfirmPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const { logout } = useAuth(AuthContext);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (dataRequest.newPassword !== confirmPassword) {
            setErrorMessage("Las contraseñas no coinciden.");
            return;
        }

        setIsLoanding(true);

        const fetchChangePassword = async () => {
            try {
                const res = await api.post("/auth/password", dataRequest);
                if (res.data) {
                    setSuccess(true);
                    setErrorMessage("");
                }
                onClose();
            } catch (error) {
                console.error(error);
                setErrorMessage("Error cambiando la contraseña.");
            } finally {
                setIsLoanding(false);
            }
        };

        fetchChangePassword();
    };

    const handleInputChange = (e) => {
        setDataRequest({
            ...dataRequest,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <Box
            sx={{
                width: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >
            <Typography sx={{ textAlign: "center", mb: 2 }}>
                Cambiar contraseña
            </Typography>
            <SimpleBackdrop open={isLoanding} />

            {success ? (
                <Typography sx={{ textAlign: "center", color: "green" }}>
                    ✅ Contraseña cambiada correctamente. Serás redirigido al
                    login.
                </Typography>
            ) : (
                <Box
                    component={"form"}
                    onSubmit={handleSubmit}
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                >
                    <TextField
                        type="password"
                        name="password"
                        value={dataRequest.password}
                        placeholder="Digita tu contraseña actual"
                        label="Contraseña actual"
                        onChange={handleInputChange}
                        required
                    />

                    <TextField
                        type="password"
                        name="newPassword"
                        value={dataRequest.newPassword}
                        placeholder="Digita tu nueva contraseña"
                        label="Nueva contraseña"
                        onChange={handleInputChange}
                        required
                    />

                    <TextField
                        type="password"
                        value={confirmPassword}
                        placeholder="Confirma tu nueva contraseña"
                        label="Confirmar contraseña"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />

                    {errorMessage && (
                        <Typography sx={{ color: "red", textAlign: "center" }}>
                            {errorMessage}
                        </Typography>
                    )}

                    <Button
                        type="submit"
                        variant="contained"
                        disabled={
                            !dataRequest.newPassword ||
                            dataRequest.newPassword !== confirmPassword
                        }
                    >
                        Cambiar contraseña
                    </Button>
                </Box>
            )}

            {!success && (
                <Typography
                    sx={{
                        mt: 2,
                        fontSize: "0.9rem",
                        textAlign: "center",
                        color: "gray",
                    }}
                >
                    Una vez la contraseña sea actualizada, tu sesión actual va a
                    cerrar.
                </Typography>
            )}
        </Box>
    );
};

export default ChangePasswordCompo;
