import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const UsageForm = ({ method, errors = {}, data = null, isEdit }) => {
    const [formData, setFormData] = useState({
        equipmentUsageId: null,
        usageName: "",
    });

    const handleForm = (e) => {
        e.preventDefault();
        if (!data) {
            method(formData); 
        } else {
            method(formData, data.equipmentUsageId); 
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        if (data) {
            setFormData(data);
        }
    }, [data]);

    return (
        <Box
            component="form"
            onSubmit={handleForm}
            sx={{
                width: { xs: "100%", sm: "400px" },
                p: 3,
                borderRadius: 2,
            }}
        >
            <Typography
                component="h2"
                sx={{
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "600",
                    mb: 3,
                }}
            >
                {isEdit ? "Editar uso de equipo" : "Agregar uso de equipo"}
            </Typography>

            <TextField
                label="Nombre del uso"
                name="usageName"
                value={formData.usageName}
                onChange={handleChange}
                required
                fullWidth
                helperText={errors?.usageName}
                error={!!errors?.usageName}
                sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                {isEdit ? "Editar" : "Guardar"}
            </Button>
        </Box>
    );
};

export default UsageForm;
