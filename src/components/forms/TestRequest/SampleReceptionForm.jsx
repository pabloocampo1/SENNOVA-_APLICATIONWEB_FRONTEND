import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import api from "../../../service/axiosService";

const SampleReceptionForm = ({ data, onClose }) => {
    const [sampleSelected, setSampleSelected] = useState(data);
    const [image, setImage] = useState(null);

    const handleImage = (e) => {
        setImage(e.target.files[0]);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();

        const objectToSend = {
            sampleEntryDate: sampleSelected?.sampleEntryDate ?? null,
            sampleReceptionDate: sampleSelected?.sampleReceptionDate ?? null,
            grossWeight: sampleSelected?.gross_weight ?? null,
            temperature: sampleSelected?.temperature ?? null,
            packageDescription: sampleSelected?.packageDescription ?? null,
            identificationSample: sampleSelected?.identificationSample ?? null,
            storageConditions: sampleSelected?.storageConditions ?? null,
            observations: sampleSelected?.observations ?? null,
        };

        formData.append(
            "dto",
            new Blob([JSON.stringify(objectToSend)], {
                type: "application/json",
            })
        );

        formData.append("sampleId", data.sampleId);

        if (image != null) {
            formData.append("file", image, image.name);
        }

        for (const pair of formData.entries()) {
            console.log(pair[0], pair[1]);
        }

        try {
            const res = await api.post(`/sample/save-reception`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200) {
                onClose(sampleSelected.sampleId, res.data.sampleImage);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            onSubmit={onSubmit}
            component="form"
            sx={{
                width: "70%",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                p: 3,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                Registro de recepción de muestra
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(320px, 1fr))",
                    gap: 3,
                }}
            >
                <TextField
                    label="Identificación de la muestra"
                    value={sampleSelected?.identificationSample ?? ""}
                    multiline
                    required
                    minRows={4}
                    fullWidth
                    onChange={(e) =>
                        setSampleSelected({
                            ...sampleSelected,
                            identificationSample: e.target.value,
                        })
                    }
                    placeholder="Ejemplo: muestra de café molido del Valle de Aburrá..."
                />

                <TextField
                    type="date"
                    required
                    fullWidth
                    label="Fecha de ingreso"
                    InputLabelProps={{ shrink: true }}
                    value={sampleSelected?.sampleEntryDate ?? ""}
                    onChange={(e) =>
                        setSampleSelected({
                            ...sampleSelected,
                            sampleEntryDate: e.target.value,
                        })
                    }
                />

                <TextField
                    type="date"
                    required
                    fullWidth
                    label="Fecha de recepción"
                    InputLabelProps={{ shrink: true }}
                    value={sampleSelected?.sampleReceptionDate ?? ""}
                    onChange={(e) =>
                        setSampleSelected({
                            ...sampleSelected,
                            sampleReceptionDate: e.target.value,
                        })
                    }
                />

                <TextField
                    label="Peso bruto (g)"
                    fullWidth
                    required
                    type="number"
                    value={sampleSelected?.gross_weight ?? ""}
                    onChange={(e) =>
                        setSampleSelected({
                            ...sampleSelected,
                            gross_weight: e.target.value,
                        })
                    }
                />
                <TextField
                    label="Temperatura"
                    fullWidth
                    required
                    type="number"
                    value={sampleSelected?.temperature ?? ""}
                    onChange={(e) =>
                        setSampleSelected({
                            ...sampleSelected,
                            temperature: e.target.value,
                        })
                    }
                />

                <TextField
                    label="Descripción del empaque"
                    multiline
                    minRows={4}
                    fullWidth
                    required
                    value={sampleSelected?.packageDescription ?? ""}
                    onChange={(e) =>
                        setSampleSelected({
                            ...sampleSelected,
                            packageDescription: e.target.value,
                        })
                    }
                />

                <TextField
                    label="Condiciones de almacenamiento"
                    fullWidth
                    required
                    value={sampleSelected?.storageConditions ?? ""}
                    onChange={(e) =>
                        setSampleSelected({
                            ...sampleSelected,
                            storageConditions: e.target.value,
                        })
                    }
                />

                <TextField
                    label="Observaciones"
                    multiline
                    required
                    minRows={3}
                    fullWidth
                    value={sampleSelected?.observations ?? ""}
                    onChange={(e) =>
                        setSampleSelected({
                            ...sampleSelected,
                            observations: e.target.value,
                        })
                    }
                />

                <Box>
                    <Typography variant="body2" sx={{ mb: 1, fontWeight: 500 }}>
                        Imagen de la muestra
                    </Typography>
                    <Button variant="outlined" component="label" fullWidth>
                        Subir imagen
                        <input
                            hidden
                            type="file"
                            name="file"
                            accept="image/*"
                            onChange={(e) => handleImage(e)}
                        />
                    </Button>
                </Box>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained" size="large">
                    Guardar información
                </Button>
            </Box>
        </Box>
    );
};

export default SampleReceptionForm;
