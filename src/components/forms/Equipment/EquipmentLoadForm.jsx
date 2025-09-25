import { Box, Button, InputLabel, MenuItem, Switch, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import api from '../../../service/axiosService';

const EquipmentLoadForm = ({ send, onClose, nameOfTheEquipment, equipmentId }) => {
    const [data, setData] = useState({
        nameLoan: "",
        notes: "",
        loanDate: null,
        type: "Prestamo",
        equipmentId: equipmentId
    })
    const [errors, setErrors] = useState([])




    const handleSubmit = (e) => {
        e.preventDefault()
        const sendData = async () => {
            try {
                const res = await api.post("/loan/equipment/save", data);
                if (res.status == 201) {
                    send()
                }


            } catch (error) {
                console.log(error);
            }
        }
        sendData()

    }

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <Box>
            <Typography sx={{ pb: "40px", pt: "40px", fontSize: "1.5rem", textAlign:"center" }}>Registro para: {nameOfTheEquipment}</Typography>
            <Box component={"form"} onSubmit={handleSubmit}
                sx={{
                    width: "500px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection:"column"
                }}>

                <Box sx={{
                    width: "500px",
                    display: "grid",
                    gridTemplateColumns: "250px 250px",
                    gap: "20px"
                }}>

                    <TextField
                        label="Nombre del usuario del prestamo"
                        name="nameLoan"
                        value={data.nameLoan}
                        onChange={handleChange}
                        required
                        error={!!errors?.nameLoan}
                        helperText={errors?.nameLoan}
                        sx={{ flex: "1 1 calc(50% - 8px)" }}
                    />

                    <TextField
                        label="Descripción"
                        name="notes"
                        value={data.notes}
                        onChange={handleChange}
                        required
                        error={!!errors?.notes}
                        helperText={errors?.notes}
                        multiline
                        minRows={3}
                        maxRows={10}
                        sx={{ flex: "1 1 calc(50% - 8px)" }}
                    />

                    <TextField
                        type="date"
                        label="Fecha de prestamo o uso"
                        name="loanDate"
                        required
                        value={data.loanDate}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ flex: "1 1 calc(50% - 8px)" }}
                        error={!!errors?.loanDate}
                        helperText={errors?.loanDate}
                    />


                    <TextField
                        select
                        label="Tipo de registro"
                        name="type"
                        value={data.type || ""}
                        onChange={handleChange}
                        required
                        error={!!errors?.type}
                        helperText={errors?.type}
                        sx={{ flex: "1 1 calc(50% - 8px)" }}

                    >
                        <MenuItem value={"Prestamo"}>Prestamo</MenuItem>
                        <MenuItem value={"Uso"}>Uso</MenuItem>

                    </TextField>
                </Box>







                <Button sx={{ width: "100%", mt:"20px" }} variant='contained' type='submit'>aceptar</Button>

            </Box>
        </Box>
    );
};

export default EquipmentLoadForm;