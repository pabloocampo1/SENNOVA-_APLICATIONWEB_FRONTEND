import { Avatar, Box, IconButton, Popover, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

import { Logout, Settings } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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
        <Box sx={{ ml: "10px" }}>
            <IconButton onClick={handleClick}>
                <Avatar
                    src={authObject.imageProfile}
                    sx={{
                        width: 33,
                        height: 33,
                        fontSize: 14,
                    }}
                />
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
                    <Box
                        sx={{
                            width: "80%",
                            mb: "50px",
                        }}
                    >
                        <Box
                            onClick={() => {
                                handleClose();
                                navigate("/system/settings");
                            }}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: "20px",
                                ":hover": { cursor: "pointer" },
                            }}
                        >
                            <Settings sx={{ color: "text.secondary" }} />
                            <Typography
                                sx={{ pl: "10px", color: "text.secondary" }}
                            >
                                Configuración
                            </Typography>
                        </Box>

                        <Box
                            onClick={() => logout()}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                mt: "20px",
                            }}
                        >
                            <Logout sx={{ color: "text.secondary" }} />{" "}
                            <Typography
                                sx={{
                                    pl: "10px",
                                    color: "text.secondary",
                                    ":hover": { cursor: "pointer" },
                                }}
                            >
                                Cerrar sesion
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Popover>
        </Box>
    );
};

export default ProfileUI;
