import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const ProductForm = ({ method, errors, data = {}, isEdit }) => {
    const [formData, setFormData] = useState({
        analysisId: null,
        analysisName: "",
        equipment: "",

        method: "",
        notes: "",
        price: 0,
        units: "",
        createAt: null,
        updateAt: null,
    });

    const handleForm = (e) => {
        e.preventDefault();
        if (!data) {
            method(formData);
        } else {
            method(formData, data.analysisId);
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
    }, []);

    return (
        <Box
            component="form"
            onSubmit={handleForm}
            sx={{
                width: "600px",
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
                Agregar producto
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: 2,
                }}
            >
                <TextField
                    label="Análisis"
                    name="analysisName"
                    value={formData.analysisName}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Método"
                    name="method"
                    value={formData.method}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Equipo"
                    name="equipment"
                    value={formData.equipment}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Unidades"
                    name="units"
                    value={formData.units}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="Precio"
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    required
                    fullWidth
                    helperText={errors.price}
                />

                <TextField
                    label="Notas"
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    multiline
                    rows={3}
                    fullWidth
                    sx={{ gridColumn: "1 / -1" }}
                />

                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ gridColumn: "1 / -1", mt: 2 }}
                >
                    {isEdit ? "Editar producto" : "Guardar producto"}
                </Button>
            </Box>
        </Box>
    );
};

export default ProductForm;
