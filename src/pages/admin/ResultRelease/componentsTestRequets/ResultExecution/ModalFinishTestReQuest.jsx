import {
    Add,
    BlockOutlined,
    DoneOutline,
    Error,
    PictureAsPdf,
    Preview,
    Remove,
    Warning,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Chip,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import api from "../../../../../service/axiosService";
import SimpleBackdrop from "../../../../../components/SimpleBackDrop";
import { AuthContext } from "../../../../../context/AuthContext";

const ModalFinishTestReQuest = ({
    samples = [],
    requestCode,
    customerName,
    customerEmail,
}) => {
    const [files, setFiles] = useState([]);
    const [isLoandingState, setIsLoandingState] = useState({
        state: false,
        text: "",
    });
    const [previewSignature, setPreviewSignature] = useState(null);

    const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
    const { authObject } = useContext(AuthContext);
    const [notes, setNotes] = useState("");
    const [
        infoResponsiblePersonReleaseResult,
        setInfoResponsiblePersonReleaseResult,
    ] = useState({
        name: authObject.name,
        role: authObject.position,
        signature: null,
    });

    const [error, setError] = useState(false);

    const fetchPdf = async () => {
        setIsLoandingState({
            state: true,
            text: "Generando documento final",
        });
        try {
            const response = await api.get("/testRequest/pdf/preview", {
                responseType: "blob",
            });

            const file = new Blob([response.data], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(file);
            setPdfPreviewUrl(fileURL);
            setError(false);
        } catch (error) {
            setError(true);
            console.error("Error al obtener PDF:", error);
        } finally {
            setIsLoandingState({
                state: false,
                text: "",
            });
        }
    };

    const handleSubmit = async (e) => {
        setIsLoandingState({
            state: true,
            text: "Estamos generando tu informe final. Esto puede tardar unos segundos, gracias por tu paciencia.",
        });
        e.preventDefault();
        if (infoResponsiblePersonReleaseResult.signature == null) {
            alert(
                "Debes agregar una firma difital para continuar con el proceso de finalizacion."
            );
            return;
        }

        const formData = new FormData();
        formData.append("requestCode", requestCode);
        formData.append("notes", notes);
        files.forEach((f) => formData.append("documents", f));
        formData.append(
            "responsibleName",
            infoResponsiblePersonReleaseResult.name
        );
        formData.append(
            "signature",
            infoResponsiblePersonReleaseResult.signature
        );
        formData.append("role", infoResponsiblePersonReleaseResult.role);

        try {
            const res = await api.post(
                "/testRequest/finish-test-request",
                formData
            );

            console.log(res);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoandingState({
                state: false,
                text: "",
            });
        }
    };

    const checkIfAllSamplesAreReady = () => {
        let isAllReady = true;
        samples.forEach((sample) => {
            sample.analysisEntities.forEach((a) => {
                if (a.resultFinal == null) {
                    isAllReady = false;
                }
            });
        });

        return isAllReady;
    };

    const handleChangeFiles = (e) => {
        const selectedFiles = Array.from(e.target.files);
        const total = selectedFiles.length + files.length;

        if (total >= 3) {
            alert("Solo se permiten máximo 2 archivos adicionales PDF");
            return;
        }

        console.log(selectedFiles);

        setFiles([...files, ...selectedFiles]);
    };

    const removeFile = (name) => {
        setFiles(files.filter((f) => f.name !== name));
    };

    return (
        <Box
            sx={{
                width: "900px",
                position: "relative",
                p: "0px 40px",
            }}
        >
            <SimpleBackdrop
                open={isLoandingState.state}
                text={isLoandingState.text}
            />
            <Typography
                variant="h6"
                sx={{
                    textAlign: "center",
                    color: "primary.main",
                    mt: "20px",
                }}
            >
                Emision resultado final ensayo
            </Typography>

            <Typography
                variant="subtitle1"
                sx={{ textAlign: "center", color: "text.primary", mt: 1 }}
            >
                Cliente: <b>{customerName}</b> | Email: <b>{customerEmail}</b>
            </Typography>

            <Typography sx={{ textAlign: "center", color: "text.secondary" }}>
                Estás a punto de realizar el envío final de los resultados del
                ensayo <b>{requestCode}</b>. Revisa cuidadosamente cada muestra
                y su análisis, ya que esta acción enviará los resultados
                finales.
            </Typography>

            <Box sx={{ mt: "40px" }}>
                <Typography sx={{ fontWeight: "bold", textAlign: "center" }}>
                    Análisis del ensayo
                </Typography>
                {checkIfAllSamplesAreReady() ? (
                    <Typography
                        color="success"
                        sx={{
                            justifyContent: "center",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <DoneOutline /> Todas los analisis estan listos
                    </Typography>
                ) : (
                    <Typography
                        color="warning"
                        sx={{
                            justifyContent: "center",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                        }}
                    >
                        <Warning /> FALTAN ANALISIS PARA EMITIR RESULTADO
                    </Typography>
                )}

                <TableContainer sx={{ mt: "30px" }}>
                    <Table>
                        <TableHead sx={{ bgcolor: "background.default" }}>
                            <TableRow>
                                <TableCell>Codigo muestra</TableCell>
                                <TableCell>Codigo analysis</TableCell>
                                <TableCell>Matrix</TableCell>
                                <TableCell>Análysis</TableCell>
                                <TableCell>Resultado final</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {samples.map((s, index) => {
                                return (
                                    <>
                                        {s.analysisEntities.map((a, i) => {
                                            return (
                                                <TableRow key={index + i}>
                                                    <TableCell>
                                                        {s.sampleCode}
                                                    </TableCell>
                                                    <TableCell>
                                                        {a.code}
                                                    </TableCell>
                                                    <TableCell>
                                                        {s.matrix}
                                                    </TableCell>
                                                    <TableCell>
                                                        {a.product.analysis}
                                                    </TableCell>
                                                    <TableCell>
                                                        {a.resultFinal == null
                                                            ? "Sin resultado"
                                                            : a.resultFinal}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            <Box sx={{ mt: 5 }}>
                <TextField
                    multiline
                    rows={3}
                    value={notes || ""}
                    onChange={(e) => setNotes(e.target.value)}
                    fullWidth
                    label="Notas adicionales"
                    placeholder="Escribe aquí cualquier observación relevante sobre el resultado final"
                    inputProps={{ maxLength: 300 }}
                    helperText={`${notes?.length || 0}/300 caracteres`}
                />

                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 1 }}
                >
                    Este mensaje será incluido en el correo enviado al cliente.
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Typography
                        sx={{
                            color: "primary.main",
                            mt: "50px",
                        }}
                    >
                        Ver vista previa del documento final de entrega
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: "20px" }}
                    >
                        Este PDF se generará automáticamente al enviar el correo
                        al cliente, por lo que no necesitas descargarlo ni
                        adjuntarlo manualmente. El sistema se encarga de
                        incluirlo en el mensaje al enviar el resultado final.
                    </Typography>
                    {error && (
                        <Typography
                            variant="body2"
                            color="error"
                            sx={{
                                mb: "20px",
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            <Error /> Hubo un error en el servidor al generar el
                            documento final
                        </Typography>
                    )}

                    <Button
                        startIcon={<Preview />}
                        variant="outlined"
                        onClick={fetchPdf}
                    >
                        Generar documento
                    </Button>

                    {pdfPreviewUrl && (
                        <Box sx={{ mt: 2 }}>
                            <iframe
                                src={pdfPreviewUrl}
                                width="100%"
                                height="500px"
                                title="Vista previa PDF"
                            />
                        </Box>
                    )}
                </Box>

                <Box>
                    <Typography
                        sx={{
                            color: "primary.main",
                            mt: "50px",
                        }}
                    >
                        Adjuntar archivos adicionales
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        Se permite adjuntar un máximo de <b>2 archivos PDF</b>.
                    </Typography>
                    <Box
                        sx={{
                            mt: 4,
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                        }}
                    >
                        {files.length > 0 ? (
                            files.map((f) => (
                                <Chip
                                    sx={{
                                        mr: "20px",
                                        mb: "20px",
                                    }}
                                    key={f.name}
                                    label={
                                        f.name.length > 20
                                            ? f.name.slice(0, 20) + "..."
                                            : f.name
                                    }
                                    onDelete={() => removeFile(f.name)}
                                    color="primary"
                                    variant="outlined"
                                />
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                No hay archivos seleccionados.
                            </Typography>
                        )}
                    </Box>
                </Box>

                <Button
                    variant="outlined"
                    startIcon={<PictureAsPdf />}
                    component="label"
                >
                    Adjuntar documentos
                    <input
                        type="file"
                        hidden
                        multiple
                        onChange={(e) => {
                            handleChangeFiles(e);
                            e.target.value = null;
                        }}
                        accept="application/pdf"
                    />
                </Button>
            </Box>

            <Box sx={{ mt: 4, mb: "100px" }}>
                <Typography
                    sx={{
                        color: "primary.main",
                        mb: "20px",
                        mt: "50px",
                    }}
                >
                    Informacion del responsable de envio
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                        mb: 2,
                    }}
                >
                    <TextField
                        label="Nombre del responsable de la emisión"
                        name="name"
                        required
                        value={infoResponsiblePersonReleaseResult.name}
                        onChange={(e) =>
                            setInfoResponsiblePersonReleaseResult({
                                ...infoResponsiblePersonReleaseResult,
                                [e.target.name]: e.target.value,
                            })
                        }
                        fullWidth
                    />
                    <TextField
                        label="Cargo del responsable"
                        name="role"
                        required
                        value={infoResponsiblePersonReleaseResult.role || ""}
                        onChange={(e) =>
                            setInfoResponsiblePersonReleaseResult({
                                ...infoResponsiblePersonReleaseResult,
                                [e.target.name]: e.target.value,
                            })
                        }
                        fullWidth
                    />

                    <Button
                        variant="outlined"
                        component="label"
                        sx={{ alignSelf: "flex-start" }}
                    >
                        Subir firma digital
                        <input
                            type="file"
                            name="signature"
                            hidden
                            accept="image/*"
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
                    <Typography variant="caption" color="text.secondary">
                        Solo se puede agregar firma digital en formato de imagen
                    </Typography>
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

                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: "50px",
                        }}
                    >
                        {checkIfAllSamplesAreReady() ? (
                            <Button variant="contained" type="submit">
                                Confirmar y enviar resultado final
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="info"
                                startIcon={<BlockOutlined />}
                            >
                                No se puede emitir resultado hasta que se
                                completen todos los analisis
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default ModalFinishTestReQuest;
