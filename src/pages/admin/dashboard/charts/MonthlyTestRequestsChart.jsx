import { Box, Skeleton, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import api from "../../../../service/axiosService";
import YearSelect from "../../../../components/YearSelect";

const ChartsSkeleton = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <Box sx={{ width: "100%" }}>
            <Typography
                sx={{
                    textAlign: "center",
                }}
            >
                Cargando
            </Typography>
            <Skeleton
                variant="rectangular"
                height={400}
                sx={{ borderRadius: 2 }}
            />
        </Box>
    </Box>
);

const MonthlyTestRequestsChart = ({ theme }) => {
    const [chartData, setChartData] = useState([]);
    const [loading, setLoading] = useState(true);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await api.get("/dashboard/metrics/testRequest/monthly");
            setChartData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
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
                    Tendencia mensual de ensayos
                </Typography>

                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mb: 3 }}
                >
                    Número de ensayos creados por mes durante el período
                    seleccionado
                </Typography>
            </Box>

            {loading ? (
                <ChartsSkeleton />
            ) : (
                <LineChart
                    dataset={chartData}
                    xAxis={[
                        {
                            dataKey: "period",
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
                            label: "Ensayos creados",
                            color: theme.palette.primary.main,
                            area: false,
                            showMark: true,
                        },
                    ]}
                    height={300}
                />
            )}
        </Box>
    );
};

export default MonthlyTestRequestsChart;
