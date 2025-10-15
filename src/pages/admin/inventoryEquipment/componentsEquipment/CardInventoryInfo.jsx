import React from "react";
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { MoreVertOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import MaintenanceStatusBox from "./MaintenanceStatusBox";
import PropTypes from 'prop-types';

const CardInventoryInfo = ({
    data = [],
    handleClick,
    open,
    anchorEl,
    handleCloseMenu,
    openChangeState,
    addMaintenance,
    navigate,
    selectedEquipment,
    handleSubmit,
    changeStateEquipment,
    stateToChange,
    setStateToChange,
    setChangeStateEquipment,
}) => {
    const theme = useTheme();

    return (
        <>
            <Box sx={{
                width: "100%",
                height: "auto",
                mt: "100px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",

            }}>
                {data.map((equipment) => (
                    <Box key={equipment.equipmentId}>

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
                                <Typography sx={{ fontWeight: "bold" }}>{equipment.equipmentName}</Typography>
                                <Typography sx={{ fontWeight: "400" }}>{equipment.internalCode}</Typography>

                                <Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography sx={{ fontWeight: "500" }}>Fecha Manteniminto:</Typography>
                                        <Typography>{equipment.maintenanceDate}</Typography>
                                    </Box>
                                    <Box sx={{ mb: "10px", mt: "10px" }}>
                                        <Typography sx={{ fontWeight: "500" }}>Placa sena:</Typography>
                                        <Typography>{equipment.senaInventoryTag}</Typography>
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

                    </Box>
                ))}
            </Box>
        </>
    );
};

CardInventoryInfo.propTypes = {
    data: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
    openChangeState: PropTypes.func.isRequired,
    addMaintenance: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
    selectedEquipment: PropTypes.object,
    handleSubmit: PropTypes.func.isRequired,
    changeStateEquipment: PropTypes.object.isRequired,
    stateToChange: PropTypes.string.isRequired,
    setStateToChange: PropTypes.func.isRequired,
    setChangeStateEquipment: PropTypes.func.isRequired,
};

export default CardInventoryInfo;
