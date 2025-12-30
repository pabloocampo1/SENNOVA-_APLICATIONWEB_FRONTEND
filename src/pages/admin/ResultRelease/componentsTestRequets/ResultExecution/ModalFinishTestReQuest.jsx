import {
    Add,
    BlockOutlined,
    DoneOutline,
    PictureAsPdf,
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
    console.log(samples);
    const [files, setFiles] = useState([]);
    const [isLoandingState, setIsLoandingState] = useState({
        state: false,
        text: "",
    });
    const [addSignatures, setAddSignatures] = useState(false);
    const [pdfPreviewUrl, setPdfPreviewUrl] = useState(null);
    const { authObject } = useContext(AuthContext);
    const [responsibleTestRequestResult, setResponsibleTestRequestResult] =
        useState(authObject.name);

    const fetchPdf = async () => {
        setIsLoandingState({
            state: true,
            text: "Generando documento final",
        });
        try {
            const response = await api.get("/testRequest/pdf/preview", {
                responseType: "blob", // muy importante
            });

            const file = new Blob([response.data], { type: "application/pdf" });
            const fileURL = URL.createObjectURL(file);
            setPdfPreviewUrl(fileURL);
        } catch (error) {
            console.error("Error al obtener PDF:", error);
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
                height: "auto",
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
                    fullWidth
                    label="Notas adicionales"
                    placeholder="Escribe aquí cualquier observación relevante sobre el resultado final"
                />

                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 1 }}
                >
                    Este mensaje será incluido en el correo enviado al cliente.
                </Typography>

                <Box sx={{ mt: 4 }}>
                    <Button variant="outlined" onClick={fetchPdf}>
                        Ver vista previa del documento final
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
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mt: 1 }}
                    >
                        Este PDF se generará automáticamente al enviar el correo
                        al cliente, por lo que no necesitas descargarlo ni
                        adjuntarlo manualmente. El sistema se encarga de
                        incluirlo en el mensaje al enviar el resultado final.
                    </Typography>
                </Box>

                <Box sx={{ mt: 4, display: "flex", flexWrap: "wrap", gap: 1 }}>
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

                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", mt: 1 }}
                >
                    Se permite adjuntar un máximo de <b>2 archivos PDF</b>.
                </Typography>
            </Box>

            <Box
                sx={{
                    mt: "100px",
                    mb: "20px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Typography
                    onClick={() => setAddSignatures(true)}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        textDecoration: "underline",
                        color: "text.secondary",
                    }}
                >
                    {" "}
                    <Add /> Agregar firma y nombre
                </Typography>

                {addSignatures && (
                    <Box sx={{ mt: 4 }}>
                        <Box
                            component="form"
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: 2,
                                mb: 2,
                            }}
                        >
                            <TextField
                                label="Nombre del responsable de la emisión"
                                value={responsibleTestRequestResult}
                                onChange={(e) =>
                                    setResponsibleTestRequestResult(
                                        e.target.value
                                    )
                                }
                                fullWidth
                            />

                            <Button
                                variant="outlined"
                                component="label"
                                sx={{ alignSelf: "flex-start" }}
                            >
                                Subir firma digital
                                <input type="file" hidden accept="image/*" />
                            </Button>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Solo se puede agregar firma digital en formato
                                de imagen
                            </Typography>

                            <Typography
                                variant="caption"
                                color="text.secondary"
                            >
                                Si no guardas esta información se mostrará el
                                nombre y firma predeterminado por el sistema.
                                <br />A nombre de: <b>Jhonatan Henao</b>
                            </Typography>
                        </Box>

                        <Typography
                            onClick={() => setAddSignatures(false)}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                textDecoration: "underline",
                                cursor: "pointer",
                                color: "text.secondary",
                                mt: 1,
                            }}
                        >
                            <Remove sx={{ mr: 0.5 }} /> No agregar
                        </Typography>
                    </Box>
                )}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: "50px",
                }}
            >
                {checkIfAllSamplesAreReady() ? (
                    <Button variant="contained">
                        Confirmar y enviar resultado final
                    </Button>
                ) : (
                    <Button
                        variant="contained"
                        color="info"
                        startIcon={<BlockOutlined />}
                    >
                        No se puede emitir resultado hasta que se completen
                        todos los analisis
                    </Button>
                )}
            </Box>
        </Box>
    );
};

export default ModalFinishTestReQuest;
