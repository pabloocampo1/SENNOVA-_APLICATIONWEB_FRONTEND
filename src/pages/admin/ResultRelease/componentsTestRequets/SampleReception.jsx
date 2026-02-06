import {
    Box,
    Card,
    CardContent,
    Divider,
    Typography,
    Grid,
    Chip,
    useTheme,
} from "@mui/material";
import ImageNotSupportedOutlined from "@mui/icons-material/ImageNotSupportedOutlined";

const SampleReception = ({ data }) => {
    const theme = useTheme();

    const EMPTY_MESSAGE = "Campo vacío";
    const checkValue = (value) => (value ? value : EMPTY_MESSAGE);

    if (!data) {
        return (
            <Box sx={{ p: 4, textAlign: "center" }}>
                <Typography variant="h6" color="error">
                    No se han cargado los datos de recepción.
                </Typography>
            </Box>
        );
    }

    return (
        <Card
            sx={{
                mt: 4,
                maxWidth: 1000,
                mx: "auto",
                borderRadius: "20px",
                border: `1px solid ${theme.palette.border.primary}`,
            }}
        >
            <CardContent>
                {/* HEADER */}
                <Box sx={{ mb: 3 }}>
                    <Typography
                        variant="h2"
                        sx={{ fontSize: "1.4rem", mb: 0.5 }}
                    >
                        Recepción de la muestra
                    </Typography>
                    <Chip
                        label={data.matrix}
                        color="primary"
                        size="small"
                        sx={{ fontWeight: "bold" }}
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                {/* INFO GRID */}
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <InfoItem
                            label="Identificación de la muestra"
                            value={checkValue(data.identificationSample)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InfoItem
                            label="Fecha de ingreso"
                            value={checkValue(data.sampleEntryDate)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InfoItem
                            label="Fecha de recepción"
                            value={checkValue(data.sampleReceptionDate)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InfoItem
                            label="Peso bruto"
                            value={
                                data.gross_weight
                                    ? `${data.gross_weight} g`
                                    : EMPTY_MESSAGE
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InfoItem
                            label="Condición de almacenamiento"
                            value={checkValue(data.storageConditions)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InfoItem
                            label="Descripción del empaque"
                            value={checkValue(data.packageDescription)}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <InfoItem
                            label="Lugar de Recolección"
                            value={checkValue(data.samplingLocation)}
                        />
                    </Grid>

                    {/* IMAGE */}
                    <Grid item xs={12}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ mb: 1, display: "block" }}
                        >
                            Imagen de la muestra
                        </Typography>

                        <Box
                            sx={{
                                mt: 1,
                                borderRadius: "12px",
                                overflow: "hidden",
                                border: `1px dashed ${theme.palette.border.primary}`,
                                display: "flex",
                                justifyContent: "center",
                                p: 2,
                            }}
                        >
                            {data.sampleImage ? (
                                <img
                                    src={data.sampleImage}
                                    alt="sample"
                                    style={{
                                        maxWidth: "100%",
                                        maxHeight: 280,
                                        borderRadius: 12,
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        opacity: 0.6,
                                    }}
                                >
                                    <ImageNotSupportedOutlined />
                                    <Typography variant="body2">
                                        Sin imagen
                                    </Typography>
                                </Box>
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

const InfoItem = ({ label, value }) => (
    <Box>
        <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: "block", mb: 0.5 }}
        >
            {label}
        </Typography>
        <Typography
            variant="body1"
            sx={{
                fontWeight: value === "Campo vacío" ? 400 : 500,
                opacity: value === "Campo vacío" ? 0.6 : 1,
            }}
        >
            {value}
        </Typography>
    </Box>
);

export default SampleReception;
