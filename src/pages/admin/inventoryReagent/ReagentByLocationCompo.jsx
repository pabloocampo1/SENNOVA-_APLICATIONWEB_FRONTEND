
import {
    Box,
    Button,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Paper,
    Snackbar,
    TextField,
    Typography,
} from "@mui/material";
import { ArrowBackOutlined, MoreVertOutlined } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import MaintenanceStatusBox from "../inventoryEquipment/componentsEquipment/MaintenanceStatusBox";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../../service/axiosService";
import StatusBoxExpirationDate from "./reagentCompo/StatusBoxExpirationDate";

const ReagentByLocationCompo = ({
    data = [],
    back,
    locationName,
    isSearch = false

}) => {

    const theme = useTheme();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [selectedEquipment, setSelectedEquipment] = useState(null);
    const [changeState, setChangeState] = useState({
        state: false,
        reagentsId: null
    });
    const [changeStateQuality, setChangeStateQuality] = useState({
        state: false,
        reagentsId: null
    });
    const [stateToChange, setStateToChange] = useState("Cambiar estado.");
    const [quantityToChange, setQuantityToChange] = useState(0);
    const [reagentsData, setReagentData] = useState(data);
    const [snackbarMessage, setSnackbarMessage] = useState({
        open: false,
        message: "",
        severity: "warning"
    });

    const handleClick = (event, equipment) => {
        setAnchorEl(event.currentTarget);
        setSelectedEquipment(equipment);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };


    const handleChangeStateValidation = () => {
        if (!selectedEquipment) return;

        if (selectedEquipment.quantity <= 0) {
            setSnackbarMessage({
                open: true,
                message:
                    "No puedes cambiar el estado a 'CON CONTENIDO DISPONIBLE' mientras la cantidad sea 0. Actualiza la cantidad primero.",
                severity: "error"
            });

            setChangeState({
                ...changeState,
                state: false,
                reagentsId: null
            });

            setChangeStateQuality({
                ...changeStateQuality,
                state: true,
                reagentsId: selectedEquipment.reagentsId
            });
        }
    };




    const openChangeState = () => {
        setChangeStateQuality({
            ...changeState,
            state: false,
            reagentsId: null

        })

        setChangeState({
            ...changeState,
            state: true,
            reagentsId: selectedEquipment.reagentsId
        })

        handleCloseMenu()
    }

    const openChangeStateQuality = () => {
        setChangeState({
            ...changeState,
            state: false,
            reagentsId: null
        })

        setChangeStateQuality({
            ...changeState,
            state: true,
            reagentsId: selectedEquipment.reagentsId
        })

        handleCloseMenu()
    }


    const handleSubmitChangeStatus = async (e) => {
        e.preventDefault();

        try {
            const res = await api.put(`/reagent/change-state/${selectedEquipment.reagentsId}/${stateToChange}`);
            if (res.status == 200) {
                const reagentUpdate = res.data;
                const updatedList = reagentsData.map(reagent =>
                    reagent.reagentsId === reagentUpdate.reagentsId
                        ? reagentUpdate
                        : reagent
                );

                setReagentData(updatedList)
                setStateToChange("")
                setChangeState({
                    ...changeState,
                    state: false,
                    reagentsId: null
                })

            }

        } catch (error) {
            console.error(error);
        }
    }


    const handleSubmitChangeQuality = async (e) => {
        e.preventDefault();

        const newQuantity = quantityToChange;
        const reagentId = selectedEquipment.reagentsId;


        try {
            const res = await api.put(`/reagent/change-quantity/${reagentId}/${newQuantity}`);
            if (res.status == 200) {
                const reagentUpdate = res.data;


                const updatedList = reagentsData.map(reagent =>
                    reagent.reagentsId === reagentUpdate.reagentsId
                        ? reagentUpdate
                        : reagent
                );

                setReagentData(updatedList)

                setChangeStateQuality({
                    ...changeState,
                    state: false,
                    reagentsId: null
                })

            }

        } catch (error) {
            console.error(error);
        } finally {
            setQuantityToChange("")
        }
    }

    useEffect(() => {
        setReagentData(data);
    }, [data]);





    return (
        <Box sx={{ position: "relative", width: "100%", height: "auto" }}>

            <Snackbar
                open={snackbarMessage.open}
                autoHideDuration={4000}
                onClose={() => setSnackbarMessage({ ...snackbarMessage, open: false })}
                message={snackbarMessage.message}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                ContentProps={{
                    sx: {
                        bgcolor:
                            snackbarMessage.severity === "error"
                                ? theme.palette.error.main
                                : snackbarMessage.severity === "success"
                                    ? theme.palette.success.main
                                    : theme.palette.warning.main,
                        color: "#fff",
                        fontWeight: 500,
                        textAlign: "center",
                    },
                }}
            />

            {/* Botton back */}

            {!isSearch && (
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


            {!isSearch && (
                <>
                    {
                        reagentsData.length < 1 && (<Box sx={{ width: "100%", textAlign: "center", mt: "100px" }}>
                            <Typography>No hay reactivos con esta ubicacion asignada.</Typography>
                        </Box>)
                    }
                </>
            )}

            {!isSearch && (
                <>
                    <Box sx={{ width: "100%", textAlign: "center", mt: "70px" }}>
                        <Typography sx={{ opacity: "0.70" }}>Todos los reactivos asigandos a la ubicacion: {locationName}</Typography>
                    </Box>
                </>
            )}






            <Box sx={{
                width: "100%",
                height: "auto",
                mt: "100px",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "20px",

            }}>

                {
                    reagentsData.map((reagent) => (

                        <Paper
                            elevation={0} key={reagent.reagentsId}>
                            <Box
                                sx={{
                                    p: "15px",
                                    minHeight: "400px",
                                    borderRadius: "15px",
                                    bgcolor: "background.default",


                                }}>

                                <Box sx={{ width: "100%", height: "20px", position: "relative" }}>
                                    <Box sx={{ position: "absolute", right: "0", top: "0" }}>

                                        <IconButton
                                            id="demo-positioned-button"
                                            aria-controls={open ? 'demo-positioned-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                            onClick={(event) => handleClick(event, reagent)}
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
                                            <MenuItem onClick={() => openChangeStateQuality()}>Cambiar cantidad disponible</MenuItem>
                                            <MenuItem onClick={() => navigate(`/system/inventory/reagents/info/${selectedEquipment.reagentsId}`)}>Ver mas detalles</MenuItem>
                                        </Menu>
                                    </Box>
                                </Box>


                                <Box sx={{ height: "auto", width: "100%" }}>
                                    <Typography variant="body2" sx={{ fontWeight: "bold", fontSize: "1.20rem", opacity: "0.90", color: "primary.main" }}>{reagent.reagentName}</Typography>

                                    <Box>
                                        <Box sx={{ mb: "10px", mt: "10px" }}>
                                            <Typography variant="body2" sx={{ fontWeight: "500" }}>Cantidad</Typography>
                                            <Box sx={{ display: "flex" }}>
                                                <Typography variant="body2" sx={{ fontWeight: "400", opacity: "0.70", pr: "5px" }}>{reagent.quantity} </Typography>
                                                <span style={{ color: theme.palette.primary.third, opacity: "100" }}>/ {reagent.unitOfMeasure}</span>
                                            </Box>
                                        </Box>
                                        <Box sx={{ mb: "10px", mt: "10px" }}>
                                            <Typography variant="body2" sx={{ fontWeight: "500" }}>Fecha caducida:</Typography>
                                            <Typography variant="body2" sx={{ opacity: "0.70" }}>{reagent.expirationDate}</Typography>
                                        </Box>
                                        <Box sx={{ mb: "10px", mt: "10px" }}>
                                            <Typography variant="body2" sx={{ fontWeight: "500" }}>Estado del reactivo</Typography>
                                            <Typography variant="body2" sx={{ opacity: "0.70" }}>{reagent.state}</Typography>
                                        </Box>
                                        <Box sx={{ mb: "10px", mt: "10px" }}>
                                            <Typography variant="body2" sx={{ fontWeight: "500" }}>Cuentadante:</Typography>
                                            <Typography variant="body2" sx={{ opacity: "0.70" }}>{reagent.responsibleName}</Typography>
                                        </Box>
                                        <Box sx={{ mb: 2, mt: 2 }}>
                                            <Typography variant="body2" sx={{ fontWeight: 500, mb: 1 }}>Estado del reactivo</Typography>

                                            <Chip
                                                label={reagent.state}
                                                sx={{
                                                    mt: 2,
                                                    px: 2,
                                                    py: 0.5,
                                                    fontWeight: 600,
                                                    bgcolor:
                                                        reagent.quantity > 0
                                                            ? theme.palette.success.light + "40"
                                                            : theme.palette.error.light + "40",
                                                    color:
                                                        reagent.quantity > 0
                                                            ? theme.palette.success.main
                                                            : theme.palette.error.main,
                                                }}
                                            />
                                        </Box>

                                        {/* change state  */}

                                        {changeState.state && (
                                            <>
                                                {changeState.reagentsId == reagent.reagentsId && (
                                                    <Box sx={{
                                                        width: "100%",
                                                        height: "auto",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        flexDirection: "column",
                                                        mt: "10px",
                                                        mb: "10px"
                                                    }} component={"form"} onSubmit={handleSubmitChangeStatus}>

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

                                                            <MenuItem value="SIN CONTENIDO">SIN CONTENIDO</MenuItem>
                                                            <MenuItem value="CON CONTENIDO DISPONIBLE" onClick={() => handleChangeStateValidation()}>CON CONTENIDO DISPONIBLE</MenuItem>
                                                        </TextField>

                                                        <Box sx={{ display: "flex" }}>
                                                            <Button sx={{ m: "20px" }} variant='outlined' type='submit'>Cambiar</Button>

                                                            <Button sx={{ bgcolor: "red", m: "20px" }} variant='contained' onClick={() => setChangeState({
                                                                ...changeState,
                                                                state: false,
                                                                reagentsId: null
                                                            })}>Cancelar</Button>
                                                        </Box>
                                                    </Box>
                                                )}
                                            </>
                                        )}

                                        {/* change quantity */}

                                        {changeStateQuality.state && (
                                            <>
                                                {changeStateQuality.reagentsId == reagent.reagentsId && (
                                                    <Box sx={{
                                                        width: "100%",
                                                        height: "auto",
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        flexDirection: "column",
                                                        mt: "10px",
                                                        mb: "10px"
                                                    }} component={"form"} onSubmit={handleSubmitChangeQuality}>

                                                        <Typography sx={{ pb: "15px", pt: "15px" }}>Actualizar la cantidad de este reactivo.</Typography>
                                                        <TextField
                                                            type="number"
                                                            label={`Cantidad en : ${reagent.unitOfMeasure}`}
                                                            placeholder={`Cantidad en : ${reagent.unitOfMeasure}`}
                                                            name="state"
                                                            value={quantityToChange || ""}
                                                            onChange={(e) => setQuantityToChange(e.target.value)}
                                                            required
                                                            sx={{ flex: "1 1 calc(50% - 8px)", width: "100%" }}
                                                        >


                                                        </TextField>

                                                        <Box sx={{ display: "flex" }}>
                                                            <Button sx={{ m: "20px" }} variant='outlined' type='submit'>Cambiar</Button>

                                                            <Button sx={{ bgcolor: "red", m: "20px" }} variant='contained' onClick={() => setChangeStateQuality({
                                                                ...changeStateQuality,
                                                                state: false,
                                                                reagentsId: null
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
                                    <StatusBoxExpirationDate date={reagent.expirationDate} />
                                </Box>

                            </Box>

                        </Paper>
                    ))
                }

            </Box>


        </Box >
    );
};


export default ReagentByLocationCompo;
