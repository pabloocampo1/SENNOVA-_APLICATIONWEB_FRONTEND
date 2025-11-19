import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonBack from "../../../../components/ButtonBack";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";
import api from "../../../../service/axiosService";
import { Circle, ScienceOutlined, Upload } from "@mui/icons-material";
import SampleReception from "./SampleReception";

const SampleInfo = () => {
    const { sampleId } = useParams();
    const [isLoanding, setIsLoanding] = useState(false);
    const [sampleData, setSampleData] = useState({});
    const [analysis, setAnalysis] = useState([]);
    const [sampleReceptionDto, setSampleReceptionDto] = useState({
        sampleEntryDate: null,
        sampleReceptionDate: null,
        gross_weight: null,
        temperature: null,
        statusReception: null,
        packageDescription: null,
        createAt: null,
        identificationSample: null,
        storageConditions: null,
        observations: null,
    });

    const getSampleData = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(`/sample/get-sample-data/${sampleId}`);
            if (res.status == 200) {
                setSampleData(res.data);

                const data = res.data;

                setSampleReceptionDto({
                    sampleEntryDate: data.sampleEntryDate,
                    statusReception: data.statusReception,
                    sampleReceptionDate: data.sampleReceptionDate,
                    gross_weight: data.gross_weight,
                    temperature: data.temperature,
                    createAt: data.createAt,
                    storageConditions: data.storageConditions,
                    identificationSample: data.identificationSample,
                    packageDescription: data.packageDescription,
                    observations: data.observations,
                });
                setAnalysis(data.analysisEntities);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    useEffect(() => {
        getSampleData();
    }, []);

    return (
        <Box>
            <SimpleBackdrop
                open={isLoanding}
                text="Cargando toda la informacion de la muestra"
            />
            <ButtonBack />
            {/* HEADER */}
            <Box
                sx={{
                    mt: "20px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "40px",
                    }}
                >
                    <ScienceOutlined
                        sx={{ mr: "10px", color: "primary.main" }}
                    />
                    <Typography
                        sx={{
                            mr: "10px",
                            fontWeight: "bold",
                            opacity: "0.90",
                        }}
                    >
                        Muestra
                    </Typography>
                    <Typography> #{sampleData.sampleCode}</Typography>
                    <Circle
                        sx={{
                            m: "0px 10px",
                            width: "15px",
                            color: "primary.main",
                        }}
                    />
                    <Typography
                        sx={{
                            mr: "10px",
                            fontWeight: "bold",
                            opacity: "0.90",
                        }}
                    >
                        {" "}
                        Emision de resultado
                    </Typography>
                </Box>
            </Box>
            {/* SAMPLES */}
            <SampleReception data={sampleReceptionDto} />

            <Typography
                variant="h3"
                component={"h3"}
                sx={{
                    pt: "20px",
                    pb: "20px",
                }}
            >
                Ánalisis
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                    mb: "40px",
                }}
            >
                {analysis.map((a) => {
                    return (
                        <Box
                            sx={{
                                minHeight: "300px",
                                bgcolor: "background.default",
                                p: "10px",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "space-between",
                            }}
                            key={a.sampleProductAnalysisId}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                }}
                            >
                                <Typography variant="body1">
                                    {a.product.analysis}
                                </Typography>
                                <Circle
                                    sx={{
                                        width: "15px",
                                        mr: "10px",
                                        ml: "10px",
                                    }}
                                />
                                <Typography variant="body2">
                                    {a.code}
                                </Typography>
                            </Box>

                            <Box component={"form"}>
                                <Box
                                    sx={{
                                        display: "flex",
                                    }}
                                >
                                    <TextField
                                        label={"Resultado final"}
                                        type="text"
                                        placeholder="Digite el resultaado final"
                                    />
                                    <TextField
                                        type="datetime-local"
                                        placeholder="Digite el resultaado final"
                                    />
                                </Box>
                            </Box>

                            <Box>
                                <Button
                                    sx={{
                                        width: "100%",
                                    }}
                                    startIcon={<Upload />}
                                >
                                    Agregar archivo
                                </Button>

                                <Button
                                    variant="contained"
                                    sx={{
                                        width: "100%",
                                    }}
                                >
                                    Guardar resultado
                                </Button>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default SampleInfo;
