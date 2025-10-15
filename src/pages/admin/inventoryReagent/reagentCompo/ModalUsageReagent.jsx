import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../../../service/axiosService';

const ModalUsageReagent = ({ onClose, success, reagentId, unitOfMeasure, stock, dateOfExpiration }) => {
    const [dataForm, setDataForm] = useState({
        responsibleName: "",
        quantity: "",
        notes: "",
        reagentId: reagentId
    })
    const [errorStock, setErrorStock] = useState({
        message: "",
        stateError: false
    })
    const [error, setError] = useState({
        message: "",
        stateError: false
    })
    const [notifyExpiration, setNotifyExpiration] = useState({
        message: "",
        isExpirated: false
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/reagent/save-usage", dataForm );
            if(res.status == 201){
                onClose()
                success()
            }
            
        } catch (error) {
           if(error.response.data.errors.general){
                setError({
                    stateError:true,
                    message:error.response.data.errors.general
                })
           };
            
        }
        

        console.log(dataForm);

    }

    const handleChangeInput = (e) => {
        if (e.target.name == "quantity") {
            if (e.target.value > stock) {
                setErrorStock({
                    stateError: true,
                    message: "La cantidad que estas digitando el mayor a la cantidad diponible del reactivo."
                })
            } else {
                setErrorStock({
                    stateError: false,
                    message: ""
                })
            }
        }
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        const validateExpiration = () => {
            const expirationDate = new Date(`${dateOfExpiration}T00:00:00`);
            const today = new Date();


            const exp = new Date(expirationDate.toISOString().slice(0, 10));
            const now = new Date(today.toISOString().slice(0, 10));


            const diffTime = exp - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 0) {
                setNotifyExpiration({
                    isExpirated: true,
                    message: "tener en cuanta que: El reactivo vence hoy."
                })
            } else if (diffDays < 0) {
                setNotifyExpiration({
                    isExpirated: true,
                    message: "tener en cuanta que: El reactivo esta vencido."
                })
            }
        }

        validateExpiration()
    }, [])


    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
                maxWidth: "500px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}>
            <Typography variant='h3'>Registrar uso del reactivo</Typography>
            <Typography sx={{ fontWeight: "bold" }}>Cantidad disponible: {stock} {unitOfMeasure}</Typography>
            

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "220px 220px",
                    gap: "20px",
                    mt: "40px"
                }}
            >
                <TextField
                    label="Nombre del responsable"
                    placeholder='Nombre'
                    name='responsibleName'
                    value={dataForm.responsibleName || ""}
                    onChange={(e) => handleChangeInput(e)}
                />

                <TextField
                    type='number'
                    label={"Cantidad usada en" + unitOfMeasure}
                    placeholder='Cantidad'
                    name='quantity'
                    required
                    value={dataForm.quantity || ""}
                    onChange={(e) => handleChangeInput(e)}
                />

                <TextField

                    label={"Notas"}
                    placeholder='Escribe cualquier novedad'
                    name='notes'
                    value={dataForm.notes || ""}
                    onChange={(e) => handleChangeInput(e)}
                />

            </Box>

            {/* message errors */}
            {errorStock.stateError &&
                (<Typography sx={{
                    color: "red",
                   
                    textAlign: "center",
                    pt: "20px",
                    pb: "20px"
                }}>
                    {errorStock.message}
                </Typography>)}

            {notifyExpiration.isExpirated &&
                (<Typography sx={{
                    color: "primary.third",
                    textAlign: "center",
                    pt: "20px",
                    pb: "20px",
                    
                }}>
                    {notifyExpiration.message}
                </Typography>)}

            {error.stateError &&
                (<Typography sx={{
                    color: "red",
                    textAlign: "center",
                    pt: "20px",
                    pb: "20px",
                    
                }}>
                    {error.message}
                </Typography>)}

            <Button variant='contained' sx={{ mt: "20px" }} type='submit'>Guardar registro</Button>
        </Box>
    );
};

export default ModalUsageReagent;