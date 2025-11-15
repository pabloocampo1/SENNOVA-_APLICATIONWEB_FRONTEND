import { Box, Button, Typography, alpha, Stack } from "@mui/material";
import React from "react";
import { WarningAmber, Close } from "@mui/icons-material";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";

const NoPermissionCompo = ({ onClose, loanding }) => {
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
                    "&:hover": { bgcolor: alpha("#000", 0.08) },
                }}
            >
                <Close sx={{ fontSize: 18 }} />
            </Box>

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
                        "0%, 100%": { transform: "scale(1)", opacity: 1 },
                        "50%": { transform: "scale(1.1)", opacity: 0.5 },
                    },
                }}
            >
                <WarningAmber
                    sx={{ fontSize: 36, color: "error.main", zIndex: 1 }}
                />
            </Box>

            <Stack spacing={1} sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    Acceso denegado
                </Typography>
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ px: 2 }}
                >
                    No tienes los permisos necesarios para eliminar este
                    elemento. Si crees que esto es un error, contacta con un
                    administrador.
                </Typography>
            </Stack>

            <Button
                variant="contained"
                color="error"
                onClick={onClose}
                sx={{ mt: 2 }}
            >
                Cerrar
            </Button>
        </Box>
    );
};

export default NoPermissionCompo;
