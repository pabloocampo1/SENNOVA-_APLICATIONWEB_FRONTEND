import { Box, Button, Typography } from '@mui/material';
import React from 'react';
import CustomerInfoQuote from '../admin/quotes/quotesCompo/CustomerInfoQuote';
import QuotesSummaryProducts from '../admin/quotes/quotesCompo/QuotesSummaryProducts';
import { Delete, Send } from '@mui/icons-material';

const QuotationCustomer = () => {
    return (
        <Box component={"section"} sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center", alignItems:
                "center",
            flexDirection: "column"

        }}>
            <Typography component={"h2"} variant='h2' sx={{ color: "primary.main", textAlign: "center", mt: "20px" }}>Cotizacion de solicutud de ensayo.</Typography>

            <Box sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "initial" },
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                width: { xs: "100%", md: "80%" },
                p: { xs: "10px", md: "20px" },
            }}>
                {/* info customer component */}
                <Box sx={{
                    width: { xs: "100%", md: "40%" },
                    height: { xs: "85vh", md: "80vh" },
                }}>
                    <CustomerInfoQuote />
                </Box>

                {/* summary quotation */}
                <Box sx={{
                    width: { xs: "100%", md: "60%" },
                    height: { xs: "150vh", md: "80vh" },
                }}>
                    <QuotesSummaryProducts />
                </Box>
            </Box>

            <Box sx={{
                width: { xs: "100%", md: "80%" },
                display: "flex",
                justifyContent: "end",
                mb: "100px",
                gap: "20px",
                p: { xs: "10px", md: "20px" },
               
            }}>
                <Button startIcon={<Delete />} color='error' variant='contained'>Limpiar cotizacion</Button>
                <Button startIcon={<Send />} variant='outlined'>Enviar solicitud de servicio.</Button>
            </Box>
        </Box>
    );
};

export default QuotationCustomer;