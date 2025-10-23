import { Box, IconButton, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext';
import { AccountBox, AccountBoxOutlined, DarkMode, Help, Logout, Settings, Sunny } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// import imageNotImage from "../assets/images/no-image-icon-6.png"

const ProfileUI = () => {
    const { authObject } = useAuth();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const { logout } = useAuth();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);



    return (

        <Box sx={{ mr: "15px" }}>
            <IconButton sx={{
                "&:hover": {
                    backgroundColor: "transparent"
                }
            }} onClick={handleClick}>

                <Box sx={{
                    width: "auto",
                    height: "50%",
                    borderColor: "1px solid red",
                    borderRadius: "20px",
                    display: "flex",
                    alignItems: "start",
                    justifyContent: "end",

                }}>

                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: {xs: "none", sm:"flex"},
                        flexDirection: "column",
                        justifyContent: "end",
                        alignItems: "end",
                        pr: "10px",
                        pl: "10px"
                    }}>
                        <Typography sx={{ fontSize: "16px", fontWeight: "600", opacity: "0.99" }}>{authObject.name}</Typography>
                        <Typography sx={{ fontSize: "14px", opacity: "0.50" }}>{authObject.position}</Typography>
                    </Box>

                    <Box sx={{
                        width: "40px",
                        height: "40px",
                        ml: "5px"
                    }} >
                        <img src={authObject.imageProfile} style={{ width: "100%", borderRadius: "100%", height: "100%" }} alt="profilePhoto" />
                    </Box>






                </Box>
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{ p: 2, width: "300px" }}>
                    <Box sx={{
                        width: "80%",
                        mb: "50px"
                    }}>
                        <Box onClick={() => { handleClose(); navigate("/system/settings"); }} sx={{ display: "flex", alignItems: "center", mt: "20px", ":hover": { cursor: "pointer" } }}>
                            <Settings sx={{ color: 'text.secondary' }} />
                            <Typography sx={{ pl: "10px", color: "text.secondary" }}>Configuración</Typography>
                        </Box>

                        <Box onClick={() => logout()} sx={{ display: "flex", alignItems: "center", mt: "20px" }}>
                            <Logout sx={{ color: 'text.secondary' }} />  <Typography sx={{ pl: "10px", color: "text.secondary", ":hover": { cursor: "pointer" } }}>Cerrar sesion</Typography>
                        </Box>
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

export default ProfileUI;