import { ArrowBackOutlined, MenuOpenOutlined, MenuRounded, MoreVertOutlined, Update } from '@mui/icons-material';
import { Alert, Box, Button, IconButton, Menu, MenuItem, Snackbar, TextField, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import MaintenanceStatusBox from './MaintenanceStatusBox';
import { useNavigate } from 'react-router-dom';
import api from '../../../../service/axiosService';
import GenericModal from '../../../../components/modals/GenericModal';
import EquipmentMaintanence from '../../../../components/forms/Equipment/EquipmentMaintanence';

const EquipmentsByLocationCompo = ({ equipmentsByLocationData = [], back, locationName }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [selectedEquipment, setSelectedEquipment] = React.useState(null);
    const [changeStateEquipment, setChangeStateEquipment] = useState({
        state: false,
        equipmentId: null
    });
    const [stateToChange, setStateToChange] = useState("Cambiar estado.");
    const [data, setData] = useState(equipmentsByLocationData);
    const [openMaintanence, setOpenMaintanence] = useState(false);
    const [equipmentIdToMaintenance, setEquipmentIdToMaintenance] = useState(0)
    const [equipmentNameToMaintenance, setEquipmentNameToMaintenance] = useState("")
    const [responseAlert, setResponseAlert] = useState({
        "status": false,
        "message": ""
    })

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



    return (
        <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
           
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


            <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
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
                    onClick={() => back()}
                >
                    <ArrowBackOutlined sx={{ color: "primary.main", mr: 1 }} />
                    <Typography sx={{ color: "primary.main", fontWeight: 600 }}>Volver a seleccionar una ubicacion</Typography>
                </Box>
            </Box>

            {equipmentsByLocationData.length < 1 && (<Box sx={{ width: "100%", textAlign: "center", mt: "100px" }}>
                <Typography>No hay equipos con esta ubicacion asignada.</Typography>
            </Box>)}
            
             <Box sx={{ width: "100%", textAlign: "center", mt: "70px" }}>
                <Typography>Todos los equipos asigandos a la ubicacion: {locationName}</Typography>
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

export default EquipmentsByLocationCompo;