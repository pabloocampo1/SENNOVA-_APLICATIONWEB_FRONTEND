import { Box, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SamplesTestRequestCompo = ({
    samples = [],
    getTotalFinished,
    requestCode,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();

    const getTotalSamplesAnalysisFinished = (list) => {
        const total = list.reduce((acc, a) => acc + (a.stateResult ? 1 : 0), 0);
        return total;
    };

    return (
        <Box
            sx={{
                mt: "40px",
                mb: "100px",
            }}
        >
            <Typography variant="h3" sx={{ fontWeight: "bold" }}>
                Muestras
            </Typography>
            <Typography sx={{ opacity: "0.80", mb: "40px" }}>
                {getTotalFinished()}/{samples.length} de las muestras estan
                finalizadas
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                }}
            >
                {samples.map((sample, index) => (
                    <Tooltip
                        title={`${getTotalSamplesAnalysisFinished(
                            sample.analysisEntities
                        )} Análisis terminados`}
                    >
                        <Box
                            key={index}
                            sx={{
                                width: "350px",
                                height: "150px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                bgcolor: "background.paper",
                                borderLeft:
                                    getTotalSamplesAnalysisFinished(
                                        sample.analysisEntities
                                    ) !== sample.analysisEntities.length
                                        ? "5px solid #FFA500"
                                        : "5px solid #1E90FF",
                                borderRadius: "10px",
                                p: "10px 20px",
                                ":hover": {
                                    transform: "scale(1.03)",
                                    boxShadow: 5,
                                },
                            }}
                            onClick={() =>
                                navigate(
                                    `/system/result/test-request/${requestCode}/${sample.sampleId}`
                                )
                            }
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {sample.sampleCode}
                                </Typography>
                                <Typography>{sample.matrix}</Typography>
                                <Typography
                                    variant="caption"
                                    sx={{
                                        p: "5px",
                                        bgcolor: "action.hover",
                                        borderRadius: "20px",
                                        mt: "10px",
                                    }}
                                >
                                    {sample.statusReception
                                        ? "Con recepcion de muestra"
                                        : "Sin Recepcion de muestras"}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                }}
                            >
                                <Typography>Análisis</Typography>
                                {getTotalSamplesAnalysisFinished(
                                    sample.analysisEntities
                                )}
                                /{sample.analysisEntities.length}
                            </Box>
                        </Box>
                    </Tooltip>
                ))}
            </Box>
        </Box>
    );
};

export default SamplesTestRequestCompo;
