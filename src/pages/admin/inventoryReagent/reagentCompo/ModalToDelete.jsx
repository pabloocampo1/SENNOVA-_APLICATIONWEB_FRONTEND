import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const ModalToDelete = ({ onClose, handleDelete }) => {
    return (
        <Box sx={{
            width: "400px",
            p: 2,
            display:"flex",
            flexDirection:"column",
            alignItems:"center"
        }}>
            <Box sx={{ display: "flex", flexDirection: "column", mb: 5, textAlign: "center" }}>
                <Typography>¿Estás seguro que deseas eliminar este elemento?</Typography>

            </Box>

            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Button variant="contained" sx={{mr:"20px"}} color="error" onClick={() => onClose()}>Cancelar</Button>
                <Button variant="outlined" onClick={() => handleDelete()} >Aceptar</Button>
            </Box>




            <Typography variant='caption' sx={{opacity:"0.80", p:"2px", mt:"20px", bgcolor:"action.hover", textAlign:"center"}}>Al eliminar este elemento tambien se eliminar sus archivos relacionado en la cloudinary, usos e imagen.</Typography>
        </Box>
    );
};

export default ModalToDelete;