import {
    Alert,
    Box,
    Button,
    Checkbox,
    Drawer,
    MenuItem,
    Snackbar,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../../../service/axiosService";
import SimpleBackdrop from "../../../../../components/SimpleBackDrop";
import { getDays } from "../../../../../Utils/DateUtils";
import {
    DeleteOutlineTwoTone,
    PictureAsPdf,
    Visibility,
} from "@mui/icons-material";
import GenericModal from "../../../../../components/modals/GenericModal";
import DeleteSamplesModalConfirmation from "../DeleteSamplesModalConfirmation";
import InfoSamplesResultExecution from "../InfoSamplesResultExecution";
import SamplesSelectedInResultExecution from "./SamplesSelectedInResultExecution";
import SamplesExpired from "./SamplesExpired";
import PreviuwReleaseResultModalCompo from "./PreviuwReleaseResultModalCompo";
import {
    getPriority,
    styleBackgroundColorByRestDays,
} from "../../../../../Utils/ResultExecutionSamplesAvailableUtils";
import ModalMessageSendSamples from "./ModalMessageSendSamples";

const getLenght = (analisys = []) => {
    return analisys.length;
};

const ResultExecutionSamplesAvailable = () => {
    const [open, setOpen] = React.useState(false);
    const [openShowDrawerSamplesToExecute, setOpenShowDrawerSamplesToExecute] =
        React.useState(false);

    const [data, setData] = useState([]);
    const [dataSamplesExpired, setDataSampleExpired] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [dataSelected, setDataSelected] = useState([]);
    const [order, setOrder] = useState("all");
    const [openModalToDeleteSamples, setOpenModalToDeleteSamples] =
        useState(false);
    const [sampleSelected, setSampleSelected] = useState({});
    const [responseAlert, setResponseAlert] = useState({
        status: false,
        message: "",
    });
    const theme = useTheme();
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
    const [openModalPreviuwReleaseResult, setOpenModalPreviuwReleaseResult] =
        useState(false);
    const [isLoandingState, setIsLoandingState] = useState({
        state: false,
        text: "",
    });

    const [isSendTheSamples, setIsSendTheSamples] = useState(false);

    const openModalMessage = () => {
        setIsSendTheSamples(true);
    };

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const toggleDrawerShowSamplesSelected = (newOpen) => () => {
        setOpenShowDrawerSamplesToExecute(newOpen);
    };

    const fetchPdf = async (sampleId) => {
        setIsLoandingState({
            state: true,
            text: "Generando documento final",
        });
        try {
            const response = await api.post(
                `/testRequest/pdf/preview/${sampleId}`,
                null,
                {
                    responseType: "blob",
                }
            );
            if (response.status == 200) {
                const file = new Blob([response.data], {
                    type: "application/pdf",
                });
                const fileURL = URL.createObjectURL(file);

                setPdfPreviewUrl(fileURL);

                setIsLoandingState({
                    state: false,
                    text: "",
                });
                setOpenModalPreviuwReleaseResult(true);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoandingState({
                state: false,
                text: "",
            });
        }
    };

    const getData = async () => {
        setIsLoandingState({
            state: true,
            text: "Cargando muestras",
        });

        try {
            const res = await api.get("/sample/pending-delivery");
            setData(res.data);

            setOriginalData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoandingState({
                state: false,
                text: "",
            });
        }
    };

    const getDataSamplesExpired = async () => {
        setIsLoandingState({
            state: true,
            text: "Cargando muestraas vencidas",
        });

        try {
            const res = await api.get("/sample/get-all-status-expired");
            setDataSampleExpired(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoandingState({
                state: false,
                text: "",
            });
        }
    };

    const countAnalysisCompleteBySample = (analysis = []) => {
        return analysis.reduce((c, a) => c + a.stateResult, 0);
    };

    const handleFilterPriorityList = (key) => {
        switch (key) {
            case "low": {
                const updateList = originalData.filter((s) => {
                    const days = getDays(s.dueDate);
                    return days >= 11 && days <= 15;
                });

                setData(updateList);
                return null;
            }

            case "intermediate": {
                const updateList = originalData.filter((s) => {
                    const days = getDays(s.dueDate);
                    return days >= 6 && days <= 10;
                });

                setData(updateList);
                return null;
            }
            case "high": {
                const updateList = originalData.filter((s) => {
                    const days = getDays(s.dueDate);
                    return days >= 1 && days <= 5;
                });

                setData(updateList);
                return null;
            }
            case "all":
                getData();
                break;

            default:
                break;
        }
    };

    const handleDataSelected = (sampleId, checked) => {
        if (checked) {
            setDataSelected([...dataSelected, sampleId]);
        } else {
            setDataSelected(dataSelected.filter((id) => id !== sampleId));
        }
    };

    const handleSelectAll = (checked) => {
        if (checked) {
            const selectedList = data.map((s) => s.sampleId);
            console.log(selectedList);

            setDataSelected(selectedList);
        } else {
            setDataSelected([]);
        }
    };

    const handleSubmitResult = () => {
        if (dataSelected.length < 1) {
            setResponseAlert({
                status: true,
                message:
                    "Debes seleccionar las muestras para realizar entrega final",
            });
            return;
        }

        // open the modal I think
        setOpenShowDrawerSamplesToExecute(true);
    };

    useEffect(() => {
        getData();
        getDataSamplesExpired();
    }, []);

    return (
        <Box>
            <SimpleBackdrop
                open={isLoandingState.state}
                text={isLoandingState.text}
            />

            <GenericModal
                compo={
                    <DeleteSamplesModalConfirmation
                        onClose={() => setOpenModalToDeleteSamples(false)}
                    />
                }
                open={openModalToDeleteSamples}
                onClose={() => setOpenModalToDeleteSamples(false)}
            />

            {pdfPreviewUrl != null && (
                <GenericModal
                    compo={
                        <PreviuwReleaseResultModalCompo
                            pdfPreviewUrl={pdfPreviewUrl}
                        />
                    }
                    open={openModalPreviuwReleaseResult}
                    onClose={() => setOpenModalPreviuwReleaseResult(false)}
                />
            )}

            {/* This modal displays a message when the user selects samples and executes them for final report generation and delivery. */}
            <GenericModal
                compo={
                    <ModalMessageSendSamples
                        onClose={() => setIsSendTheSamples(false)}
                    />
                }
                open={isSendTheSamples}
                onClose={() => setIsSendTheSamples(false)}
            />

            {responseAlert.status && (
                <Snackbar
                    open={responseAlert.status}
                    autoHideDuration={5000}
                    onClose={() => {
                        setResponseAlert({
                            ...responseAlert,
                            status: false,
                        });
                        setResponseAlert({
                            status: false,
                            message: "",
                        });
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        severity="error"
                        onClose={() =>
                            setResponseAlert({
                                status: false,
                                message: "",
                            })
                        }
                        sx={{ width: "100%" }}
                    >
                        {responseAlert.message}
                    </Alert>
                </Snackbar>
            )}
            <Box
                sx={{
                    mb: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "start",
                }}
            >
                <Box sx={{ mr: "20px" }}>
                    <Typography variant="body2">
                        Total de muestras para ejecucion:{" "}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            p: "5px 10px",
                            bgcolor: "primary.main",
                            color: "white",
                            borderRadius: "20px",
                        }}
                    >
                        {data.length}
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2">
                        Total de muestras vencidas:{" "}
                    </Typography>
                    <Typography
                        variant="caption"
                        sx={{
                            p: "5px 10px",
                            bgcolor: "primary.main",
                            color: "white",
                            borderRadius: "20px",
                        }}
                    >
                        {dataSamplesExpired.length}
                    </Typography>
                </Box>
            </Box>

            {dataSelected.length >= 1 && (
                <Box
                    sx={{
                        mt: "10px",
                        mb: "20px",
                        display: "flex",
                        justifyContent: "end",
                    }}
                >
                    <Button
                        variant="outlined"
                        startIcon={<DeleteOutlineTwoTone />}
                        onClick={() => setOpenModalToDeleteSamples(true)}
                    >
                        Eliminar muestras
                    </Button>
                </Box>
            )}

            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: "20px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <TextField
                        label="filtrar por prioridad"
                        select
                        value={order}
                        onChange={(e) => {
                            setOrder(e.target.value);
                            handleFilterPriorityList(e.target.value);
                        }}
                    >
                        <MenuItem value="low">Prioridad baja</MenuItem>
                        <MenuItem value="intermediate">
                            Prioridad media
                        </MenuItem>
                        <MenuItem value="high">Prioridad alta</MenuItem>
                        <MenuItem value="all">Todos</MenuItem>
                    </TextField>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Checkbox
                            onChange={(e) => handleSelectAll(e.target.checked)}
                        />

                        <Typography variant="body1">
                            Seleccionar todos
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography sx={{ mr: "20px" }}>
                        Elementos seleccionados: {dataSelected.length}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => handleSubmitResult()}
                    >
                        Ejecutar finalizacion
                    </Button>
                </Box>
            </Box>

            <Box
                sx={{
                    mt: "40px",
                    mb: "30px",
                }}
            >
                <Typography variant="h6">Muestras para ejecucion</Typography>

                <Typography
                    sx={{
                        textAlign: "center",
                        mb: "20px",
                        color: "primary.main",
                    }}
                >
                    {data.length <= 0 &&
                        "No hay muestras vencidas disponibles para mostrar"}
                </Typography>
                <TableContainer>
                    <Table
                        sx={{
                            border: `1px solid ${theme.palette.border.primary}`,
                        }}
                    >
                        <TableHead
                            sx={{
                                borderRadius: "20px",
                                bgcolor: "background.default",
                            }}
                        >
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Muestra {"(Matrix)"}</TableCell>
                                <TableCell>Codigo {"(muestra)"}</TableCell>
                                <TableCell>Total de analisis</TableCell>
                                <TableCell>PDF</TableCell>
                                <TableCell>Dias restantes</TableCell>
                                <TableCell>Prioridad</TableCell>
                                <TableCell>Ver</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((sample, index) => {
                                return (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            width: "100%",
                                            height: "50px",
                                            borderBottom: "1px solid blue",
                                            borderLeft: `10px solid ${styleBackgroundColorByRestDays(
                                                sample.dueDate
                                            )}`,
                                            bgcolor: ` ${styleBackgroundColorByRestDays(
                                                sample.dueDate
                                            )}10`,
                                        }}
                                    >
                                        <TableCell>
                                            <Checkbox
                                                label="Seleccionar"
                                                checked={dataSelected.includes(
                                                    sample.sampleId
                                                )}
                                                onChange={(e) =>
                                                    handleDataSelected(
                                                        sample.sampleId,
                                                        e.target.checked
                                                    )
                                                }
                                                // onClick={() =>
                                                //     handleDataSelected(
                                                //         sample.sampleId
                                                //     )
                                                // }
                                            />
                                        </TableCell>
                                        <TableCell>{sample.matrix}</TableCell>
                                        <TableCell>
                                            {" "}
                                            {sample.sampleCode}
                                        </TableCell>

                                        <TableCell>
                                            {countAnalysisCompleteBySample(
                                                sample.analysisEntities
                                            )}{" "}
                                            /{" "}
                                            {getLenght(sample.analysisEntities)}
                                        </TableCell>
                                        <TableCell>
                                            <PictureAsPdf
                                                onClick={() =>
                                                    fetchPdf(sample.sampleId)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            {getDays(sample.dueDate)} dias
                                        </TableCell>
                                        <TableCell>
                                            {getPriority(sample.dueDate)}
                                        </TableCell>

                                        <TableCell
                                            onClick={() => {
                                                setOpen(true),
                                                    setSampleSelected(sample);
                                            }}
                                            sx={{
                                                cursor: "pointer",
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Visibility />
                                                <Typography
                                                    sx={{
                                                        textAlign: "center",
                                                    }}
                                                >
                                                    resultados
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* ` Reusing the same handlers to avoid duplicating logic` */}
            <SamplesExpired
                styleBackgroundColorByRestDays={() =>
                    styleBackgroundColorByRestDays()
                }
                handleDataSelected={(sampleId, checked) =>
                    handleDataSelected(sampleId, checked)
                }
                dataSelected={dataSelected}
                getDays={(dueDate) => getDays(dueDate)}
                getPriority={(dueDate) => getPriority(dueDate)}
                setSampleSelected={(sample) => setSampleSelected(sample)}
                setOpen={(boolean) => setOpen(boolean)}
                data={dataSamplesExpired}
                fetchPdf={(sampleId) => fetchPdf(sampleId)}
            />

            {/* THIS DRAWER IS FOR SHOW THE RESULTS OF ONE SAMPLE */}
            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <InfoSamplesResultExecution data={sampleSelected} />
            </Drawer>

            {/* THIS DRAWER IS FOR SHOW ALL SAMPLES SELECTED TO RESULT EXECUTION */}
            <Drawer
                anchor="right"
                open={openShowDrawerSamplesToExecute}
                onClose={toggleDrawerShowSamplesSelected(false)}
            >
                <SamplesSelectedInResultExecution
                    samplesSelected={dataSelected}
                    onClose={toggleDrawerShowSamplesSelected(false)}
                    cleanData={() => setDataSelected([])}
                    fetchPdf={(sampleId) => fetchPdf(sampleId)}
                    openModalMessage={() => openModalMessage()}
                />
            </Drawer>
        </Box>
    );
};

export default ResultExecutionSamplesAvailable;
