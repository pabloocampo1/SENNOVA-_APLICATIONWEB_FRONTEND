import { MenuItem, Skeleton, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { LineChart, PieChart } from "@mui/x-charts";
import React, { useEffect, useState } from "react";
import api from "../../../service/axiosService";
import YearSelect from "../../../components/YearSelect";

const ChartsSkeleton = () => (
    <Box sx={{ display: "flex", alignItems: "center", gap: "40px" }}>
        <Box sx={{ width: "40%" }}>
            <Skeleton width={180} height={24} sx={{ mb: 1 }} />
            <Skeleton width={220} height={18} sx={{ mb: 4 }} />

            <Skeleton
                variant="circular"
                width={200}
                height={200}
                sx={{ mx: "auto" }}
            />
        </Box>

        <Box sx={{ width: "40%" }}>
            <Skeleton width={180} height={24} sx={{ mb: 1 }} />
            <Skeleton width={220} height={18} sx={{ mb: 4 }} />

            <Skeleton
                variant="circular"
                width={200}
                height={200}
                sx={{ mx: "auto" }}
            />
        </Box>
    </Box>
);

const TestRequestCreatedYear = ({ theme }) => {
    const [metricsTestRequestState, setMetricsTestRequestState] = useState([]);
    const [metricsSampleState, setMetricsSampleState] = useState([]);
    const [loading, setLoading] = useState(true);
    const [yearSelected, setYearSelected] = useState("");

    const getData = async (year = "") => {
        setYearSelected(year);
        setLoading(true);

        try {
            const res = await api.get("/dashboard/metrics/state", {
                params: {
                    year: year,
                },
            });

            setMetricsSampleState([
                {
                    id: "SIN_RECEPCION",
                    value: res.data.sampleStatusMetrics.withoutReception,
                    label: "Sin recepción",
                },
                {
                    id: "EN_PROCESO",
                    value: res.data.sampleStatusMetrics.inProcess,
                    label: "En proceso",
                },
                {
                    id: "VENCIDAS",
                    value: res.data.sampleStatusMetrics.overDue,
                    label: "Vencidas",
                },
                {
                    id: "ENTREGADAS",
                    value: res.data.sampleStatusMetrics.delivered,
                    label: "Entregadas",
                },
            ]);
            setMetricsTestRequestState([
                {
                    id: "ACEPTADAS",
                    value: res.data.testRequestStateMetrics.accepted,
                    label: "Cotizaciones aceptadas",
                },
                {
                    id: "PENDIENTES_DE_ACEPTAR",
                    value: res.data.testRequestStateMetrics.pending,
                    label: "Cotizaciones pendientes",
                },
                {
                    id: "RECHAZADAS",
                    value: res.data.testRequestStateMetrics.rejected,
                    label: "Rechazadas",
                },
            ]);
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
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "50px",
                }}
            >
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                        Estado de muestras y cotizaciones —{" "}
                        {yearSelected || new Date().getFullYear()}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: 3 }}
                    >
                        Distribución y seguimiento del estado actual de las
                        muestras y cotizaciones registradas
                    </Typography>
                </Box>

                <YearSelect onYearChange={(yearParam) => getData(yearParam)} />
            </Box>

            {loading ? (
                <ChartsSkeleton />
            ) : (
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                            sx={{
                                textAlign: "center",
                                mb: "20px",
                                color: "primary.main",
                            }}
                        >
                            Estados de las muestras
                        </Typography>
                        <PieChart
                            series={[
                                {
                                    data: metricsSampleState,
                                    innerRadius: 70,
                                    outerRadius: 100,
                                    paddingAngle: 2,
                                    cornerRadius: 6,
                                },
                            ]}
                            height={260}
                            slotProps={{
                                legend: {
                                    direction: "column",
                                    position: {
                                        vertical: "middle",
                                        horizontal: "right",
                                    },
                                    padding: 0,
                                },
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                        <Typography
                            sx={{
                                textAlign: "center",
                                mb: "20px",
                                color: "primary.main",
                            }}
                        >
                            Estados de ensayos
                        </Typography>
                        <PieChart
                            series={[
                                {
                                    data: metricsTestRequestState,
                                    innerRadius: 70,
                                    outerRadius: 100,
                                    paddingAngle: 1,
                                    cornerRadius: 6,
                                },
                            ]}
                            height={260}
                            slotProps={{
                                legend: {
                                    direction: "horizontal",
                                    position: {
                                        vertical: "middle",
                                        horizontal: "center",
                                    },
                                    padding: 0,
                                },
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default TestRequestCreatedYear;
