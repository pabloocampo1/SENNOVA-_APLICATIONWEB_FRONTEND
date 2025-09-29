import { ArrowBackOutlined, MenuOpenOutlined, MenuRounded, MoreVertOutlined } from '@mui/icons-material';
import { Box, Button, IconButton, Menu, MenuItem, Typography, useTheme } from '@mui/material';
import React from 'react';
import MaintenanceStatusBox from './MaintenanceStatusBox';
import { useNavigate } from 'react-router-dom';

const EquipmentsByLocationCompo = ({ equipmentsByLocationData = [], back }) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [selectedEquipment, setSelectedEquipment] = React.useState(null);

    const handleClick = (event, equipment) => {
        setAnchorEl(event.currentTarget);
        setSelectedEquipment(equipment);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedEquipment(null);
    };



    return (
        <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
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



            <Box sx={{
                width: "100%",
                height: "auto",
                mt: "100px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "20px",

            }}>
                {equipmentsByLocationData.map(equipment => {
                    return <>

                        <Box key={equipment.equipmentId}
                            sx={{
                                p: "15px",
                                height: "auto",
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
                                        onClose={handleClose}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'left',
                                        }}
                                    >
                                        <MenuItem onClick={handleClose}>Cerrar</MenuItem>
                                        <MenuItem onClick={handleClose}>Cambiar estado</MenuItem>
                                        <MenuItem onClick={handleClose}>Registrar mantenimiento</MenuItem>
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

                                </Box>
                            </Box>



                            <Box sx={{
                                width: "100%",
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