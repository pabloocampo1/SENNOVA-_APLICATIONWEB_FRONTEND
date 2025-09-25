import React, { useState } from 'react';
import api from '../../../service/axiosService';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';

const EquipmentMaintanence = ({equipmentId, send, nameOfTheEquipment}) => {
    const [data, setData] = useState({
        performedBy: "",
        notes: "",
        dateMaintenance: null,
        maintenanceType: "",
        equipmentId: equipmentId
    })
    const [errors, setErrors] = useState()


    const handleSubmit = (e) => {
        e.preventDefault()
        const sendData = async () => {
            try {
                const res = await api.post("/maintenance/equipment/save", data);
                console.log(res);
                
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
                    width: "550px",
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
                        label="Nombre del encargado del mantenimiento"
                        name="performedBy"
                        value={data.performedBy}
                        onChange={handleChange}
                        required
                        error={!!errors?.performedBy}
                        helperText={errors?.performedBy}
                        sx={{ flex: "1 1 calc(50% - 8px)" }}
                    />

                    <TextField
                        label="Notas para este registro"
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
                        label="Tipo de mantenimiento"
                        name="maintenanceType"
                        value={data.maintenanceType}
                        onChange={handleChange}
                        required
                        error={!!errors?.maintenanceType}
                        helperText={errors?.maintenanceType}
                        sx={{ flex: "1 1 calc(50% - 8px)" }}
                    />

                    <TextField
                        type="date"
                        label="Fecha de mantenimiento"
                        name="dateMaintenance"
                        required
                        value={data.dateMaintenance}
                        onChange={handleChange}
                        InputLabelProps={{ shrink: true }}
                        sx={{ flex: "1 1 calc(50% - 8px)" }}
                        error={!!errors?.dateMaintenance}
                        helperText={errors?.dateMaintenance}
                    />


                    
                </Box>




                <Button sx={{ width: "100%", mt:"20px" }} variant='contained' type='submit'>Guardar registro</Button>

            </Box>
        </Box>
    );
};

export default EquipmentMaintanence;