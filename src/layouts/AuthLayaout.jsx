import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import logoSena from "../assets/images/logo-sena-verde-png-sin-fondo.png"

const AuthLayaout = () => {
    return (
        <Box sx={{
            width: "100vw",
            height: "100vh",
           background: "linear-gradient(to bottom, #000000 0%, #004d3c 100%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
        }}>

            <Box sx={{
                position: "absolute",
                top: "2%",
                right: "3%"
            }}>
                <img src={logoSena} width={60} height={60} alt="logo sena" />
            </Box>
            <Outlet />
        </Box>
    );
};

export default AuthLayaout;