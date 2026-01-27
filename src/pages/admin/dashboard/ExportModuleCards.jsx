import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Button } from "@mui/material";
import {
    BiotechOutlined,
    Download,
    Inventory2Outlined,
    ScienceOutlined,
} from "@mui/icons-material";
import YearSelect from "../../../components/YearSelect";

const modules = [
    {
        key: "equipments",
        title: "Equipos",
        description: "Descargar todo el inventario general de equipos",
        icon: (
            <Inventory2Outlined
                sx={{ color: "primary.main" }}
                fontSize="large"
            />
        ),
        onExport: () => {
            console.log("Exportar equipos");
        },
    },
    {
        key: "reactives",
        title: "Reactivos",
        description: "Descargar todo el inventario de reactivos",
        icon: (
            <ScienceOutlined sx={{ color: "primary.main" }} fontSize="large" />
        ),
        onExport: () => {
            console.log("Exportar reactivos");
        },
    },
    {
        key: "assays",
        title: "Ensayos",
        description: "Descargar toda la información de ensayos",
        icon: (
            <BiotechOutlined sx={{ color: "primary.main" }} fontSize="large" />
        ),
        onExport: (year = "") => {
            if (year == "" || year == null) {
                year = new Date().getFullYear();
            }
            console.log("Exportar ensayos" + year);
        },
    },
];

const ExportModuleCards = () => {
    const [year, setYear] = useState("");

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr",
                    sm: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                },
                mt: "40px",
                bgcolor: "background.default",
                mb: "100px",
                gap: 3,
            }}
        >
            {modules.map((module) => (
                <Card
                    key={module.key}
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        borderRadius: 2,
                        boxShadow: 2,
                    }}
                >
                    <CardContent>
                        {module.key == "assays" && (
                            <Box
                                sx={{
                                    width: "100%",
                                    display: "flex",
                                    justifyContent: "end",
                                }}
                            >
                                <YearSelect
                                    onYearChange={(param) => setYear(param)}
                                />
                            </Box>
                        )}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1.5,
                                mb: 1,
                            }}
                        >
                            {module.icon}
                            <Typography variant="h6" fontWeight={600}>
                                {module.title}
                            </Typography>
                        </Box>

                        <Typography variant="body2" color="text.secondary">
                            {module.description}
                        </Typography>
                    </CardContent>

                    <Box sx={{ p: 2, pt: 0 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<Download />}
                            onClick={() => module.onExport(year)}
                        >
                            Descargar Excel
                        </Button>
                    </Box>
                </Card>
            ))}
        </Box>
    );
};

export default ExportModuleCards;
