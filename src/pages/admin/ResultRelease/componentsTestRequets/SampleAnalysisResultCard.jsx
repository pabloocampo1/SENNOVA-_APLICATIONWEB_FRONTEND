import { Add, Upload } from "@mui/icons-material";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";

const SampleAnalysisResultCard = ({ data = {} }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                minHeight: "300px",
                bgcolor: "background.default",
                border: `1px solid ${theme.palette.border.primary}`,
                mb: "20px",
                p: "10px",
                borderRadius: "10px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
            }}
            key={data.sampleProductAnalysisId}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mb: "40px",
                    mt: "20px",
                }}
            >
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                    {data.product.analysis}
                </Typography>

                <Typography variant="body2">{data.code}</Typography>
            </Box>
            {/* FORM TO SAVE RESULT. */}
            <Box
                component={"form"}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "200px 200px",
                        gap: "20px",
                    }}
                >
                    <TextField
                        label={"Resultado final"}
                        type="text"
                        placeholder="Digite el resultaado final"
                    />
                    <TextField
                        type="date"
                        placeholder="Digite el resultaado final"
                    />
                    <TextField
                        label={"Unidad"}
                        type="text"
                        placeholder="Unidad"
                    />

                    <TextField
                        select
                        label="estado"
                        sx={{
                            width: "200px",
                        }}
                    >
                        <MenuItem>hola</MenuItem>
                        <MenuItem>hola 2</MenuItem>
                        <MenuItem>hola 3</MenuItem>
                    </TextField>
                </Box>
            </Box>
            {/* FILES UPLOAD BY THE USER */}
            <Box
                sx={{
                    width: "100%",
                    minHeight: "200px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    mt: "40px",
                }}
            >
                <Typography variant="body2">Archivos: </Typography>
                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        sx={{
                            textAlign: "center",
                        }}
                    >
                        No hay archivos
                    </Typography>
                </Box>
                <Button
                    sx={{
                        width: "100%",
                    }}
                    startIcon={<Upload />}
                >
                    Agregar archivo
                </Button>
            </Box>
            {/* OPTION TO UPLOAD FILE AND SAVE RESULT */}
            <Box
                sx={{
                    mt: "20px",
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        width: "100%",
                    }}
                    startIcon={<Add />}
                >
                    Guardar resultado
                </Button>
            </Box>
        </Box>
    );
};

export default SampleAnalysisResultCard;
