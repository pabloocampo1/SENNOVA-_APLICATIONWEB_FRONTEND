import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ModalMessage = ({ message, onClose }) => {
    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
            }}
        >
            <Typography sx={{ p: "20px" }}>{message}</Typography>

            <Button
                variant="outlined"
                onClick={() => onClose()}
                sx={{ mt: "20px" }}
            >
                Cerrar
            </Button>
        </Box>
    );
};

export default ModalMessage;
