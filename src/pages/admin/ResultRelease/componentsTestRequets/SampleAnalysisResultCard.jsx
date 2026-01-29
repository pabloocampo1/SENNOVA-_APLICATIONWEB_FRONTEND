import {
    Add,
    CheckCircle,
    DeleteForeverOutlined,
    Download,
    FileOpen,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Chip,
    MenuItem,
    Snackbar,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import api from "../../../../service/axiosService";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";
import { formatDateTime } from "../../../../Utils/DateUtils";

const SampleAnalysisResultCard = ({
    data = {},
    requestCode,
    isAdminEdit = false,
    stateSampleReception,
}) => {
    const theme = useTheme();
    const [listFiles, setListFiles] = useState([]);
    const [dataToUse, setDataToUse] = useState(data);
    const { authObject } = useAuth();
    const [isLoanding, setIsLoanding] = useState(false);
    const [responseAlert, setResponseAlert] = useState({
        status: false,
        message: "",
    });
    const canEmitResult = stateSampleReception === true;

    const handleFiles = (e) => {
        setListFiles((prev) => [...prev, ...Array.from(e.target.files)]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canEmitResult) {
            setResponseAlert({
                status: true,
                message:
                    "No es posible emitir resultados porque la muestra no ha sido recepcionada.",
            });
            return;
        }

        setIsLoanding(true);
        const data = {
            data: dataToUse,
        };

        const formData = new FormData();

        const analysisRequestDto = {
            ...data.data,
            resultGeneratedBy: authObject.name,
        };
        formData.append(
            "dto",
            new Blob([JSON.stringify(analysisRequestDto)], {
                type: "application/json",
            }),
        );
        formData.append("testRequestId", requestCode);

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

    const handleSaveDoc = async () => {
        setIsLoanding(true);
        const formData = new FormData();

        listFiles.forEach((file) => formData.append("docs", file));
        formData.append("analysisResultId", dataToUse.sampleProductAnalysisId);

        try {
            const res = await api.post(
                "/sample/save-document-analysis",
                formData,
            );

            if (res.status == 201) {
                setListFiles([]);
                setDataToUse((prev) => ({
                    ...prev,
                    sampleProductDocumentResult: [
                        ...prev.sampleProductDocumentResult,
                        ...res.data,
                    ],
                }));
            }
        } catch (error) {
            console.error(error);
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

    const deleteFile = async (sampleProductDocumentResultId, nameFile) => {
        // delete in this method the cod with that link
        console.log(dataToUse);

        const listDpcsUpdate = dataToUse.sampleProductDocumentResult.filter(
            (doc) =>
                doc.sampleProductDocumentResultId !==
                sampleProductDocumentResultId,
        );

        setDataToUse({
            ...dataToUse,
            sampleProductDocumentResult: listDpcsUpdate,
        });

        setResponseAlert({
            message: ` Se elimino el archivo correctamente el archivo ${nameFile}`,
            status: true,
        });

        try {
            const res = await api.delete(
                `/sample/delete-file-result/${sampleProductDocumentResultId}`,
            );
            console.log(res);
        } catch (error) {
            console.error(error);
        }
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
            {/** Messages to show */}
            {responseAlert.status && (
                <Snackbar
                    open={responseAlert.status}
                    autoHideDuration={3000}
                    onClose={() => {
                        setResponseAlert({
                            ...responseAlert,
                            status: false,
                        });
                        setResponseAlert({
                            status: false,
                            message: "",
                        });
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        severity="success"
                        onClose={() =>
                            setResponseAlert({
                                status: false,
                                message: "",
                            })
                        }
                        sx={{ width: "100%" }}
                    >
                        {responseAlert.message}
                    </Alert>
                </Snackbar>
            )}
            <SimpleBackdrop open={isLoanding} text="Guardando resultado." />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: "40px",
                    mt: "20px",
                }}
            >
                <Box>
                    <Typography variant="body1" sx={{ color: "primary.main" }}>
                        {dataToUse.product.analysis}
                    </Typography>

                    <Typography variant="body2">{dataToUse.code}</Typography>
                </Box>

                <Box>
                    <Chip
                        label={
                            dataToUse.stateResult
                                ? "Resultado emitido"
                                : "Sin emitir resultado"
                        }
                        color={dataToUse.stateResult ? "info" : "warning"}
                        size="small"
                        sx={{
                            p: "15px",
                        }}
                    />
                </Box>
            </Box>
            {/* FORM TO SAVE RESULT. */}
            <Box
                component={"form"}
                onSubmit={handleSubmit}
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
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
                            disabled={
                                !canEmitResult ||
                                (!isAdminEdit && dataToUse.stateResult)
                            }
                            value={dataToUse.resultFinal}
                            onChange={(e) => handleChangeInput(e)}
                            required
                            placeholder="Digite el resultaado final"
                        />
                        <TextField
                            type="date"
                            required
                            disabled={
                                !canEmitResult ||
                                (!isAdminEdit && dataToUse.stateResult)
                            }
                            name="resultDate"
                            onChange={(e) => handleChangeInput(e)}
                            value={dataToUse.resultDate}
                            placeholder="Digite el resultado final"
                        />
                        <TextField
                            placeholder="Unidad"
                            onChange={(e) => handleChangeInput(e)}
                            required
                            label="Unidad"
                            name="unit"
                            disabled={
                                !canEmitResult ||
                                (!isAdminEdit && dataToUse.stateResult)
                            }
                            value={
                                dataToUse.unit == null
                                    ? dataToUse.product.units
                                    : dataToUse.unit
                            }
                            type="text"
                        />

                        <TextField
                            required
                            select
                            value={dataToUse.accreditationStatus || ""}
                            name="accreditationStatus"
                            label="Estado"
                            disabled={
                                !canEmitResult ||
                                (!isAdminEdit && dataToUse.stateResult)
                            }
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
                            required
                            disabled={
                                !canEmitResult ||
                                (!isAdminEdit && dataToUse.stateResult)
                            }
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
                            disabled={
                                !canEmitResult ||
                                (!isAdminEdit && dataToUse.stateResult)
                            }
                            value={dataToUse.standards || ""}
                            name="standards"
                            onChange={(e) => handleChangeInput(e)}
                            type="text"
                            placeholder="Normatividad"
                        />
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
                        Asegúrate de revisar todos los datos antes de guardar.
                        Una vez registrados los resultados, no podrán ser
                        modificados, salvo que lo realice el superadministrador.
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
                        <Typography variant="body2">
                            Archivos subidos:{" "}
                        </Typography>
                        <Box
                            sx={{
                                width: "100%",
                            }}
                        >
                            {dataToUse.sampleProductDocumentResult.length >=
                            1 ? (
                                <Box
                                    sx={{
                                        display: "grid",
                                        gridTemplateColumns:
                                            "repeat(auto-fill, minmax(200px, 1fr))",
                                        gap: "20px",
                                        mb: "20px",
                                        mt: "20px",
                                    }}
                                >
                                    {dataToUse.sampleProductDocumentResult.map(
                                        (doc, index) => {
                                            return (
                                                <Box
                                                    key={index}
                                                    sx={{
                                                        width: "200px",
                                                        bgcolor:
                                                            "background.paper",
                                                        display: "flex",
                                                        flexDirection: "column",
                                                        border: `1px solid ${theme.palette.border.primary}`,
                                                        alignItems: "center",
                                                        p: "20px",
                                                        borderRadius: "10px",
                                                        cursor: "pointer",
                                                    }}
                                                >
                                                    <FileOpen />
                                                    <Typography
                                                        sx={{
                                                            textAlign: "center",
                                                            wordBreak:
                                                                "break-word",
                                                        }}
                                                        variant="body2"
                                                    >
                                                        {doc.nameFile ||
                                                            "Sin nombre registrado"}
                                                    </Typography>

                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            justifyContent:
                                                                "center",
                                                            gap: "20px",
                                                            mt: "20px",
                                                        }}
                                                    >
                                                        <Tooltip
                                                            title={
                                                                "Descargar documento"
                                                            }
                                                        >
                                                            <a
                                                                href={doc.url}
                                                                download={
                                                                    doc.nameFile
                                                                }
                                                                style={{
                                                                    textDecoration:
                                                                        "none",
                                                                    color: "inherit",
                                                                }}
                                                            >
                                                                <Button variant="outlined">
                                                                    {" "}
                                                                    <Download />
                                                                </Button>
                                                            </a>
                                                        </Tooltip>

                                                        <Tooltip
                                                            title={
                                                                "Eliminar documento"
                                                            }
                                                        >
                                                            <Button
                                                                variant="contained"
                                                                onClick={() =>
                                                                    deleteFile(
                                                                        doc.sampleProductDocumentResultId,
                                                                        doc.nameFile,
                                                                    )
                                                                }
                                                            >
                                                                <DeleteForeverOutlined />
                                                            </Button>
                                                        </Tooltip>
                                                    </Box>
                                                </Box>
                                            );
                                        },
                                    )}
                                </Box>
                            ) : (
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                    }}
                                >
                                    No hay archivos
                                </Typography>
                            )}
                        </Box>
                        <Button variant="outlined" component="label" fullWidth>
                            Seleccionar archivos
                            <input
                                hidden
                                multiple
                                type="file"
                                name="file"
                                accept=".doc,.docx,.xls,.xlsx,.txt"
                                onChange={(e) => handleFiles(e)}
                            />
                        </Button>

                        {listFiles.length >= 1 && (
                            <>
                                <Typography
                                    sx={{
                                        textAlign: "center",
                                        mt: "10px",
                                        mb: "20px",
                                        color: "primary.third",
                                        fontWeight: "bold",
                                    }}
                                >
                                    hay {listFiles.length}{" "}
                                    {listFiles.length == 1
                                        ? "archivo seleccionado"
                                        : "archivos seleccionados"}
                                </Typography>
                                <Button
                                    onClick={() => handleSaveDoc()}
                                    variant="contained"
                                    fullWidth
                                >
                                    Subir archivos
                                </Button>
                            </>
                        )}
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
                            Preocura no subir archivos muy pesados.
                        </Typography>
                    </Box>

                    {/* OPTION TO UPLOAD FILE AND SAVE RESULT */}
                    <Box
                        sx={{
                            mt: "20px",
                        }}
                    >
                        {dataToUse.stateResult && (
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
                                        {formatDateTime(dataToUse.createAt)}
                                    </span>
                                </Typography>
                                <Typography variant="body2">
                                    {" "}
                                    Editado :{" "}
                                    <span style={{ fontWeight: "bold" }}>
                                        {formatDateTime(dataToUse.updateAt)}
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
                        )}

                        {(isAdminEdit || !dataToUse.stateResult) && (
                            <Button
                                type="submit"
                                variant="contained"
                                disabled={!canEmitResult}
                                sx={{ width: "100%" }}
                                startIcon={<Add />}
                            >
                                Guardar resultado
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SampleAnalysisResultCard;
