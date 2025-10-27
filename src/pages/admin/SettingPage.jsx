import { AccessTimeOutlined, EmailOutlined, LockClockOutlined, PersonOffOutlined } from '@mui/icons-material';
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Switch, Typography, useMediaQuery, useTheme } from '@mui/material';
import  { useContext, useEffect, useState } from 'react';
import ProductsCompo from '../../components/SettingComponents/ProductsCompo';
import UsageCompo from '../../components/SettingComponents/UsageCompo';
import LocationsCompo from '../../components/SettingComponents/LocationsCompo';
import { AuthContext } from '../../context/AuthContext';
import api from '../../service/axiosService';
import GenericModal from '../../components/modals/GenericModal';
import ChangeEmailCompo from '../../components/forms/Auth/changeEmailCompo';
import ChangePasswordCompo from '../../components/forms/Auth/ChangePasswordCompo';
import DeactivateAccountConfirmation from '../../components/SettingComponents/DeactivateAccountConfirmation';
import ButtonBack from '../../components/ButtonBack';

const SettingPage = () => {
    const { authObject, setAuthObject } = useContext(AuthContext);
    const [preferences, setPreferences] = useState({
        inventoryEquipment: false,
        inventoryReagents: false,
        quotations: false,
        results: false,
    });
    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [openDeactivateAccount, setOpenDeactivateAccount] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));





    const handleSubmitPreferences = (e) => {
        e.preventDefault();
        const changePreferences = async () => {
            try {
                const response = await api.post(`/users/changePreferences/${authObject.username}`, preferences);
                console.log(response);

            } catch (error) {
                console.error(error);
            }
        }

        changePreferences()

    }

    const handlePreferences = (e) => {
        const { name, checked } = e.target;
        setPreferences((prev) => ({
            ...prev,
            [name]: checked,
        }));
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString("es-CO", {
            day: "2-digit",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };



    useEffect(() => {
        console.log("preferences:" + authObject.preferencesNotification);

        setPreferences(authObject.preferencesNotification)
    }, [])


    return (
        <Box>

            <Box sx={{mb:"20px"}}>
                <ButtonBack />
            </Box>
            <Typography component={"h2"} sx={{
                fontWeight: "bold",
                fontSize: "24px",
                opacity: "0.90"
            }}>
                Configuración del sistema
            </Typography>

            <Typography variant='description'>
                Preferencias de notificación (via email).
            </Typography>

            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "end", mb: "20px" }} component={"form"} onSubmit={handleSubmitPreferences}>
                <Box sx={{
                    width: "100%",
                    height: "auto",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "10px",
                    mt: "20px",
                    mb: "20px"
                }}>

                    <Box sx={{
                        height: "100px",
                        borderRadius: "10px",
                        border: `1px solid #acacacff`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: "20px"
                    }} >
                        <Box>
                            <Typography sx={{ fontWeight: "600" }}>Inventario - Equipos</Typography>
                            <Typography variant='description'>Recibir alertas de mantenimiento programado.</Typography>
                        </Box>
                        <Switch
                            name="inventoryEquipment"
                            checked={preferences.inventoryEquipment}
                            onChange={handlePreferences}
                        />
                    </Box>

                    <Box sx={{
                        height: "100px",
                        borderRadius: "10px",
                        border: `1px solid #acacacff`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: "20px"
                    }} >
                        <Box>
                            <Typography sx={{ fontWeight: "600" }}>Inventario - Reactivos</Typography>
                            <Typography variant='description'>Notificar bajo stock o vencimiento cercano.</Typography>
                        </Box>
                        <Switch
                            name="inventoryReagents"
                            checked={preferences.inventoryReagents}
                            onChange={handlePreferences}
                        />
                    </Box>

                    <Box sx={{
                        height: "100px",
                        borderRadius: "10px",
                        border: `1px solid #acacacff`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: "20px"
                    }} >
                        <Box>
                            <Typography sx={{ fontWeight: "600" }}>Cotizaciones</Typography>
                            <Typography variant='description'>Avisar sobre nuevas solicitudes de cotización.</Typography>
                        </Box>
                        <Switch
                            name="quotations"
                            checked={preferences.quotations}
                            onChange={handlePreferences}
                        />
                    </Box>

                    <Box sx={{
                        height: "100px",
                        borderRadius: "10px",
                        border: `1px solid #acacacff`,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        p: "20px"
                    }} >
                        <Box>
                            <Typography sx={{ fontWeight: "600" }}>Resultados</Typography>
                            <Typography variant='description'>Notificación al concluir análisis de muestras.</Typography>
                        </Box>
                        <Switch
                            name="results"
                            checked={preferences.results}
                            onChange={handlePreferences}
                        />
                    </Box>

                </Box>
                <Button variant='contained' type='submit'>Cambiar preferencias</Button>
            </Box>


            <Box sx={{ mb: "50px" }}>

                <GenericModal open={openChangeEmail} compo={<ChangeEmailCompo authObject={authObject} setAuthObject={setAuthObject} onClose={() => setOpenChangeEmail(false)} />} onClose={() => setOpenChangeEmail(false)} />
                <GenericModal open={openChangePassword} compo={<ChangePasswordCompo authObject={authObject} onClose={() => setOpenChangePassword(false)} />} onClose={() => setOpenChangePassword(false)} />
                <GenericModal open={openDeactivateAccount} compo={<DeactivateAccountConfirmation authObject={authObject} setAuthObject={setAuthObject} onClose={() => setOpenDeactivateAccount(false)} />} onClose={() => setOpenDeactivateAccount(false)} />

                <Typography component={"h3"} variant='h3' sx={{ pt: "40px", pb: "20px", fontSize: "24px" }}>
                    Seguridad
                </Typography>


                <List sx={{ border: "1px solid #ddd", borderRadius: 2 }}>
                    <ListItem
                        secondaryAction={
                            <Button variant="outlined" onClick={() => setOpenChangeEmail(true)}>
                                Cambiar
                            </Button>
                        }

                    >
                        <ListItemIcon>
                            <EmailOutlined color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Email"
                            secondary={authObject.email}
                        />
                    </ListItem>

                    <ListItem
                        secondaryAction={
                            <Button variant="outlined" onClick={() => setOpenChangePassword(true)}>
                                Cambiar
                            </Button>
                        }
                    >
                        <ListItemIcon>
                            <LockClockOutlined color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Cambiar contraseña"
                            secondary="Actualiza tu contraseña para mayor seguridad."
                        />
                    </ListItem>

                    <ListItem
                        secondaryAction={
                            authObject.available ? (
                                <Button variant='outlined' sx={{ borderColor: "red", color: "red" }} onClick={() => setOpenDeactivateAccount(true)}>
                                    Desactivar
                                </Button>
                            ) : (
                                <Button variant='outlined' onClick={() => setOpenDeactivateAccount(true)}>
                                    Activar
                                </Button>
                            )
                        }
                    >
                        <ListItemIcon>
                            <PersonOffOutlined color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Estado de la cuenta"
                            secondary="Podrás activar o desactivar tu cuenta temporalmente. Si lo haces ya no podrán asignarte a ensayos."
                        />
                    </ListItem>


                    <ListItem>
                        <ListItemIcon>
                            <AccessTimeOutlined color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Última sesión"
                            secondary={formatDate(authObject.lastSession)}
                        />
                    </ListItem>
                </List>

            </Box>


            <Box >
                <ProductsCompo isMobile={isMobile} />
                <UsageCompo isMobile={isMobile} />
                <LocationsCompo isMobile={isMobile} />
            </Box>




        </Box>

    );
};

export default SettingPage;