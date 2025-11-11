import { Close, CloseOutlined, Info, Send } from "@mui/icons-material";
import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import CustomerInfoQuote from "./CustomerInfoQuote";
import api from "../../../../service/axiosService";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";

const ModalToAcceptQuote = ({
    onClose,
    openSelectMembers,
    customerInfo = {},
    updateData,
    testRequestId,
}) => {
    const [objectToSend, setObjectToSend] = useState({
        emailCustomer: customerInfo.email,
        isApproved: true,
        message: "",
        testRequestId: testRequestId,
    });
    const [isLoanding, setIsLoanding] = useState(false);
    const theme = useTheme();

    const handleSend = async () => {
        setIsLoanding(true);
        try {
            const res = await api.put(
                "/testRequest/accept-or-reject-test-request",
                objectToSend
            );

            updateData(res.data);
            openSelectMembers();
            onClose();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    return (
        <Box
            sx={{
                width: { xs: "300px", md: "600px" },
            }}
        >
            <SimpleBackdrop open={isLoanding} text="Aceptando cotizacion..." />

            <Box
                sx={{
                    display: "grid",
                    justifyContent: "end",
                    mb: "20px",
                }}
                onClick={() => onClose()}
            >
                <CloseOutlined
                    sx={{
                        ":hover": {
                            bgcolor: `${theme.palette.primary.main + "20"}`,
                            p: "2px",
                            borderRadius: "50px",
                            border: `1pz solid ${theme.palette.primary.main}`,
                        },
                    }}
                />
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
                value={objectToSend.message || ""}
                onChange={(e) =>
                    setObjectToSend({
                        ...objectToSend,
                        message: e.target.value,
                    })
                }
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
                Aceptar y enviar respuesta
            </Button>
        </Box>
    );
};

export default ModalToAcceptQuote;
