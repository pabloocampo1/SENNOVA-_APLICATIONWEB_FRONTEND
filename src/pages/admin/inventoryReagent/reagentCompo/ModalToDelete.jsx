import { Box, Button, Typography, alpha } from '@mui/material';
import React from 'react';
import { WarningAmber, Delete, Close } from '@mui/icons-material';

const ModalToDelete = ({ onClose, handleDelete }) => {
    return (
        <Box sx={{
            width: "400px",
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
           
            <Box sx={{
                width: 60,
                height: 60,
                borderRadius: '50%',
                bgcolor: alpha('#f44336', 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2
            }}>
                <WarningAmber sx={{ fontSize: 32, color: 'error.main' }} />
            </Box>

            {/* Mensaje */}
            <Box sx={{ 
                display: "flex", 
                flexDirection: "column", 
                mb: 3, 
                textAlign: "center" 
            }}>
                <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    ¿Eliminar elemento?
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ¿Estás seguro que deseas eliminar este elemento?
                </Typography>
            </Box>

           
            <Box sx={{ 
                display: "flex", 
                gap: 2,
                width: '100%',
                mb: 2
            }}>
                <Button 
                    variant="outlined" 
                    onClick={onClose}
                    sx={{ flex: 1 }}
                >
                    Cancelar
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={handleDelete}
                    startIcon={<Delete />}
                    sx={{ flex: 1 }}
                >
                    Eliminar
                </Button>
            </Box>


            <Typography 
                variant='caption' 
                sx={{
                    p: 1.5, 
                    bgcolor: alpha('#ff9800', 0.1),
                    borderRadius: 1,
                    textAlign: "center",
                    border: 1,
                    borderColor: alpha('#ff9800', 0.3),
                    color: 'text.secondary'
                }}
            >
                ⚠️ Al eliminar este elemento también se eliminarán sus archivos relacionados en Cloudinary, usos e imagen.
            </Typography>
        </Box>
    );
};

export default ModalToDelete;