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
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import api from "../../../service/axiosService";
import {
    Add,
    ChecklistOutlined,
    Delete,
    Edit,
    FileDownloadOutlined,
    Grade,
    Info,
    Science,
    Search,
} from "@mui/icons-material";
import SearchBar from "../../../components/SearchBar";
import GenericModal from "../../../components/modals/GenericModal";
import ReagentForm from "../../../components/forms/Reagent/ReagentForm";

import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import ModalToDelete from "./reagentCompo/ModalToDelete";
import CardsSummaryReagent from "./reagentCompo/CardsSummaryReagent";
import downloadExcel from "../../../service/ExportDataExcel";
import { AuthContext } from "../../../context/AuthContext";

const ReagentPage = () => {
    const [reagents, setReagents] = useState([]);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("name");
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const [isLoanding, setIsLoanding] = useState(false);
    const [openModalEdit, setOpenModalEdit] = useState(false);
    const [dataToEdit, setDataToEdit] = useState({});
    const [reagentIdToDelete, setReagentIdToDelete] = useState(null);
    const [openModalToDelete, setOpenModalToDelete] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { authObject } = useContext(AuthContext);

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
        setIsLoanding(true);
        try {
            const res = await api.get(`/reagent/getAll/page?page=${page}`);
            if (res.status === 200) {
                setReagents(res.data.content);
                setTotalPages(res.data.totalPages);
            }
        } catch (error) {
            console.error("Error al traer los reactivos:", error);
        } finally {
            setIsLoanding(false);
        }
    };

    const deleteReagent = async () => {
        setIsLoanding(true);
        try {
            const res = await api.delete(
                `/reagent/delete/${reagentIdToDelete}`,
            );
            if (res.status == 200) {
                const currentData = reagents;
                const newData = currentData.filter(
                    (data) => data.reagentsId !== reagentIdToDelete,
                );
                setReagents(newData);
                setOpenModalToDelete(false);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const getDataByParam = async () => {
        switch (searchBy) {
            case "name":
                setIsLoanding(true);
                console.log("entro a busvar por nombre: " + search);

                try {
                    const res = await api.get(
                        `/reagent/getAllByName/${search}`,
                    );
                    setReagents(res.data);

                    console.log("data que trajo: " + res.data);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoanding(false);
                }

                break;
            case "interalCode":
                setIsLoanding(true);
                try {
                    const res = await api.get(
                        `/reagent/getByInteralCode/${search}`,
                    );
                    console.log(res);
                } catch (error) {
                    console.error(error);
                } finally {
                    setIsLoanding(false);
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
        <Box
            sx={{
                width: "100%",
                height: "auto",
                bgcolor: "background.default",
                borderRadius: "20px",
                p: "20px",
            }}
        >
            <GenericModal
                open={openModalToDelete}
                onClose={() => setOpenModalToDelete(false)}
                compo={
                    <ModalToDelete
                        handleDelete={() => deleteReagent()}
                        onClose={() => setOpenModalToDelete(false)}
                    />
                }
            />

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

            <GenericModal
                open={openModalEdit}
                onClose={() => setOpenModalEdit(false)}
                compo={
                    <ReagentForm
                        data={dataToEdit}
                        isEdit={true}
                        refreshData={refreshData}
                        onClose={() => setOpenModalEdit(false)}
                    />
                }
            />

            <SimpleBackdrop open={isLoanding} />

            {/* Header compo */}

            <Box
                sx={{
                    width: "100%",

                    mb: "40px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",

                        mb: { xs: "20px" },
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="h2" component={"h2"}>
                            Inventorio de reactivos
                        </Typography>
                        <Science sx={{ ml: "10px", color: "primary.main" }} />
                    </Box>
                    <Typography
                        sx={{ pr: "40%" }}
                        variant="body2"
                        color="text.secondary"
                    >
                        Gestiona aquí el inventario y la caducidad de tus
                        reactivos. Mantener el stock actualizado y registrar
                        cada uso es fundamental para garantizar un control
                        preciso, evitar vencimientos imprevistos y recibir
                        alertas oportunas sobre el estado de tus insumos.
                    </Typography>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
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
                        }}
                        onClick={() => {
                            const today = new Date();
                            const filename = `inventario_reactivos_${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}.xlsx`;
                            downloadExcel("/export/reagent/excel", filename);
                        }}
                    >
                        Export excel
                    </Button>

                    <Button
                        variant="outlined"
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
                        }}
                        endIcon={<ChecklistOutlined />}
                        onClick={() => {
                            navigate("/system/inventory/check/reagent");
                        }}
                    >
                        Chequeo de inventario
                    </Button>
                </Box>
            </Box>

            <Box sx={{ m: "10px" }}>
                <CardsSummaryReagent />
            </Box>

            <Divider sx={{ mt: "20px" }} />

            {/* table header */}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
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
                    sx={{
                        mt: { xs: "40px", textTransform: "none" },
                    }}
                >
                    Agregar nuevo reactivo
                </Button>
            </Box>

            {/* Tabla */}
            <TableContainer component={Paper}>
                <Table sx={{}} aria-label="tabla de reactivos">
                    <TableHead>
                        <TableRow>
                            <TableCell
                                sx={{
                                    fontWeight: "700",
                                }}
                            >
                                Id
                            </TableCell>
                            <TableCell sx={{ fontWeight: "700" }}>
                                Nombre
                            </TableCell>
                            {!isMobile && (
                                <>
                                    <TableCell sx={{ fontWeight: "700" }}>
                                        Marca
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>
                                        Pureza
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>
                                        Unidades
                                    </TableCell>
                                </>
                            )}
                            <TableCell sx={{ fontWeight: "700" }}>
                                Cantidad
                            </TableCell>

                            {!isMobile && (
                                <>
                                    <TableCell sx={{ fontWeight: "700" }}>
                                        Ubicacion
                                    </TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>
                                        Fecha de vencimiento
                                    </TableCell>
                                </>
                            )}
                            <TableCell sx={{ fontWeight: "700" }} align="right">
                                Acciones
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {reagents.map((reagent) => (
                            <TableRow key={reagent.reagentsId} hover>
                                <TableCell sx={{ opacity: "0.70" }}>
                                    {reagent.reagentsId}
                                </TableCell>
                                <TableCell sx={{ opacity: "0.70" }}>
                                    {reagent.reagentName}
                                </TableCell>
                                {!isMobile && (
                                    <>
                                        <TableCell sx={{ opacity: "0.70" }}>
                                            {reagent.brand}
                                        </TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>
                                            {reagent.purity}
                                        </TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>
                                            {reagent.units}
                                        </TableCell>
                                    </>
                                )}
                                <TableCell sx={{ opacity: "0.70" }}>
                                    {reagent.quantity} {reagent.unitOfMeasure}
                                </TableCell>
                                {!isMobile && (
                                    <>
                                        <TableCell sx={{ opacity: "0.70" }}>
                                            {reagent.locationName == null ||
                                            reagent.locationName == ""
                                                ? "Null"
                                                : reagent.locationName}
                                        </TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>
                                            {reagent.expirationDate}
                                        </TableCell>
                                    </>
                                )}

                                <TableCell align="right">
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            setOpenModalEdit(true);
                                            setDataToEdit(reagent);
                                        }}
                                    >
                                        <Edit
                                            sx={{ color: "primary.main" }}
                                            fontSize="small"
                                        />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        color="primary"
                                        disabled={
                                            authObject.role !==
                                            "ROLE_SUPERADMIN"
                                        }
                                        onClick={() => {
                                            setReagentIdToDelete(
                                                reagent.reagentsId,
                                            );
                                            setOpenModalToDelete(true);
                                        }}
                                    >
                                        <Delete
                                            sx={{ color: "primary.main " }}
                                            fontSize="small"
                                        />
                                    </IconButton>
                                    <IconButton
                                        size="small"
                                        onClick={() =>
                                            navigate(
                                                `/system/inventory/reagents/info/${reagent.reagentsId}`,
                                            )
                                        }
                                    >
                                        <Info
                                            sx={{ color: "primary.main" }}
                                            fontSize="small"
                                        />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mt: 3,
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
        </Box>
    );
};

export default ReagentPage;
