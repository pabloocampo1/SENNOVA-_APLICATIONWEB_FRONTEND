import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import api from "../../../../service/axiosService";

const DeliveryTrendChart = ({ theme }) => {
    const [chartData, setChartData] = useState([]);

    const getData = async () => {
        try {
            const res = await api.get("/dashboard/metrics/delivered/monthly");
            setChartData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box
            sx={{
                p: 3,
                bgcolor: "background.paper",
                borderRadius: "20px",
                border: `1px solid ${theme.palette.divider}`,
                boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                width: "100%",
                mt: "40px",
            }}
        >
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                    Tendencia de envíos de muestras
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 3 }}
                >
                    Evolución mensual de las muestras entregadas durante los
                    últimos 12 meses
                </Typography>
            </Box>

            <LineChart
                dataset={chartData}
                xAxis={[
                    {
                        dataKey: "deliveryDate",
                        scaleType: "point",
                        valueFormatter: (value) => {
                            const [year, month] = value.split("-");
                            const monthNames = [
                                "Ene",
                                "Feb",
                                "Mar",
                                "Abr",
                                "May",
                                "Jun",
                                "Jul",
                                "Ago",
                                "Sep",
                                "Oct",
                                "Nov",
                                "Dic",
                            ];

                            return `${monthNames[Number(month) - 1]} ${year}`;
                        },
                    },
                ]}
                series={[
                    {
                        dataKey: "total",
                        label: "Muestras Enviadas",
                        color: theme.palette.primary.main,
                        area: true,
                        showMark: true,
                    },
                ]}
                height={300}
            />
        </Box>
    );
};

export default DeliveryTrendChart;
