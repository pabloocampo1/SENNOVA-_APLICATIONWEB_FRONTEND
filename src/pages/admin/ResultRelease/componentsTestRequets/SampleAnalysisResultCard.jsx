import { Add, CheckCircle, Upload } from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    MenuItem,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import api from "../../../../service/axiosService";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";

const SampleAnalysisResultCard = ({ data = {}, requestCode }) => {
    const theme = useTheme();
    const [ListFiles, setListFiles] = useState([]);
    const [dataToUse, setDataToUse] = useState(data);
    const { authObject } = useAuth();
    const [isLoanding, setIsLoanding] = useState(false);

    const handleFiles = (e) => {
        setListFiles(e.target.files);
    };

    const sendResultFinal = async (data) => {
        setIsLoanding(true);
        const formData = new FormData();

        const analysisRequestDto = {
            ...data.data,
            resultGeneratedBy: authObject.name,
        };
        formData.append(
            "dto",
            new Blob([JSON.stringify(analysisRequestDto)], {
                type: "application/json",
            })
        );
        formData.append("testRequestId", requestCode);

        if (data.filesList != null) {
            formData.append("file", data.filesList);
        }

        try {
            const res = await api.post(`/sample/save-result`, formData, {
                headers: {
                    "Content-Type": "Multipart/form-data",
                },
            });

            if (res.status === 200) {
                setDataToUse(res.data);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const handleChangeInput = (e) => {
        setDataToUse({
            ...dataToUse,
            [e.target.name]: e.target.value,
        });
    };

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
                position: "relative",
            }}
        >
            <SimpleBackdrop open={isLoanding} text="Guardando resultado." />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    mt: "10px",
                }}
            >
                <Chip
                    label={
                        dataToUse.stateResult
                            ? "Resultado emitido"
                            : "Sin emitir resultado"
                    }
                    color={dataToUse.stateResult ? "success" : "warning"}
                    size="small"
                    sx={{
                        p: "15px",
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mb: "40px",
                    mt: "20px",
                }}
            >
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                    {dataToUse.product.analysis}
                </Typography>

                <Typography variant="body2">{dataToUse.code}</Typography>
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
                        name="resultFinal"
                        disabled={dataToUse.stateResult}
                        value={dataToUse.resultFinal}
                        onChange={(e) => handleChangeInput(e)}
                        required
                        placeholder="Digite el resultaado final"
                    />
                    <TextField
                        type="date"
                        required
                        disabled={dataToUse.stateResult}
                        name="resultDate"
                        onChange={(e) => handleChangeInput(e)}
                        value={dataToUse.resultDate}
                        placeholder="Digite el resultado final"
                    />
                    <TextField
                        label={"Unidad"}
                        onChange={(e) => handleChangeInput(e)}
                        required
                        name="unit"
                        disabled={dataToUse.stateResult}
                        value={dataToUse.unit}
                        type="text"
                        placeholder="Unidad"
                    />

                    <TextField
                        select
                        value={dataToUse.accreditationStatus || ""}
                        name="accreditationStatus"
                        label="Estado"
                        disabled={dataToUse.stateResult}
                        onChange={(e) => handleChangeInput(e)}
                        sx={{
                            width: "200px",
                        }}
                    >
                        <MenuItem value={"Agreditado"}>Acreditado</MenuItem>
                        <MenuItem value={"Sin acreditar"}>
                            Sin acreditar
                        </MenuItem>
                        <MenuItem value={"Validado"}>Validado</MenuItem>
                        <MenuItem value={"Estandarizado"}>
                            Estandarizado
                        </MenuItem>
                    </TextField>
                    <TextField
                        select
                        value={dataToUse.passStatus || ""}
                        name="passStatus"
                        disabled={dataToUse.stateResult}
                        label="Cumple"
                        onChange={(e) => handleChangeInput(e)}
                        sx={{
                            width: "200px",
                        }}
                    >
                        <MenuItem value={"Cumple"}>Cumple</MenuItem>
                        <MenuItem value={"No cumple"}>No cumple</MenuItem>
                    </TextField>
                    <TextField
                        label={"Normatividad"}
                        required
                        disabled={dataToUse.stateResult}
                        value={dataToUse.standards || ""}
                        name="standards"
                        onChange={(e) => handleChangeInput(e)}
                        type="text"
                        placeholder="Normatividad"
                    />
                </Box>
            </Box>
            <Typography
                sx={{
                    textAlign: "center",
                    mt: "20px",
                    bgcolor: "action.hover",
                    p: "5px",
                    borderRadius: "10px",
                }}
                variant="caption"
            >
                Asegúrate de revisar todos los datos antes de guardar. Una vez
                registrados los resultados, no podrán ser modificados, salvo que
                lo realice el superadministrador.
            </Typography>
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
                <Button variant="outlined" component="label" fullWidth>
                    Subir imagen
                    <input
                        hidden
                        multiple
                        type="file"
                        name="file"
                        accept="image/*"
                        onChange={(e) => handleFiles(e)}
                    />
                </Button>
            </Box>
            {/* OPTION TO UPLOAD FILE AND SAVE RESULT */}
            <Box
                sx={{
                    mt: "20px",
                }}
            >
                {dataToUse.stateResult ? (
                    <Box
                        sx={{
                            textAlign: "center",
                            mb: "20px",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography
                            variant="body1"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                color: "primary.main",
                                mb: "10px",
                            }}
                        >
                            {" "}
                            Resultado emitido <CheckCircle />
                        </Typography>
                        <Typography variant="body2">
                            {" "}
                            Resultado emitido el :{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {dataToUse.resultDate}
                            </span>
                        </Typography>
                        <Typography variant="body2">
                            {" "}
                            por :{" "}
                            <span style={{ fontWeight: "bold" }}>
                                {" "}
                                {dataToUse.resultGeneratedBy}
                            </span>
                        </Typography>
                    </Box>
                ) : (
                    <Button
                        variant="contained"
                        sx={{
                            width: "100%",
                        }}
                        startIcon={<Add />}
                        onClick={() =>
                            sendResultFinal({
                                data: dataToUse,
                                filesList: ListFiles,
                            })
                        }
                    >
                        Guardar resultado
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default SampleAnalysisResultCard;
