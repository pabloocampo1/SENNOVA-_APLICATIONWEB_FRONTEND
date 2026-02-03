import {
    ArrowBackOutlined,
    Assignment,
    Construction,
    ConstructionOutlined,
    Download,
    IosShare,
    PhotoCamera,
    ReportProblem,
    Update,
} from "@mui/icons-material";
import {
    Alert,
    Box,
    Button,
    Divider,
    Paper,
    Snackbar,
    Tooltip,
    Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../service/axiosService";
import CardLoadEquipmentInfo from "./componentsEquipment/CardLoadEquipmentInfo";
import ListMaintanence from "./componentsEquipment/ListMaintanence";
import notImage from "../../../assets/images/notImageAvailable.jpg";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import FileCard from "../../../components/FileCard";
import GenericModal from "../../../components/modals/GenericModal";
import EquipmentLoadForm from "../../../components/forms/Equipment/EquipmentLoadForm";
import EquipmentMaintanence from "../../../components/forms/Equipment/EquipmentMaintanence";
import MaintenanceStatusBox from "./componentsEquipment/MaintenanceStatusBox";
import { downloadPdf } from "../../../service/ExportDataExcel";
import ButtonBack from "../../../components/ButtonBack";

const InfoRow = ({ label, value }) => (
    <Box sx={{ display: "flex", mb: "5px" }}>
        <Typography
            variant="caption"
            sx={{
                fontWeight: "500",
                opacity: "0.90",
                backgroundColor: "action.hover",
                px: 1.2,
                py: 0.3,
                borderRadius: 1,
            }}
        >
            {label} :{" "}
        </Typography>
        <Typography sx={{ color: "text.secondary", pl: "10px" }}>
            {value || "—"}
        </Typography>
    </Box>
);

const EquipmentInfo = () => {
    const { idEquipment } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [dataLoan, setDataLoan] = useState([]);
    const [dataMaintenance, setDataMaintenance] = useState([]);
    const [imageFile, setImageFile] = useState();
    const imageInputRef = useRef(null);
    const filesInputRef = useRef(null);
    const [isLoanding, setIsLoanding] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    // modals
    const [openLoadForm, setOpenLoadForm] = useState(false);
    const [openMaintanence, setOpenMaintanence] = useState(false);
    const [responseAlert, setResponseAlert] = useState({
        status: false,
        message: "",
    });

    const handleFilesChange = (event) => {
        setFiles(event.target.files);
    };

    const fetchData = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(`/equipment/get-by-id/${idEquipment}`);

            if (res.status == 200) {
                setData(res.data);
                setImageFile(res.data.imageUrl);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const changeImageOption = async (file) => {
        console.log("se envio");

        setIsLoanding(true);
        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await api.put(
                `/equipment/change-image/${idEquipment}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                },
            );

            if (res.status === 200) {
                setImageFile(res.data);
                setResponseAlert({
                    status: true,
                    message: "Se cambio la imagen exitosamente.",
                });
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };
    const uploadFiles = async () => {
        if (!files || files.length === 0) return;

        setIsLoanding(true);
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }

            const res = await api.post(
                `/equipment/uploadFile/${idEquipment}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } },
            );

            if (res.status === 200) {
                setUploadedFiles((prev) => [...prev, ...res.data]);
                setFiles([]);
                setResponseAlert({
                    status: true,
                    message: "Se guardo los archivos exitosamente.",
                });
            }
        } catch (error) {
            console.error("Error subiendo archivos", error);
        } finally {
            setIsLoanding(false);
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            changeImageOption(file);
        }
    };

    const deleteFile = async (id) => {
        try {
            const res = await api.delete(`/equipment/deleteFile/${id}`);
            if (res.data) {
                getFiles();
                setResponseAlert({
                    status: true,
                    message: "El archivo fue eliminado exitosamente",
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const getLoad = async () => {
        setIsLoanding(true);

        try {
            const res = await api.get(
                `/loan/equipment/getByEquipmentId/${idEquipment}`,
            );
            console.log(res);
            if (res.status == 200) {
                setDataLoan(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const deletedLoan = (id) => {
        const dataUpdated = dataLoan.filter(
            (loan) => loan.equipmentLoanId !== id,
        );
        setDataLoan(dataUpdated);
        setResponseAlert({
            status: true,
            message: "El registro se elimino exitosamente.",
        });
    };

    const getFiles = () => {
        const fetch = async () => {
            setIsLoanding(true);
            try {
                const res = await api.get(`/equipment/getFiles/${idEquipment}`);
                setUploadedFiles(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoanding(false);
            }
        };

        fetch();
    };

    const getMaintenance = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(
                `/maintenance/equipment/getAllByEquipmentId/${idEquipment}`,
            );
            setDataMaintenance(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const handleLoadSend = () => {
        getLoad();
        setOpenLoadForm(false);
        setResponseAlert({
            status: true,
            message: "El registro se guardó correctamente.",
        });
    };

    const handleMaintanenceSend = () => {
        getMaintenance();
        fetchData();
        setOpenMaintanence(false);
        setResponseAlert({
            status: true,
            message: "El mantenimiento se registró exitosamente.",
        });
    };

    useEffect(() => {
        const init = async () => {
            await fetchData();
            await getFiles();
            await getLoad();
            await getMaintenance();
        };
        init();
    }, [idEquipment]);

    return (
        <Box sx={{ pt: "50px" }}>
            <SimpleBackdrop open={isLoanding} />

            {/*Modals */}

            <GenericModal
                open={openLoadForm}
                onClose={() => setOpenLoadForm(false)}
                compo={
                    <EquipmentLoadForm
                        equipmentId={data.equipmentId}
                        nameOfTheEquipment={data.equipmentName}
                        send={handleLoadSend}
                        onClose={() => setOpenLoadForm(false)}
                    />
                }
            />

            <GenericModal
                open={openMaintanence}
                onClose={() => setOpenMaintanence(false)}
                compo={
                    <EquipmentMaintanence
                        equipmentId={idEquipment}
                        nameOfTheEquipment={data.equipmentName}
                        send={handleMaintanenceSend}
                        onClose={() => setOpenMaintanence(false)}
                    />
                }
            />

            {/** Messages */}
            {responseAlert.status && (
                <Snackbar
                    open={responseAlert.status}
                    autoHideDuration={5000}
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

            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" }, // Columna en móvil, fila en desktop
                    justifyContent: "space-between",
                    alignItems: { xs: "flex-start", sm: "center" },
                    gap: 2,
                    mb: 3,
                }}
            >
                {/* Botón de volver ocupa todo el ancho en móvil si quieres, o se queda auto */}
                <Box sx={{ width: { xs: "100%", sm: "auto" } }}>
                    <ButtonBack />
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        flexWrap: "wrap",
                        width: { xs: "100%", sm: "auto" }, // Contenedor al 100% en móvil
                        justifyContent: { xs: "space-between", sm: "flex-end" },
                    }}
                >
                    {/* Botón de Exportar - Siempre pequeño */}
                    <Tooltip title="Exportar Ficha Técnica">
                        <Button
                            variant="outlined"
                            onClick={() =>
                                downloadPdf(data.equipmentId, data.internalCode)
                            }
                            sx={{
                                minWidth: "45px",
                                width: "45px",
                                height: "45px",
                                borderRadius: "12px",
                                borderColor: "divider",
                                color: "text.secondary",
                            }}
                        >
                            <IosShare fontSize="small" />
                        </Button>
                    </Tooltip>

                    {/* Grupo de botones de acción rápida */}
                    <Box
                        sx={{
                            display: "flex",
                            gap: 1.5,
                            flexDirection: { xs: "column", md: "row" }, // Se apilan en pantallas muy pequeñas
                            width: { xs: "calc(100% - 60px)", sm: "auto" }, // Ajuste para dejar espacio al botón export
                        }}
                    >
                        <Button
                            variant="contained"
                            startIcon={<ConstructionOutlined />}
                            onClick={() => setOpenMaintanence(true)}
                            sx={{
                                height: "45px",
                                px: { xs: 2, sm: 3 },
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: "0.8rem", sm: "0.875rem" }, // Letra un poco más pequeña en móvil
                                boxShadow: "none",
                                width: "100%", // Ocupa el espacio disponible
                            }}
                        >
                            Mantenimiento
                        </Button>

                        <Button
                            variant="outlined"
                            startIcon={<Assignment />}
                            onClick={() => setOpenLoadForm(true)}
                            sx={{
                                height: "45px",
                                px: { xs: 2, sm: 3 },
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                                borderWidth: "1.5px",
                                width: "100%",
                            }}
                        >
                            Préstamo
                        </Button>
                    </Box>
                </Box>
            </Box>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    mt: "40px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <Typography
                        variant="h2"
                        component={"h2"}
                        sx={{ color: "primary.main" }}
                    >
                        Informacion sobre{"    "}
                        {"  /  "}
                    </Typography>
                    <Typography
                        variant="h2"
                        component={"h2"}
                        sx={{ color: "text.secondary" }}
                    >
                        {data.equipmentName}
                    </Typography>
                </Box>
            </Box>
            <Divider sx={{ mb: "20px", mt: "10px" }}>Informacion</Divider>

            {/* message report equipment */}
            {data.markReport && (
                <Box
                    sx={{
                        width: "100%",
                        height: "100px",
                        bgcolor: "#ea3b3bff",
                        mb: "40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <ReportProblem />
                    <Typography
                        sx={{ color: "text.primary", opacity: "0.90" }}
                        variant="body2"
                    >
                        El equipo ha sido reportado como inexistente.
                    </Typography>
                </Box>
            )}

            {/** cards info */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                    gap: 4,
                    mt: 3,
                }}
            >
                {/* PANEL 1: IDENTIFICACIÓN (Estilo PDF) */}
                <Paper
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 4,
                        overflow: "hidden", // Para que el header respete el border-radius
                        bgcolor: "background.paper",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "background.default",
                            p: 1.5,
                            color: "text.secondary",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        DATOS DE IDENTIFICACIÓN
                    </Box>
                    <Box
                        sx={{
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                        }}
                    >
                        <InfoRow
                            label="Código interno"
                            value={data.internalCode}
                        />
                        <InfoRow
                            label="Cuentadante"
                            value={data.responsibleName}
                        />
                        <InfoRow label="Ubicación" value={data.locationName} />
                        <InfoRow
                            label="Placa Inventario"
                            value={data.serialNumber}
                        />
                        <InfoRow label="Estado" value={data.state} isBadge />{" "}
                        {/* Agregué prop para badge */}
                        <InfoRow
                            label="Costo"
                            value={`$ ${data.equipmentCost?.toLocaleString()}`}
                        />
                        <Divider sx={{ my: 1 }} />
                        <InfoRow
                            label="Adquisición"
                            value={data.acquisitionDate}
                        />
                        <InfoRow
                            label="Mantenimiento"
                            value={data.maintenanceDate}
                        />
                    </Box>
                </Paper>

                {/*  ESPECIFICACIONES TÉCNICAS */}
                <Paper
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 4,
                        overflow: "hidden",
                        bgcolor: "background.paper",
                    }}
                >
                    <Box
                        sx={{
                            bgcolor: "background.default",
                            p: 1.5,
                            color: "text.secondary",
                            fontWeight: "bold",
                            textAlign: "center",
                        }}
                    >
                        ESPECIFICACIONES TÉCNICAS
                    </Box>
                    <Box
                        sx={{
                            p: 3,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1.5,
                        }}
                    >
                        <InfoRow label="Nombre" value={data.equipmentName} />
                        <InfoRow
                            label="Número de serie"
                            value={data.serialNumber}
                        />
                        <InfoRow label="Marca" value={data.brand} />
                        <InfoRow label="Modelo" value={data.model} />
                        <InfoRow label="Voltaje" value={data.voltage} />
                        <InfoRow label="Amperaje" value={data.amperage} />
                        <InfoRow label="Uso destinado" value={data.usageName} />
                    </Box>
                </Paper>

                {/* PANEL 3: MULTIMEDIA Y DESCRIPCIÓN */}
                <Paper
                    elevation={0}
                    sx={{
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 4,
                        overflow: "hidden",
                        bgcolor: "background.paper",
                        position: "relative",
                    }}
                >
                    <Box
                        sx={{
                            p: 0,
                            position: "relative",
                            height: "220px",
                            bgcolor: "#f5f5f5",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <img
                            src={imageFile || notImage}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                                padding: imageFile ? 0 : "20px",
                            }}
                            alt="Equipo"
                        />
                        <Button
                            size="small"
                            onClick={() => imageInputRef.current.click()}
                            variant="contained"
                            startIcon={<PhotoCamera />}
                            sx={{
                                position: "absolute",
                                bottom: 10,
                                right: 10,
                                borderRadius: 2,
                                textTransform: "none",
                                bgcolor: "rgba(0,0,0,0.6)",
                                "&:hover": { bgcolor: "rgba(0,0,0,0.8)" },
                            }}
                        >
                            Cambiar
                        </Button>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                fontWeight: "bold",
                                textTransform: "uppercase",
                            }}
                        >
                            Descripción y Notas
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 1,
                                p: 2,

                                borderRadius: 2,
                                border: "1px dashed #ccc",
                                color: data.description
                                    ? "text.primary"
                                    : "text.disabled",
                                minHeight: "80px",
                            }}
                        >
                            {data.description ||
                                "No hay descripción para este equipo"}
                        </Typography>
                    </Box>

                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={imageInputRef}
                        onChange={handleFileChange}
                    />
                </Paper>
            </Box>

            {/* maintenance days info */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: "50px" }}>
                <MaintenanceStatusBox maintenanceDate={data.maintenanceDate} />
            </Box>

            <Divider sx={{ mb: "20px", mt: "50px" }}>
                Archivos de este equipo.
            </Divider>
            <Typography sx={{ fontWeight: "bold" }}>
                total de archivos: {uploadedFiles.length}
            </Typography>
            <Box sx={{ mb: "20px" }}>
                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                    {uploadedFiles.map((file) => (
                        <FileCard
                            key={file.equipmentMediaId}
                            file={file}
                            onDelete={deleteFile}
                        />
                    ))}
                </Box>

                {/* input oculto */}
                <input
                    type="file"
                    multiple
                    ref={filesInputRef}
                    style={{ display: "none" }}
                    onChange={handleFilesChange}
                />

                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => filesInputRef.current.click()}
                    >
                        Seleccionar archivos
                    </Button>

                    <Button
                        sx={{ ml: 2 }}
                        variant="contained"
                        onClick={uploadFiles}
                        disabled={files.length === 0}
                    >
                        Subir archivos
                    </Button>
                    {files.length > 0 && (
                        <Typography sx={{ fontWeight: "bold" }}>
                            {files.length} archivo(s) seleccionado(s)
                        </Typography>
                    )}
                </Box>
            </Box>

            <Divider sx={{ mb: "20px", mt: "50px" }}>
                Historial de prestamos y mantenimientos
            </Divider>

            <Box
                sx={{
                    mt: 2,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
                    mb: "100px",
                }}
            >
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                        borderRadius: 2,
                        p: "20px",
                        gap: "15px",
                        bgcolor: "background.default",
                        minHeight: "200px",
                    }}
                >
                    {dataLoan.length <= 0 && (
                        <Typography>
                            Este equipo no tiene prestamos ni usos registrados
                        </Typography>
                    )}
                    {dataLoan.map((data) => {
                        return (
                            <CardLoadEquipmentInfo
                                deletedItem={(id) => deletedLoan(id)}
                                key={data.equipmentLoanId}
                                data={data}
                            />
                        );
                    })}
                </Box>

                <Box
                    sx={{
                        borderRadius: 2,
                        p: "20px",
                        bgcolor: "background.default",
                        minHeight: "200px",
                    }}
                >
                    {dataMaintenance.length <= 0 && (
                        <Typography>
                            Este equipo no tiene prestamos ni usos registrados
                        </Typography>
                    )}

                    <ListMaintanence data={dataMaintenance} />
                </Box>
            </Box>
        </Box>
    );
};

export default EquipmentInfo;
