import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const ModalDeleteUser = ({onClose, deleteUser}) => {

   

    return (
        <Box>
            <Typography>¿Estas seguro que deseas eliminar este usuario?</Typography>

            <Box>
                <Button onClick={() => deleteUser()}>Aceptar</Button>
                <Button onClick={() => onClose()}>Cancelar</Button>
            </Box>
        </Box>
    );
};

export default ModalDeleteUser;