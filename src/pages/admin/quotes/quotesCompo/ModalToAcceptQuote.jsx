import { Close, Info, Send } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import CustomerInfoQuote from "./CustomerInfoQuote";

const ModalToAcceptQuote = ({ onClose, customerInfo = {} }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        alert(text);
    };

    return (
        <Box
            sx={{
                width: { xs: "300px", md: "600px" },
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                    mb: "40px",
                }}
            >
                <Box
                    onClick={() => onClose()}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        p: "10px",
                        ":hover": {
                            bgcolor: "#42664090",
                            borderRadius: "20px",
                            cursor: "pointer",
                        },
                    }}
                >
                    <Typography>Cancelar</Typography>
                    <Close />
                </Box>
            </Box>

            <Typography variant="h3" sx={{ textAlign: "center", mb: "20px" }}>
                Envio de respuesta cotizacion aceptada
            </Typography>

            <Typography>
                Agregar notas adicionales al correo electronico.
            </Typography>

            <TextField
                label="Texto adicional / indicaciones adicionales"
                placeholder="Escribe aquí..."
                multiline
                minRows={4}
                maxRows={8}
                fullWidth
                value={text || ""}
                onChange={(e) => setText(e.target.value)}
                variant="outlined"
                sx={{
                    mt: 2,
                }}
            />

            <Typography
                variant="body2"
                sx={{ display: "flex", alignItems: "center" }}
            >
                <Info /> El correo sera enviado al cliente con email:{" "}
                {customerInfo.email}
            </Typography>

            <Button
                onClick={() => handleSend()}
                startIcon={<Send />}
                variant="contained"
                sx={{
                    width: "100%",
                    mt: "40px",
                    mb: "30px",
                }}
            >
                Enviar
            </Button>
        </Box>
    );
};

export default ModalToAcceptQuote;
