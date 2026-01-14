import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import logoSena from "../assets/images/logo-sena-verde-png-sin-fondo.png";
const AuthLayaout = () => {
    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)), 
                                  url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpTdFBtpCDOg8TlbbCShVHU5Q1L3CdS57CAg&s)`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "cover",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "2%",
                    right: "3%",
                    zIndex: 20,
                }}
            >
                <img src={logoSena} width={60} height={60} alt="logo sena" />
            </Box>

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 10,
                }}
            >
                <Outlet />
            </Box>
        </Box>
    );
};

export default AuthLayaout;
