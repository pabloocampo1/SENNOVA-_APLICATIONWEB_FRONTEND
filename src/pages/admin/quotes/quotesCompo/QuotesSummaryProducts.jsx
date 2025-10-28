import { Add } from '@mui/icons-material';
import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import imageAdd from "../../../../assets/images/add_image.svg"

const QuotesSummaryProducts = ({ samples = [] }) => {
    return (
        <Box sx={{
            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            border: "1px solid #00000020",
            borderRadius: "15px",
            p: "20px",
            position:"relative"
        }}>

            <Typography sx={{ textAlign: "center", fontWeight: "700" }}>Resumen de la cotizacion.</Typography>

            <Box sx={{
                width: "100%",
                height: "90%",
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
                        <Button startIcon={<Add />} sx={{ mt: "20px" }} variant='outlined'>Agregar.</Button>
                    </Box>
                )}

            </Box>

            <Box sx={{
                width: "100%",
                height: "10%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "end"
            }}>
                <Typography sx={{ fontWeight: "500" }}>Precio final</Typography>
                <Typography variant='body2'>0$</Typography>
            </Box>
        </Box>
    );
};

export default QuotesSummaryProducts;