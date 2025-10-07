import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const ModalMessage = ({message, onClose}) => {
    return (
        <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <Typography>{message}</Typography>

            <Button variant='outlined' onClick={() => onClose()}>Cerrar</Button>
        </Box>
    );
};

export default ModalMessage;