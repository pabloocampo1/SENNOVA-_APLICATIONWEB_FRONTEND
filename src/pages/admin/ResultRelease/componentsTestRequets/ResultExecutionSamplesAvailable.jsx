import {
    Box,
    Button,
    Checkbox,
    Drawer,
    FormControlLabel,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
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

const getLenght = (analisys = []) => {
    return analisys.length;
};

const ResultExecutionSamplesAvailable = () => {
    const [open, setOpen] = React.useState(false);
    const [isLoanding, setIsLoanding] = useState(false);
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [dataSelected, setDataSelected] = useState([]);
    const [order, setOrder] = useState("all");
    const [openModalToDeleteSamples, setOpenModalToDeleteSamples] =
        useState(false);
    const [sampleSelected, setSampleSelected] = useState({});
    // const theme = useTheme();

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
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
        } else {
            return "ya se acabo manito";
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

    useEffect(() => {
        getData();
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
                        onClick={() => console.log(dataSelected)}
                    >
                        Ejecutar finalizacion
                    </Button>
                </Box>
            </Box>

            <FormControlLabel
                sx={{ mt: "20px" }}
                control={
                    <Checkbox
                        onChange={(e) => handleSelectAll(e.target.checked)}
                    />
                }
                label="Seleccionar todos"
            />

            <Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Seleccionar</TableCell>
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
                                            borderLeft: `10px solid ${styleBackgroundColorByRestDays(
                                                sample.dueDate
                                            )}`,
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
                                        >
                                            <Visibility />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                <InfoSamplesResultExecution data={sampleSelected} />
            </Drawer>
        </Box>
    );
};

export default ResultExecutionSamplesAvailable;
