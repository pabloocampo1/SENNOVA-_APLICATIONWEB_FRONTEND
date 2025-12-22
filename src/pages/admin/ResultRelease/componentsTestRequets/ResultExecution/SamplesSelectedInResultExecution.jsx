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
import api from "../../../../../service/axiosService";
import SimpleBackdrop from "../../../../../components/SimpleBackDrop";
import MessageSamplesSelectedExecution from "../MessageSamplesSelectedExecution";

// THIS COMPONENT SHOW THE SAMPLES SELECTED IN RESULT EXECUTION TO EXECUTE

const SamplesSelectedInResultExecution = ({
    samplesSelected = [],
    cleanData,
    onClose,
}) => {
    const [isLoanding, setIsLoanding] = useState(false);

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
        return results
            .map(
                (r) =>
                    `${r.analysis}: ${
                        r.resultFinal == null ? "Sin resultado" : r.resultFinal
                    }`
            )
            .join("\n");
    };

    const checkIfAllSamplesAreReady = () => {
        let isAllReady = true;
        samples.forEach((sample) => {
            if (sample.totalAnalysis !== sample.totalAnalysisFinished) {
                isAllReady = false;
            }
        });

        return isAllReady;
    };

    useEffect(() => {
        getSamplesInfoExecution();
    }, []);

    console.log(samples);

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
                <MessageSamplesSelectedExecution
                    samples={samples}
                    onClose={() => onClose()}
                    cleanData={() => cleanData()}
                    isAllSamplesAlReady={checkIfAllSamplesAreReady()}
                />
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
                        Total de muestras seleccionadas : {samples.length}
                    </Typography>
                    <Typography variant="caption">
                        Estas son las muestras que se van a entregar a sus
                        respectivos clientes
                    </Typography>

                    {samples.length < 1 && (
                        <Typography
                            sx={{
                                textAlign: "center",
                                mt: "100px",
                                fontWeight: "bold",
                            }}
                        >
                            No hay muestras seleccionadas.
                        </Typography>
                    )}

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

                                            {sample.totalAnalysisFinished ==
                                            sample.totalAnalysis ? (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        bgcolor:
                                                            "background.default",
                                                        color: "primary.main",
                                                        p: "5px",
                                                        borderRadius: "10px",
                                                        mt: "20px",
                                                        border: `1px solid ${theme.palette.border.primary}`,
                                                    }}
                                                >
                                                    Muestra lista para ejecutar
                                                </Typography>
                                            ) : (
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        bgcolor:
                                                            "background.default",
                                                        color: "red",
                                                        p: "5px",
                                                        borderRadius: "10px",
                                                        mt: "20px",
                                                        border: `1px solid ${theme.palette.border.primary}`,
                                                    }}
                                                >
                                                    Análisis pendiente para
                                                    habilitar la ejecución
                                                </Typography>
                                            )}
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
