import {
    Box,
    Divider,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@mui/material";

import { Help, InfoOutlined, Settings } from "@mui/icons-material";

import TitleSoftware from "./LogoSoftware";
import { useNavigate } from "react-router-dom";
import NavBarOptions from "./NavBarOptions";

const Sidebar = () => {
    const navigate = useNavigate();
    const theme = useTheme();

    return (
        <Box
            sx={{
                minWidth: { lg: "310px", xl: "400px" },
                height: "100%",
                bgcolor: "background.default",
                borderRadius: "0px 30px 30px 0px",
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
                position: "relative",
                overflow: "hidden",

                "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    width: "120px",
                    height: "120px",
                    background: "linear-gradient(90deg, #72ef4cff, #0b92ed)",
                    opacity: 0.25,
                    filter: "blur(40px)",
                    zIndex: 0,
                },

                "&::after": {
                    content: '""',
                    position: "absolute",
                    top: "50%",
                    left: 0,
                    width: "160px",
                    height: "160px",
                    background: "linear-gradient(90deg, #72ef4cff, #4cafef)",
                    opacity: 0.18,
                    filter: "blur(55px)",
                    zIndex: 0,
                },
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TitleSoftware />
            </Box>

            <Box
                sx={{
                    width: "80%",
                }}
            >
                <NavBarOptions theme={theme} navigate={navigate} />
            </Box>

            <Box sx={{ width: "80%" }}>
                <Divider sx={{ mx: 2, mb: 2, borderStyle: "" }} />

                <List sx={{ px: 1 }}>
                    <ListItem disablePadding>
                        <ListItemButton
                            onClick={() => navigate("/system/settings")}
                            selected={location.pathname === "/system/settings"}
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
                                    transform: "translateX(4px)",
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
                            onClick={() => navigate("/system/user-guide")}
                            selected={
                                location.pathname === "/system/user-guide"
                            }
                            sx={{
                                borderRadius: "12px",
                                minHeight: "48px",
                                transition: "all 0.2s",
                                "&:hover": {
                                    bgcolor: "action.hover",
                                    transform: "translateX(4px)",
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
                            onClick={() => navigate("/system/about-system")}
                            selected={
                                location.pathname === "/system/about-system"
                            }
                            sx={{
                                borderRadius: "12px",
                                minHeight: "48px",
                                transition: "all 0.2s",
                                "&:hover": {
                                    bgcolor: "action.hover",
                                    transform: "translateX(4px)",
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
    );
};

export default Sidebar;
