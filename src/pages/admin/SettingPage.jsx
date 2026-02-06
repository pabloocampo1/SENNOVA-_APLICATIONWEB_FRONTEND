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
    Divider,
    Grid,
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
import ChangeEmailCompo from "../../components/forms/Auth/ChangeEmailCompo";
import ChangePasswordCompo from "../../components/forms/Auth/ChangePasswordCompo";
import DeactivateAccountConfirmation from "../../components/SettingComponents/DeactivateAccountConfirmation";
import ButtonBack from "../../components/ButtonBack";
import PersonalInformation from "../../components/SettingComponents/PersonalInformation";

const SettingPage = () => {
    const { authObject, setAuthObject } = useContext(AuthContext);
    const [preferences, setPreferences] = useState(
        authObject.preferencesNotification,
    );
    const [openChangeEmail, setOpenChangeEmail] = useState(false);
    const [openChangePassword, setOpenChangePassword] = useState(false);
    const [openDeactivateAccount, setOpenDeactivateAccount] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));

    const handlePreferences = async (e) => {
        const { name, checked } = e.target;

        const updatedPreferences = {
            ...preferences,
            [name]: checked,
        };

        setPreferences(updatedPreferences);

        try {
            const response = await api.post(
                `/users/changePreferences/${authObject.username}`,
                updatedPreferences,
            );

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
        setPreferences(authObject.preferencesNotification);
    }, []);

    return (
        <Box>
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
            <Box sx={{ mb: "40px" }}>
                <ButtonBack />
            </Box>

            {/* Security and personal information */}

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    width: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                    mb: "100px",
                    mt: "100px",
                }}
            >
                {/* PERSONAL INFORMATION (Ocupa menos espacio: 4 de 12 columnas = 33%) */}

                <PersonalInformation />

                <Box
                    sx={{
                        width: { xs: "100%", md: "60%" },
                        mt: { xs: "50px", md: "0px" },
                    }}
                >
                    <Typography
                        component="h3"
                        variant="h5"
                        sx={{
                            fontWeight: "700",
                            color: "text.primary",
                            mb: 1,
                        }}
                    >
                        Seguridad y Privacidad
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        Gestiona tus credenciales de acceso y el estado de tu
                        cuenta en el sistema.
                    </Typography>

                    <List
                        sx={{
                            width: "100%", // Ahora este 100% se expandirá sobre las 8 columnas del Grid
                            bgcolor: "background.paper",
                            borderRadius: "16px", // Un poco más redondeado para un look moderno
                            border: "1px solid",
                            borderColor: "divider",
                            overflow: "hidden",
                            boxShadow: "0px 4px 12px rgba(0,0,0,0.05)", // Sombra sutil para que resalte
                            "& .MuiListItem-root": {
                                py: 2,
                                px: 3,
                                borderBottom: "1px solid",
                                borderColor: "divider",
                                "&:last-child": { borderBottom: "none" },
                                "&:hover": {
                                    bgcolor: "rgba(0, 0, 0, 0.01)",
                                },
                            },
                        }}
                    >
                        {/* Contenido de la lista igual al anterior... */}
                        <ListItem
                            secondaryAction={
                                <Button
                                    variant="outlined"
                                    size="small"
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
                                primary="Correo electrónico"
                                secondary={authObject.email}
                                primaryTypographyProps={{ fontWeight: 600 }}
                            />
                        </ListItem>

                        <ListItem
                            secondaryAction={
                                <Button
                                    variant="outlined"
                                    size="small"
                                    onClick={() => setOpenChangePassword(true)}
                                >
                                    Actualizar
                                </Button>
                            }
                        >
                            <ListItemIcon>
                                <LockClockOutlined color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Contraseña"
                                secondary="Cambia tu contraseña periódicamente."
                                primaryTypographyProps={{ fontWeight: 600 }}
                            />
                        </ListItem>

                        <ListItem
                            secondaryAction={
                                <Button
                                    variant="contained"
                                    size="small"
                                    color={
                                        authObject.available
                                            ? "error"
                                            : "success"
                                    }
                                    onClick={() =>
                                        setOpenDeactivateAccount(true)
                                    }
                                    sx={{ minWidth: "110px" }}
                                >
                                    {authObject.available
                                        ? "Desactivar"
                                        : "Activar"}
                                </Button>
                            }
                        >
                            <ListItemIcon>
                                <PersonOffOutlined
                                    color={
                                        authObject.available
                                            ? "primary"
                                            : "disabled"
                                    }
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Estado de cuenta"
                                secondary="Controla tu disponibilidad en el sistema."
                                primaryTypographyProps={{ fontWeight: 600 }}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <AccessTimeOutlined color="action" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Última sesión"
                                secondary={formatDate(authObject.lastSession)}
                                primaryTypographyProps={{ fontWeight: 600 }}
                            />
                        </ListItem>
                    </List>
                </Box>
            </Box>

            {/* NOTIFICACIONES */}

            <Box>
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
                    sx={{
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        mt: "20px",
                    }}
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
            </Box>

            <Box>
                <UsageCompo isMobile={isMobile} />
                <LocationsCompo isMobile={isMobile} />
            </Box>
        </Box>
    );
};

export default SettingPage;
