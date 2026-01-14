import { useTheme } from "@emotion/react";
import {
    CalendarMonth,
    CheckCircle,
    DoneAll,
    Inventory2,
    ScienceTwoTone,
    WarningAmber,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography,
} from "@mui/material";

import CustomerCardTestRequest from "../../CustomerAndUsers/CustomerCardTestRequest";

const InfoOverviewTestRequest = ({
    testRequest = {},
    iconByStatus,
    updateCustomerData,
    getToTalAnalysis,
    compo,
}) => {
    const theme = useTheme();

    //

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                gap: "20px",
            }}
        >
            <Card
                sx={{
                    width: "60%",
                    borderRadius: "20px",
                    border: `1px solid ${theme.palette.border.primary}`,
                    mt: 4,
                }}
            >
                <CardContent>
                    {/* HEADER */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            mb: 2,
                        }}
                    >
                        <Typography
                            variant="h2"
                            sx={{ fontSize: "1.4rem", color: "text.secondary" }}
                        >
                            Resumen del ensayo
                        </Typography>

                        <Chip
                            icon={iconByStatus(testRequest.deliveryStatus)}
                            label={testRequest.deliveryStatus}
                            color={
                                testRequest.deliveryStatus ===
                                "COMPLETADO Y ENTREGADO"
                                    ? "success"
                                    : "info"
                            }
                        />
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={4}>
                        <Grid item xs={12} md={8}>
                            <Grid container spacing={3}>
                                <InfoItem
                                    icon={<CalendarMonth />}
                                    label="Fecha de creación"
                                    value={testRequest.createAt}
                                />
                                <InfoItem
                                    icon={<CalendarMonth />}
                                    label="Fecha de aceptación"
                                    value={testRequest.approvalDate}
                                />
                                <InfoItem
                                    icon={<CalendarMonth />}
                                    label="Fecha de entrega"
                                    value={
                                        testRequest.dueDate ??
                                        "Sin fecha generada"
                                    }
                                />
                                <InfoItem
                                    icon={<Inventory2 />}
                                    label="Total de muestras"
                                    value={testRequest.samples.length}
                                />
                                <InfoItem
                                    icon={<ScienceTwoTone />}
                                    label="Total de análisis"
                                    value={getToTalAnalysis()}
                                />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>

                <Box sx={{ mt: 4 }}>
                    <Divider />
                    <CustomerCardTestRequest
                        objectData={testRequest.customer}
                        updateCustomerData={(customerUpdated) =>
                            updateCustomerData(customerUpdated)
                        }
                    />
                </Box>
            </Card>

            <Box
                sx={{
                    width: "40%",

                    mt: 4,
                }}
            >
                {compo}
            </Box>
        </Box>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <Grid item xs={12} sm={6}>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Box sx={{ mr: 1, color: "primary.main" }}>{icon}</Box>
            <Box>
                <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ display: "block" }}
                >
                    {label}
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    </Grid>
);

export default InfoOverviewTestRequest;
