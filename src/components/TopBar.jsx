import {
    Box,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";

import {
    DarkMode,
    Help,
    InfoOutline,
    InfoOutlined,
    Logout,
    MenuRounded,
    Settings,
    Sunny,
} from "@mui/icons-material";

import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NotificationPopover from "./NotificationPopover";
import imageLogoSennova from "../assets/images/sennova_logo_sin_fondo.png";

import { useAuth } from "../context/AuthContext";

import ProfileUI from "./ProfileUI";
import NavBarOptions from "./NavBarOptions";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);
    const [menuMobile, setMenuMobile] = useState(false);
    const { logout } = useAuth();
    const theme = useTheme();
    const navigate = useNavigate();

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
                                    theme={theme}
                                    onCloseMenu={() => setMenuMobile(false)}
                                    navigate={navigate}
                                />
                            </Box>

                            <Box sx={{ width: "80%" }}>
                                <Divider
                                    sx={{ mx: 2, mb: 2, borderStyle: "" }}
                                />

                                <List sx={{ px: 1 }}>
                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                (navigate("/system/settings"),
                                                    setMenuMobile(false));
                                            }}
                                            selected={
                                                location.pathname ===
                                                "/system/settings"
                                            }
                                            sx={{
                                                borderRadius: "12px",
                                                minHeight: "48px",
                                                transition: "all 0.2s",
                                                "&.Mui-selected": {
                                                    bgcolor: "#39A90020",
                                                    borderLeft: `4px solid ${theme.palette.primary.main}`,
                                                },
                                                "&:hover": {
                                                    bgcolor: "action.hover",
                                                    transform:
                                                        "translateX(4px)",
                                                },
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: "40px",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                <Settings fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Config / elementos"
                                                primaryTypographyProps={{
                                                    fontSize: "0.85rem",
                                                    color: "text.secondary",
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate("/system/user-guide");
                                                setMenuMobile(false);
                                            }}
                                            selected={
                                                location.pathname ===
                                                "/system/user-guide"
                                            }
                                            sx={{
                                                borderRadius: "12px",
                                                minHeight: "48px",
                                                transition: "all 0.2s",
                                                "&:hover": {
                                                    bgcolor: "action.hover",
                                                    transform:
                                                        "translateX(4px)",
                                                },
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: "40px",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                <Help fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Ayuda"
                                                primaryTypographyProps={{
                                                    fontSize: "0.85rem",
                                                    color: "text.secondary",
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>

                                    <ListItem disablePadding>
                                        <ListItemButton
                                            onClick={() => {
                                                navigate(
                                                    "/system/about-system",
                                                );
                                                setMenuMobile(false);
                                            }}
                                            selected={
                                                location.pathname ===
                                                "/system/about-system"
                                            }
                                            sx={{
                                                borderRadius: "12px",
                                                minHeight: "48px",
                                                transition: "all 0.2s",
                                                "&:hover": {
                                                    bgcolor: "action.hover",
                                                    transform:
                                                        "translateX(4px)",
                                                },
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: "40px",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                <InfoOutlined fontSize="small" />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary="Acerca del sistema"
                                                primaryTypographyProps={{
                                                    fontSize: "0.85rem",
                                                    color: "text.secondary",
                                                }}
                                            />
                                        </ListItemButton>
                                    </ListItem>
                                </List>
                            </Box>
                        </Box>
                    </Box>
                </Drawer>
            </Box>
        </Box>
    );
};

export default TopBar;
