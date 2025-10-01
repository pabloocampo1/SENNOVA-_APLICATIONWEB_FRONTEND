import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import SimpleBackdrop from '../../SimpleBackDrop';

const EquipmentConfirmationDelete = ({ onClose, method, equipmentToDeleteId, openLoanging }) => {

    return (

        <Box sx={{
            width: "400px",
            p: 2
        }}>
            <SimpleBackdrop open={openLoanging} />
            <Box sx={{ display: "flex", flexDirection: "column", mb: 5, textAlign: "center" }}>
                <Typography>¿Estás seguro que deseas eliminar este elemento?</Typography>

            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="error" onClick={() => onClose()}>Cancelar</Button>
                <Button variant="outlined" onClick={() => method(equipmentToDeleteId)} >Aceptar</Button>
            </Box>
        </Box>

    );
};

export default EquipmentConfirmationDelete;