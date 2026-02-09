import {
    Add,
    BuildCircle,
    ChecklistOutlined,
    Delete,
    Edit,
    FileDownload,
    FileDownloadDoneOutlined,
    FileDownloadOutlined,
    Info,
    QrCodeScanner,
    Report,
    TableChart,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Divider,
    FormControl,
    IconButton,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import CardsSummaryEquipment from "./componentsEquipment/CardsSummaryEquipment";
import api from "../../../service/axiosService";
import SearchBar from "../../../components/SearchBar";
import GenericModal from "../../../components/modals/GenericModal";
import EquipmentForm from "../../../components/forms/Equipment/EquipmentForm";
import EquipmentConfirmationDelete from "../../../components/forms/Equipment/EquipmentConfirmationDelete";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import TableEquipments from "./componentsEquipment/TableEquipments";
import OptionCheckInvAndReportEquipments from "./componentsEquipment/OptionCheckInvAndReportEquipments";
import downloadExcel from "../../../service/ExportDataExcel";
import { AuthContext } from "../../../context/AuthContext";

const EquipmentPage = () => {
    const [dataEquipments, setDataEquipments] = useState([]);
    const [equipmentToEdit, setEquipmentToEdit] = useState({});
    const [page, setPage] = useState(0);
    const [openCreatedEquipment, setOpenCreatedEquipment] = useState(false);
    const [openEditEquipment, setOpenEditEquipment] = useState(false);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("name");
    const [totalPages, setTotalPages] = useState();
    const [responseAlert, setResponseAlert] = useState({
        status: false,
        message: "",
    });
    const [errorMessageCreate, setErrorMessageCreate] = useState({});
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [equipmentToDeleteId, setEquipmentToDeleteId] = useState(false);
    const navigate = useNavigate();
    const [isLoanding, setIsLoanding] = useState(false);
    const [refreshSummary, setRefreshSummary] = useState(0);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const { authObject } = useContext(AuthContext);

    const handleChangeSelect = (event) => {
        setSearchBy(event.target.value);
    };

    const handleChange = (event, value) => {
        setPage(value - 1);
    };

    function deleteEquipment() {
        setIsLoanding(true);
        const fetchDelete = async () => {
            try {
                const res = await api.delete(
                    `/equipment/delete/${equipmentToDeleteId}`,
                );
                if (res.status == 200) {
                    setOpenModalDelete(false);
                    fetchData();
                    setRefreshSummary((prev) => prev + 1);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setIsLoanding(false);
            }
        };

        fetchDelete();
    }

    function editEquipment(equipment, image) {
        setIsLoanding(true);

        const edit = async () => {
            try {
                const formData = new FormData();
                formData.append(
                    "dto",
                    new Blob([JSON.stringify(equipment)], {
                        type: "application/json",
                    }),
                );
                formData.append("image", image);
                formData.append("userAction", authObject.name);

                const res = await api.put(
                    `/equipment/update/${equipment.equipmentId}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    },
                );
                if (res.status == 200) {
                    setOpenEditEquipment(false);
                    fetchData();
                    setResponseAlert({
                        status: true,
                        message: "El equipo se actualizo correctamente.",
                    });
                }
            } catch (error) {
                if (error.response) {
                    const backendError = error.response.data;

                    if (backendError.errors) {
                        setErrorMessageCreate((prev) => ({
                            ...prev,
                            ...backendError.errors,
                        }));
                    }
                }
            } finally {
                setIsLoanding(false);
            }
        };

        edit();
    }

    function getByParam() {
        const fetchDataByName = async () => {
            try {
                const res = await api.get(
                    `/equipment/get-all-by-name/${search}`,
                );
                if (res.status == 200) {
                    setDataEquipments(res.data);
                }
            } catch (error) {
                if (error.response) {
                    const backendError = error.response.data;

                    if (backendError.errors.general) {
                        setErrorMessageCreate(backendError.errors.general);
                    }
                }
            }
        };

        const fetchDataByInternalCode = async () => {
            try {
                const res = await api.get(
                    `/equipment/get-all-by-internal-code/${search}`,
                );
                if (res.status == 200) {
                    setDataEquipments(res.data);
                }
            } catch (error) {
                if (error.response) {
                    const backendError = error.response.data;

                    if (backendError.errors.general) {
                        setErrorMessageCreate(backendError.errors.general);
                    }
                }
            }
        };

        const fetchDataBySerialNumber = async () => {
            alert(
                "La funcion de buscar un equipo por su numero serial no esta disponible.",
            );
        };

        switch (searchBy) {
            case "name":
                fetchDataByName();
                break;
            case "serialNumber":
                fetchDataBySerialNumber();
                break;
            case "internalCode":
                fetchDataByInternalCode();
                break;

            default:
                break;
        }
    }

    function saveEquipment(dto, imageFile) {
        setIsLoanding(true);

        const save = async () => {
            try {
                const formData = new FormData();
                formData.append(
                    "dto",
                    new Blob([JSON.stringify(dto)], {
                        type: "application/json",
                    }),
                );
                if (imageFile != null) {
                    formData.append("image", imageFile);
                }

                formData.append("userAction", authObject.name);

                const res = await api.post("/equipment/save", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                if (res.status === 201) {
                    fetchData();
                    setOpenCreatedEquipment(false);
                    setResponseAlert({
                        status: true,
                        message: "Equipo agregado exitosamente.",
                    });
                    setRefreshSummary((prev) => prev + 1);
                }
            } catch (error) {
                console.log(error);

                if (error.response) {
                    const backendError = error.response.data;
                    if (backendError.errors) {
                        setErrorMessageCreate({
                            ...backendError.errors,
                        });
                    }
                }
            } finally {
                setIsLoanding(false);
            }
        };

        save();
    }

    const fetchData = async () => {
        setIsLoanding(true);

        try {
            const res = await api.get(`/equipment/page?page=${page}`);
            if (res.status == 200) {
                setDataEquipments(res.data.content);
                setTotalPages(res.data.page.totalPages);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const getMaintenanceStatus = (maintenanceDate) => {
        if (!maintenanceDate) {
            return {
                label: "Sin registro",
                color: "#99999930",
                border: "2px solid #777",
            };
        }

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const [year, month, day] = maintenanceDate.split("-").map(Number);
        const maintenance = new Date(year, month - 1, day);
        maintenance.setHours(0, 0, 0, 0);

        const diffTime = maintenance.getTime() - today.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
            return {
                label: `⚠️ Vencido hace ${Math.abs(diffDays)} día(s)`,
            };
        } else if (diffDays === 0) {
            return {
                label: "📅 hoy!",
            };
        } else if (diffDays <= 30) {
            return {
                label: `⏳ en ${diffDays} día(s)`,
            };
        }

        return {
            label: `✅ Al día (faltan ${diffDays} día(s))`,
        };
    };

    useEffect(() => {
        if (search) {
            getByParam();
        } else {
            fetchData();
        }
    }, [page, search]);

    useEffect(() => {
        fetchData();
    }, [refreshSummary]);

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
            {/** Modals */}
            <GenericModal
                open={openCreatedEquipment}
                onClose={() => {
                    (setOpenCreatedEquipment(false), setErrorMessageCreate({}));
                }}
                compo={
                    <EquipmentForm
                        errors={errorMessageCreate}
                        onClose={() => {
                            (setOpenCreatedEquipment(false),
                                setErrorMessageCreate({}));
                        }}
                        method={(dto, image) => saveEquipment(dto, image)}
                        isEdit={false}
                    />
                }
            />
            <GenericModal
                open={openEditEquipment}
                onClose={() => {
                    (setOpenEditEquipment(false), setErrorMessageCreate({}));
                }}
                compo={
                    <EquipmentForm
                        errors={errorMessageCreate}
                        data={equipmentToEdit}
                        onClose={() => {
                            (setOpenEditEquipment(false),
                                setErrorMessageCreate({}));
                        }}
                        method={(dto, image) => editEquipment(dto, image)}
                        isEdit={true}
                    />
                }
            />
            <GenericModal
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                compo={
                    <EquipmentConfirmationDelete
                        openLoanging={isLoanding}
                        equipmentToDeleteId={equipmentToDeleteId}
                        onClose={() => setOpenModalDelete(false)}
                        method={() => deleteEquipment()}
                    />
                }
            />

            <SimpleBackdrop open={isLoanding} />

            {/** Messages */}
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
                        severity="success"
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

            {/* header of the section*/}
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start  ",
                    alignItems: "start",
                    flexWrap: "wrap",

                    mb: "40px",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h2" component={"h2"}>
                        Inventorio de equipos
                    </Typography>
                    <BuildCircle sx={{ ml: "10px", color: "primary.main" }} />
                </Box>
                <Box>
                    <Typography variant="body2" color="text.secondary">
                        Control, verificación y reporte de los equipos
                        registrados en el sistema, facilitando la gestión de su
                        estado operativo y disponibilidad.
                    </Typography>
                </Box>
            </Box>

            <OptionCheckInvAndReportEquipments navigate={navigate} />
            <CardsSummaryEquipment refresh={refreshSummary} />

            <Divider sx={{ mt: "20px" }} />

            <Box>
                {/** table content header */}
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        flexWrap: "wrap",
                        alignItems: "center",
                        mt: "40px",
                    }}
                >
                    <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                        <SearchBar onSearch={(value) => setSearch(value)} />
                        <FormControl
                            sx={{
                                width: "120px",
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
                                value={searchBy}
                                label="Buscar por:"
                                onChange={handleChangeSelect}
                            >
                                <MenuItem value={"name"}>Nombre</MenuItem>
                                <MenuItem value={"serialNumber"}>
                                    Numero serial
                                </MenuItem>
                                <MenuItem value={"internalCode"}>
                                    Codigo interno
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box>
                        <Button
                            variant="outlined"
                            startIcon={<FileDownloadOutlined />}
                            sx={{ mr: "10px", textTransform: "none" }}
                            onClick={() => {
                                const today = new Date();
                                const filename = `inventario_equipos_${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}.xlsx`;
                                downloadExcel(
                                    "/export/equipment/excel",
                                    filename,
                                );
                            }}
                        >
                            Export excel
                        </Button>

                        <Button
                            variant="contained"
                            onClick={() => setOpenCreatedEquipment(true)}
                            sx={{ textTransform: "none" }}
                        >
                            {" "}
                            <Add /> Agregar un nuevo equipo
                        </Button>
                    </Box>
                </Box>

                {/** equipment table */}
                <TableEquipments
                    isMobile={isMobile}
                    dataEquipments={dataEquipments}
                    getMaintenanceStatus={(date) => getMaintenanceStatus(date)}
                    setOpenEditEquipment={(boolean) =>
                        setOpenEditEquipment(boolean)
                    }
                    setEquipmentToEdit={(equipment) =>
                        setEquipmentToEdit(equipment)
                    }
                    setEquipmentToDeleteId={(id) => setEquipmentToDeleteId(id)}
                    setOpenModalDelete={(boolean) =>
                        setOpenModalDelete(boolean)
                    }
                    navigate={navigate}
                />

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        mb: "20px",
                        mt: "20px",
                    }}
                >
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={page + 1}
                            onChange={handleChange}
                        />
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default EquipmentPage;
