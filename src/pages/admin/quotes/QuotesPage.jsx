import {
    Box,
    Button,
    Drawer,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    Stack,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import QuotationCustomer from "../../public/QuotationCustomer";
import SearchBar from "../../../components/SearchBar";
import { Add, RequestQuote } from "@mui/icons-material";
import api from "../../../service/axiosService";
import QuotationCard from "./quotesCompo/QuotationCard";
import QuotationInfo from "./quotesCompo/QuotationInfo";
import SimpleBackdrop from "../../../components/SimpleBackDrop";

const QuotesPage = () => {
    const [showQuotation, setShowQuotation] = useState(false);
    const [quotationData, setQuotationData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [quotateSelected, setQuotateSelected] = useState({});
    const [isLoanding, setIsLoanding] = useState(false);
    const [optionSelectedFilterBy, setOptionSelectedFilterBy] = useState("all");
    const [searchBy, setSearchBy] = useState("code");
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleChangePage = (event, value) => {
        setPage(value - 1);
    };

    const getData = async () => {
        setIsLoanding(true);

        try {
            const res = await api.get(
                `/testRequest/get-all/quotation?page=${page}`,
            );
            setTotalPages(res.data.totalPages);
            setQuotationData(res.data.content);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const getDataByState = async (state) => {
        if (state == "all") {
            getData();
        }

        setIsLoanding(true);
        setOptionSelectedFilterBy(state);
        try {
            const res = await api.get(`/testRequest/get-by-state/${state}`);
            setQuotationData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const getDataBySearch = async (e) => {
        setSearch(e);
        setIsLoanding(true);
        try {
            const res = await api.get(
                `/testRequest/get-by-option-search/${searchBy}/${e}`,
            );
            console.log(res);
            setQuotationData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    useEffect(() => {
        if (search == "") {
            getData();
        }
    }, [search, page]);

    useEffect(() => {}, [quotationData]);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100%",
                p: "10px",
                borderRadius: "20px",
                pt: "20px",
            }}
        >
            {showQuotation ? (
                <Box>
                    <QuotationCustomer
                        isAdmin={true}
                        backSectionQuotation={() => {
                            setShowQuotation(false);
                            getData();
                        }}
                    />
                </Box>
            ) : (
                <Box>
                    <SimpleBackdrop
                        open={isLoanding}
                        text="Cargando cotizaciones"
                    />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            mb: "30px",
                        }}
                    >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography component={"h2"} variant="h2">
                                Gestio de cotizaciones y creacion de ensayos.
                            </Typography>
                            <RequestQuote sx={{ color: "primary.main" }} />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                            Modulo de gestion de cotizaciones de ensayos, podras
                            revisar, aceptar y rechazar cotizaciones de
                            solicitudes de ensayos
                        </Typography>
                    </Box>

                    {/* header */}
                    <Box
                        sx={{
                            width: "100%",
                            height: "10vh",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                            }}
                        >
                            <SearchBar
                                onSearch={(e) => getDataBySearch(e)}
                                placeholder="Buscar cotizacion"
                            />
                            <FormControl
                                sx={{
                                    width: "150px",
                                    borderRadius: "20px",
                                    ml: "20px",
                                }}
                            >
                                <InputLabel id="demo-simple-select-label">
                                    Buscar por:
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    label="Buscar por:"
                                    value={searchBy}
                                    onChange={(e) => {
                                        setSearchBy(e.target.value);
                                        setSearch("");
                                    }}
                                >
                                    <MenuItem value={"code"}>Codigo</MenuItem>
                                    <MenuItem value={"customerName"}>
                                        Nombre cliente
                                    </MenuItem>
                                </Select>
                            </FormControl>
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
                                    onChange={(e) =>
                                        getDataByState(e.target.value)
                                    }
                                >
                                    <MenuItem value={"PENDIENTE"}>
                                        Sin aceptar
                                    </MenuItem>
                                    <MenuItem value={"ACEPTADA"}>
                                        Aceptadas
                                    </MenuItem>
                                    <MenuItem value={"RECHAZADA"}>
                                        No aceptadas
                                    </MenuItem>
                                    <MenuItem value={"all"}>Todas</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Button
                            startIcon={<Add />}
                            variant="contained"
                            sx={{
                                textTransform: "none",
                            }}
                            onClick={() => setShowQuotation(true)}
                        >
                            Crear ensayo
                        </Button>
                    </Box>

                    {quotationData.length < 1 && (
                        <Box
                            sx={{
                                width: "100%",
                                height: "50vh",
                                mt: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Typography
                                sx={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    fontSize: "1.8rem",
                                }}
                            >
                                No hay cotizaciones.
                            </Typography>
                        </Box>
                    )}

                    <Box
                        sx={{
                            width: "100%",
                            display: "grid",
                            mt: "30px",
                            mb: "50px",
                            gridTemplateColumns: {
                                xs: "repeat(auto-fill, minmax(300px, 1fr))",
                                md: "repeat(auto-fill, minmax(300px, 1fr))",
                            },
                            gap: "20px",
                        }}
                    >
                        {quotationData.map((quotation) => (
                            <QuotationCard
                                data={quotation}
                                openInfo={toggleDrawer(true)}
                                setQuotateSelected={(data) =>
                                    setQuotateSelected(data)
                                }
                            />
                        ))}
                    </Box>

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mt: "40px",
                        }}
                    >
                        <Stack spacing={2}>
                            <Pagination
                                count={totalPages}
                                page={page + 1}
                                onChange={handleChangePage}
                                color="primary"
                            />
                        </Stack>
                    </Box>

                    <Drawer
                        anchor="right"
                        open={open}
                        onClose={toggleDrawer(false)}
                    >
                        <QuotationInfo
                            data={quotateSelected}
                            onClose={toggleDrawer(false)}
                            refreshData={() => getData()}
                        />
                    </Drawer>
                </Box>
            )}
        </Box>
    );
};

export default QuotesPage;
