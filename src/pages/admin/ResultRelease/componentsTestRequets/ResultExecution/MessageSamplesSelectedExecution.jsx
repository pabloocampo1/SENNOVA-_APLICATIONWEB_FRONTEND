import { CheckCircleOutline, WarningAmberOutlined } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../../context/AuthContext";
import api from "../../../../../service/axiosService";
import SimpleBackdrop from "../../../../../components/SimpleBackDrop";

// this component have the logic to send all samples to release result final report, send only one object with the resposible and  list of samples id

const MessageSamplesSelectedExecution = ({
    onClose,
    cleanData,
    isAllSamplesAlReady,
    samples = [],
    infoResponsible,
    openModalMessage,
    updatePendingSamplesDeliveryList,
}) => {
    const { authObject } = useContext(AuthContext);
    const [previewSignature, setPreviewSignature] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [
        infoResponsiblePersonReleaseResult,
        setInfoResponsiblePersonReleaseResult,
    ] = useState({
        name: authObject.name,
        role: authObject.position,
        signature: null,
    });
    let title;
    let description;
    let confirmButtonText;
    let icon;

    const handleSubmit = async (e) => {
        setIsLoading(true);
        e.preventDefault();
        if (!infoResponsiblePersonReleaseResult.signature) {
            alert("Debes subir la firma digital");
            setIsLoading(false);
            return;
        }

        const samplesId = samples.map((s) => s.sampleId);

        try {
            const formData = new FormData();
            formData.append("samples", JSON.stringify(samplesId));
            formData.append(
                "signature",
                infoResponsiblePersonReleaseResult.signature
            );
            formData.append("name", infoResponsiblePersonReleaseResult.name);
            formData.append("role", infoResponsiblePersonReleaseResult.role);

            const res = await api.post(
                "/testRequest/send-report-samples",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            if (res.status == 200) {
                // Reloads data when the user submits a sample
                // update the list of samples pending to delivery and expired
                updatePendingSamplesDeliveryList(samplesId);
                setErrorMessage("");
                onClose();
                cleanData();
                openModalMessage();
            }
        } catch (error) {
            setErrorMessage(error.response.data.errors.general);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const object = {
            ...infoResponsiblePersonReleaseResult,
            [e.target.name]: e.target.value,
        };
        setInfoResponsiblePersonReleaseResult(object);

        infoResponsible(object);
    };

    if (samples.length == 0) {
        title = "No hay muestras seleccionadas";

        description =
            "Debes salir y seleccionar las muestras que quieres enviar";

        confirmButtonText = "Salir";
        icon = (
            <WarningAmberOutlined
                sx={{ color: "warning.main", width: 100, height: 100, mb: 4 }}
            />
        );
    } else {
        title = isAllSamplesAlReady
            ? "Todas las muestras seleccionadas tienen sus análisis finalizados"
            : "Algunas muestras aún no tienen todos los análisis";

        description = isAllSamplesAlReady
            ? "Hemos revisado toda la información y confirmado que cada una de las muestras ya tiene sus análisis finalizados. Estás listo para enviar los resultados cuando lo desees."
            : "Existen muestras que todavía no han completado todos sus análisis. No puedes enviar los resultados hasta que estén finalizadas. Puedes remover esas muestras sin finalizar de la ejecucion";

        confirmButtonText = isAllSamplesAlReady
            ? "Confirmar y enviar resultados"
            : "Sin acceso";

        icon = isAllSamplesAlReady ? (
            <CheckCircleOutline
                sx={{ color: "primary.main", width: 100, height: 100, mb: 4 }}
            />
        ) : (
            <WarningAmberOutlined
                sx={{ color: "warning.main", width: 100, height: 100, mb: 4 }}
            />
        );
    }

    return (
        <Box
            sx={{
                width: "40%",
                maxHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
            }}
        >
            {icon}

            <SimpleBackdrop
                open={isLoading}
                text="Estamos generando los informes y enviándolos. Este proceso puede tardar unos segundos."
            />

            <Typography sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}>
                {title}
            </Typography>

            <Typography
                variant="body2"
                sx={{ textAlign: "center", mb: 2, opacity: 0.9 }}
            >
                {description}
            </Typography>

            <Box sx={{ mb: "20px" }}>
                <Typography
                    sx={{
                        color: "primary.main",
                        mb: "20px",
                        mt: "10px",
                    }}
                >
                    Informacion del responsable de envio
                </Typography>
                <Box
                    onSubmit={handleSubmit}
                    component="form"
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mb: 2,
                    }}
                >
                    <TextField
                        name="name"
                        label="Nombre del responsable de la emisión"
                        value={infoResponsiblePersonReleaseResult.name || ""}
                        fullWidth
                        required
                        onChange={(e) => handleChange(e)}
                    />

                    <TextField
                        name="role"
                        label="Nombre del responsable de la emisión"
                        value={infoResponsiblePersonReleaseResult.role || ""}
                        fullWidth
                        required
                        onChange={(e) => handleChange(e)}
                    />

                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ alignSelf: "flex-start", mb: 2 }}
                    >
                        Subir firma digital
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            name="signature"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    setInfoResponsiblePersonReleaseResult(
                                        (prev) => ({
                                            ...prev,
                                            signature: file,
                                        })
                                    );

                                    const previewUrl =
                                        URL.createObjectURL(file);
                                    setPreviewSignature(previewUrl);
                                }
                            }}
                        />
                    </Button>

                    {previewSignature && (
                        <Box
                            sx={{
                                mb: 2,
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Vista previa de la firma:
                            </Typography>
                            <Box
                                component="img"
                                src={previewSignature}
                                alt="Preview firma"
                                sx={{
                                    mt: 1,
                                    width: 50,
                                    height: "auto",
                                    border: "1px solid #ccc",
                                }}
                            />
                        </Box>
                    )}
                    <Typography variant="caption" color="text.secondary">
                        Solo se puede agregar firma digital en formato de imagen
                    </Typography>

                    {isAllSamplesAlReady ? (
                        <Button
                            variant="outlined"
                            type="submit"
                            sx={{ width: 300, mb: 2 }}
                        >
                            {confirmButtonText}
                        </Button>
                    ) : (
                        <Button
                            variant="outlined"
                            onClick={() => onClose()}
                            sx={{ width: 300, mb: 2 }}
                        >
                            {confirmButtonText} hola
                        </Button>
                    )}
                    <Typography color="error">{errorMessage}</Typography>

                    <Button
                        variant="contained"
                        sx={{ width: 300 }}
                        onClick={() => {
                            onClose();
                            cleanData();
                        }}
                    >
                        Cancelar proceso
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default MessageSamplesSelectedExecution;
