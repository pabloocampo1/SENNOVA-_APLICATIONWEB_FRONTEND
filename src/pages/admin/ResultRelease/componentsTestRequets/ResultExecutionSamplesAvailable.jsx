import {
    Box,
    Button,
    Checkbox,
    MenuItem,
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
    Looks,
    PictureAsPdf,
    Visibility,
    Watch,
    WatchLaterOutlined,
} from "@mui/icons-material";

const getLenght = (analisys = []) => {
    return analisys.length;
};

const ResultExecutionSamplesAvailable = () => {
    const [isLoanding, setIsLoanding] = useState(false);
    const [data, setData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [order, setOrder] = useState("all");
    const theme = useTheme();

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

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box>
            <SimpleBackdrop open={isLoanding} />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <Typography
                    sx={{
                        mr: "20px",
                    }}
                >
                    Muetras para ejecutar
                </Typography>
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
                    <MenuItem value="intermediate">Prioridad media</MenuItem>
                    <MenuItem value="high">Prioridad alta</MenuItem>
                    <MenuItem value="all">Todos</MenuItem>
                </TextField>
            </Box>

            <Box>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Seleccionar</TableCell>
                                <TableCell>Muestra {"(Matrix)"}</TableCell>
                                <TableCell>Codigo</TableCell>
                                <TableCell>total de analisis</TableCell>
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
                                            <Checkbox label="Seleccionar" />
                                        </TableCell>
                                        <TableCell>{sample.matrix}</TableCell>
                                        <TableCell>
                                            {sample.sampleCode}
                                        </TableCell>
                                        <TableCell>
                                            {getLenght(sample.analysisEntities)}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                            }}
                                        >
                                            <PictureAsPdf />
                                            <Button variant="outlined">
                                                Ver o generar
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            {getDays(sample.dueDate)} dias
                                        </TableCell>
                                        <TableCell>
                                            {getPriority(sample.dueDate)}
                                        </TableCell>
                                        <TableCell>
                                            <Visibility />
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default ResultExecutionSamplesAvailable;
