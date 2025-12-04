import { useTheme } from "@emotion/react";
import {
    CalendarMonth,
    CheckCircle,
    Circle,
    CircleOutlined,
    DoneAll,
    Inventory2,
    ScienceTwoTone,
    WarningAmber,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import imageNoFinishTestRequest from "../../../../assets/images/undraw_next-tasks_y3rm.svg";

// here there are only information of one test request, the

const InfoSummaryTestRequest = ({
    testRequest = {},
    iconByStatus,
    getToTalAnalysis,
    getTotalSamplesFinished,
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "300px",
                bgcolor: "background.paper",
                border: `1px solid ${theme.palette.border.primary}`,
                borderRadius: "20px",
                p: "20px",
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: "20px",
                }}
            >
                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    variant="caption"
                >
                    <CheckCircle /> Informacion del ensayo
                </Typography>
            </Box>

            {/* HERE THERE TWO BOX IN THE FIRST ONE THE INFO OF THE TEST REQUEST AND THE ANOTHER ONE ONE SIMPLE TEXT WITH ONE IMAGE */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    // alignItems: "center",
                }}
            >
                {/* // HERE INFO TEST REQUEST */}

                <Box
                    sx={{
                        width: "70%",
                        mt: "50px",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "30px",
                    }}
                >
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <CircleOutlined
                                sx={{
                                    width: "15px",
                                    mr: "10px",
                                    color: "primary.main",
                                }}
                            />{" "}
                            Fecha de creacion
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                opacity: "0.80",
                            }}
                        >
                            {" "}
                            <CalendarMonth
                                sx={{ width: "20px", mr: "10px" }}
                            />{" "}
                            {testRequest.createAt}{" "}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="body1"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <CircleOutlined
                                sx={{
                                    width: "15px",
                                    mr: "10px",
                                    color: "primary.main",
                                }}
                            />{" "}
                            Fecha de aceptacion
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                opacity: "0.80",
                            }}
                        >
                            {" "}
                            <CalendarMonth
                                sx={{ width: "20px", mr: "10px" }}
                            />{" "}
                            {testRequest.approvalDate}{" "}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <CircleOutlined
                                sx={{
                                    width: "15px",
                                    mr: "10px",
                                    color: "primary.main",
                                }}
                            />{" "}
                            Fecha de entrega del ensayo
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                opacity: "0.80",
                            }}
                        >
                            {" "}
                            <CalendarMonth
                                sx={{ width: "20px", mr: "10px" }}
                            />{" "}
                            {testRequest.dueDate == null
                                ? "Sin fecha generada."
                                : testRequest.dueDate}{" "}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1">
                            Estado actual de ensayo
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                opacity: "0.80",
                            }}
                        >
                            {" "}
                            {iconByStatus(testRequest.deliveryStatus)}{" "}
                            {testRequest.deliveryStatus}{" "}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="body1"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <CircleOutlined
                                sx={{
                                    width: "15px",
                                    mr: "10px",
                                    color: "primary.main",
                                }}
                            />{" "}
                            Total de muestras
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                opacity: "0.80",
                            }}
                        >
                            {" "}
                            <Inventory2
                                sx={{ width: "20px", mr: "10px" }}
                            />{" "}
                            {testRequest.samples.length}{" "}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography
                            variant="body1"
                            sx={{ display: "flex", alignItems: "center" }}
                        >
                            <CircleOutlined
                                sx={{
                                    width: "15px",
                                    mr: "10px",
                                    color: "primary.main",
                                }}
                            />{" "}
                            Total de analisis
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                opacity: "0.80",
                            }}
                        >
                            {" "}
                            <ScienceTwoTone
                                sx={{ width: "20px", mr: "10px" }}
                            />{" "}
                            {getToTalAnalysis()}{" "}
                        </Typography>
                    </Box>
                </Box>

                {/* // HERE MESSAGE WITH IMAGE */}

                <Box
                    sx={{
                        width: "30%",
                    }}
                >
                    <Box
                        sx={{
                            mb: "20px",
                            mt: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                flexDirection: "column",
                                mb: "20px",
                            }}
                        >
                            {getTotalSamplesFinished() ==
                            testRequest.samples.length ? (
                                <Typography
                                    color="primary.main"
                                    sx={{ mb: "40px", textAlign: "center" }}
                                >
                                    Este ensayo ah completado todos los análisis
                                    de las muestras. <DoneAll />
                                </Typography>
                            ) : (
                                <Typography
                                    color="warning"
                                    sx={{ mb: "40px", textAlign: "center" }}
                                >
                                    Este ensayo aun no completa los análisis de
                                    las muestras. <WarningAmber />
                                </Typography>
                            )}
                            <img
                                width={"200px"}
                                src={imageNoFinishTestRequest}
                                alt="imagenofinbished"
                            />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default InfoSummaryTestRequest;
