import { Alert, Box, Button, FormControl, IconButton, InputLabel, Menu, MenuItem, Select, Snackbar, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchBar from '../../../components/SearchBar';
import { ArrowBackOutlined, MoreVertOutlined, QrCodeScanner } from '@mui/icons-material';
import api from '../../../service/axiosService';
import { useNavigate } from 'react-router-dom';
import GenericModal from '../../../components/modals/GenericModal';
import EquipmentMaintanence from '../../../components/forms/Equipment/EquipmentMaintanence';
import MaintenanceStatusBox from './componentsEquipment/MaintenanceStatusBox';

const SearchOptionCheckInv = () => {

    const theme = useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState('name');
    const [selectedEquipment, setSelectedEquipment] = React.useState(null);
    const [data, setData] = useState([]);
    const [stateToChange, setStateToChange] = useState("Cambiar estado.");
    const [changeStateEquipment, setChangeStateEquipment] = useState({
        state: false,
        equipmentId: null
    });
    const [openMaintanence, setOpenMaintanence] = useState(false);
    const [equipmentIdToMaintenance, setEquipmentIdToMaintenance] = useState(0)
    const [equipmentNameToMaintenance, setEquipmentNameToMaintenance] = useState("")
    const [responseAlert, setResponseAlert] = useState({
        "status": false,
        "message": ""
    })
    const navigate = useNavigate();



    const handleClick = (event, equipment) => {
        setAnchorEl(event.currentTarget);
        setSelectedEquipment(equipment);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(`/equipment/change-status/${selectedEquipment.equipmentId}/${stateToChange}`);
            if (res.status == 200) {
                const equipmentUpdate = res.data;
                const updatedList = data.map(equipment =>
                    equipment.equipmentId === equipmentUpdate.equipmentId
                        ? equipmentUpdate
                        : equipment
                );

                setData(updatedList)

                setChangeStateEquipment({
                    ...changeStateEquipment,
                    state: false,
                    equipmentId: null
                })

            }

        } catch (error) {
            console.error(error);
        }
    }

    const openChangeState = () => {
        setChangeStateEquipment({
            ...changeStateEquipment,
            state: true,
            equipmentId: selectedEquipment.equipmentId
        })

        handleCloseMenu()
    }

    const handleMaintanenceSend = () => {
        setResponseAlert({
            "status": true,
            "message": "Se agrego el registro exitosamente"
        })
        setOpenMaintanence(false)
    }

    const addMaintenance = (id, name) => {
        setEquipmentIdToMaintenance(id)
        setEquipmentNameToMaintenance(name)
        handleCloseMenu()
        setOpenMaintanence(true)
    }



    const handleChangeSelect = (event) => {
        setSearchBy(event.target.value);
    };


    function getByParam() {
        const fetchDataByName = async () => {
            try {
                const res = await api.get(`/equipment/get-all-by-name/${search}`)
                if (res.status == 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error(error);

            }
        }

        const fetchDataByInternalCode = async () => {
            try {
                const res = await api.get(`/equipment/get-all-by-internal-code/${search}`)
                if (res.status == 200) {
                    setData(res.data);
                }
            } catch (error) {
                console.error(error);
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

    useEffect(() => {
        if (search) {
            getByParam();
        }
    }, [search])


    return (
        <Box sx={{ width: "100%", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", position:"relative" }}>


            <GenericModal
                open={openMaintanence}
                onClose={() => setOpenMaintanence(false)}
                compo={
                    <EquipmentMaintanence
                        equipmentId={equipmentIdToMaintenance}
                        nameOfTheEquipment={equipmentNameToMaintenance}
                        send={handleMaintanenceSend}
                        onClose={() => setOpenMaintanence(false)}
                    />
                }
            />

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



            <Typography>Buscar equipos de manera individual</Typography>
            <Box>
                <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", mt: "40px" }}>
                    <Box sx={{ display: "flex" }}>
                        <SearchBar placeholder={searchBy} onSearch={(value) => setSearch(value)} />
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
                        <Button
                            variant="contained"
                            startIcon={<QrCodeScanner />}
                            onClick={() => alert("esta funcion esta en desarrollo")}
                            sx={{
                                ml: "20px"
                            }}
                        >
                            Escanear
                        </Button>

                    </Box>
                </Box>
            </Box>


            <Box
                sx={{
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "15px",
                    border: `1px solid ${theme.palette.primary.main}`,
                    position: "absolute",
                    top: 20,
                    left: 20,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        bgcolor: theme.palette.action.hover,
                    },
                }}
                onClick={() => navigate(- 1)}
            >
                <ArrowBackOutlined sx={{ color: "primary.main", mr: 1 }} />
                <Typography sx={{ color: "primary.main", fontWeight: 600 }}>Volver atras</Typography>
            </Box>


            <Box sx={{
                width: "100%",
                height: "auto",
                mt: "100px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",

            }}>
                {data.map(equipment => {
                    return <>

                        <Box key={equipment.equipmentId}
                            sx={{
                                p: "15px",
                                minHeight: "400px",
                                borderRadius: "15px",
                                bgcolor: "background.paper",
                                border: `1px solid ${theme.palette.border.primary}`

                            }}>

                            <Box sx={{ width: "100%", height: "20px", position: "relative" }}>
                                <Box sx={{ position: "absolute", right: "0", top: "0" }}>

                                    <IconButton
                                        id="demo-positioned-button"
                                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={(event) => handleClick(event, equipment)}
                                    >
                                        <MoreVertOutlined />
                                    </IconButton>

                                    <Menu
                                        id="demo-positioned-menu"
                                        aria-labelledby="demo-positioned-button"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleCloseMenu}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <MenuItem onClick={handleCloseMenu}>Cerrar</MenuItem>
                                        <MenuItem onClick={() => openChangeState()}>Cambiar estado</MenuItem>
                                        <MenuItem onClick={() => addMaintenance(selectedEquipment.equipmentId, selectedEquipment.equipmentName)}>Registrar mantenimiento</MenuItem>
                                        <MenuItem onClick={() => navigate(`/system/inventory/equipments/info/${selectedEquipment.equipmentId}`)}>Ver mas detalles</MenuItem>
                                    </Menu>
                                </Box>
                            </Box>


                            <Box sx={{ height: "auto", width: "100%" }}>
                                <Typography sx={{ fontWeight: "bold" }}>{equipment.equipmentName}</Typography>
                                <Typography sx={{ fontWeight: "400" }}>{equipment.internalCode}</Typography>

                                <Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography sx={{ fontWeight: "500" }}>Fecha Manteniminto:</Typography>
                                        <Typography>{equipment.maintenanceDate}</Typography>
                                    </Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography sx={{ fontWeight: "500" }}>Numero serial:</Typography>
                                        <Typography>{equipment.serialNumber}</Typography>
                                    </Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography sx={{ fontWeight: "500" }}>Cuentadante:</Typography>
                                        <Typography>{equipment.responsibleName}</Typography>
                                    </Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography sx={{ fontWeight: "500" }}>Estado:</Typography>
                                        <Box sx={{
                                            width: "70%",
                                            height: "40px",
                                            bgcolor: equipment.available ? "#4CAF5030" : "#F4433630",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            fontWeight: "600"
                                        }}>
                                            {equipment.state}
                                        </Box>
                                    </Box>

                                    {changeStateEquipment.state && (
                                        <>
                                            {changeStateEquipment.equipmentId == equipment.equipmentId && (
                                                <Box sx={{
                                                    width: "100%",
                                                    height: "auto",
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    flexDirection: "column",
                                                    mt: "10px",
                                                    mb: "10px"
                                                }} component={"form"} onSubmit={handleSubmit}>

                                                    <Typography sx={{ pb: "15px", pt: "15px" }}>Cambia el estado de este equipo.</Typography>
                                                    <TextField
                                                        select
                                                        label="Estado"
                                                        name="state"
                                                        placeholder={stateToChange}
                                                        onChange={(e) => setStateToChange(e.target.value)}
                                                        required
                                                        sx={{ flex: "1 1 calc(50% - 8px)", width: "100%" }}
                                                    >
                                                        <MenuItem value="Activo">Activo</MenuItem>
                                                        <MenuItem value="Dado de baja">Dado de baja</MenuItem>
                                                        <MenuItem value="Fuera de servicio">Fuera de servicio</MenuItem>
                                                    </TextField>

                                                    <Box sx={{ display: "flex" }}>
                                                        <Button sx={{ m: "20px" }} variant='outlined' type='submit'>Cambiar</Button>

                                                        <Button sx={{ bgcolor: "red", m: "20px" }} variant='contained' onClick={() => setChangeStateEquipment({
                                                            ...changeStateEquipment,
                                                            state: false,
                                                            equipmentId: null
                                                        })}>Cancelar</Button>
                                                    </Box>
                                                </Box>
                                            )}
                                        </>
                                    )}

                                </Box>
                            </Box>



                            <Box sx={{
                                width: "100%",
                                mt: "40px"
                            }}>
                                <MaintenanceStatusBox maintenanceDate={equipment.maintenanceDate} />
                            </Box>

                        </Box>

                    </>
                })}
            </Box>
        </Box>
    );
};

export default SearchOptionCheckInv;