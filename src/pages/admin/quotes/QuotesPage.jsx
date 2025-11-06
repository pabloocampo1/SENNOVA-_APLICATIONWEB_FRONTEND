import {
    Box,
    Button,
    Drawer,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
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

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const getData = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get("/testRequest/get-all");
            console.log(res);
            setQuotationData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {}, [quotationData]);

    return (
        <Box>
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
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography component={"h2"} variant="h2">
                            Gestio de cotizaciones y creacion de ensayos.
                        </Typography>
                        <RequestQuote sx={{ color: "primary.main" }} />
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
                            <SearchBar placeholder="Buscar cotizacion" />
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
                                >
                                    <MenuItem value={"name"}>
                                        Sin aceptar
                                    </MenuItem>
                                    <MenuItem value={"serialNumber"}>
                                        Aceptadas
                                    </MenuItem>
                                    <MenuItem value={"internalCode"}>
                                        No aceptadas
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
                                >
                                    <MenuItem value={"name"}>
                                        Sin aceptar
                                    </MenuItem>
                                    <MenuItem value={"serialNumber"}>
                                        Aceptadas
                                    </MenuItem>
                                    <MenuItem value={"internalCode"}>
                                        No aceptadas
                                    </MenuItem>
                                </Select>
                            </FormControl>
                        </Box>

                        <Button
                            startIcon={<Add />}
                            variant="contained"
                            onClick={() => setShowQuotation(true)}
                        >
                            Crear ensayo
                        </Button>
                    </Box>

                    <Box
                        sx={{
                            width: "100%",
                            display: "grid",
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
