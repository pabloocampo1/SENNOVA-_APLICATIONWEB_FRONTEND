import {
    Box,
    Button,
    Divider,
    Drawer,
    IconButton,
    LinearProgress,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ButtonBack from "../../../components/ButtonBack";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import api from "../../../service/axiosService";
import {
    AccessTime,
    ArrowBack,
    CalendarMonth,
    CheckCircle,
    Circle,
    DeleteForeverOutlined,
    DoneAll,
    InfoOutline,
    Inventory2,
    LockClock,
    ScienceOutlined,
    ScienceTwoTone,
    WarningAmber,
} from "@mui/icons-material";
import CustomerCardTestRequest from "../CustomerAndUsers/CustomerCardTestRequest";
import UserUIMiniCard from "../CustomerAndUsers/UserUIMiniCard";
import SamplesTestRequestCompo from "./componentsTestRequets/SamplesTestRequestCompo";
import AddMemberCompo from "./componentsTestRequets/AddMemberCompo";
import MembersOfTestRequest from "./componentsTestRequets/MembersOfTestRequest";
import GenericModal from "../../../components/modals/GenericModal";
import ModalToDeleteTestRequest from "../quotes/quotesCompo/ModalToDeleteTestRequest";
import TestRequestNotFound from "./componentsTestRequets/TestRequestNotFound";

import InfoSummaryTestRequest from "./componentsTestRequets/InfoSummaryTestRequest";
import { useAuth } from "../../../context/AuthContext";

/*
    PAGE WITH ALL THE INFORMATION ABOUT A TEST REQUEST

    This component displays everything related to a test request,
    including sample details, customer information, and request data.
    It also provides access to the sample reception page.
*/

const TestRequestInfo = () => {
    const { testRequestId } = useParams();
    const [isLoanding, setIsLoanding] = useState(true);
    const [testRequest, setTestRequest] = useState({});
    const theme = useTheme();
    const [team, setTeam] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [openModalToDelete, setOpenModalToDelete] = useState(false);
    const { authObject } = useAuth();

    const getInformationAboutTestRequest = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(
                `/testRequest/get-by-id/${testRequestId}`
            );
            if (res.status == 200) {
                setTestRequest(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const iconByStatus = (status) => {
        const config = {
            "Espera de recepción": (
                <LockClock sx={{ fontSize: 25, mr: "10px" }} />
            ),
            "En proceso": <AccessTime sx={{ fontSize: 16, mr: "10px" }} />,
            Terminada: <CheckCircle sx={{ fontSize: 16, mr: "10px" }} />,
            Vnecida: <InfoOutline sx={{ fontSize: 16, mr: "10px" }} />,
        };

        return config[status] || config["Espera de recepción"];
    };

    const getProgres = () => {
        if (!testRequest?.samples?.length) {
            // No hay samples aún
            return 0;
        }
        const list = [...testRequest.samples];
        const totalAnalysisfinished = list.reduce(
            (acc, sample) =>
                acc +
                sample.analysisEntities.filter((a) => a.stateResult == true)
                    .length,
            0
        );

        const totalAnalisis = testRequest.samples.reduce(
            (acc, sample) => acc + sample.analysisEntities.length,
            0
        );

        const progressPercent = (totalAnalysisfinished / totalAnalisis) * 100;

        return progressPercent.toFixed(0);
    };

    const getDays = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);

        const diff = due - today;
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

        return days;
    };

    const getTheTeam = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(`/testRequest/members/${testRequestId}`);
            setTeam(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const getTotalSamplesFinished = () => {
        const total = testRequest.samples.reduce((acc, sample) => {
            let areFinished = true;
            sample.analysisEntities.forEach((element) => {
                if (!element.stateResult) {
                    areFinished = false;
                }
            });

            if (areFinished) {
                return acc + 1;
            } else {
                return acc;
            }
        }, 0);

        return total;
    };

    const removeMember = async (userId) => {
        try {
            const res = await api.put(
                `/testRequest/remove-member/${testRequestId}/${userId}`
            );

            const newListTeam = team.filter((user) => user.userId !== userId);

            if (res.status == 200) {
                setTeam(newListTeam);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getToTalAnalysis = () => {
        const total = [...testRequest.samples].reduce(
            (acc, sample) => acc + sample.analysisEntities.length,
            0
        );
        return total;
    };

    useEffect(() => {
        getInformationAboutTestRequest();
        getTheTeam();
    }, []);

    if (isLoanding) {
        return <SimpleBackdrop text="Cargando informacion del ensayo" open />;
    }

    if (!testRequest?.testRequestId) {
        return (
            <Box>
                <TestRequestNotFound />
            </Box>
        );
    }
    return (
        <Box
            sx={{
                bgcolor: "background.default",
                width: "100%",
                p: "20px",
                borderRadius: "20px",
            }}
        >
            <SimpleBackdrop
                text="Cargando informacion del ensayo"
                open={isLoanding}
            />

            <GenericModal
                open={openModalToDelete}
                onClose={() => setOpenModalToDelete(false)}
                compo={
                    <ModalToDeleteTestRequest
                        onClose={() => setOpenModalToDelete(false)}
                        onCloseDeleted={() => {
                            setOpenModalToDelete(false);
                            setTestRequest(null);
                        }}
                        requestCode={testRequest.requestCode}
                        // here put yes becase we need the modal show the option to delete, but this test request was accepted
                        isAccepted={false}
                        testRequestId={testRequest.testRequestId}
                    />
                }
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    p: 2.5,
                    bgcolor: "background.paper",
                    borderRadius: 2,
                    border: `1px solid ${theme.palette.divider}`,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
            >
                {/* Botón de regreso */}
                <ButtonBack />

                {/* Acciones principales */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexWrap: "wrap",
                    }}
                >
                    {/* Botón Finalizar */}
                    <Tooltip
                        title={
                            authObject.role ==
                            "Ejecutar el ensayo con los datos actuales"
                        }
                        arrow
                        placement="bottom"
                    >
                        <Button
                            variant="outlined"
                            startIcon={<CheckCircle />}
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                px: 2.5,
                                color: "success.main",
                                borderColor: "success.main",
                                "&:hover": {
                                    borderColor: "success.dark",
                                    bgcolor: "success.main",
                                    color: "white",
                                },
                            }}
                        >
                            Finalizar ensayo
                        </Button>
                    </Tooltip>

                    {/* Botón Recepción de muestras */}
                    <Tooltip
                        title="Ir a recepción de muestras"
                        arrow
                        placement="bottom"
                    >
                        <Button
                            variant="contained"
                            startIcon={<Inventory2 />}
                            onClick={() =>
                                navigate(
                                    `/system/result/test-request/${testRequest.testRequestId}/recepcion-muestras`
                                )
                            }
                            sx={{
                                borderRadius: 2,
                                textTransform: "none",
                                fontWeight: 600,
                                px: 2.5,
                                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                "&:hover": {
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
                                    transform: "translateY(-2px)",
                                    transition: "all 0.2s ease",
                                },
                            }}
                        >
                            Recepción de muestras
                        </Button>
                    </Tooltip>

                    {/* Divisor visual */}
                    <Divider
                        orientation="vertical"
                        flexItem
                        sx={{
                            mx: 0.5,
                            bgcolor: theme.palette.divider,
                        }}
                    />

                    {/* Botón Eliminar */}
                    <Tooltip title="Eliminar ensayo" arrow placement="bottom">
                        <IconButton
                            onClick={() => setOpenModalToDelete(true)}
                            sx={{
                                border: `1px solid ${theme.palette.error.main}30`,
                                borderRadius: 2,
                                color: "error.main",
                                "&:hover": {
                                    bgcolor: "error.main",
                                    color: "white",
                                    borderColor: "error.main",
                                    transform: "rotate(5deg)",
                                    transition: "all 0.2s ease",
                                },
                            }}
                        >
                            <DeleteForeverOutlined />
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>

            {/* HEADER of the section */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "start",
                    alignItems: "center",
                }}
            >
                <Box>
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
                            Ensayo
                        </Typography>
                        <Typography> #{testRequest.requestCode}</Typography>
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

                    <Typography sx={{ ml: "35px" }} variant="body2">
                        {testRequest.dueDate == null
                            ? "No se ah generado una fecha de entrega para este ensayo"
                            : `Quedan ${getDays(
                                  testRequest.dueDate
                              )} dias para la entrega de la muestra`}
                    </Typography>
                </Box>
            </Box>
            {/* INFO BASIC */}

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: "50px",
                    mb: "50px",
                }}
            >
                <Box>
                    <Typography
                        variant="caption"
                        sx={{
                            p: "10px",
                            bgcolor: "action.hover",
                            borderRadius: "20px",
                        }}
                    >
                        Progreso de este ensayo
                    </Typography>
                </Box>
                <Typography sx={{ mt: "20px" }}>{getProgres()}%</Typography>
                {testRequest?.samples ? (
                    <Box
                        sx={{
                            width: "100%",
                            mb: "5px",
                        }}
                    >
                        <LinearProgress
                            variant="determinate"
                            value={getProgres()}
                            sx={{
                                width: "100%",
                                height: 15,
                                border: `1px solid ${
                                    theme.palette.primary.main + 90
                                }`,
                                mt: "20px",
                                borderRadius: 4,
                                bgcolor: "background.paper",
                                "& .MuiLinearProgress-bar": {
                                    borderRadius: 4,
                                    background:
                                        getProgres() === 100
                                            ? `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})`
                                            : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                                },
                            }}
                        />
                    </Box>
                ) : (
                    "Cargando progreso..."
                )}
                <Typography variant="body2" sx={{ opacity: 0.7 }}>
                    Este porcentaje representa las muestras analizadas hasta el
                    momento.
                </Typography>
            </Box>

            {/* SAMPLES */}
            <SamplesTestRequestCompo
                samples={testRequest.samples}
                getTotalFinished={() => getTotalSamplesFinished()}
                requestCode={testRequest.requestCode}
            />

            <Box sx={{ display: "flex", gap: "20px", mb: "30px", mt: "20px" }}>
                <InfoSummaryTestRequest
                    testRequest={testRequest}
                    getToTalAnalysis={() => getToTalAnalysis()}
                    iconByStatus={(param) => iconByStatus(param)}
                    getTotalSamplesFinished={() => getTotalSamplesFinished()}
                />
            </Box>

            {/* USER ASSIGNED */}

            <Divider sx={{ mt: "30px", mb: "20px" }} />
            <Box
                sx={{
                    display: "flex",
                }}
            >
                <Box>
                    <MembersOfTestRequest
                        toggleDrawer={toggleDrawer}
                        team={team}
                        removeMember={(userId) => removeMember(userId)}
                    />
                </Box>
            </Box>

            {/* ASSIGN MEMBER MODAl*/}

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <AddMemberCompo
                    onClose={() => {
                        getTheTeam();
                        setOpen(false);
                    }}
                    requestCode={testRequest.requestCode}
                    testRequestId={testRequest.testRequestId}
                />
            </Drawer>
        </Box>
    );
};

export default TestRequestInfo;
