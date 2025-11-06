import { Box, Button, Typography, alpha, Stack } from "@mui/material";
import React, { useState } from "react";
import {
    WarningAmber,
    Delete,
    Close,
    CheckCircleOutline,
} from "@mui/icons-material";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";
import api from "../../../../service/axiosService";

const ModalToDeleteTestRequest = ({
    onClose,
    onCloseDeleted,
    requestCode,
    isAccepted,
    testRequestId,
}) => {
    const [loanding, setLoading] = useState(false);

    const method = async () => {
        setLoading(true);
        try {
            const res = await api.delete(
                `/testRequest/delete-by-id/${testRequestId}`
            );
            if (res.status == 200) {
                onCloseDeleted();
            }
            console.log(res);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                width: "450px",
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            <SimpleBackdrop open={loanding} />

            <Box
                onClick={onClose}
                sx={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    cursor: "pointer",
                    bgcolor: alpha("#000", 0.04),
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "&:hover": {
                        bgcolor: alpha("#000", 0.08),
                    },
                }}
            >
                <Close sx={{ fontSize: 18 }} />
            </Box>

            {isAccepted ? (
                <>
                    <Box
                        sx={{
                            width: 70,
                            height: 70,
                            borderRadius: "50%",
                            bgcolor: alpha("#22C55E", 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 2,
                        }}
                    >
                        <CheckCircleOutline
                            sx={{ fontSize: 36, color: "success.main" }}
                        />
                    </Box>

                    <Stack spacing={1} sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            Cotización aceptada
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ px: 2 }}
                        >
                            La cotización <strong>{requestCode}</strong> ya fue
                            aceptada y ahora es un ensayo. Para eliminarla,
                            dirígete a la sección de ensayos y elimínala desde
                            allí.
                        </Typography>
                    </Stack>

                    <Button
                        variant="contained"
                        onClick={onClose}
                        sx={{ mt: 2 }}
                    >
                        Cerrar
                    </Button>
                </>
            ) : (
                <>
                    <Box
                        sx={{
                            width: 70,
                            height: 70,
                            borderRadius: "50%",
                            bgcolor: alpha("#f44336", 0.1),
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mb: 2,
                            position: "relative",
                            "&::before": {
                                content: '""',
                                position: "absolute",
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                bgcolor: alpha("#f44336", 0.2),
                                animation: "pulse 2s infinite",
                            },
                            "@keyframes pulse": {
                                "0%, 100%": {
                                    transform: "scale(1)",
                                    opacity: 1,
                                },
                                "50%": {
                                    transform: "scale(1.1)",
                                    opacity: 0.5,
                                },
                            },
                        }}
                    >
                        <WarningAmber
                            sx={{
                                fontSize: 36,
                                color: "error.main",
                                zIndex: 1,
                            }}
                        />
                    </Box>

                    <Stack spacing={1} sx={{ textAlign: "center", mb: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 700 }}>
                            ¿Eliminar elemento?
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ px: 2 }}
                        >
                            Esta acción no se puede deshacer. Seguro que deseas
                            eliminar esta cotizacion? #{requestCode}.
                        </Typography>
                    </Stack>

                    <Stack
                        direction="row"
                        spacing={2}
                        sx={{ width: "100%", mb: 2 }}
                    >
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            startIcon={<Close />}
                            sx={{
                                flex: 1,
                                borderColor: "divider",
                                color: "text.primary",
                                "&:hover": {
                                    borderColor: "text.secondary",
                                    bgcolor: alpha("#000", 0.04),
                                },
                            }}
                        >
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => method()}
                            startIcon={<Delete />}
                            sx={{
                                flex: 1,
                                boxShadow: 2,
                                "&:hover": { boxShadow: 4 },
                            }}
                        >
                            Eliminar
                        </Button>
                    </Stack>
                </>
            )}
        </Box>
    );
};

export default ModalToDeleteTestRequest;
