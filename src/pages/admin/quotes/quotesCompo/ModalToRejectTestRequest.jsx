import { Close, Error, Info, Send } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import api from "../../../../service/axiosService";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";

const ModalToRejectTestRequest = ({
    onClose,
    customerInfo = {},
    updateData,
    testRequestId,
}) => {
    const [objectToSend, setObjectToSend] = useState({
        emailCustomer: customerInfo.email,
        isApproved: false,
        message: "",
        testRequestId: testRequestId,
    });

    const [isLoanding, setIsLoanding] = useState(false);

    const handleSend = async () => {
        setIsLoanding(true);
        try {
            const res = await api.put(
                "/testRequest/accept-or-reject-test-request",
                objectToSend
            );

            if (res.status === 200) {
                updateData(res.data);
                onClose();
            }
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
            <SimpleBackdrop open={isLoanding} text="Rechazando cotización..." />

            {/* Header */}
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
                            bgcolor: "#ef444430",
                            borderRadius: "20px",
                            cursor: "pointer",
                        },
                    }}
                >
                    <Typography>Cancelar</Typography>
                    <Close />
                </Box>
            </Box>

            <Typography
                variant="h3"
                sx={{
                    textAlign: "center",
                    mb: "20px",
                    color: "error.main",
                    fontWeight: "600",
                }}
            >
                Rechazar cotización
            </Typography>

            <Typography sx={{ mb: 2, textAlign: "center" }}>
                ¿Estas seguro que deseas rechazar esta cotizacion?
            </Typography>

            <Button
                onClick={() => handleSend()}
                startIcon={<Error />}
                variant="contained"
                color="error"
                sx={{
                    width: "100%",
                    mt: "40px",
                    mb: "30px",
                }}
            >
                Rechazar
            </Button>
        </Box>
    );
};

export default ModalToRejectTestRequest;
