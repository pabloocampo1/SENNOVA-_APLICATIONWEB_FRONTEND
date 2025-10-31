import { Box, Button, Typography } from "@mui/material";
import React from "react";
import image from "../assets/images/undraw_authentication_tbfc.svg";
import { useNavigate } from "react-router-dom";

const NoAccessModal = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: "350px",
                height: "400px",
                p: "20px",
                bgcolor: "white",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                flexDirection: "column",
            }}
        >
            <img src={image} width={100} alt="security_image" />
            <Typography sx={{ mt: "20px", mb: "20px" }}>
                No tienes acceso a este recurso o tu sesion fue cerrada, por
                favor inicia sesion.
            </Typography>
            <Button
                onClick={() => navigate("/signIn")}
                variant="outlined"
                sx={{ mt: "20px" }}
            >
                Inicio de sesion
            </Button>
        </Box>
    );
};
export default NoAccessModal;
