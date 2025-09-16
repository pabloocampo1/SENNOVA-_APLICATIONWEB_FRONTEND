import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Box, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import {
    HomeWorkOutlined,
    EqualizerRounded,
    DashboardCustomizeRounded,
    RequestPageOutlined,
    TaskAltOutlined,
    SupervisedUserCircleOutlined
} from '@mui/icons-material';

const NavBarOptions = () => {
    const { authObject } = useAuth();
    const [modules, setModules] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState("");

    useEffect(() => {
        if (authObject.role === "ROLE_ADMIN" || authObject.role === "ROLE_SUPERADMIN") {
            setModules([
                { url: "/system", name: "Inicio", icon: <HomeWorkOutlined sx={{ color: 'text.secondary' }} /> },
                { url: "/system/inventory/equipments", name: "Inventario equipos", icon: <EqualizerRounded sx={{ color: 'text.secondary' }} /> },
                { url: "/system/inventory/reagents", name: "Inventario reactivos", icon: <DashboardCustomizeRounded sx={{ color: 'text.secondary' }} /> },
                { url: "/system/quotes", name: "Cotizaciones", icon: <RequestPageOutlined sx={{ color: 'text.secondary' }} /> },
                { url: "/system/results", name: "Emisión de resultados", icon: <TaskAltOutlined sx={{ color: 'text.secondary' }} /> },
                { url: "/system/users", name: "Clientes y usuarios", icon: <SupervisedUserCircleOutlined sx={{ color: 'text.secondary' }} /> }
            ]);
        } else {
            setModules([]);
        }
    }, [authObject.role]);


    useEffect(() => {
        const current = modules.find(m => m.url === location.pathname);
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
                        bgcolor: active === module.name ? "#39A90040" : "transparent",
                        p: "8px",
                        borderRadius: "8px",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        fontWeight: active === module.name ? 600 : 0
                    }}
                    onClick={() => handleClick(module)}
                >
                    <Box>{module.icon}</Box>
                    <Typography sx={{ textDecoration: "none", color: "text.secondary", ml: "15px"  }}>
                        {module.name}
                    </Typography>
                </Box>
            ))}
        </Box>
    );
};

export default NavBarOptions;
