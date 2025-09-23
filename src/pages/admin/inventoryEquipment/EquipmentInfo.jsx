import { ArrowBackOutlined, Assignment, BackHand, Construction, Download, FileCopy, FileOpen, HandymanOutlined, RepartitionOutlined } from '@mui/icons-material';
import { Backdrop, Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../service/axiosService';
import CardLoadEquipmentInfo from './CardLoadEquipmentInfo';
import ListMaintanence from './ListMaintanence';
import notImage from "../../../assets/images/no-image-icon-6.png";
import SimpleBackdrop from '../../../components/SimpleBackDrop';
import FileCard from '../../../components/FileCard';

const InfoRow = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
        <Typography sx={{ color: "text.secondary" }}>{value || "—"}</Typography>
    </Box>
);

const EquipmentInfo = () => {
    const { idEquipment } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState({});
    const [imageFile, setImageFile] = useState()
    const fileInputRef = useRef(null);
    const [isLoanding, setIsLoanding] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);


    const handleFilesChange = (event) => {
        setFiles(event.target.files);
    };


    const fetchData = async () => {
        setIsLoanding(true)
        try {
            const res = await api.get(`/equipment/get-by-id/${idEquipment}`);

            if (res.status == 200) {
                setData(res.data)
                setImageFile(res.data.imageUrl)
            }
        } catch (error) {
            console.error(error);

        } finally {
            setIsLoanding(false)
        }
    }

    const changeImageOption = async (file) => {
        setIsLoanding(true)
        try {
            const formData = new FormData();
            formData.append("image", file);

            const res = await api.put(`/equipment/change-image/${data.equipmentId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });

            if (res.status === 200) {
                setImageFile(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false)
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
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.status === 200) {
                setUploadedFiles((prev) => [
                    ...prev,
                    ...res.data
                ]);
                setFiles([]);
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
               getFiles()

            }
        } catch (error) {
            console.error(error);
        }
    };



    const getFiles = () => {
        const fetch = async () => {
            setIsLoanding(true)
            try {
                const res = await api.get(`/equipment/getFiles/${idEquipment}`);
                setUploadedFiles(res.data);
            } catch (error) {
                console.error(error);

            } finally {
                setIsLoanding(false)
            }
        }

        fetch()
    }
    useEffect(() => {
        fetchData()
        getFiles()
    }, [])

    return (
        <Box>

            <SimpleBackdrop open={isLoanding} />

            {/** Header of the info page */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ width: "100px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", border: "1px solid green" }}
                    onClick={() => navigate("/system/inventory/equipments")}>
                    <ArrowBackOutlined sx={{ color: "primary.main" }} /> <Typography sx={{ color: "primary.main" }}> Volver</Typography>
                </Box>


                <Box>
                    <Box sx={{ width: "auto", p: "20px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", bgcolor: "primary.main" }}
                        onClick={() => alert("esta funcion esta en desarrollo")}>
                        <Download sx={{ color: "white" }} />  <Typography sx={{ color: "white", pl: "10px" }}>Descargar informacion de este equipo</Typography>
                    </Box>
                </Box>
            </Box>


            <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant='h2' component={"h2"}>Informacion sobre /  </Typography>
                    <Typography variant='h2' component={"h2"} sx={{ color: "text.primary", pl: "5px", opacity: "0.60" }}> {data.equipmentName}</Typography>

                </Box>
                <Box>
                    <Button sx={{ color: "primary.main", mr: "15px" }} variant='outlined'> <Construction /> Registrar mantenimiento</Button>
                    <Button sx={{ color: "primary.main" }} variant='outlined'><Assignment /> Registrar prestamo</Button>
                </Box>
            </Box>
            <Divider sx={{ mb: "20px", mt: "50px" }}>Informacion</Divider>


            {/** cards info */}
            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "40px"
            }}>
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        p: 3,
                        boxShadow: 2,
                        minHeight: 300,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    <InfoRow label="Encargado" value={data.responsibleName} />
                    <Divider />
                    <InfoRow label="Ubicación" value={data.locationName} />
                    <Divider />
                    <InfoRow label="Placa" value={data.serialNumber} />
                    <Divider />
                    <InfoRow label="Estado" value={data.state} />
                    <Divider />
                    <InfoRow label="Costo" value={`$ ${data.equipmentCost}`} />
                    <Divider />
                    <Divider />
                    <InfoRow label="Fecha de adquisición" value={data.acquisitionDate} />
                    <Divider />
                    <InfoRow label="Fecha de mantenimiento" value={data.maintenanceDate} />
                </Box>

                {/**tecnical info */}
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        p: 3,
                        boxShadow: 2,
                        minHeight: 300,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                    }}
                >
                    <InfoRow label="Nombre" value={data.equipmentName} />
                    <Divider />
                    <InfoRow label="Numero de serie" value={data.serialNumber} />
                    <Divider />
                    <InfoRow label="Marca" value={data.brand} />
                    <Divider />
                    <InfoRow label="Modelo" value={data.model} />
                    <Divider />
                    <InfoRow label="Voltaje" value={`${data.voltage}`} />
                    <Divider />
                    <InfoRow label="Amperaje" value={`${data.amperage}`} />
                    <Divider />
                    <InfoRow label="Uso" value={data.usageName} />


                </Box>
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        border: "1px solid",
                        borderColor: "divider",
                        borderRadius: 3,
                        p: 3,
                        boxShadow: 2,
                        minHeight: 300,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                        position: "relative"
                    }}
                >
                    <img src={imageFile ? imageFile : notImage} width={"100%"} alt="imagen del equipo." />
                    <InfoRow label="Numero de serie" value={data.serialNumber} />

                    {/* input oculto */}
                    <input
                        type="file"
                        accept="image/*"
                        style={{ display: "none" }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />

                    <Button
                        onClick={() => fileInputRef.current.click()}
                        sx={{ position: "absolute", bottom: "0%", right: "0", mb: "10px", mr: "10px" }}
                        variant="contained"
                    >
                        Cambiar imagen
                    </Button>
                </Box>
            </Box>

            <Divider sx={{ mb: "20px", mt: "50px" }}>Archivos de este equipo.</Divider>
            <Typography sx={{ fontWeight: "bold" }}>total de archivos: {uploadedFiles.length}</Typography>
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
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFilesChange}
                />


                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="outlined"
                        onClick={() => fileInputRef.current.click()}
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
                </Box>
            </Box>

            <Divider sx={{ mb: "20px", mt: "50px" }}>Historial de prestamos y mantenimientos</Divider>



            <Box
                sx={{
                    mt: 2,
                    mb: 2,
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: 2,
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
                        minHeight: "200px"
                    }}
                >
                    <CardLoadEquipmentInfo />
                    <CardLoadEquipmentInfo />
                    <CardLoadEquipmentInfo />
                    <CardLoadEquipmentInfo />

                </Box>

                <Box
                    sx={{
                        borderRadius: 2,
                        p: "20px",

                        bgcolor: "background.default",
                        minHeight: "200px"
                    }}
                >
                    <ListMaintanence />
                </Box>
            </Box>

        </Box >
    );
};

export default EquipmentInfo;