import { Box } from "@mui/material";
import React from "react";
import ReagentForm from "../../../../components/forms/Reagent/ReagentForm";
import ResultExecutionSamplesAvailable from "./ResultExecutionSamplesAvailable";
import SampleAnalysisResultCard from "./SampleAnalysisResultCard";

const InfoSamplesResultExecution = ({ data = {} }) => {
    console.log(data);

    return (
        <Box
            sx={{
                width: "600px",
                p: "30px",
            }}
        >
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
