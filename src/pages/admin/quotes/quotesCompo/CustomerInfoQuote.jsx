
import { Add, Done } from '@mui/icons-material';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';


const CustomerInfoQuote = ({ saveInfoCustomer }) => {
    const [customerData, setCustomerData] = useState({
        customerName: "",
        email: "",
        phoneNumber: "",
        address: "",
        city: ""
    })

    const [isSavedCustomer, setIsSavedCustomer] = useState(false);

    const handleChange = (e) => {
        setCustomerData({
            ...customerData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSavedCustomer(true)
        
        // save tenporally
    }

    return (
        <Box sx={{

            width: "100%",
            height: "100%",
            bgcolor: "background.paper",
            border: "1px solid #00000020",
            borderRadius: "15px",
            p: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "start"
        }}>
            <Button startIcon={<Add />} variant='outlined'>Agregar un producto {"(Analisis)"}.</Button>

            <Typography sx={{ textAlign: "center", fontWeight: "700", mt: "50px", mb: "20px" }}>Informacion del cliente</Typography>

            <Box component={"form"} onSubmit={handleSubmit} sx={{height:"100%", display:"flex", flexDirection:"column", justifyContent:"space-between"}} >
                <Box  sx={{ display: "flex", flexDirection:"column", gap: "20px", pl:"20px", pr:"20px" }}>
                    <TextField
                        label="Nombre completo"
                        name='customerName'
                        required
                        placeholder='Digite su nombre completo'
                        value={customerData.customerName || ""}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        type='email'
                        label="Correo electronico"
                        name='email'
                        required
                        placeholder='Digite su email'
                        value={customerData.email || ""}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        type='number'
                        required
                        label="Numero de telefono"
                        name='phoneNumber'
                        placeholder='Digite su numero de telefono'
                        value={customerData.phoneNumber || ""}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        label="Direccion"
                        name='address'
                        required
                        placeholder='Digite direccion'
                        value={customerData.address || ""}
                        onChange={(e) => handleChange(e)}
                    />
                    <TextField
                        label="Ciudad"
                        required
                        name='city'
                        placeholder='Ciudad'
                        value={customerData.city || ""}
                        onChange={(e) => handleChange(e)}
                    />
                </Box>

               {!isSavedCustomer ? (
                 <Button type='submit' variant='contained'>Guardar</Button>
               ) : (
                <Box sx={{height:"80px", bgcolor:"green", display:"flex", justifyContent:"center", alignItems:"center", borderRadius:"10px"}}>
                   <Typography sx={{color:"white", textAlign:"center", fontWeight:"bold"}}>Informacion guardada correctamente.</Typography> <Done sx={{color:"white",}}/>
                </Box>
               )}
            </Box>
        </Box>
    );
};

export default CustomerInfoQuote;