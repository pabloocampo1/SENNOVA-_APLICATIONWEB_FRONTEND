import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const LocationForm = ({ method, errors = {}, data = null, isEdit }) => {
    const [formData, setFormData] = useState({
        equipmentLocationId: null,
        locationName: "",
    });

    const handleForm = (e) => {
        e.preventDefault();
        if (!data) {
            method(formData); 
        } else {
            method(formData, data.equipmentLocationId); 
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
                {isEdit ? "Editar ubicación" : "Agregar ubicación"}
            </Typography>

            <TextField
                label="Nombre de la ubicación"
                name="locationName"
                value={formData.locationName}
                onChange={handleChange}
                required
                fullWidth
                helperText={errors?.locationName}
                error={!!errors?.locationName}
                sx={{ mb: 2 }}
            />

            <Button type="submit" variant="contained" color="primary" fullWidth>
                {isEdit ? "Editar" : "Guardar"}
            </Button>
        </Box>
    );
};

export default LocationForm;
