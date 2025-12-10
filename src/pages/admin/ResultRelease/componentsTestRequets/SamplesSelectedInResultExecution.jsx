import { CheckCircleOutline, Close } from "@mui/icons-material";
import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";

// THIS COMPONENT SHOW THE SAMPLES SELECTED IN RESULTEXECUTION TO EXECUTE

const getLenght = (analisys = []) => {
    return analisys.length;
};

const SamplesSelectedInResultExecution = ({
    samplesSelectet = [],
    samples = [],
    cleanData,
    onClose,
    countAnalysisCompleteBySample,
}) => {
    const [samplesToExecute, setSamplesToExecute] = useState(samplesSelectet);
    const theme = useTheme();

    const getSampleDataById = (sampleId) => {
        const data = samples.filter((sample) => sample.sampleId == sampleId);
        return data;
    };

    const removeSampleToExecute = (id) => {
        const samplesSelectedUpdate = samplesToExecute.filter(
            (sampleId) => sampleId !== id
        );
        setSamplesToExecute(samplesSelectedUpdate);
    };

    return (
        <Box
            sx={{
                width: "90vw",
                height: "100vh",

                bgcolor: "background.paper",
                p: "20px",
            }}
        >
            <Close sx={{ color: "primary.main" }} onClick={() => onClose()} />
            <Typography
                sx={{
                    textAlign: "center",
                    mt: "20px",
                    mb: "20px",
                    color: "primary.main",
                    fontWeight: "bold",
                }}
            >
                Muestras seleccionadas para ejecutar
            </Typography>

            <Box
                sx={{
                    height: "auto",
                    width: "100%",
                    display: "flex",

                    mt: "40px",
                }}
            >
                <Box
                    sx={{
                        width: "40%",
                        maxHeight: "80vh",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        p: "20px",
                    }}
                >
                    <CheckCircleOutline
                        sx={{
                            color: "primary.main",
                            width: "100px",
                            height: "100px",
                            mb: "40px",
                        }}
                    />
                    <Typography
                        sx={{
                            textAlign: "center",
                            mb: "10px",
                            fontWeight: "bold",
                        }}
                    >
                        Todos las muestras seleccionadas tienen sus analisis
                        finalizados
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            textAlign: "center",
                            mb: "50px",
                            opacity: "0.90",
                        }}
                    >
                        Hemos revisado toda la información y confirmado que cada
                        una de las muestras ya tiene sus análisis finalizados.
                        Estás listo para enviar los resultados cuando lo desees.
                    </Typography>
                    <Button variant="outlined" sx={{ width: "300px" }}>
                        Confirmar y enviar resultados
                    </Button>
                    <Button
                        variant="contained"
                        sx={{ width: "300px", mt: "20px" }}
                        onClick={() => {
                            onClose(), cleanData();
                        }}
                    >
                        Cancelar proceso
                    </Button>
                </Box>

                <Box
                    sx={{
                        width: "60%",
                        bgcolor: "background.default",
                        border: `1px solid ${theme.palette.border.primary}`,
                        borderRadius: "20px",
                        p: "10px",
                        minHeight: "80vh",
                    }}
                >
                    <Typography variant="body1">
                        Total de muestras seleccionadas :{" "}
                        {samplesToExecute.length}
                    </Typography>
                    <Typography variant="caption">
                        Estas son las muestras que se van a entregar a sus
                        respectivos clientes
                    </Typography>
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                "repeat(auto-fill, minmax(250px, 1fr))",
                            gap: "10px",

                            maxHeight: "70vh",
                            p: "20px",
                            overflowY: "auto",
                            mt: "20px",
                        }}
                    >
                        {samplesToExecute.map((sample, index) => {
                            const data = getSampleDataById(sample);
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        borderRadius: "20px",
                                        height: "150px",
                                        border: `1px solid ${theme.palette.border.primary}`,
                                        bgcolor: "background.paper",
                                        p: "20px",
                                        mb: "20px",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                p: "5px 10px",
                                                borderRadius: "100%",
                                                bgcolor: "background.paper",
                                                border: `1px solid ${theme.palette.border.primary}`,
                                                color: "primary.main",
                                            }}
                                        >
                                            {index + 1}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                mb: "20px",
                                            }}
                                        >
                                            {data[0].matrix}
                                        </Typography>
                                        <Tooltip title="Quitar de la lista">
                                            <Close
                                                sx={{ color: "primary.main" }}
                                                onClick={() =>
                                                    removeSampleToExecute(
                                                        data[0].sampleId
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    </Box>
                                    <Typography>
                                        Total de analisis finalizados:{" "}
                                        {countAnalysisCompleteBySample(
                                            data[0].analysisEntities
                                        )}
                                    </Typography>
                                    <Typography>
                                        Total de analysis:{" "}
                                        {getLenght(data[0].analysisEntities)}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SamplesSelectedInResultExecution;
