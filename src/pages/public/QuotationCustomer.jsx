import { Box, Button, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import CustomerInfoQuote from '../admin/quotes/quotesCompo/CustomerInfoQuote';
import QuotesSummaryProducts from '../admin/quotes/quotesCompo/QuotesSummaryProducts';
import { Delete, Send } from '@mui/icons-material';
import GenericModal from '../../components/modals/GenericModal';
import SelectAnalisysCompo from '../admin/quotes/quotesCompo/SelectAnalisysCompo';

const QuotationCustomer = () => {
    const [openModalToSelectProduct, setOpenModalToSelectProduct] = useState(false);
    const [samplesSelectByTheUser, setSampleSelectByTheUser] = useState([]);
    const [customerInfo, setCustomerInfo] = useState(null)
    const [errorToSendQuote, setErrorToSendQuote] = useState({
        status: false,
        message: ""
    })

    const customerInfoRef = useRef();


    const handleOpenModalToSelectAnalisys = () => {
        setOpenModalToSelectProduct(true)
    }

    const cleanQoute = () => {
        setSampleSelectByTheUser([])
        setCustomerInfo(null)
        if (customerInfoRef.current) {
            customerInfoRef.current.cleanForm();
        }
    }

    const handleSaveCustomer = (customerInfo) => {
        setCustomerInfo(customerInfo)


        // clean errors
        setErrorToSendQuote({
            status: false,
            message: ""
        })
        return true;
    }



    const saveAndSendQuote = () => {
        console.log(customerInfo);

        if (customerInfo == null) {

            setErrorToSendQuote({
                status: true,
                message: "Debes de rellenar los datos del cliente para el envio de la cotizacion."
            })
            return;
        } else {
            setErrorToSendQuote({
                status: false,
                message: ""
            })
        }

        if (samplesSelectByTheUser.length < 1) {
            setErrorToSendQuote({
                status: true,
                message: "Debes de agregar muestras y seleccionar analisis para el envio de la cotizacion."
            })
            return;
        } else {
            setErrorToSendQuote({
                status: false,
                message: ""
            })
        }







    }


    const deleteSampleOfTheList = (indexObject) => {
        setSampleSelectByTheUser(prev => prev.filter((_, index) => index !== indexObject))
    }

    const saveSampleInfo = (sampleInfo) => {

        setSampleSelectByTheUser([
            ...samplesSelectByTheUser,
            sampleInfo,
        ])
        console.log(sampleInfo);

        setOpenModalToSelectProduct(false)

        // clean errors
        setErrorToSendQuote({
            status: false,
            message: ""
        })
    }

    return (
        <Box component={"section"} sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center", alignItems:
                "center",
            flexDirection: "column"

        }}>

            {/* modals */}

            {openModalToSelectProduct && (
                <GenericModal
                    open={openModalToSelectProduct}
                    onClose={() => setOpenModalToSelectProduct(false)}
                    compo={<SelectAnalisysCompo saveSample={(sampleInfo) => saveSampleInfo(sampleInfo)} />} />
            )}


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
                    <CustomerInfoQuote
                        ref={customerInfoRef}
                        saveInfoCustomer={(customerInfo) => handleSaveCustomer(customerInfo)}
                        handleOpenModalToSelectAnalisys={() => handleOpenModalToSelectAnalisys()}
                    />
                </Box>

                {/* summary quotation */}
                <Box sx={{
                    width: { xs: "100%", md: "60%" },
                    height: { xs: "150vh", md: "80vh" },
                }}>
                    <QuotesSummaryProducts deleteSample={(index) => deleteSampleOfTheList(index)} samples={samplesSelectByTheUser} handleOpenModalToSelectAnalisys={() => handleOpenModalToSelectAnalisys()} />
                </Box>
            </Box>


            {/* message error to send information */}
            {errorToSendQuote.status && (
                <Typography color='error' sx={{ fontWeight: "bold", fontSize: "1.5rem" }}>{errorToSendQuote.message}</Typography>

            )}

            <Box sx={{
                width: { xs: "100%", md: "80%" },
                display: "flex",
                justifyContent: "end",
                mb: "100px",
                gap: "20px",
                p: { xs: "10px", md: "20px" },

            }}>

                <Button onClick={() => cleanQoute()} startIcon={<Delete />} color='error' variant='contained'>Limpiar cotizacion</Button>
                <Button onClick={() => saveAndSendQuote()} startIcon={<Send />} variant='outlined'>Enviar solicitud de servicio.</Button>
            </Box>


        </Box>
    );
};

export default QuotationCustomer;