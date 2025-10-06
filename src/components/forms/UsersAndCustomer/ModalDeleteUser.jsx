import { Box, Button, Typography } from '@mui/material';
import React from 'react';

const ModalDeleteUser = ({ onClose, deleteUser }) => {



    return (
        <Box>
            <Typography sx={{fontWeight:"600"}}>¿Estas seguro que deseas eliminar este usuario?</Typography>

            <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mt:"20px" }}>
                <Button
                    sx={{
                        mr:"20px"
                    }}
                    variant='outlined'
                    onClick={() => deleteUser()}
                >
                    Aceptar
                </Button>


                <Button
                    sx={{
                        ml:"20px",
                        color:"red"
                    }}
                    onClick={() => onClose()}
                >
                    Cancelar
                </Button>
            </Box>
        </Box>
    );
};

export default ModalDeleteUser;