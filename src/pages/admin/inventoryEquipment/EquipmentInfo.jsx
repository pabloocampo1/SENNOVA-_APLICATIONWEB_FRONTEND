import { ArrowBackOutlined, Assignment, BackHand, Construction, Download, FileCopy, FileOpen, HandymanOutlined, RepartitionOutlined } from '@mui/icons-material';
import { Alert, Backdrop, Box, Button, Card, CardContent, Divider, Snackbar, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../service/axiosService';
import CardLoadEquipmentInfo from './CardLoadEquipmentInfo';
import ListMaintanence from './ListMaintanence';
import notImage from "../../../assets/images/no-image-icon-6.png";
import SimpleBackdrop from '../../../components/SimpleBackDrop';
import FileCard from '../../../components/FileCard';
import GenericModal from '../../../components/modals/GenericModal';
import EquipmentLoadForm from '../../../components/forms/Equipment/EquipmentLoadForm';
import EquipmentMaintanence from '../../../components/forms/Equipment/EquipmentMaintanence';
import LoanEquipmentCompo from './LoanEquipmentCompo';

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
    const [dataLoan, setDataLoan] = useState([]);
    const [dataMaintenance, setDataMaintenance] = useState([]);
    const [imageFile, setImageFile] = useState()
    const imageInputRef = useRef(null);
    const filesInputRef = useRef(null);
    const [isLoanding, setIsLoanding] = useState(false);
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    // modals
    const [openLoadForm, setOpenLoadForm] = useState(false);
    const [openMaintanence, setOpenMaintanence] = useState(false);
    const [responseAlert, setResponseAlert] = useState({
        "status": false,
        "message": ""
    })


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
        console.log("se envio");

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
                setResponseAlert({
                    status: true,
                    message: "Se cambio la imagen exitosamente."
                })
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
                setResponseAlert({
                    status: true,
                    message: "Se guardo los archivos exitosamente."
                })
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
                setResponseAlert({
                    status: true,
                    message: "El archivo fue eliminado exitosamente"
                })

            }
        } catch (error) {
            console.error(error);
        }
    };

    const getLoad = async () => {
        setIsLoanding(true)

        try {
            const res = await api.get(`/loan/equipment/getByEquipmentId/${idEquipment}`)
            console.log(res);
            if (res.status == 200) {
                setDataLoan(res.data)
            }

        } catch (error) {
            console.error(error);

        } finally {
            setIsLoanding(false)
        }
    }

    const deletedLoan = (id) => {

        const dataUpdated = dataLoan.filter(loan => loan.equipmentLoanId !== id)
        setDataLoan(dataUpdated)
        setResponseAlert({
            status: true,
            message: "El registro se elimino exitosamente."
        })
    }




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

    const getMaintenance = async () => {
        setIsLoanding(true)
        try {
            const res = await api.get(`/maintenance/equipment/getAllByEquipmentId/${idEquipment}`);
            setDataMaintenance(res.data);
        } catch (error) {
            console.error(error);

        } finally {
            setIsLoanding(false)
        }
    }

    const handleLoadSend = () => {
        getLoad();
        setOpenLoadForm(false);
        setResponseAlert({
            status: true,
            message: "El registro se guardó correctamente."
        });
    };

    const handleMaintanenceSend = () => {
        getMaintenance();
        setOpenMaintanence(false);
        setResponseAlert({
            status: true,
            message: "El mantenimiento se registró exitosamente."
        });
    };



    useEffect(() => {
        const init = async () => {
            await fetchData();
            await getFiles();
            await getLoad();
            await getMaintenance();
        }
        init();

    }, [])

    return (
        <Box sx={{pt:"50px"}}>

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
                            "status": false
                        });
                        setResponseAlert({
                            "status": false,
                            "message": ""
                        })
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        severity="success"
                        onClose={() => setResponseAlert({
                            "status": false,
                            "message": ""
                        })}
                        sx={{ width: "100%" }}
                    >
                        {responseAlert.message}
                    </Alert>
                </Snackbar>
            )}


            {/** Header of the info page */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Box sx={{ width: "100px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "15px", border: "1px solid green" }}
                    onClick={() => navigate("/system/inventory/equipments")}>
                    <ArrowBackOutlined sx={{ color: "primary.main" }} /> <Typography sx={{ color: "primary.main" }}> Volver</Typography>
                </Box>


                <Box>
                    <Button variant='outlined' sx={{ width: "auto", p: "20px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center"}}
                        onClick={() => alert("esta funcion esta en desarrollo")}>
                        <Download />  <Typography sx={{  pl: "10px" }}>Descargar informacion de este equipo</Typography>
                    </Button>
                </Box>
            </Box>


            <Box sx={{ display: "flex", justifyContent: "space-between", mt: "40px" }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant='h2' component={"h2"}>Informacion sobre /  </Typography>
                    <Typography variant='h2' component={"h2"} sx={{ color: "text.primary", pl: "5px", opacity: "0.60" }}> {data.equipmentName}</Typography>

                </Box>
                <Box>
                    <Button sx={{  mr: "15px" }} variant='contained' onClick={() => setOpenMaintanence(true)}> <Construction /> Registrar mantenimiento</Button>
                    <Button sx={{ color: "primary.main" }} variant='outlined' onClick={() => setOpenLoadForm(true)}><Assignment /> Registrar prestamo</Button>
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
                        ref={imageInputRef}
                        onChange={handleFileChange}
                    />

                    <Button
                        onClick={() => imageInputRef.current.click()}
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
                    {dataLoan.length <= 0 && (<Typography>Este equipo no tiene prestamos ni usos registrados</Typography>)}
                    {dataLoan.map((data) => {
                        return <CardLoadEquipmentInfo deletedItem={(id) => deletedLoan(id)} key={data.equipmentLoanId} data={data} />
                    })}


                </Box>

                <Box
                    sx={{
                        borderRadius: 2,
                        p: "20px",

                        bgcolor: "background.default",
                        minHeight: "200px"
                    }}
                >
                    {dataMaintenance.length <= 0 && (<Typography>Este equipo no tiene prestamos ni usos registrados</Typography>)}

                    <ListMaintanence data={dataMaintenance} />

                </Box>
            </Box>

        </Box >
    );
};

export default EquipmentInfo;