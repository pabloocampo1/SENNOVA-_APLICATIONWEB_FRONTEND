import { Box, Drawer, IconButton, Tooltip, Typography } from "@mui/material";

import {
    DarkMode,
    Help,
    InfoOutline,
    Logout,
    MenuRounded,
    Sunny,
} from "@mui/icons-material";

import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NotificationPopover from "./NotificationPopover";
import imageLogoSennova from "../assets/images/sennova_logo_sin_fondo.png";
import NavBarOptions from "./navBarOptions";
import { useAuth } from "../context/AuthContext";

import ProfileUI from "./ProfileUI";

const TopBar = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [menuMobile, setMenuMobile] = useState(false);
    const { logout } = useAuth();

    return (
        <Box
            sx={{
                height: "10vh",
                bgcolor: "background.paper",
                display: { xs: "flex", md: "flex" },
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => setMenuMobile(true)}
                    sx={{ display: { sm: "none" } }}
                >
                    <MenuRounded />
                </IconButton>
                <Box sx={{ mt: "15%", width: { xs: "150px", sm: "200px" } }}>
                    <img
                        src={imageLogoSennova}
                        width={"100%"}
                        alt="logo sennova"
                    />
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    mr: "20px",
                }}
            >
                <Tooltip title="Cambiar tema">
                    {darkMode ? (
                        <Sunny
                            onClick={() => toggleDarkMode()}
                            fontSize="medium"
                            sx={{ color: "text.secondary", mr: "10px" }}
                        />
                    ) : (
                        <DarkMode
                            onClick={() => toggleDarkMode()}
                            fontSize="medium"
                            sx={{ color: "text.secondary", mr: "10px" }}
                        />
                    )}
                </Tooltip>
                <NotificationPopover />
                <Tooltip title="Cerrar sesion">
                    <Logout
                        onClick={() => logout()}
                        sx={{ color: "text.secondary", ml: "10px" }}
                    />
                </Tooltip>

                <ProfileUI />
            </Box>

            {/* MENU MOBILE */}
            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                <Drawer
                    anchor="left"
                    sx={{}}
                    open={menuMobile}
                    onClose={() => setMenuMobile(false)}
                >
                    <Box
                        sx={{
                            width: 250,
                            height: "100%",
                            p: 2,
                            bgcolor: "background.paper",
                        }}
                    >
                        <Box
                            sx={{
                                minWidth: { lg: "320px", xl: "400px" },

                                height: "100%",

                                borderRadius: "0px 30px 30px 0px",

                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "space-between",
                            }}
                        >
                            <Box
                                sx={{
                                    mt: "15%",
                                    width: { xs: "150px", sm: "200px" },
                                }}
                            >
                                <img
                                    src={imageLogoSennova}
                                    width={"100%"}
                                    alt="logo sennova"
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: "80%",
                                }}
                            >
                                <NavBarOptions
                                    onCloseMenu={() => setMenuMobile(false)}
                                />
                            </Box>

                            <Box
                                sx={{
                                    width: "80%",
                                    mb: "50px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mt: "20px",
                                    }}
                                >
                                    <Help sx={{ color: "text.secondary" }} />{" "}
                                    <Typography
                                        sx={{
                                            pl: "10px",
                                            color: "text.secondary",
                                        }}
                                    >
                                        Ayuda
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mt: "20px",
                                    }}
                                >
                                    <InfoOutline
                                        sx={{ color: "text.secondary" }}
                                    />{" "}
                                    <Typography
                                        sx={{
                                            pl: "10px",
                                            color: "text.secondary",
                                        }}
                                    >
                                        Acerca del sistema
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
};

export default TopBar;
