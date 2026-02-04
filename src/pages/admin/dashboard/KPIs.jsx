import React from "react";
import { ArrowUpward, ArrowDownward, Remove } from "@mui/icons-material";
import { Box, Typography, useTheme, alpha } from "@mui/material";

const TREND_MAP = {
    SUBIO: { color: "success", icon: ArrowUpward },
    BAJO: { color: "error", icon: ArrowDownward },
    DEFAULT: { color: "action", icon: Remove },
};

const KPICard = ({ label, value, trendData }) => {
    const theme = useTheme();

    const trendConfig =
        (trendData && TREND_MAP[trendData.trend]) || TREND_MAP.DEFAULT;
    const statusColor = theme.palette[trendConfig.color].main;

    return (
        <Box
            sx={{
                p: 2.5,
                borderRadius: 4,
                bgcolor: "background.paper",
                border: `1px solid ${theme.palette.divider}`,
                display: "flex",
                flexDirection: "column",
                gap: 1,
                minHeight: "140px",
            }}
        >
            <Typography
                variant="caption"
                sx={{
                    color: "text.secondary",
                    fontWeight: 700,
                    textTransform: "uppercase",
                }}
            >
                {label}
            </Typography>

            <Box
                sx={{ display: "flex", alignItems: "baseline", gap: 1, my: 1 }}
            >
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {value ?? 0}
                </Typography>

                {trendData?.percentageChange !== undefined && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 1,
                            borderRadius: 1,
                            bgcolor: statusColor,
                            color: statusColor,
                        }}
                    >
                        <trendConfig.icon sx={{ fontSize: 14, mr: 0.5 }} />
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>
                            {trendData.percentageChange}%
                        </Typography>
                    </Box>
                )}
            </Box>

            {trendData?.previousValue !== undefined && (
                <Typography
                    variant="caption"
                    sx={{ color: "text.disabled", mt: "auto" }}
                >
                    Mes Anterior: {trendData.previousValue}
                </Typography>
            )}
        </Box>
    );
};

const KPIs = ({ data = {} }) => {
    const kpiGroups = [
        {
            key: "samplesCreated",
            label: "Muestras creadas",
            isComparative: true,
        },
        {
            key: "testRequestActive",
            label: "Ensayos enviados",
            isComparative: true,
        },
        {
            key: "testRequestCreated",
            label: "Solicitudes creadas",
            isComparative: true,
        },
        {
            key: "expiredReagent",
            label: "Reactivos vencidos",
            isComparative: false,
        },
    ];

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 2,
                mt: 4,
                width: "100%",
            }}
        >
            {kpiGroups.map((group) => {
                const itemData = data[group.key];

                return (
                    <KPICard
                        key={group.key}
                        label={group.label}
                        value={
                            group.isComparative
                                ? itemData?.currentValue
                                : itemData
                        }
                        trendData={group.isComparative ? itemData : null}
                    />
                );
            })}
        </Box>
    );
};

export default KPIs;
