import { alpha, Box, Button, Chip, Typography, useTheme } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { useContext, useEffect, useState } from "react";
import api from "../../../service/axiosService";
import KPIs from "./KPIs";
import ListDeliverySamples from "./ListDeliverySamples";
import DashboardSkeleton from "./DashboardSkeleton";
import { AuthContext } from "../../../context/AuthContext";
import { WarningAmberOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import TopUsageProductsChart from "./charts/TopUsageProductsChart";
import DeliveryTrendChart from "./charts/DeliveryTrendChart";
import MetricsStateTestRequestSamples from "./MetricsStateTestRequestSamples";
import ResultsByUserBarChart from "./charts/ResultsByUserBarChart";
import { KpiItem } from "./KpiItem";
import ExportModuleCards from "./ExportModuleCards";
import MonthlyTestRequestsChart from "./charts/MonthlyTestRequestsChart";

const DashboardPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState({});
    const { authObject } = useContext(AuthContext);

    const getData = async () => {
        try {
            const res = await api("/dashboard/kpis");
            setData(res.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    if (isLoading) {
        return <DashboardSkeleton theme={theme} />;
    }

    const monthNames = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre",
    ];
    const currentMonth = monthNames[new Date().getMonth()];
    const currentYear = new Date().getFullYear();

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100vh",
                borderRadius: "16px",
                p: "20px",
            }}
        >
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    gap: "30px",
                    flexWrap: "wrap",
                }}
            >
                <Box
                    sx={{
                        width: "55%",
                        height: "300px",
                        border: `1px solid ${theme.palette.border.primary}`,
                        bgcolor: "background.paper",
                        borderRadius: "16px",
                    }}
                >
                    <Box
                        sx={{
                            p: 3,
                            borderRadius: 4,
                            mb: 4,
                        }}
                    >
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 700, color: "primary.dark" }}
                        >
                            ¡Hola de nuevo, {authObject.name}! 👋
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{ color: "text.secondary", mt: 1 }}
                        >
                            Monitoriza tus muestras, ensayos y reactivos.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: "text.secondary",
                                mt: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                            }}
                        >
                            Resumen de actividades —
                            <Chip
                                label={`${currentMonth} ${currentYear}`}
                                size="small"
                                variant="outlined"
                                sx={{ fontWeight: 600, borderRadius: "8px" }}
                            />
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            widows: "100%",
                            display: "flex",
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}
                    >
                        <KpiItem
                            label="Cotizaciones pendientes"
                            theme={theme}
                            link="/system/quotes"
                            value={data?.kpisDto?.quotationPending || 0}
                        />

                        <KpiItem
                            theme={theme}
                            label="Muestras para ejecutar"
                            link="/system/result/execution-test/available"
                            value={data?.kpisDto?.samplesToExecute || 0}
                        />
                        <KpiItem
                            theme={theme}
                            label="Ensayos en proceso"
                            link="/system/results"
                            value={
                                data?.kpisDto?.countTestRequestInProcess || 0
                            }
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        flex: { xs: "1 1 100%", md: "1 1 40%" },
                        minHeight: "260px",
                        position: "relative",
                        overflow: "hidden",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",

                        background: (theme) =>
                            `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                        color: "white",
                        borderRadius: "24px",
                        p: 4,
                        boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                    }}
                >
                    <WarningAmberOutlined
                        sx={{
                            position: "absolute",
                            right: -20,
                            top: -20,
                            fontSize: "150px",
                            opacity: 0.1,
                            transform: "rotate(-15deg)",
                        }}
                    />

                    <Box>
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                                lineHeight: 1.2,
                                mb: 1,
                            }}
                        >
                            Muestras vencidas y <br /> pendientes de envío
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: alpha("#fff", 0.8),
                                fontWeight: 400,
                                maxWidth: "80%",
                            }}
                        >
                            Muestras con recepción cuyo tiempo de entrega ya
                            expiró.
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <Typography
                            sx={{
                                fontSize: "3.5rem",
                                fontWeight: 800,
                                lineHeight: 1,
                                textShadow: "2px 2px 4px rgba(0,0,0,0.2)",
                            }}
                        >
                            {data?.kpisDto?.expiredSamples || 0}
                        </Typography>

                        <Button
                            variant="contained"
                            disableElevation
                            onClick={() =>
                                navigate(
                                    "/system/result/execution-test/available",
                                )
                            }
                            sx={{
                                bgcolor: "white",
                                color: "primary.main",
                                fontWeight: 700,
                                borderRadius: "12px",
                                px: 3,
                                textTransform: "none",
                                "&:hover": {
                                    bgcolor: alpha("#fff", 0.9),
                                    transform: "scale(1.02)",
                                },
                                transition: "all 0.2s",
                            }}
                        >
                            Ver muestras
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Kpis */}
            <KPIs data={data.kpisDto} theme={theme} />

            {/* EXPORT CARDS */}
            <ExportModuleCards />

            {/* LIST */}
            <Box
                sx={{
                    mt: "40px",
                    mb: "100px",
                    display: "flex",
                    gap: "30px",
                    flexWrap: "wrap",
                }}
            >
                <ListDeliverySamples data={data.lastReportsSend} />
                <Box
                    sx={{
                        width: "40%",
                        height: "500px",
                        p: "20px",
                        bgcolor: "background.default",
                        border: `1px solid ${theme.palette.primary.main}`,
                        borderRadius: "16px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "start",
                    }}
                >
                    <Typography
                        component={"h6"}
                        sx={{ color: "text.secondary" }}
                    >
                        Estado del inventario de equipos
                    </Typography>
                    <BarChart
                        xAxis={[
                            {
                                scaleType: "band",
                                data: [
                                    "Activos",
                                    "Mantenimiento",
                                    "Reportados",
                                ],
                            },
                        ]}
                        series={[
                            {
                                data: [
                                    data.inventoryData.equipment
                                        .equipmentsActives,
                                    data.inventoryData.equipment
                                        .equipmentMaintenance,
                                    data.inventoryData.equipment
                                        .equipmentReported,
                                ],
                            },
                        ]}
                        width={400}
                        height={220}
                    />
                    <Typography
                        component={"h6"}
                        sx={{ color: "text.secondary" }}
                    >
                        Estado inventario de reactivos
                    </Typography>
                    <BarChart
                        xAxis={[
                            {
                                scaleType: "band",
                                data: [
                                    "Reactivo activos",
                                    "Reactivo caducados",
                                    "sin stock",
                                ],
                            },
                        ]}
                        series={[
                            {
                                data: [
                                    data.inventoryData.reagent.reagentsActives,
                                    data.inventoryData.reagent.reagentsExpired,
                                    data.inventoryData.reagent
                                        .reagentWithoutStock,
                                ],
                            },
                        ]}
                        width={400}
                        height={220}
                    />
                </Box>
            </Box>

            {/* SAMPLES CHARTS AND MORE */}

            <TopUsageProductsChart theme={theme} />

            <DeliveryTrendChart theme={theme} />

            <MetricsStateTestRequestSamples theme={theme} />

            <ResultsByUserBarChart theme={theme} />

            <MonthlyTestRequestsChart theme={theme} />
        </Box>
    );
};

export default DashboardPage;
