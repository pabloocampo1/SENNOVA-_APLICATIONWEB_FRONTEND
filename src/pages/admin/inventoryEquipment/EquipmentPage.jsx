import { Add, BuildCircle, ChecklistOutlined, Delete, Edit, FileDownload, FileDownloadDoneOutlined, FileDownloadOutlined, Info, QrCodeScanner, TableChart } from '@mui/icons-material';
import { Alert, Box, Button, Divider, FormControl, IconButton, InputLabel, MenuItem, Pagination, Paper, Select, Snackbar, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardsSummaryEquipment from './componentsEquipment/CardsSummaryEquipment';
import api from '../../../service/axiosService';
import SearchBar from '../../../components/SearchBar';
import GenericModal from '../../../components/modals/GenericModal';
import EquipmentForm from '../../../components/forms/Equipment/EquipmentForm';
import EquipmentConfirmationDelete from '../../../components/forms/Equipment/EquipmentConfirmationDelete';
import { useNavigate } from 'react-router-dom';
import SimpleBackdrop from '../../../components/SimpleBackDrop';

const EquipmentPage = () => {
    const [dataEquipments, setDataEquipments] = useState([]);
    const [equipmentToEdit, setEquipmentToEdit] = useState({});
    const [page, setPage] = useState(0);
    const [openCreatedEquipment, setOpenCreatedEquipment] = useState(false);
    const [openEditEquipment, setOpenEditEquipment] = useState(false);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState('name');
    const [totalPages, setTotalPages] = useState();
    const [responseAlert, setResponseAlert] = useState({
        "status": false,
        "message": ""
    })
    const [errorMessageCreate, setErrorMessageCreate] = useState({})
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [equipmentToDeleteId, setEquipmentToDeleteId] = useState(false);
    const navigate = useNavigate();
    const [isLoanding, setIsLoanding] = useState(false);
    const [refreshSummary, setRefreshSummary] = useState(0);




    const handleChangeSelect = (event) => {
        setSearchBy(event.target.value);
    };

    const handleChange = (event, value) => {
        setPage(value - 1);
    };


    function deleteEquipment() {
        setIsLoanding(true)
        const fetchDelete = async () => {
            try {
                const res = await api.delete(`/equipment/delete/${equipmentToDeleteId}`);
                if (res.status == 200) {
                    setOpenModalDelete(false)
                    fetchData()
                    setRefreshSummary(prev => prev + 1);
                }
            } catch (error) {
                console.log(error);

            } finally {
                setIsLoanding(false)
            }
        }

        fetchDelete();

    }


    function editEquipment(equipment, image) {
        setIsLoanding(true)


        const edit = async () => {
            try {
                const formData = new FormData();
                formData.append("dto", new Blob([JSON.stringify(equipment)], { type: "application/json" }));
                formData.append("image", image);

                const res = await api.put(`/equipment/update/${equipment.equipmentId}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                if (res.status == 200) {
                    setOpenEditEquipment(false)
                    fetchData()
                    setResponseAlert({
                        status: true,
                        message: "El equipo se actualizo correctamente."
                    })
                }
            } catch (error) {

                if (error.response) {
                    const backendError = error.response.data;


                    if (backendError.errors) {
                        setErrorMessageCreate(prev => ({
                            ...prev,
                            ...backendError.errors
                        }));
                    }

                }

            } finally {
                setIsLoanding(false)
            }

        }

        edit()

    }



    function getByParam() {
        const fetchDataByName = async () => {
            try {
                const res = await api.get(`/equipment/get-all-by-name/${search}`)
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
        }

        const fetchDataByInternalCode = async () => {
            try {
                const res = await api.get(`/equipment/get-all-by-internal-code/${search}`)
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
        }

        const fetchDataBySerialNumber = async () => {
            alert("La funcion de buscar un equipo por su numero serial no esta disponible.")
        }

        switch (searchBy) {
            case "name":
                fetchDataByName()
                break;
            case "serialNumber":
                fetchDataBySerialNumber()
                break;
            case "internalCode":
                fetchDataByInternalCode()
                break;

            default:
                break;
        }




    }


    function saveEquipment(dto, imageFile) {

        setIsLoanding(true)

        const save = async () => {
            try {
                const formData = new FormData();
                formData.append("dto", new Blob([JSON.stringify(dto)], { type: "application/json" }));
                if (imageFile != null) {
                    formData.append("image", imageFile);
                }

                const res = await api.post("/equipment/save", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });

                if (res.status === 201) {
                    fetchData();
                    setOpenCreatedEquipment(false);
                    setResponseAlert({
                        status: true,
                        message: "Equipo agregado exitosamente."
                    });
                    setRefreshSummary(prev => prev + 1);

                }
            } catch (error) {
                console.log(error);

                if (error.response) {
                    const backendError = error.response.data;
                    if (backendError.errors) {
                        setErrorMessageCreate({
                            ...backendError.errors
                        });
                    }
                }
            } finally {
                setIsLoanding(false)
            }
        };

        save();
    }


    const fetchData = async () => {
        setIsLoanding(true)

        try {
            const res = await api.get(`/equipment/page?page=${page}`)
            if (res.status == 200) {
                setDataEquipments(res.data.content)
                setTotalPages(res.data.totalPages)
            }
        } catch (error) {
            console.error(error);

        } finally {
            setIsLoanding(false)
        }

    }

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
            getByParam()
        } else {
            fetchData()
        }


    }, [page, search])


    useEffect(() => {
        fetchData();
    }, [refreshSummary]);




    return (
        <Box sx={{
            width: "100%",
            height: "auto"
        }}>

            {/** Modals */}
            <GenericModal open={openCreatedEquipment} onClose={() => { setOpenCreatedEquipment(false), setErrorMessageCreate({}) }} compo={<EquipmentForm errors={errorMessageCreate} onClose={() => { setOpenCreatedEquipment(false), setErrorMessageCreate({}) }} method={(dto, image) => saveEquipment(dto, image)} isEdit={false} />} />
            <GenericModal open={openEditEquipment} onClose={() => { setOpenEditEquipment(false), setErrorMessageCreate({}) }} compo={<EquipmentForm errors={errorMessageCreate} data={equipmentToEdit} onClose={() => { setOpenEditEquipment(false), setErrorMessageCreate({}) }} method={(dto, image) => editEquipment(dto, image)} isEdit={true} />} />
            <GenericModal open={openModalDelete} onClose={() => setOpenModalDelete(false)} compo={<EquipmentConfirmationDelete openLoanging={isLoanding} equipmentToDeleteId={equipmentToDeleteId} onClose={() => setOpenModalDelete(false)} method={() => deleteEquipment()} />} />


            <SimpleBackdrop open={isLoanding} />

            {/** Messages */}
            {responseAlert.status && (
                <Snackbar
                    open={responseAlert.status}
                    autoHideDuration={5000}
                    onClose={() => {
                        setResponseAlert({
                            ...responseAlert,
                            "status": false
                        });
                        setResponseAlert({
                            "status": false,
                            "message": ""
                        })
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        severity="success"
                        onClose={() => setResponseAlert({
                            "status": false,
                            "message": ""
                        })}
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
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: 2,
                    mb: "40px"
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="h2" component={"h2"}>Inventorio de reactivos</Typography>
                    <BuildCircle sx={{ ml: "10px", color: "primary.main" }} />
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                    <Button
                        variant="contained"
                        startIcon={<FileDownloadOutlined />}
                    >
                        Descargar Excel
                    </Button>

                    <Button variant="outlined" endIcon={<ChecklistOutlined />} onClick={() => navigate("/system/inventory/check/equipment")}>
                        Chequeo de inventario
                    </Button>
                </Box>
            </Box>
            <CardsSummaryEquipment refresh={refreshSummary} />

            <Divider sx={{mt:"20px"}} />

            <Box>
                {/** table content header */}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", mt: "40px" }}>
                    <Box sx={{ display: "flex" }}>
                        <SearchBar onSearch={(value) => setSearch(value)} />
                        <FormControl sx={{ width: "120px", borderRadius: "20px", ml: "20px" }}>
                            <InputLabel id="demo-simple-select-label">Buscar por:</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={searchBy}
                                label="Buscar por:"
                                onChange={handleChangeSelect}
                            >
                                <MenuItem value={"name"}>Nombre</MenuItem>
                                <MenuItem value={"serialNumber"}>Numero serial</MenuItem>
                                <MenuItem value={"internalCode"}>Codigo interno</MenuItem>
                            </Select>
                        </FormControl>

                    </Box>
                    <Box>
                        <Button variant='contained' onClick={() => setOpenCreatedEquipment(true)}> <Add /> Agregar un nuevo equipo</Button>
                    </Box>
                </Box>


                {/** equipment table */}
                {dataEquipments.length < 1 ? (
                    <Typography sx={{ textAlign: "center" }}>No hay equipos</Typography>
                ) : (
                    <TableContainer sx={{ mt: "20px" }} component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow >
                                    <TableCell sx={{ fontWeight: "700" }}>ID</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>Código interno</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>Nombre</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>Mantenimiento</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>Modelo</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>Ubicación</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>Estado</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }}>Creado</TableCell>
                                    <TableCell sx={{ fontWeight: "700" }} align="right">Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {dataEquipments.map((equipment) => (
                                    <TableRow key={equipment.equipmentId} hover>
                                        <TableCell sx={{ opacity: "0.70" }}>{equipment.equipmentId}</TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>{equipment.internalCode}</TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>{equipment.equipmentName}</TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>
                                            {(() => {
                                                const status = getMaintenanceStatus(equipment.maintenanceDate);
                                                return (
                                                    <Box
                                                        sx={{
                                                            width: "120px",
                                                            height: "100%",
                                                            bgcolor: status.color,
                                                            border: status.border,
                                                            borderRadius: "15px",
                                                            textAlign: "center",
                                                            p: "10px"
                                                        }}
                                                    >
                                                        {status.label}
                                                    </Box>
                                                );
                                            })()}
                                        </TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>{equipment.model}</TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>{equipment.locationName}</TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>
                                            {equipment.available ? (<Box sx={{ width: "100px", height: "100%", bgcolor: "#07f60f30", border: "2px solid green", borderRadius: "15px", textAlign: "center", p: "10px" }}>Disponible</Box>) : (<Box sx={{ width: "100px", height: "100%", bgcolor: "#f6070730", border: "2px solid red", borderRadius: "15px", textAlign: "center", p: "10px" }}> No Disponible</Box>)}
                                        </TableCell>
                                        <TableCell sx={{ opacity: "0.70" }}>
                                            {equipment.createAt ? new Date(equipment.createAt).toLocaleDateString("es-CO") : "null"}
                                        </TableCell>
                                       
                                        <TableCell align="right">
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => {
                                                    setEquipmentToEdit(equipment);
                                                    setOpenEditEquipment(true)
                                                }}
                                            >
                                                <Edit sx={{color:"primary.main"}} fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() => {
                                                    setEquipmentToDeleteId(equipment.equipmentId)
                                                    setOpenModalDelete(true)
                                                }
                                                }
                                            >
                                                <Delete sx={{color:"primary.main"}} fontSize="small" />
                                            </IconButton>
                                            <IconButton
                                                size="small"
                                                color="primary"
                                                onClick={() =>
                                                    navigate(`/system/inventory/equipments/info/${equipment.equipmentId}`)
                                                }
                                            >
                                                <Info sx={{color:"primary.main"}} fontSize="small" />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: "20px", mt: "20px" }}>

                    <Stack spacing={2}>
                        <Pagination count={totalPages} page={page + 1} onChange={handleChange} />
                    </Stack>
                </Box>

            </Box>




        </Box>
    );
};

export default EquipmentPage;