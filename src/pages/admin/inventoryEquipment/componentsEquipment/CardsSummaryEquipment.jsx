import { Box, Typography, Skeleton, alpha, Chip, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Inventory, Build, CheckCircle, Cancel } from '@mui/icons-material';
import { formatMonthYear } from '../../../../Utils/DateUtils';
import api from '../../../../service/axiosService';

const CardsSummaryEquipment = ({ refresh }) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get("/equipment/summaryStatics/card");
            if (res.status === 200) {
                setData(res.data);
                refresh();
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    if (loading) {
        return (
            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    mt: 3
                }}
            >
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton
                        key={i}
                        variant="rectangular"
                        height={140}
                        sx={{ borderRadius: 3 }}
                        animation="wave"
                    />
                ))}
            </Box>
        );
    }

    const cards = [
        {
            title: "Total de Equipos",
            subtitle: "Registrados",
            value: data?.countAll || 0,
            icon: Inventory,
            color: "#39A900",
            bgGradient: isDark
                ? "linear-gradient(135deg, #2a3e2a 0%, #3a5a3a 100%)"
                : "linear-gradient(135deg, #a5d6a7 0%, #81c784 100%)"
        },
        {
            title: "Total de Equipos reportados",
            subtitle: "Reportados",
            value: data?.countReported || 0,
            icon: Inventory,
            color: "#39A900",
            bgGradient: isDark
                ? "linear-gradient(135deg, #2a3e2a 0%, #3a5a3a 100%)"
                : "linear-gradient(135deg, #a5d6a7 0%, #81c784 100%)"
        },
        {
            title: "Mantenimiento",
            subtitle: `para el mes : ${formatMonthYear(new Date())}`,
            value: data?.countMaintenanceMonth || 0,
            icon: Build,
            color: "#7E57C2",
            bgGradient: isDark
                ? "linear-gradient(135deg, #3e3a52 0%, #5a5072 100%)"
                : "linear-gradient(135deg, #b39ddb 0%, #9575cd 100%)"
        },
        {
            title: "Equipos Activos",
            subtitle: "Disponibles/En uso",
            value: data?.countAvailableTrue || 0,
            icon: CheckCircle,
            color: "#39A900",
            bgGradient: isDark
                ? "linear-gradient(135deg, #354a35 0%, #4a6a4a 100%)"
                : "linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%)"
        }
    ];
    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gap: 2.5,
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                mt: 3
            }}
        >
            {cards.map((card, index) => {
                const Icon = card.icon;
                return (
                    <Box
                        key={index}
                        sx={{
                            position: 'relative',
                            p: 3,
                            height: "140px",
                            borderRadius: 3,
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                            background: card.bgGradient,

                            overflow: 'hidden',
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            cursor: 'pointer',

                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                width: '100%',
                                height: '100%',
                                background: isDark
                                    ? 'rgba(255, 255, 255, 0.05)'
                                    : 'rgba(255, 255, 255, 0.2)',
                                clipPath: 'circle(30% at 80% 20%)',
                                transition: 'all 0.5s ease'
                            },
                            '&:hover::before': {
                                clipPath: 'circle(80% at 80% 20%)'
                            }
                        }}
                    >
                        <Box sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'flex-start',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <Box>
                                <Typography
                                    sx={{
                                        color: 'white',
                                        fontSize: '0.875rem',
                                        fontWeight: 600,
                                        mb: 0.5,

                                    }}
                                >
                                    {card.title}
                                </Typography>
                                <Chip
                                    label={card.subtitle}
                                    size="small"
                                    sx={{
                                        height: 20,
                                        fontSize: '0.7rem',
                                        fontWeight: 500,
                                        bgcolor: isDark
                                            ? alpha('#fff', 0.15)
                                            : alpha('#fff', 0.3),
                                        color: 'text.primary',
                                        backdropFilter: 'blur(10px)',

                                    }}
                                />
                            </Box>

                            <Box sx={{
                                width: 48,
                                height: 48,
                                borderRadius: 2,
                                bgcolor: isDark
                                    ? alpha('#fff', 0.15)
                                    : alpha('#fff', 0.25),
                                backdropFilter: 'blur(10px)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: isDark
                                    ? `1px solid ${alpha('#fff', 0.2)}`
                                    : `1px solid ${alpha('#fff', 0.3)}`,
                            }}>
                                <Icon sx={{ fontSize: 28, color: 'white' }} />
                            </Box>
                        </Box>

                        <Box sx={{
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'space-between',
                            position: 'relative',
                            zIndex: 1
                        }}>
                            <Typography
                                sx={{
                                    color: 'white',
                                    fontSize: '2.5rem',
                                    fontWeight: 700,
                                    lineHeight: 1,
                                }}
                            >
                                {card.value}
                            </Typography>
                        </Box>
                    </Box>
                );
            })}
        </Box>
    );
};

export default CardsSummaryEquipment;