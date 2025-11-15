import {
    Box,
    Button,
    Divider,
    Drawer,
    LinearProgress,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ButtonBack from "../../../components/ButtonBack";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import api from "../../../service/axiosService";
import {
    AccessTime,
    Add,
    CalendarMonth,
    CheckCircle,
    Circle,
    DeleteForever,
    DeleteForeverOutlined,
    FastForward,
    Groups2Outlined,
    InfoOutline,
    Inventory2,
    LockClock,
    PersonAdd,
    ScienceOutlined,
    ScienceTwoTone,
} from "@mui/icons-material";
import CustomerCardTestRequest from "../CustomerAndUsers/CustomerCardTestRequest";
import UserUIMiniCard from "../CustomerAndUsers/UserUIMiniCard";
import SamplesTestRequestCompo from "./SamplesTestRequestCompo";
import AddMemberCompo from "./componentsTestRequets/AddMemberCompo";
import MembersOfTestRequest from "./componentsTestRequets/MembersOfTestRequest";
import GenericModal from "../../../components/modals/GenericModal";
import ModalToDeleteTestRequest from "../quotes/quotesCompo/ModalToDeleteTestRequest";
import TestRequestNotFound from "./componentsTestRequets/TestRequestNotFound";
// import imageNoFinishTestRequest from "../../../assets/images/undraw_next-tasks_y3rm.svg";

const TestRequestInfo = () => {
    const { testRequestId } = useParams();
    const [isLoanding, setIsLoanding] = useState(true);
    const [testRequest, setTestRequest] = useState({});
    const theme = useTheme();
    const [team, setTeam] = useState([]);
    const [open, setOpen] = useState(false);
    const [openModalToDelete, setOpenModalToDelete] = useState(false);

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
                }}
            >
                {/* BUTON COME BACK TO THE LAST SECTION */}
                <ButtonBack />

                {/* ICON TO DELETE TEST REQUEST */}

                <Tooltip title="Elimianar ensayo.">
                    <DeleteForeverOutlined
                        color="warning"
                        onClick={() => setOpenModalToDelete(true)}
                    />
                </Tooltip>
            </Box>

            {/* HEADER of the section */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
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
                        <ScienceOutlined sx={{ mr: "10px" }} />
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
                        <Circle sx={{ m: "0px 10px", width: "15px" }} />
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

                <Button variant="contained">Recepcion de muestras</Button>
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
                                bgcolor: theme.palette.grey[200],
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

            <Box sx={{ display: "flex", gap: "20px", mb: "30px", mt: "20px" }}>
                <CustomerCardTestRequest objectData={testRequest.customer} />
                <Box
                    sx={{
                        width: "60%",
                        minHeight: "370px",
                        bgcolor: "background.paper",
                        border: `1px solid ${theme.palette.border.primary}`,
                        borderRadius: "20px",
                        p: "20px",
                        display: "flex",
                        justifyContent: "space-between",
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
                    <Box
                        sx={{
                            width: "100%",
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
                                <Circle
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
                                <Circle
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
                                <Circle
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
                                <Circle
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
                                <Circle
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
                </Box>
            </Box>

            {/* USER ASSIGNED */}

            <Divider sx={{ mt: "30px", mb: "20px" }} />
            <MembersOfTestRequest
                toggleDrawer={toggleDrawer}
                team={team}
                removeMember={(userId) => removeMember(userId)}
            />

            {/* SAMPLES */}
            <SamplesTestRequestCompo
                samples={testRequest.samples}
                getTotalFinished={() => getTotalSamplesFinished()}
            />

            <Box
                sx={{
                    mb: "20px",
                    mt: "40px",
                }}
            >
                {getTotalSamplesFinished() == testRequest.samples.length
                    ? "ya esta listo"
                    : "aun falta"}
                <Button>aceptar ensayo</Button>
            </Box>

            {/* ASSIGN MEMBER */}

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
