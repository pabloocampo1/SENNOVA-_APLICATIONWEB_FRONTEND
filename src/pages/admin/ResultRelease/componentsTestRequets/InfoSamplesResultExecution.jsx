import { Box, Typography } from "@mui/material";

import SampleAnalysisResultCard from "./SampleAnalysisResultCard";

// this module show all results of analysis of one sample into result execution

const InfoSamplesResultExecution = ({
    data = {},
    updateList = false,
    getData,
}) => {
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
                    mb: "10px",
                    fontWeight: "bold",
                    textAlign: "center",
                }}
            >
                Informacion de resultado de analisis
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: "primary.main",
                    textAlign: "center",
                }}
            >
                Codigo de muestra {data.sampleCode}
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: "primary.main",
                    textAlign: "center",
                    mb: "60px",
                }}
            >
                Matrix {data.matrix}
            </Typography>

            <Typography variant="caption">
                Como super administrador solo tu puedes editar esta informacion
            </Typography>
            {data.analysisEntities.map((a, index) => {
                return (
                    <Box key={index}>
                        <SampleAnalysisResultCard
                            updateList={updateList}
                            getData={() => getData()}
                            data={a}
                            isAdminEdit={true}
                        />
                    </Box>
                );
            })}
        </Box>
    );
};

export default InfoSamplesResultExecution;
