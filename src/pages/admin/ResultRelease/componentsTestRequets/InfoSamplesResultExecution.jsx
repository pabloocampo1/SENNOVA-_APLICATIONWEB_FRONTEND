import { Box, Typography } from "@mui/material";
import React from "react";
import ReagentForm from "../../../../components/forms/Reagent/ReagentForm";
import ResultExecutionSamplesAvailable from "./ResultExecutionSamplesAvailable";
import SampleAnalysisResultCard from "./SampleAnalysisResultCard";

const InfoSamplesResultExecution = ({ data = {} }) => {
    return (
        <Box
            sx={{
                width: "600px",
                p: "30px",
                bgcolor: "background.paper",
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    mt: "50px",

                    textAlign: "center",
                }}
            >
                Informacion de resultado de analisis
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    textAlign: "center",
                    mb: "30px",
                }}
            >
                muestra {data.sampleCode}
            </Typography>
            {data.analysisEntities.map((a, index) => {
                return (
                    <Box key={index}>
                        <SampleAnalysisResultCard data={a} isAdminEdit={true} />
                    </Box>
                );
            })}
            {data.matrix}
        </Box>
    );
};

export default InfoSamplesResultExecution;
