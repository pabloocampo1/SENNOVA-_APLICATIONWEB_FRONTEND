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
    Switch,
} from "@mui/material";
import { MoreVertOutlined, ReportProblem } from "@mui/icons-material";
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
    reportStatus = {},
    handleMarkExist
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: {xs:"repeat(auto-fill, minmax(300px, 1fr))" ,mb:"repeat(auto-fill, minmax(330px, 1fr))"},
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

                            {equipment.markReport && (
                                <Box sx={{ width: "100%", height: "100px", mb: "40px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                                    <ReportProblem color='error' />
                                    <Typography color='error' sx={{ opacity: "0.90", textAlign: "center" }} variant='body2'>El equipo ha sido reportado como inexistente.</Typography>
                                </Box>
                            )}
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
