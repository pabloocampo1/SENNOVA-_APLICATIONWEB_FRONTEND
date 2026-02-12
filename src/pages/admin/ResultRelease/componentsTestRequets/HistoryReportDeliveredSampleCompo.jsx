import {
    CalendarMonth,
    Inventory2,
    ScienceTwoTone,
    Person,
    Email,
    LocalShipping,
} from "@mui/icons-material";
import {
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../../service/axiosService";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";

const HistoryReportDeliveredSampleCompo = ({ testRequestId }) => {
    const theme = useTheme();
    const [deliveryHistory, setDeliveryHistory] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchHistoryDelivery = async () => {
        setIsLoading(true);
        try {
            const res = await api.get(
                `/testRequest/delivery-history/${testRequestId}`,
            );
            setDeliveryHistory(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchHistoryDelivery();
    }, [testRequestId]);

    const formatDate = (date) => (date ? new Date(date).toLocaleString() : "—");

    return (
        <Box>
            <SimpleBackdrop open={isLoading} text="Cargando historial" />

            <Typography variant="h2" sx={{ fontSize: "1.4rem", mb: 2 }}>
                Historial de envío de muestras
            </Typography>

            {deliveryHistory.map((d) => (
                <Card
                    key={d.id}
                    sx={{
                        mb: 3,
                        borderRadius: "16px",
                        border: `1px solid ${theme.palette.border.primary}`,
                    }}
                >
                    <CardContent>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: 2,
                            }}
                        >
                            <Box>
                                <Typography fontWeight="bold">
                                    {d.sampleCode}
                                </Typography>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Ensayo #{d.requestCode}
                                </Typography>
                            </Box>

                            <Chip
                                icon={<LocalShipping />}
                                label={d.status}
                                color={
                                    d.status === "Enviado"
                                        ? "success"
                                        : "warning"
                                }
                            />
                        </Box>

                        <Divider sx={{ mb: 3 }} />

                        <Grid container spacing={3}>
                            <InfoItem
                                icon={<ScienceTwoTone />}
                                label="Matriz"
                                value={d.matrixSample}
                            />
                            <InfoItem
                                icon={<Inventory2 />}
                                label="Total análisis"
                                value={d.totalAnalysis}
                            />
                            <InfoItem
                                icon={<CalendarMonth />}
                                label="Fecha de envío"
                                value={formatDate(d.sentAt)}
                            />
                            <InfoItem
                                icon={<Person />}
                                label="Responsable"
                                value={d.responsibleName}
                            />
                            <InfoItem
                                icon={<Person />}
                                label="Cliente"
                                value={d.customerName}
                            />
                            <InfoItem
                                icon={<Email />}
                                label="Correo cliente"
                                value={d.customerEmail}
                            />
                        </Grid>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="caption" color="text.secondary">
                            Creado: {formatDate(d.createdAt)} · Última
                            actualización: {formatDate(d.updatedAt)}
                        </Typography>
                    </CardContent>
                </Card>
            ))}

            {deliveryHistory.length === 0 && !isLoading && (
                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 4, textAlign: "center" }}
                >
                    No hay registros de envío para este ensayo.
                </Typography>
            )}
        </Box>
    );
};

const InfoItem = ({ icon, label, value }) => (
    <Grid item xs={12} sm={6}>
        <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Box sx={{ mr: 1, color: "primary.main" }}>{icon}</Box>
            <Box>
                <Typography variant="caption" color="text.secondary">
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                    {value || "—"}
                </Typography>
            </Box>
        </Box>
    </Grid>
);

export default HistoryReportDeliveredSampleCompo;
