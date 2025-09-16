import { CheckBox, Label } from '@mui/icons-material';
import { Box, Switch, Typography } from '@mui/material';
import React from 'react';
import ProductsCompo from '../../components/SettingComponents/ProductsCompo';

const SettingPage = () => {
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
                    <Switch defaultChecked />
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
                    <Switch defaultChecked />
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
                    <Switch defaultChecked />
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
                    <Switch defaultChecked />
                </Box>

            </Box>


            <Box>

                <Typography variant='description' sx={{ pt: "40px" }}>
                    Personalizacion
                </Typography>

                 {/** agregar datos aca */}
            </Box>


            <Box>

                <Typography variant='description' sx={{ pt: "40px" }}>
                    Seguridad
                </Typography>
                {/** agregar datos aca */}

                
            </Box>


            <Box>
                <ProductsCompo />
            </Box>




        </Box>

    );
};

export default SettingPage;