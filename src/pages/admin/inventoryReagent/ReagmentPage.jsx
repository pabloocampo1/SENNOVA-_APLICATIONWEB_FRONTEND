import {
    Box,
    Button,
    Divider,
    IconButton,
    MenuItem,
    Pagination,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../service/axiosService";
import { Add, Biotech, ChecklistOutlined, Delete, Edit, FileDownloadOutlined, Info, Science } from "@mui/icons-material";
import SearchBar from "../../../components/SearchBar";
import GenericModal from "../../../components/modals/GenericModal";
import ReagentForm from "../../../components/forms/Reagent/ReagentForm";
import CardsSummaryEquipment from "../inventoryEquipment/componentsEquipment/CardsSummaryEquipment";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../../../components/SimpleBackDrop";

const ReagentPage = () => {
    const [reagents, setReagents] = useState([]);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("name");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate()
    const [isLoanding, setIsLoanding] = useState(false);


    const [openModalReagentForm, setOpenModalReagentForm] = useState(false);


    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleChangePage = (event, value) => {
        setPage(value - 1);
    };

    const refreshData = () => {
        getData();
    };


    const getData = async () => {
        setIsLoanding(true)
        try {

            const res = await api.get(`/reagent/getAll/page?page=${page}`);
            if (res.status === 200) {
                setReagents(res.data.content);
                setTotalPages(res.data.totalPages);
            }
        } catch (error) {
            console.error("Error al traer los reactivos:", error);
        } finally {
            setIsLoanding(false)
        }
    };

    const getDataByParam = async () => {
        switch (searchBy) {
            case "name":
                setIsLoanding(true)
                try {
                    const res = await api.get(`/reagent/getAllByName/${search}`);
                    setReagents(res.data);

                } catch (error) {
                    console.error(error);

                } finally {
                    setIsLoanding(false)
                }

                break;
            case "interalCode":
                setIsLoanding(true)
                try {
                    const res = await api.get(`/reagent/getByInteralCode/${search}`);
                    console.log(res);

                } catch (error) {
                    console.error(error);

                }
                finally {
                    setIsLoanding(false)
                }

                break;

            default:
                break;
        }
    };


    useEffect(() => {

        if (search) {
            getDataByParam();
        } else {
            getData();
        }

    }, [page, search]);


    return (
        <Box sx={{
            width: "100%",
            height: "auto"
        }}>

            <GenericModal
                open={openModalReagentForm}
                onClose={() => setOpenModalReagentForm(false)}
                compo={
                    <ReagentForm
                        refreshData={refreshData}
                        onClose={() => setOpenModalReagentForm(false)}
                    />
                }
            />

            <SimpleBackdrop open={isLoanding} />


            {/* Header compo */}

            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", mb: "40px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h2" component={"h2"}>Inventorio de reactivos</Typography>
                    <Science sx={{ ml: "10px", color: "primary.main" }} />
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<FileDownloadOutlined />}
                    >
                        Descargar Excel
                    </Button>

                    <Button variant="outlined" endIcon={<ChecklistOutlined />} onClick={() => { navigate("/system/inventory/check/reagent") }}>
                        Chequeo de inventario
                    </Button>
                </Box>
            </Box>

            <CardsSummaryEquipment />

            <Divider sx={{ mt: "20px" }} />



            {/* table header */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "30px",
                    mt: "30px",
                    alignItems: "center",
                }}
            >
                <Box sx={{ display: "flex" }}>
                    <SearchBar
                        placeholder="Buscar reactivo"
                        onSearch={(value) => handleSearch(value)}
                    />

                    <TextField
                        select
                        value={searchBy}
                        label="Buscar por"
                        onChange={(e) => setSearchBy(e.target.value)}
                        sx={{
                            width: "180px",
                            ml: "10px",

                        }}
                        variant="outlined"
                    >
                        <MenuItem value="name">Nombre</MenuItem>
                        <MenuItem value="internalCode">Código interno</MenuItem>
                        <MenuItem value="senaInventoryTag">Placa SENA</MenuItem>
                    </TextField>
                </Box>

                <Button
                    onClick={() => setOpenModalReagentForm(true)}
                    variant="outlined"
                    startIcon={<Add />}
                >
                    Agregar nuevo reactivo
                </Button>
            </Box>

            {/* Tabla */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="tabla de reactivos">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: "700" }}>Id</TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>Nombre</TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>Marca</TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>Pureza</TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>Unidades</TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>Cantidad</TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>Unidad</TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>Fecha de vencimiento</TableCell>
                            <TableCell sx={{ fontWeight: "700" }} align="right">Acciones</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {reagents.map((reagent) => (
                            <TableRow key={reagent.reagentsId}>
                                <TableCell sx={{ opacity: "0.70" }}>{reagent.reagentsId}</TableCell>
                                <TableCell sx={{ opacity: "0.70" }}>{reagent.reagentName}</TableCell>
                                <TableCell sx={{ opacity: "0.70" }}>{reagent.brand}</TableCell>
                                <TableCell sx={{ opacity: "0.70" }}>{reagent.purity}</TableCell>
                                <TableCell sx={{ opacity: "0.70" }}>{reagent.units}</TableCell>
                                <TableCell sx={{ opacity: "0.70" }}>{reagent.quantity}</TableCell>
                                <TableCell sx={{ opacity: "0.70" }}>{reagent.measurementUnit}</TableCell>
                                <TableCell sx={{ opacity: "0.70" }}>{reagent.expirationDate}</TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            // setEquipmentToEdit(equipment);
                                            // setOpenEditEquipment(true)
                                        }}
                                    >
                                        <Edit sx={{ color: "primary.main" }} fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            // setEquipmentToDeleteId(equipment.equipmentId)
                                            // setOpenModalDelete(true)
                                        }
                                        }
                                    >
                                        <Delete sx={{ color: "primary.main " }} fontSize="small" />
                                    </IconButton>
                                    <IconButton
                                        size="small"

                                        onClick={() => 
                                            navigate(`/system/inventory/reagents/info/${reagent.reagentsId}`)
                                        }
                                    >
                                        <Info sx={{ color: "primary.main" }} fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>


            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt: 3 }}>
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

export default ReagentPage;
