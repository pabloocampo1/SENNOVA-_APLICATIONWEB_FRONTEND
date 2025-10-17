import { Box, Button, Typography, alpha, Stack } from '@mui/material';
import React from 'react';
import SimpleBackdrop from '../../SimpleBackDrop';
import { WarningAmber, Delete, Close } from '@mui/icons-material';

const EquipmentConfirmationDelete = ({ onClose, method, equipmentToDeleteId, openLoanging }) => {
    return (
        <Box sx={{
            width: "450px",
            p: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: 'relative'
        }}>
            <SimpleBackdrop open={openLoanging} />
            
            <Box 
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    cursor: 'pointer',
                    bgcolor: alpha('#000', 0.04),
                    borderRadius: '50%',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                        bgcolor: alpha('#000', 0.08)
                    }
                }}
            >
                <Close sx={{ fontSize: 18 }} />
            </Box>

           
            <Box sx={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                bgcolor: alpha('#f44336', 0.1),
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mb: 2,
                position: 'relative',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    bgcolor: alpha('#f44336', 0.2),
                    animation: 'pulse 2s infinite'
                },
                '@keyframes pulse': {
                    '0%, 100%': {
                        transform: 'scale(1)',
                        opacity: 1
                    },
                    '50%': {
                        transform: 'scale(1.1)',
                        opacity: 0.5
                    }
                }
            }}>
                <WarningAmber sx={{ fontSize: 36, color: 'error.main', zIndex: 1 }} />
            </Box>

          
            <Stack spacing={1} sx={{ textAlign: "center", mb: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                    ¿Eliminar elemento?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
                    Esta acción no se puede deshacer. Se eliminarán todos los datos asociados.
                </Typography>
            </Stack>

         
            <Stack direction="row" spacing={2} sx={{ width: '100%', mb: 2 }}>
                <Button 
                    variant="outlined" 
                    onClick={onClose}
                    startIcon={<Close />}
                    sx={{ 
                        flex: 1,
                        borderColor: 'divider',
                        color: 'text.primary',
                        '&:hover': {
                            borderColor: 'text.secondary',
                            bgcolor: alpha('#000', 0.04)
                        }
                    }}
                >
                    Cancelar
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => method(equipmentToDeleteId)}
                    startIcon={<Delete />}
                    sx={{ 
                        flex: 1,
                        boxShadow: 2,
                        '&:hover': {
                            boxShadow: 4
                        }
                    }}
                >
                    Eliminar
                </Button>
            </Stack>

          
            <Box sx={{
                width: '100%',
                p: 2,
                bgcolor: alpha('#ff9800', 0.08),
                borderRadius: 2,
                border: 1,
                borderColor: alpha('#ff9800', 0.2),
                borderLeft: 4,
                borderLeftColor: 'warning.main'
            }}>
                <Typography 
                    variant='caption' 
                    sx={{
                        display: 'block',
                        color: 'text.secondary',
                        lineHeight: 1.5
                    }}
                >
                    <strong>⚠️ Advertencia:</strong> Se eliminarán permanentemente los archivos en Cloudinary, registros de uso e imágenes asociadas.
                </Typography>
            </Box>
        </Box>
    );
};

export default EquipmentConfirmationDelete;