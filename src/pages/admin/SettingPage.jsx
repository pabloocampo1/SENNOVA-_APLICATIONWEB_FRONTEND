import { CheckBox, Label } from '@mui/icons-material';
import { Box, Button, Switch, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import ProductsCompo from '../../components/SettingComponents/ProductsCompo';
import UsageCompo from '../../components/SettingComponents/UsageCompo';
import LocationsCompo from '../../components/SettingComponents/LocationsCompo';
import { AuthContext } from '../../context/AuthContext';
import api from '../../service/axiosService';
import GenericModal from '../../components/modals/GenericModal';
import ChangeEmailCompo from '../../components/forms/Auth/changeEmailCompo';

const SettingPage = () => {
    const { authObject, setAuthObject } = useContext(AuthContext);
    const [preferences, setPreferences] = useState({
        inventoryEquipment: false,
        inventoryReagents: false,
        quotations: false,
        results: false,
    });
    const [openChangeEmail, setOpenChangeEmail] = useState(false);





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


    useEffect(() => {
        console.log("preferences:" + authObject.preferencesNotification);

        setPreferences(authObject.preferencesNotification)
    }, [])


    return (
        <Box>
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

                <Typography component={"h3"} variant='h3' sx={{ pt: "40px", pb: "20px", fontSize: "24px" }}>
                    Seguridad
                </Typography>

                <Box sx={{
                    height: "80px",
                    borderRadius: "10px",
                    border: `1px solid #acacacff`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "20px"
                }} >
                    <Box>
                        <Typography sx={{ fontWeight: "600" }}>Email</Typography>
                        <Typography variant='description'>{authObject.email}</Typography>
                    </Box>
                    <Button variant='contained' onClick={() => setOpenChangeEmail(true)}>Cambiar</Button>
                </Box>

                <Box sx={{
                    height: "80px",
                    borderRadius: "10px",
                    border: `1px solid #acacacff`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "20px",
                    mt: "20px"
                }} >
                    <Box>
                        <Typography sx={{ fontWeight: "600" }}>Cambiar contraseña</Typography>
                        <Typography variant='description'>Cambiar tu contraseña para mayor securidad.</Typography>
                    </Box>
                    <Button variant='contained'>Cambiar</Button>
                </Box>

                <Box sx={{
                    height: "80px",
                    borderRadius: "10px",
                    border: `1px solid #acacacff`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "20px",
                    mt: "20px"
                }} >
                    <Box>
                        <Typography sx={{ fontWeight: "600" }}>Desactivar cuenta</Typography>
                        <Typography variant='description'>Podras desactivar tu cuenta temporalmente.</Typography>
                    </Box>
                    <Button variant='contained'>Desactivar</Button>
                </Box>


                <Box sx={{
                    height: "80px",
                    borderRadius: "10px",
                    border: `1px solid #acacacff`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    p: "20px",
                    mt: "20px"
                }} >
                    <Box>
                        <Typography sx={{ fontWeight: "600" }}>Ultima sesion</Typography>
                        <Typography variant='description'>Ultima vez que iniciaste sesion dentro del sistema</Typography>
                    </Box>

                </Box>

            </Box>


            <Box >
                <ProductsCompo />
                <UsageCompo />
                <LocationsCompo />
            </Box>




        </Box>

    );
};

export default SettingPage;