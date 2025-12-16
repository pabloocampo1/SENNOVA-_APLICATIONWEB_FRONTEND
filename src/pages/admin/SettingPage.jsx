import {
    AccessTimeOutlined,
    AttachMoney,
    EmailOutlined,
    Inventory,
    Inventory2Outlined,
    LockClockOutlined,
    PersonOffOutlined,
} from "@mui/icons-material";
import {
    Box,
    Button,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Switch,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";

import UsageCompo from "../../components/SettingComponents/UsageCompo";
import LocationsCompo from "../../components/SettingComponents/LocationsCompo";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/axiosService";
import GenericModal from "../../components/modals/GenericModal";
import ChangeEmailCompo from "../../components/forms/Auth/changeEmailCompo";
import ChangePasswordCompo from "../../components/forms/Auth/ChangePasswordCompo";
import DeactivateAccountConfirmation from "../../components/SettingComponents/DeactivateAccountConfirmation";
import ButtonBack from "../../components/ButtonBack";

const SettingPage = () => {
    const { authObject, setAuthObject } = useContext(AuthContext);
    const [preferences, setPreferences] = useState(
        authObject.preferencesNotification
    );
    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [openDeactivateAccount, setOpenDeactivateAccount] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handlePreferences = async (e) => {
        const { name, checked } = e.target;

        // Crea una copia actualizada de las preferencias
        const updatedPreferences = {
            ...preferences,
            [name]: checked,
        };

        // Actualiza el estado
        setPreferences(updatedPreferences);

        // Envía la versión actualizada al backend
        try {
            const response = await api.post(
                `/users/changePreferences/${authObject.username}`,
                updatedPreferences
            );
            console.log(response);

            setPreferences(response.data);
        } catch (error) {
            console.error("❌ Error al actualizar preferencias:", error);
        }
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
        Object.entries(authObject.preferencesNotification).forEach(
            (element) => {
                console.log(element);
            }
        );

        setPreferences(authObject.preferencesNotification);
    }, []);

    return (
        <Box>
            <Box sx={{ mb: "40px" }}>
                <ButtonBack />
            </Box>
            <Typography
                component={"h2"}
                sx={{
                    fontWeight: "bold",
                    fontSize: "24px",
                    opacity: "0.90",
                }}
            >
                Configuración del sistema
            </Typography>
            <Typography variant="description">
                Preferencias de notificación (via email).
            </Typography>

            <List
                sx={{ border: "1px solid #ddd", borderRadius: 2, mt: "20px" }}
            >
                <ListItem
                    secondaryAction={
                        <Switch
                            name="inventoryEquipment"
                            checked={preferences.inventoryEquipment}
                            onChange={handlePreferences}
                        />
                    }
                >
                    <ListItemIcon>
                        <Inventory color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Inventario 1 - Equipos"
                        secondary="Recibir alertas de mantenimiento programado."
                    />
                </ListItem>

                <ListItem
                    secondaryAction={
                        <Switch
                            name="inventoryReagents"
                            checked={preferences.inventoryReagents}
                            onChange={handlePreferences}
                        />
                    }
                >
                    <ListItemIcon>
                        <Inventory2Outlined color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary=" Inventario 2 - Reactivos"
                        secondary="Notificar bajo stock o vencimiento cercano."
                    />
                </ListItem>

                <ListItem
                    secondaryAction={
                        <Switch
                            name="quotations"
                            checked={preferences.quotations}
                            onChange={handlePreferences}
                        />
                    }
                >
                    <ListItemIcon>
                        <AttachMoney color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Cotizaciones"
                        secondary=" Avisar sobre nuevas solicitudes de cotización."
                    />
                </ListItem>

                <ListItem
                    secondaryAction={
                        <Switch
                            name="results"
                            checked={preferences.results}
                            onChange={handlePreferences}
                        />
                    }
                >
                    <ListItemIcon>
                        <AccessTimeOutlined color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Resultados de ensayos"
                        secondary="Notificación al concluir análisis de muestras."
                    />
                </ListItem>
            </List>
            <Box sx={{ mb: "50px" }}>
                <GenericModal
                    open={openChangeEmail}
                    compo={
                        <ChangeEmailCompo
                            authObject={authObject}
                            setAuthObject={setAuthObject}
                            onClose={() => setOpenChangeEmail(false)}
                        />
                    }
                    onClose={() => setOpenChangeEmail(false)}
                />
                <GenericModal
                    open={openChangePassword}
                    compo={
                        <ChangePasswordCompo
                            authObject={authObject}
                            onClose={() => setOpenChangePassword(false)}
                        />
                    }
                    onClose={() => setOpenChangePassword(false)}
                />
                <GenericModal
                    open={openDeactivateAccount}
                    compo={
                        <DeactivateAccountConfirmation
                            authObject={authObject}
                            setAuthObject={setAuthObject}
                            onClose={() => setOpenDeactivateAccount(false)}
                        />
                    }
                    onClose={() => setOpenDeactivateAccount(false)}
                />

                <Typography
                    component={"h3"}
                    variant="h3"
                    sx={{ pt: "40px", fontSize: "24px" }}
                >
                    Seguridad
                </Typography>
                <Typography variant="description">
                    Parámetros de autenticación y control de acceso.
                </Typography>

                <List
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        mt: "20px",
                    }}
                >
                    <ListItem
                        secondaryAction={
                            <Button
                                variant="outlined"
                                onClick={() => setOpenChangeEmail(true)}
                            >
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
                            <Button
                                variant="outlined"
                                onClick={() => setOpenChangePassword(true)}
                            >
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
                                <Button
                                    variant="outlined"
                                    sx={{ borderColor: "red", color: "red" }}
                                    onClick={() =>
                                        setOpenDeactivateAccount(true)
                                    }
                                >
                                    Desactivar
                                </Button>
                            ) : (
                                <Button
                                    variant="outlined"
                                    onClick={() =>
                                        setOpenDeactivateAccount(true)
                                    }
                                >
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
            <Box>
                <UsageCompo isMobile={isMobile} />
                <LocationsCompo isMobile={isMobile} />
            </Box>
        </Box>
    );
};

export default SettingPage;
