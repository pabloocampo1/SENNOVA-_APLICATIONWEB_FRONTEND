import { Add, Delete, Info } from '@mui/icons-material';
import { Box, Button, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from '@mui/material';
import React from 'react';
import imageAdd from "../../../../assets/images/add_image.svg"

const QuotesSummaryProducts = ({ samples = [], handleOpenModalToSelectAnalisys, deleteSample }) => {
    const theme = useTheme();



    const formatCurrency = (value) =>
        new Intl.NumberFormat("es-MX", {
            style: "currency",
            currency: "MXN",
            minimumFractionDigits: 2,
        }).format(value);


    const totalGeneral = samples.reduce((accSample, sample) => {
        const totalSample = sample.analisys.reduce((accAnalisis, item) => {
            const price = Number(item.product.price) || 0;
            const qty = Number(item.quantity) || 0;
            return accAnalisis + price * qty;
        }, 0);
        return accSample + totalSample;
    }, 0);


    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            border: "1px solid #00000020",
            borderRadius: "15px",
            p: "20px",
            position: "relative"
        }}>

            <Typography sx={{ textAlign: "center", fontWeight: "700" }}>Resumen de la cotizacion.</Typography>

            <Box sx={{
                width: "100%",
                height: "80%",
                flex: 1,
                overflowY: "auto",
                mt: 2,
                "&::-webkit-scrollbar": { width: "8px" },
                "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#ccc",
                    borderRadius: "8px",
                },
            }}>
                {samples.length <= 0 && (
                    <Box sx={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",

                    }}>
                        <Typography variant='body1' sx={{ fontWeight: "500" }}>No hay productos/analisis agregados aun.</Typography>
                        <Typography variant='body2' sx={{ opacity: "0.70", mb: "20px" }}>Debes de agregar productos/analisis para la realizacion de la cotizacion.</Typography>
                        <img width={"100px"} src={imageAdd} alt="image_add" />
                        <Button onClick={() => handleOpenModalToSelectAnalisys()} startIcon={<Add />} sx={{ mt: "20px" }} variant='outlined'>Agregar.</Button>
                    </Box>
                )}

                {samples.map((sample, index) => (
                    <Box sx={{
                        width: "100%",
                        height: "auto",
                        bgcolor: "background.default",
                        border: `1px solid ${theme.palette.border.primary}`,
                        borderRadius: "15px",
                        p: "10px",
                        mb: "20px",
                        mr: "10px",
                        position: "relative"
                    }}>

                        <Box sx={{
                            position: "absolute",
                            top: "10",
                            right: "1%"

                        }} onClick={() => deleteSample(index)}>
                            <Delete />
                        </Box>

                        <Box sx={{ display: "flex" }}>
                            <Typography variant='body1' sx={{ mr: "20px", fontWeight: "bold" }}>
                                {index + 1} |
                            </Typography>
                            <Box>
                                <Typography variant='body1'>Muestra</Typography>
                                <Typography variant='body2'> {sample.matrix}</Typography>
                            </Box>
                        </Box>
                        {/* table of analysys of the sample */}

                        <Box sx={{
                            width: "100%",

                        }}>
                            <TableContainer
                                component={Paper}
                                sx={{
                                    width: "100%",
                                    mt: "20px",
                                    overflowX: "auto",
                                    overflowY: "hidden",
                                    borderRadius: "12px",
                                    boxShadow: "0 4px 10px rgba(0,0,0,0.05)",


                                    "&::-webkit-scrollbar": {
                                        height: "8px",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: "#bfbfbf",
                                        borderRadius: "10px",
                                    },
                                    "&::-webkit-scrollbar-thumb:hover": {
                                        backgroundColor: "#9a9a9a",
                                    },
                                }}
                            >
                                <Table
                                    stickyHeader
                                    sx={{
                                        width: "100%",

                                    }}
                                    aria-label="tabla de equipos"
                                >
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={{ fontWeight: "700" }}>Analisis</TableCell>
                                            <TableCell sx={{ fontWeight: "700" }}>Precio unitario</TableCell>
                                            <TableCell sx={{ fontWeight: "700" }}>cantidad</TableCell>
                                            <TableCell sx={{ fontWeight: "700" }}>total</TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {sample.analisys.map((object) => {
                                            const price = Number(object.product.price) || 0;
                                            const qty = Number(object.quantity) || 0;
                                            const total = price * qty;

                                            return (
                                                <TableRow key={object.product.productId} hover>
                                                    <TableCell sx={{ opacity: 0.85 }}>{object.product.analysis}</TableCell>
                                                    <TableCell sx={{ opacity: 0.85, textAlign: "right" }}>
                                                        {formatCurrency(price)}
                                                    </TableCell>
                                                    <TableCell sx={{ opacity: 0.85, textAlign: "center" }}>
                                                        {qty}
                                                    </TableCell>
                                                    <TableCell sx={{ opacity: 0.85, textAlign: "right", fontWeight: "bold" }}>
                                                        {formatCurrency(total)}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                        {/* Total por muestra */}
                                        <TableRow sx={{ backgroundColor: theme.palette.action.hover }}>
                                            <TableCell colSpan={3} sx={{ fontWeight: "bold", textAlign: "right" }}>
                                                Total muestra:
                                            </TableCell>
                                            <TableCell sx={{ fontWeight: "bold", textAlign: "right" }}>
                                                {formatCurrency(
                                                    sample.analisys.reduce(
                                                        (acc, item) => acc + item.product.price * item.quantity,
                                                        0
                                                    )
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>

                                </Table>
                            </TableContainer>
                        </Box>
                    </Box>
                ))}

            </Box>

            <Box
                sx={{
                    width: "100%",
                    mt: "auto",
                    pt: 2,
                    borderTop: `1px solid ${theme.palette.divider}`,
                    display: "flex",
                    justifyContent:"space-between",
                    alignItems: "end",
                }}
            >

                <Box>
                    <Button onClick={() => handleOpenModalToSelectAnalisys()} startIcon={<Add />} variant='outlined'>Agregar un producto {"(Analisis)"}.</Button>
                </Box>

                <Box>
                    <Typography sx={{ fontWeight: "500" }}>Precio final</Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", color: theme.palette.primary.main }}>
                        {formatCurrency(totalGeneral)}
                    </Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default QuotesSummaryProducts;