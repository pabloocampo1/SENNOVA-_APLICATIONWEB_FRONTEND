import React, { useEffect } from "react";
import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";

const ResultExecution = () => {
    const theme = useTheme();
    const location = useLocation();

    const currentTab = location.pathname.includes("delivered")
        ? 1
        : location.pathname.includes("without-reception")
          ? 2
          : 0;

    return (
        <Box sx={{ width: "100%", p: 3 }}>
            {/* Título */}
            <Typography
                variant="h4"
                sx={{
                    color: "green",
                    fontWeight: "bold",
                    mb: 1,
                    textAlign: "center",
                }}
            >
                Gestión de muestras
            </Typography>

            {/* Descripción corta */}
            <Typography
                variant="body1"
                sx={{ color: "text.secondary", mb: 4, textAlign: "center" }}
            >
                Aquí puedes gestionar y revisar el estado de las muestras para
                su ejecución, entregadas o sin recepción.
            </Typography>

            {/* Tabs para navegar entre secciones */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
                <Tabs
                    value={currentTab}
                    aria-label="tabs de gestión de muestras"
                    sx={{
                        backgroundColor: theme.palette.background.paper,
                        borderRadius: 2,
                        boxShadow: 1,
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: 500,
                            color: "text.primary",
                            "&.Mui-selected": {
                                color: theme.palette.success.main,
                                backgroundColor: theme.palette.action.selected,
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.success.main}`,
                            },
                        },
                    }}
                >
                    <Tab label="Disponibles" component={Link} to="available" />
                    <Tab label="Entregadas" component={Link} to="delivered" />
                    <Tab
                        label="Sin recepción"
                        component={Link}
                        to="without-reception"
                    />
                </Tabs>
            </Box>

            <Box sx={{ mt: 2 }}>
                <Outlet />
            </Box>
        </Box>
    );
};

export default ResultExecution;
