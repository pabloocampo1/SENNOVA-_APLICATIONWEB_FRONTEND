import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Box, Typography, useTheme } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
    HomeWorkOutlined,
    EqualizerRounded,
    DashboardCustomizeRounded,
    RequestPageOutlined,
    TaskAltOutlined,
    SupervisedUserCircleOutlined,
    Settings,
    Science,
    DocumentScanner,
    AnalyticsSharp,
    AnalyticsOutlined,
    Category,
} from "@mui/icons-material";

const NavBarOptions = ({ onCloseMenu }) => {
    const { authObject } = useAuth();
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState("");
    const theme = useTheme();

    useEffect(() => {
        if (
            authObject.role === "ROLE_ADMIN" ||
            authObject.role === "ROLE_SUPERADMIN"
        ) {
            setModules([
                {
                    url: "/system",
                    name: "Dashboard",
                    icon: (
                        <AnalyticsOutlined sx={{ color: "text.secondary" }} />
                    ),
                },
                {
                    url: "/system/inventory/equipments",
                    name: "Inventario equipos",
                    icon: <EqualizerRounded sx={{ color: "text.secondary" }} />,
                },
                {
                    url: "/system/inventory/reagents",
                    name: "Inventario reactivos",
                    icon: (
                        <DashboardCustomizeRounded
                            sx={{ color: "text.secondary" }}
                        />
                    ),
                },
                {
                    url: "/system/quotes",
                    name: "Cotizaciones de ensayo",
                    icon: (
                        <RequestPageOutlined sx={{ color: "text.secondary" }} />
                    ),
                },
                {
                    url: "/system/results",
                    name: "Gestión de ensayos",
                    icon: <DocumentScanner sx={{ color: "text.secondary" }} />,
                },
                {
                    url: "/system/result/execution-test",
                    name: "Gestión de muestras",
                    icon: <Science sx={{ color: "text.secondary" }} />,
                },
                {
                    url: "/system/products",
                    name: "Productos",
                    icon: <Category sx={{ color: "text.secondary" }} />,
                },
                {
                    url: "/system/users",
                    name: "Gestión clientes y usuarios",
                    icon: (
                        <SupervisedUserCircleOutlined
                            sx={{ color: "text.secondary" }}
                        />
                    ),
                },
            ]);
        } else {
            setModules([]);
        }
    }, [authObject.role]);

    useEffect(() => {
        const current = modules.find((m) => m.url === location.pathname);
        if (current) {
            setActive(current.name);
        }
    }, [location.pathname, modules]);

    const handleClick = (module) => {
        navigate(module.url);
    };

    return (
        <Box>
            {modules.map((module) => (
                <Box
                    key={module.name}
                    sx={{
                        width: "100%",
                        height: "50px",
                        bgcolor:
                            active === module.name
                                ? "#39A90040"
                                : "transparent",
                        p: "8px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        mb: { xs: "10px", sm: "5px" },
                        display: "flex",
                        alignItems: "center",
                        fontWeight: active === module.name ? 600 : 0,
                        ":hover": {
                            bgcolor: "background.paper",
                            border: `1px solid ${theme.palette.border.primary}`,
                        },
                    }}
                    onClick={() => {
                        handleClick(module);
                        if (onCloseMenu) onCloseMenu();
                    }}
                >
                    <Box>{module.icon}</Box>
                    <Typography
                        sx={{
                            textDecoration: "none",
                            color: "text.secondary",
                            ml: "15px",
                        }}
                    >
                        {module.name}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default NavBarOptions;
