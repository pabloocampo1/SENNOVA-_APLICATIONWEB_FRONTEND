import { FileDownloadOutlined, Science } from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Stack,
    Typography,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import api from "../../../service/axiosService";

import SimpleBackdrop from "../../../components/SimpleBackDrop";
import cloudImage from "../../../assets/images/undraw_clouds_bmtk.svg";

import { useAuth } from "../../../context/AuthContext";
import downloadExcel from "../../../service/ExportDataExcel";
import YearSelect from "../../../components/YearSelect";
import TestRequestItem from "./TestRequestItem";

const ResultsRelease = () => {
    const theme = useTheme();
    const [testRequest, setTestRequest] = useState([]);
    const [year, setYear] = useState("");
    const [isLoanding, setIsLoanding] = useState(false);
    const [search, setSearch] = useState("");
    const [optionSelectedFilterBy, setOptionSelectedFilterBy] = useState("ALL");
    const { authObject } = useAuth();
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleChangePage = (event, value) => {
        setPage(value - 1);
    };

    const getTestRequestAccepted = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(
                `/testRequest/get-all-info-summary/${authObject.email}?page=${page}`,
            );
            setTestRequest(res.data.content);
            setTotalPages(res.data.page.totalPages);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const checkIfAreAssignedToTestRequet = (
        usersAssignedToTestRequest = [],
    ) => {
        if (authObject.role == "ROLE_SUPERADMIN") {
            return true;
        }
        return usersAssignedToTestRequest.some(
            (user) => user.email == authObject.email,
        );
    };

    const getDataBySearch = async (e) => {
        setSearch(e);
        setIsLoanding(true);

        try {
            const res = await api.get(
                `/testRequest/get-all-info-summary-by-code/${e}`,
            );

            setTestRequest(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const getDataByState = async (state) => {
        if (state == "ALL") {
            getTestRequestAccepted();
        }

        setIsLoanding(true);
        setOptionSelectedFilterBy(state);
        try {
            const res = await api.get(
                `/testRequest/get-all-info-summary-by-status/${state}`,
            );
            setTestRequest(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    useEffect(() => {
        if (search == "") {
            getTestRequestAccepted();
        }
    }, [search, page]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100%",
                p: "20px",
                borderRadius: "20px",
            }}
        >
            <SimpleBackdrop text="Cargando ensayos" open={isLoanding} />
            {/* HEADER */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* info about header */}
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Science sx={{ color: "primary.main", mr: "15px" }} />
                        <Typography component={"h2"} variant="h2">
                            Gestion de emision de resultados / ensayos
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ opacity: "0.80" }}>
                            Cotizaciones aceptadas que ahora se encuentran en
                            proceso de ensayo
                        </Typography>
                    </Box>
                    <Chip
                        label={"total de ensayos: " + testRequest.length}
                        sx={{
                            bgcolor: `${theme.palette.primary.main}40`,
                            mt: "20px",
                            fontWeight: "500",
                            textAlign: "center",
                        }}
                    />
                </Box>

                <Box>
                    <YearSelect onYearChange={(newYear) => setYear(newYear)} />
                    <Button
                        variant="outlined"
                        startIcon={<FileDownloadOutlined />}
                        sx={{
                            borderRadius: "8px",
                            bgcolor: "background.paper",
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                            borderColor: "divider",
                            color: "text.secondary",
                            "&:hover": {
                                backgroundColor: "action.hover",
                                borderColor: "primary.main",
                            },
                            ml: "15px",
                        }}
                        onClick={() => {
                            if (!year) setYear(new Date().getFullYear());

                            const filename = `ensayos-${year}.xlsx`;
                            downloadExcel(
                                `/export/testRequest/${year}`,
                                filename,
                            );
                        }}
                    >
                        Export excel
                    </Button>
                </Box>
            </Box>

            {/* options */}

            <Box
                sx={{
                    display: "flex",
                    mt: "30px",
                }}
            >
                <SearchBar
                    onSearch={(e) => getDataBySearch(e)}
                    placeholder="Buscar ensayo por codigo"
                />

                <FormControl
                    sx={{
                        width: "150px",
                        borderRadius: "20px",
                        ml: "20px",
                    }}
                >
                    <InputLabel id="demo-simple-select-label">
                        filtrar por:
                    </InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Filtrar por:"
                        value={optionSelectedFilterBy}
                        onChange={(e) => getDataByState(e.target.value)}
                        sx={{
                            borderRadius: "10px",
                        }}
                    >
                        <MenuItem value={"Espera de recepción"}>
                            Sin recepcion de muestras
                        </MenuItem>
                        <MenuItem value={"En proceso"}>En Proceso</MenuItem>
                        <MenuItem value={"Terminada"}>
                            Terminadas al 100%
                        </MenuItem>
                        <MenuItem value={"COMPLETADO Y ENTREGADO"}>
                            Terminadas y enviadas
                        </MenuItem>
                        <MenuItem value={"Vencida"}>
                            Vencidas {"(Tiempo finalizado)"}
                        </MenuItem>
                        <MenuItem value={"ALL"}>Todas</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            {/* CONTENT */}

            {testRequest.length < 1 && (
                <Box
                    sx={{
                        width: "100%",
                        height: "50vh",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <Typography sx={{ fontSize: "1.3rem", mb: "20px" }}>
                        {" "}
                        No hay ensayos
                    </Typography>

                    <img src={cloudImage} alt="imageCloud" width={"200px"} />
                </Box>
            )}

            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                    mt: "40px",
                }}
            >
                {testRequest.map((test, index) => {
                    return (
                        <TestRequestItem
                            test={test}
                            index={index}
                            checkIfAreAssignedToTestRequet={(team) =>
                                checkIfAreAssignedToTestRequet(team)
                            }
                            theme={theme}
                        />
                    );
                })}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: "40px" }}>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default ResultsRelease;
