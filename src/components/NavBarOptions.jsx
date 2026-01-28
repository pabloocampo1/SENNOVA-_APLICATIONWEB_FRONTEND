import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import {
    AnalyticsOutlined,
    EqualizerRounded,
    DashboardCustomizeRounded,
    RequestPageOutlined,
    DocumentScanner,
    Science,
    Category,
    SupervisedUserCircleOutlined,
} from "@mui/icons-material";

const NavBarOptions = ({ onCloseMenu, theme, navigate }) => {
    const { authObject } = useAuth();
    const [modules, setModules] = useState([]);
    const location = useLocation();

    useEffect(() => {
        if (
            authObject.role === "ROLE_ADMIN" ||
            authObject.role === "ROLE_SUPERADMIN"
        ) {
            setModules([
                {
                    url: "/system",
                    name: "Dashboard",
                    icon: <AnalyticsOutlined />,
                },
                {
                    url: "/system/inventory/equipments",
                    name: "Inventario equipos",
                    icon: <EqualizerRounded />,
                },
                {
                    url: "/system/inventory/reagents",
                    name: "Inventario reactivos",
                    icon: <DashboardCustomizeRounded />,
                },
                {
                    url: "/system/quotes",
                    name: "Cotizaciones de ensayo",
                    icon: <RequestPageOutlined />,
                },
                {
                    url: "/system/results",
                    name: "Gestión de ensayos",
                    icon: <DocumentScanner />,
                },
                {
                    url: "/system/result/execution-test",
                    name: "Gestión de muestras",
                    icon: <Science />,
                },
                {
                    url: "/system/products",
                    name: "Productos",
                    icon: <Category />,
                },
                {
                    url: "/system/users",
                    name: "Gestión clientes y usuarios",
                    icon: <SupervisedUserCircleOutlined />,
                },
            ]);
        } else {
            setModules([]);
        }
    }, [authObject.role]);

    const handleNavigation = (url) => {
        navigate(url);
        if (onCloseMenu) onCloseMenu();
    };

    return (
        <List sx={{ width: "100%", px: 1 }}>
            {modules.map((module) => {
                const isSelected = location.pathname === module.url;

                return (
                    <ListItem disablePadding key={module.url} sx={{ mb: 0.5 }}>
                        <ListItemButton
                            selected={isSelected}
                            onClick={() => handleNavigation(module.url)}
                            sx={{
                                borderRadius: "12px",
                                minHeight: "48px",
                                transition: "all 0.2s ease",

                                "&.Mui-selected": {
                                    bgcolor: "#39A90020",
                                    borderLeft: `2px solid ${theme.palette.primary.main}`,
                                    "&:hover": {
                                        bgcolor: "#39A90030",
                                    },
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
                                    color: isSelected
                                        ? "primary.main"
                                        : "text.secondary",
                                }}
                            >
                                {React.cloneElement(module.icon, {
                                    fontSize: "small",
                                })}
                            </ListItemIcon>

                            <ListItemText
                                primary={module.name}
                                primaryTypographyProps={{
                                    fontSize: "0.9rem",
                                    fontWeight: isSelected ? 700 : 400,
                                    color: "text.secondary",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default NavBarOptions;
