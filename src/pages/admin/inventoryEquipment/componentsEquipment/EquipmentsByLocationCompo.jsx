import { ArrowBackOutlined, MenuOpenOutlined, MenuRounded, MoreVertOutlined, ReportProblem, Update } from '@mui/icons-material';
import { Alert, Box, Button, Chip, IconButton, Menu, MenuItem, Snackbar, Switch, TextField, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MaintenanceStatusBox from './MaintenanceStatusBox';
import { useNavigate } from 'react-router-dom';
import api from '../../../../service/axiosService';
import GenericModal from '../../../../components/modals/GenericModal';
import EquipmentMaintanence from '../../../../components/forms/Equipment/EquipmentMaintanence';


// This component has been modified to also support viewing all equipments in the "Reported Equipments" section.


const EquipmentsByLocationCompo = ({ equipments = [], back, locationName, refresh, locationId, isShowReportEquipment = false }) => {
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
    const [data, setData] = useState(equipments);
    const [openMaintanence, setOpenMaintanence] = useState(false);
    const [equipmentIdToMaintenance, setEquipmentIdToMaintenance] = useState(0)
    const [equipmentNameToMaintenance, setEquipmentNameToMaintenance] = useState("")
    const [responseAlert, setResponseAlert] = useState({
        "status": false,
        "message": ""
    })

    const [reportStatus, setReportStatus] = useState(() => {
        const initialStatus = {};
        equipments.forEach(equipment => {
            if (equipment.markReport === true) {
                initialStatus[equipment.equipmentId] = "markNotExist";
            } else if (equipment.available === true) {
                initialStatus[equipment.equipmentId] = "markExist";
            }
        });
        return initialStatus;
    });

    const handleClick = (event, equipment) => {
        setAnchorEl(event.currentTarget);
        setSelectedEquipment(equipment);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleMarkExist = (equipmentId, type) => {
        setReportStatus(prev => ({
            ...prev,
            [equipmentId]: type
        }));

        const changeState = async () => {
            try {
                let res;
                switch (type) {
                    case "markNotExist":
                        res = await api.put(`/equipment/report-equipment/${equipmentId}`);
                        if (res.status == 200) {
                            setResponseAlert({
                                status: true,
                                message: "Se reporto el equipo correctamente."
                            })
                        }
                        break;
                    case "markExist":
                        res = await api.put(`/equipment/markEquipmentAsExisting/${equipmentId}`);
                        if (res.status == 200) {
                            setResponseAlert({
                                status: true,
                                message: "Se marco como existente correctamente."
                            })
                        }
                        break;
                    default:
                        break;

                }
                const equipmentUpdate = res.data;
                const newListEquipment = data.map(equipment => {
                    if (equipment.equipmentId == equipmentId) {
                        return equipmentUpdate
                    } else {
                        return equipment;
                    }
                })

                setData(newListEquipment);

            } catch (err) {
                console.error(err);
            }

        }
        changeState()


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

    const handleMaintanenceSend = async () => {
        setResponseAlert({
            "status": true,
            "message": "Se agregó el registro exitosamente"
        });

        if (typeof refresh === "function") {
            await refresh(locationId, locationName);
        }

        setOpenMaintanence(false);
    };

    const addMaintenance = (id, name) => {
        setEquipmentIdToMaintenance(id)
        setEquipmentNameToMaintenance(name)
        handleCloseMenu()
        setOpenMaintanence(true)
    }

    useEffect(() => {
        setData(equipments);

        const updatedStatus = {};
        equipments.forEach(equipment => {
            if (equipment.markReport) {
                updatedStatus[equipment.equipmentId] = "markNotExist";
            } else if (equipment.available) {
                updatedStatus[equipment.equipmentId] = "markExist";
            }
        });

        setReportStatus(updatedStatus);
    }, [equipments]);





    return (
        <Box sx={{ position: "relative", width: "100%", height: "auto" }}>

            <GenericModal
                open={openMaintanence}
                onClose={() => setOpenMaintanence(false)}
                compo={
                    <EquipmentMaintanence
                        equipmentId={equipmentIdToMaintenance}
                        nameOfTheEquipment={equipmentNameToMaintenance}
                        send={() => handleMaintanenceSend()}
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


            {!isShowReportEquipment && (
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
            )}

            {equipments.length < 1 && (<Box sx={{ width: "100%", textAlign: "center", mt: "100px" }}>
                {isShowReportEquipment
                    ? (<Typography>No hay equipos reportados.</Typography>)
                    : (<Typography>No hay equipos con esta ubicacion asignada.</Typography>)}
            </Box>)}

            {!isShowReportEquipment && (
                <Box sx={{ width: "100%", textAlign: "center", mt: "70px" }}>
                    <Typography>Todos los equipos asigandos a la ubicacion: {locationName}</Typography>
                </Box>
            )}

            <Box sx={{
                width: "100%",
                height: "auto",
                mt: "100px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",

            }}>
                {data.map(equipment => {
                    return <Box key={equipment.equipmentId}>

                        <Box
                            sx={{
                                p: "15px",
                                minHeight: "400px",
                                borderRadius: "15px",
                                bgcolor: "background.default",
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

                                {equipment.markReport && (
                                    <Box sx={{ width: "100%", height: "100px", mb: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                        <ReportProblem color='error' />
                                        <Typography color='error' sx={{ opacity: "0.90", textAlign: "center" }} variant='body2'>El equipo ha sido reportado como inexistente.</Typography>
                                    </Box>
                                )}
                                <Typography variant='body2' sx={{ fontWeight: "bold" }}>{equipment.equipmentName}</Typography>
                                <Typography variant='body2' sx={{ fontWeight: "400" }}>{equipment.internalCode}</Typography>

                                <Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography variant='body2' sx={{ fontWeight: "500" }}>Fecha Manteniminto:</Typography>
                                        <Typography variant='body2' >{equipment.maintenanceDate}</Typography>
                                    </Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography variant='body2' sx={{ fontWeight: "500" }}>Placa sena:</Typography>
                                        <Typography variant='body2'>{equipment.senaInventoryTag}</Typography>
                                    </Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography variant='body2' sx={{ fontWeight: "500" }}>Cuentadante:</Typography>
                                        <Typography variant='body2'>{equipment.responsibleName}</Typography>
                                    </Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography variant='body2' sx={{ fontWeight: "500" }}>Estado:</Typography>
                                        <Chip
                                            label={equipment.state}
                                            sx={{
                                                width: "70%",
                                                height: "40px",
                                                bgcolor: equipment.available ? "#4CAF5030" : "#F4433630",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                fontWeight: "600"
                                            }}
                                        />

                                    </Box>

                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === "light"
                                                    ? "#f9f9f9"
                                                    : "rgba(255,255,255,0.08)",
                                            borderRadius: 2,
                                            p: 2,
                                            mt: 1,
                                            boxShadow: (theme) =>
                                                theme.palette.mode === "light"
                                                    ? "0 1px 4px rgba(0,0,0,0.1)"
                                                    : "0 1px 3px rgba(0,0,0,0.3)",
                                        }}
                                    >
                                        <Box>
                                            <Typography fontWeight={600} fontSize={15}>
                                                Reportar como NO existente
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ maxWidth: "320px" }}
                                            >
                                                Activa esta opción si el equipo ya no se encuentra disponible o no fue
                                                localizado durante la verificación.
                                            </Typography>
                                        </Box>

                                        <Switch
                                            checked={reportStatus[equipment.equipmentId] === "markNotExist"}
                                            onChange={() => handleMarkExist(equipment.equipmentId, "markNotExist")}
                                            name="markReport"
                                            color="error"
                                        />
                                    </Box>
                                    <Box
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="space-between"
                                        sx={{
                                            backgroundColor: (theme) =>
                                                theme.palette.mode === "light"
                                                    ? "#f9f9f9"
                                                    : "rgba(255,255,255,0.08)",
                                            borderRadius: 2,
                                            p: 2,
                                            mt: 1,
                                            boxShadow: (theme) =>
                                                theme.palette.mode === "light"
                                                    ? "0 1px 4px rgba(0,0,0,0.1)"
                                                    : "0 1px 3px rgba(0,0,0,0.3)",
                                        }}
                                    >
                                        <Box>
                                            <Typography fontWeight={600} fontSize={15}>
                                                Reportar como existente
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{ maxWidth: "320px" }}
                                            >
                                                Activa esta opción si el equipo se encuentra disponible y fue
                                                localizado durante la verificación.
                                            </Typography>
                                        </Box>

                                        <Switch

                                            checked={reportStatus[equipment.equipmentId] === "markExist"}
                                            onChange={() => handleMarkExist(equipment.equipmentId, "markExist")}
                                            name="markReport"
                                            color="success"
                                        />
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

                                                    <Typography variant='body2' sx={{ pb: "15px", pt: "15px" }}>Cambia el estado de este equipo.</Typography>
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

                                                    <Typography variant='body2' sx={{ pb: "15px", pt: "15px" }}>Cambia el estado de este equipo.</Typography>
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

                    </Box>
                })}
            </Box>




        </Box>
    );
};

export default EquipmentsByLocationCompo;