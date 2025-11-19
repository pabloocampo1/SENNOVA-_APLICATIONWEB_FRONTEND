import { Box, Typography, useTheme } from "@mui/material";
import React from "react";

const SampleReception = ({ data }) => {
    const theme = useTheme();

    const EMPTY_MESSAGE = "Campo vacío";

    const checkValue = (value) => (value ? value : EMPTY_MESSAGE);

    if (!data) {
        return (
            <Box sx={{ p: "20px", textAlign: "center" }}>
                <Typography variant="h6" color="error">
                    No se han cargado los datos de recepción.
                </Typography>
            </Box>
        );
    }

    return (
        <Box>
            <Typography
                sx={{
                    mt: "20px",
                    mb: "10px",
                    textAlign: "center",
                }}
                variant="body1"
                color={data.statusReception ? "primary.main" : "error.main"}
            >
                {data.statusReception
                    ? "Recepción de muestra registrada"
                    : "Esta muestra no ha registrado recepción"}
            </Typography>

            <Box
                sx={{
                    width: "100%",
                    height: "300px",
                    bgcolor: "background.default",
                    borderRadius: "20px",
                    border: `1px solid ${theme.palette.border.primary}`,
                    p: "20px",
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(200px, 1fr))",
                    gap: "10px",
                }}
            >
                <Box
                    sx={{
                        height: "100px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: "500", opacity: "0.80" }}
                    >
                        Identificacion de la muestra
                    </Typography>
                    <Typography variant="body1">
                        {checkValue(data.identificationSample)}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        height: "100px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: "500", opacity: "0.80" }}
                    >
                        Fecha de ingreso muestra
                    </Typography>
                    <Typography variant="body1">
                        {checkValue(data.sampleEntryDate)}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        height: "100px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: "500", opacity: "0.80" }}
                    >
                        Fecha de recepción
                    </Typography>
                    <Typography variant="body1">
                        {checkValue(data.sampleReceptionDate)}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        height: "100px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: "500", opacity: "0.80" }}
                    >
                        Peso bruto
                    </Typography>
                    <Typography variant="body1">
                        {checkValue(data.gross_weight)} {"(g)"}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        height: "100px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: "500", opacity: "0.80" }}
                    >
                        Condicion de almacenamiento
                    </Typography>
                    <Typography variant="body1">
                        {checkValue(data.storageConditions)}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        height: "100px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: "500", opacity: "0.80" }}
                    >
                        Des. empaque
                    </Typography>
                    <Typography variant="body1">
                        {checkValue(data.packageDescription)}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default SampleReception;
