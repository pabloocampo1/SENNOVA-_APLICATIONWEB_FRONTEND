import {
    Alert,
    Box,
    Button,
    Checkbox,
    Drawer,
    FormControlLabel,
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
import api from "../../../../service/axiosService";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";
import { getDays } from "../../../../Utils/DateUtils";
import {
    CheckBox,
    Delete,
    DeleteOutline,
    DeleteOutlineTwoTone,
    Looks,
    PictureAsPdf,
    Visibility,
    Watch,
    WatchLaterOutlined,
} from "@mui/icons-material";
import GenericModal from "../../../../components/modals/GenericModal";
import DeleteSamplesModalConfirmation from "./DeleteSamplesModalConfirmation";
import InfoSamplesResultExecution from "./InfoSamplesResultExecution";
import SamplesSelectedInResultExecution from "./SamplesSelectedInResultExecution";
import SamplesExpired from "./ResultExecution/SamplesExpired";

const getLenght = (analisys = []) => {
    return analisys.length;
};

const ResultExecutionSamplesAvailable = () => {
    const [open, setOpen] = React.useState(false);
    const [openShowDrawerSamplesToExecute, setOpenShowDrawerSamplesToExecute] =
        React.useState(false);
    const [isLoanding, setIsLoanding] = useState(false);
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

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    const toggleDrawerShowSamplesSelected = (newOpen) => () => {
        setOpenShowDrawerSamplesToExecute(newOpen);
    };

    const getData = async () => {
        setIsLoanding(true);

        try {
            const res = await api.get("/sample/get-all-status-process");
            setData(res.data);

            setOriginalData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const getDataSamplesExpired = async () => {
        setIsLoanding(true);

        try {
            const res = await api.get("/sample/get-all-status-expired");
            setDataSampleExpired(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const styleBackgroundColorByRestDays = (dueDate) => {
        const days = getDays(dueDate);

        if (days >= 1 && days <= 5) {
            return " #E53935";
        } else if (days >= 6 && days <= 10) {
            return " #FB8C00";
        } else if (days >= 11 && days <= 15) {
            return "#1E88E5";
        } else {
            return "ya se acabo manito";
        }
    };

    const countAnalysisCompleteBySample = (analysis = []) => {
        return analysis.reduce((c, a) => c + a.stateResult, 0);
    };

    const getPriority = (dueDate) => {
        const days = getDays(dueDate);

        if (days >= 1 && days <= 5) {
            return (
                <Box
                    sx={{
                        color: "white",
                        p: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "20px",
                        bgcolor: "#E53935",
                    }}
                >
                    Prioridad Alta
                </Box>
            );
        } else if (days >= 6 && days <= 10) {
            return (
                <Box
                    sx={{
                        color: "white",
                        p: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "20px",
                        bgcolor: "#FB8C00",
                    }}
                >
                    Pri. Intermedia
                </Box>
            );
        } else if (days >= 11 && days <= 15) {
            return (
                <Box
                    sx={{
                        color: "white",
                        p: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "20px",
                        bgcolor: "#1E88E5",
                    }}
                >
                    Prioridad baja
                </Box>
            );
        } else if (days === 0) {
            return (
                <Box
                    sx={{
                        color: "white",
                        p: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "20px",
                        bgcolor: "#8E24AA",
                    }}
                >
                    Para hoy
                </Box>
            );
        } else {
            return (
                <Box
                    sx={{
                        color: "#E53935",
                        p: "10px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        textAlign: "center",
                        borderRadius: "20px",
                    }}
                >
                    Fecha vencida
                </Box>
            );
        }
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
            <SimpleBackdrop open={isLoanding} />

            <GenericModal
                compo={
                    <DeleteSamplesModalConfirmation
                        onClose={() => setOpenModalToDeleteSamples(false)}
                    />
                }
                open={openModalToDeleteSamples}
                onClose={() => setOpenModalToDeleteSamples(false)}
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
                                                    alert(
                                                        "funcionalidad en progreso"
                                                    )
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
                />
            </Drawer>
        </Box>
    );
};

export default ResultExecutionSamplesAvailable;
