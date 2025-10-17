import React from "react";
import {
    Box,
    Button,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Typography,
    Paper,
    Chip,
    Fade,
} from "@mui/material";
import { MoreVertOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import MaintenanceStatusBox from "./MaintenanceStatusBox";
import PropTypes from "prop-types";

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
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(330px, 1fr))",
                gap: 3,
                mt: "90px",
                p: 2,
            }}
        >
            {data.map((equipment) => (
                <Fade in key={equipment.equipmentId}>
                    <Paper
                        elevation={4}
                        sx={{
                            p: 3,
                            borderRadius: "20px",
                            transition: "transform 0.25s ease, box-shadow 0.25s ease",
                            "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: theme.shadows[6],
                            },
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        {/* Menu */}
                        <IconButton
                            sx={{ position: "absolute", top: 10, right: 10 }}
                            onClick={(event) => handleClick(event, equipment)}
                        >
                            <MoreVertOutlined />
                        </IconButton>

                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                        >
                            <MenuItem onClick={handleCloseMenu}>Cerrar</MenuItem>
                            <MenuItem onClick={() => openChangeState()}>
                                Cambiar estado
                            </MenuItem>
                            <MenuItem
                                onClick={() =>
                                    addMaintenance(
                                        selectedEquipment.equipmentId,
                                        selectedEquipment.equipmentName
                                    )
                                }
                            >
                                Registrar mantenimiento
                            </MenuItem>
                            <MenuItem
                                onClick={() =>
                                    navigate(
                                        `/system/inventory/equipments/info/${selectedEquipment.equipmentId}`
                                    )
                                }
                            >
                                Ver más detalles
                            </MenuItem>
                        </Menu>

                        {/* Header */}
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                                {equipment.equipmentName}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: "text.secondary", mb: 1 }}
                            >
                                Código interno: {equipment.internalCode}
                            </Typography>
                        </Box>

                        {/* Info */}
                        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                            <InfoRow label="Fecha mantenimiento" value={equipment.maintenanceDate} />
                            <InfoRow label="Placa SENA" value={equipment.senaInventoryTag} />
                            <InfoRow label="Cuentadante" value={equipment.responsibleName} />

                            <Box>
                                <Typography sx={{ fontWeight: 500, mb: 0.5 }}>Estado:</Typography>
                                <Chip
                                    label={equipment.state}
                                    sx={{
                                        fontWeight: 600,
                                        bgcolor: equipment.available
                                            ? theme.palette.success.light + "40"
                                            : theme.palette.error.light + "40",
                                        color: equipment.available
                                            ? theme.palette.success.main
                                            : theme.palette.error.main,
                                        px: 1.5,
                                        py: 0.5,
                                        fontSize: "0.9rem",
                                    }}
                                />
                            </Box>
                        </Box>

                        {/* Change state form */}
                        {changeStateEquipment.state &&
                            changeStateEquipment.equipmentId === equipment.equipmentId && (
                                <Box
                                    component="form"
                                    onSubmit={handleSubmit}
                                    sx={{
                                        mt: 3,
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: theme.palette.action.hover,
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        gap: 2,
                                    }}
                                >
                                    <Typography sx={{ fontWeight: 600 }}>
                                        Cambia el estado del equipo
                                    </Typography>
                                    <TextField
                                        select
                                        label="Estado"
                                        name="state"
                                        value={stateToChange}
                                        onChange={(e) => setStateToChange(e.target.value)}
                                        required
                                        fullWidth
                                    >
                                        <MenuItem value="Activo">Activo</MenuItem>
                                        <MenuItem value="Dado de baja">Dado de baja</MenuItem>
                                        <MenuItem value="Fuera de servicio">Fuera de servicio</MenuItem>
                                    </TextField>

                                    <Box sx={{ display: "flex", gap: 2, mt: 1 }}>
                                        <Button variant="contained" color="primary" type="submit">
                                            Cambiar
                                        </Button>
                                        <Button
                                            variant="outlined"
                                            color="error"
                                            onClick={() =>
                                                setChangeStateEquipment({
                                                    ...changeStateEquipment,
                                                    state: false,
                                                    equipmentId: null,
                                                })
                                            }
                                        >
                                            Cancelar
                                        </Button>
                                    </Box>
                                </Box>
                            )}

                        {/* Maintenance Status */}
                        <Box sx={{ mt: 3 }}>
                            <MaintenanceStatusBox maintenanceDate={equipment.maintenanceDate} />
                        </Box>
                    </Paper>
                </Fade>
            ))}
        </Box>
    );
};

const InfoRow = ({ label, value }) => (
    <Box>
        <Typography variant="body2" sx={{ fontWeight: 500 }}>
            {label}:
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {value || "—"}
        </Typography>
    </Box>
);

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
