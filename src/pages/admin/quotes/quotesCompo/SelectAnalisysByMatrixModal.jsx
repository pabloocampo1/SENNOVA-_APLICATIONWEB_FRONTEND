import { CheckBox } from '@mui/icons-material';
import { Box, Button, Checkbox, FormControlLabel, Input, TextField, Tooltip, Typography, useTheme, Chip, Paper, Fade } from '@mui/material';
import { useEffect, useState } from 'react';


const SelectAnalisysByMatrixModal = ({ products = [], onClose, matrixSelected, saveAnalysis }) => {
    const [listAnalisysSelected, setListAnalisysSelected] = useState([]);


   
    const theme = useTheme();
   

    useEffect(() => {

    }, [])


    const containgInTheList = (productId) => {
        return listAnalisysSelected.some(product => product.productId === productId);
    }
    const handlSubmit = (e) => {
        e.preventDefault()
        saveAnalysis(listAnalisysSelected)
    }

    const toggleProduct = (product) => {
        if (containgInTheList(product.productId)) {

            setListAnalisysSelected(prev => prev.filter(p => p.productId !== product.productId));
        } else {

            setListAnalisysSelected(prev => [...prev, product]);
        }
    }

    return (
        <Box sx={{
            width: { xs: "340px", sm: "480px", md: "540px" },
            maxHeight: "85vh",
            display: "flex",
            flexDirection: "column",
        }} component={"form"} onSubmit={handlSubmit}>
            {/* Header Section */}
            <Box sx={{
                px: 3,
                pt: 3,
                pb: 2,
                borderBottom: `1px solid ${theme.palette.divider}`,
            }}>
                <Typography variant='h6' sx={{
                    fontWeight: 600,
                    mb: 1,
                    color: "text.primary"
                }}>
                    Seleccionar Análisis
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Typography variant='body2' color="text.secondary">
                        Matriz:
                    </Typography>
                    <Chip
                        label={matrixSelected}
                        size="small"
                        color="primary"
                        sx={{ fontWeight: 500 }}
                    />
                </Box>
            </Box>

            {/* Products List Section */}
            <Box sx={{
                flex: 1,
                overflowY: "auto",
                px: 3,
                py: 2,
                "&::-webkit-scrollbar": {
                    width: "8px",
                },
                "&::-webkit-scrollbar-track": {
                    backgroundColor: "transparent",
                },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: theme.palette.action.hover,
                    borderRadius: "4px",
                },
            }}>
                {products
                    .filter(p => p.matrix.toLowerCase().includes(matrixSelected.toLowerCase()))
                    .map((product) => (
                        <Fade in={true} key={product.productId}>
                            <Paper
                                elevation={containgInTheList(product.productId) ? 3 : 0}
                                sx={{
                                    mb: 2,
                                    p: 2.5,
                                    cursor: "pointer",
                                    transition: "all 0.3s ease",
                                    border: `2px solid ${containgInTheList(product.productId)
                                        ? theme.palette.primary.main
                                        : theme.palette.divider}`,
                                    borderRadius: "12px",
                                    backgroundColor: containgInTheList(product.productId)
                                        ? theme.palette.action.selected
                                        : "background.paper",
                                    "&:hover": {
                                        borderColor: theme.palette.primary.main,
                                        transform: "translateY(-2px)",
                                        boxShadow: theme.shadows[4],
                                    },
                                }}
                                onClick={() => toggleProduct(product)}
                            >
                                <Box sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    mb: containgInTheList(product.productId) ? 2 : 0
                                }}>
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            fontWeight: 600,
                                            color: "text.primary",
                                            flex: 1
                                        }}
                                    >
                                        {product.analysis}
                                    </Typography>

                                    <Checkbox
                                        checked={containgInTheList(product.productId)}
                                        onChange={() => toggleProduct(product)}
                                        onClick={(e) => e.stopPropagation()}
                                        sx={{
                                            p: 0,
                                            ml: 1,
                                        }}
                                    />
                                </Box>

                                {containgInTheList(product.productId) && (
                                    <Fade in={true}>
                                        <Box sx={{
                                            pt: 2,
                                            borderTop: `1px solid ${theme.palette.divider}`,
                                        }}>
                                            <TextField
                                                type="number"
                                                required
                                                label="Cantidad de analisis"
                                                size="small"
                                                fullWidth
                                                onClick={(e) => e.stopPropagation()}
                                                sx={{
                                                    "& .MuiOutlinedInput-root": {
                                                        borderRadius: "8px",
                                                    }
                                                }}
                                            />
                                        </Box>
                                    </Fade>
                                )}
                            </Paper>
                        </Fade>
                    ))}
            </Box>

            {/* Footer Actions */}
            <Box sx={{
                display: "flex",
                gap: 2,
                px: 3,
                py: 2.5,
                borderTop: `1px solid ${theme.palette.divider}`,
                backgroundColor: "background.paper",
            }}>
                <Button
                    variant='outlined'
                    color='inherit'
                    fullWidth
                    onClick={() => onClose()}
                    sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 500,
                    }}
                >
                    Cancelar
                </Button>
                <Button
                    variant='contained'
                    type='submit'
                    fullWidth
                    sx={{
                        borderRadius: "8px",
                        textTransform: "none",
                        fontWeight: 500,
                        boxShadow: theme.shadows[2],
                    }}
                >
                    Guardar
                </Button>
                
            </Box>
        </Box>
    );
};

export default SelectAnalisysByMatrixModal;