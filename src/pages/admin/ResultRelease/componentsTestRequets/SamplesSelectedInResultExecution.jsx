import { CheckCircleOutline, Close } from "@mui/icons-material";
import {
    Box,
    Button,
    Card,
    CardContent,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../../service/axiosService";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";

// THIS COMPONENT SHOW THE SAMPLES SELECTED IN RESULTEXECUTION TO EXECUTE

const SamplesSelectedInResultExecution = ({
    samplesSelected = [],

    cleanData,
    onClose,
}) => {
    const [isLoanding, setIsLoanding] = useState(false);
    const [samplesToExecute, setSamplesToExecute] = useState(samplesSelected);
    const [samples, setSamples] = useState([]);

    const theme = useTheme();

    const removeSampleToExecute = (id) => {
        const samplesSelectedUpdate = samples.filter(
            (sample) => sample.sampleId !== id
        );
        setSamples(samplesSelectedUpdate);
    };

    const getSamplesInfoExecution = async () => {
        setIsLoanding(true);
        try {
            const ids = samplesSelected.join(",");
            console.log(ids);

            const res = await api.get(
                "/sample/get-sample-info-execution",

                {
                    params: {
                        samplesId: ids,
                    },
                }
            );
            if (res.data.length >= 1) {
                setSamples(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const tooltipTextResults = (results) => {
        return results.map((r) => `${r.analysis}: ${r.resultFinal}`).join("\n");
    };

    useEffect(() => {
        getSamplesInfoExecution();
    }, []);

    if (isLoanding) {
        return (
            <SimpleBackdrop
                text="Cargando informacion de la muestra"
                open={isLoanding}
            />
        );
    }

    return (
        <Box
            sx={{
                width: "90vw",
                height: "100vh",

                bgcolor: "background.paper",
                p: "20px",
            }}
        >
            <Box
                onClick={() => onClose()}
                sx={{
                    display: "flex",
                    bgcolor: "background.default",
                    width: "100px",
                    p: "10px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    border: `1px solid ${theme.palette.border.primary}`,
                }}
            >
                <Close sx={{ color: "primary.main" }} />
                <Typography>Cerrar</Typography>
            </Box>
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
                                "repeat(auto-fit, minmax(350px, 1fr))",
                            gap: "10px",

                            maxHeight: "70vh",
                            p: "20px",
                            overflowY: "auto",
                            mt: "20px",
                        }}
                    >
                        {samples.map((sample, index) => {
                            return (
                                <Box
                                    key={index}
                                    sx={{
                                        borderRadius: "20px",

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
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                            }}
                                        >
                                            <Typography
                                                sx={{ color: "primary.main" }}
                                            >
                                                {sample.matrix}
                                            </Typography>
                                            <Typography>
                                                {sample.testRequestCode}
                                            </Typography>
                                        </Box>
                                        <Tooltip title="Quitar de la lista">
                                            <Close
                                                sx={{ color: "primary.main" }}
                                                onClick={() =>
                                                    removeSampleToExecute(
                                                        sample.sampleId
                                                    )
                                                }
                                            />
                                        </Tooltip>
                                    </Box>
                                    <Card
                                        sx={{
                                            marginBottom: 2,
                                            borderRadius: "20px",
                                            mt: "20px",
                                        }}
                                    >
                                        <CardContent>
                                            <Typography
                                                variant="h6"
                                                gutterBottom
                                                sx={{ opacity: "0.70" }}
                                            >
                                                Información de la muestra
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{ mb: "5px" }}
                                            >
                                                T. de análisis:{" "}
                                                <strong>
                                                    {sample.totalAnalysis}
                                                </strong>
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{ mb: "5px" }}
                                            >
                                                T. de análisis hechos:{" "}
                                                <strong>
                                                    {
                                                        sample.totalAnalysisFinished
                                                    }
                                                </strong>
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{ mb: "5px" }}
                                            >
                                                Cliente:{" "}
                                                <strong>
                                                    {sample.customerName}
                                                </strong>
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                sx={{ mb: "5px" }}
                                            >
                                                Destino del resultado via email:{" "}
                                                <strong>
                                                    {sample.customerEmail}
                                                </strong>
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{ mb: "5px" }}
                                            >
                                                T. de análisis fallidos:{" "}
                                                <strong>
                                                    {sample.totalAnalysisFailed}
                                                </strong>
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                    <Tooltip
                                        title={
                                            <span
                                                style={{
                                                    whiteSpace: "pre-line",
                                                }}
                                            >
                                                {tooltipTextResults(
                                                    sample.results
                                                )}
                                            </span>
                                        }
                                    >
                                        <Button fullWidth>
                                            Ver resultados
                                        </Button>
                                    </Tooltip>
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
