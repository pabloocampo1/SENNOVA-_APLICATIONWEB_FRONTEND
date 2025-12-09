import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonBack from "../../../../components/ButtonBack";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";
import api from "../../../../service/axiosService";
import { Circle, ScienceOutlined, Upload } from "@mui/icons-material";
import SampleReception from "./SampleReception";
import SampleAnalysisResultCard from "./SampleAnalysisResultCard";

/* 
    SAMPLE RESULT

    This component handles all analyses for a single sample.
    It also provides a form to submit the results.
*/

const SampleInfo = () => {
    const { sampleId, requestCode } = useParams();
    const [isLoanding, setIsLoanding] = useState(false);
    const [sampleData, setSampleData] = useState({});
    const [analysis, setAnalysis] = useState([]);
    const [sampleReceptionDto, setSampleReceptionDto] = useState({});

    const getSampleData = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(`/sample/get-sample-data/${sampleId}`);
            if (res.status == 200) {
                setSampleData(res.data);

                const data = res.data;

                setSampleReceptionDto(data);
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
                <Box
                    sx={{
                        mt: "10px",
                    }}
                >
                    <Typography
                        sx={{
                            textAlign: "center",
                            p: "10px",
                            borderRadius: "15px",

                            bgcolor: sampleData.statusReception
                                ? "#c7919120"
                                : "#ee0f0f20",
                        }}
                        variant="caption"
                        color={
                            sampleData.statusReception
                                ? "primary.main"
                                : "error.main"
                        }
                    >
                        {sampleData.statusReception
                            ? "Recepción de muestra registrada"
                            : "Esta muestra no ha registrado recepción"}
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
                        "repeat(auto-fill, minmax(400px, 1fr))",
                    gap: "40px",
                    mb: "40px",
                }}
            >
                {analysis.map((a, index) => {
                    return (
                        <Box key={index}>
                            <SampleAnalysisResultCard
                                data={a}
                                requestCode={requestCode}
                            />
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default SampleInfo;
