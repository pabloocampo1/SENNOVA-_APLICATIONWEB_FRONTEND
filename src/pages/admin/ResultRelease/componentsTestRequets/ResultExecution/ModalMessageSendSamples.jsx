import { Box, Button, Typography } from "@mui/material";
import React from "react";

const ModalMessageSendSamples = ({ onClose }) => {
    return (
        <Box
            sx={{
                p: 3,
                maxWidth: 480,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography variant="h6" fontWeight={600}>
                Envío de informes en proceso
            </Typography>

            <Typography variant="body1">
                Los informes de las muestras seleccionadas se están generando y
                enviando de forma automática.
            </Typography>

            <Typography variant="body2" color="text.secondary">
                Este proceso puede tardar algunos minutos dependiendo de la
                cantidad de muestras. No es necesario permanecer en esta
                pantalla.
            </Typography>

            <Typography variant="caption" color="text.secondary">
                Podrás consultar el estado de cada envío en el historial de
                informes.
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button variant="contained" color="primary" onClick={onClose}>
                    Aceptar
                </Button>
            </Box>
        </Box>
    );
};

export default ModalMessageSendSamples;
