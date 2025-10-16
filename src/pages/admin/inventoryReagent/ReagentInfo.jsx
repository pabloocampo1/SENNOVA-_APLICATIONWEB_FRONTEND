import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../../service/axiosService';
import { Alert, Box, Button, Card, Divider, Paper, Snackbar, Typography } from '@mui/material';
import SimpleBackdrop from '../../../components/SimpleBackDrop';
import ButtonBack from '../../../components/ButtonBack';
import { Download, HandymanOutlined } from '@mui/icons-material';
import notImage from "../../../assets/images/notImageAvailable.jpg";
import notFiles from "../../../assets/images/undraw_files-uploading_qf8u.svg"
import FileCard from '../../../components/FileCard';
import GenericModal from '../../../components/modals/GenericModal';
import ModalUsageReagent from './reagentCompo/ModalUsageReagent';
import CardUsageReagent from './reagentCompo/CardUsageReagent';
import StatusBoxExpirationDate from './reagentCompo/StatusBoxExpirationDate';



const styleSubtitleInfo = {
    fontWeight: "500", opacity: "0.90", backgroundColor: "action.hover", px: 1.2,
    py: 0.3,
    borderRadius: 1,
}




const ReagentInfo = () => {
    const [usagesReagent, setUsagesReagent] = useState([]);
    const { reagentId } = useParams();
    const [dataReagent, setDataReagent] = useState({});
    const [errorFetch, setErrorFetch] = useState({
        status: false,
        message: ""
    })
    const [isLoanding, setIsLoanding] = useState(false);
    const filesInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [openModalUsage, setOpenModalUsage] = useState(false);
    const [responseAlert, setResponseAlert] = useState({
        "status": false,
        "message": ""
    })

    const handleFilesChange = (event) => {
        setFiles(event.target.files);
    };

    const getFiles = async () => {

        setIsLoanding(true)
        try {
            const res = await api.get(`/reagent/get-files/${reagentId}`);
            setUploadedFiles(res.data);
        } catch (error) {
            console.error(error);

        } finally {
            setIsLoanding(false)
        }

    }


    const uploadFiles = async () => {
        if (!files || files.length === 0) return;

        setIsLoanding(true);
        try {
            const formData = new FormData();
            for (let i = 0; i < files.length; i++) {
                formData.append("files", files[i]);
            }

            const res = await api.post(
                `/reagent/upload-files/${reagentId}`,
                formData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            if (res.status === 201) {
                setUploadedFiles((prev) => [
                    ...prev,
                    ...res.data
                ]);
                setFiles([]);
                getFiles()

            }
        } catch (error) {
            console.error("Error subiendo archivos", error);
        } finally {
            setIsLoanding(false);
        }
    };



    const deleteFile = async (id) => {
        try {
            const res = await api.delete(`/reagent/deleteFile/${id}`);
            if (res.data) {
                getFiles()

            }
        } catch (error) {
            console.error(error);
        }
    };


    const getUsages = async () => {
        try {
            const res = await api.get(`/reagent/get-usages/${reagentId}`);
            if (res.status == 200) {
                setUsagesReagent(res.data)
            }

        } catch (error) {
            console.error(error);
        }
    };




    const fetchDataById = async () => {
        setIsLoanding(true)
        try {
            const res = await api.get(`/reagent/getById/${reagentId}`);
            if (res.status == 200) {
                setDataReagent(res.data)
            }



        } catch (error) {
            console.error(error);
            if (error.status !== 200) {
                setErrorFetch({
                    status: true,
                    message: "Ocurrio un error al intentar buscar la infomacion del reactivo con id: " + reagentId
                })
            }
        } finally {
            setIsLoanding(false)
        }
    }

    const handleUsageSaved = async () => {
        await fetchDataById();
        await getFiles();
        await getUsages()
    };

    useEffect(() => {

        const init = async () => {
            await fetchDataById();
            await getFiles()
            await getUsages();
        }

        init()


    }, [])

    return (
        <Box sx={{ width: "100%", mt: "10px" }}>

            {/* show isLoanding */}
            <SimpleBackdrop open={isLoanding} />

            {/* modal to save usages */}
            <GenericModal
                open={openModalUsage}
                onClose={() => setOpenModalUsage(false)}
                compo={
                    <ModalUsageReagent
                        reagentId={reagentId}
                        success={() => {
                            setResponseAlert({
                                message: "Se guardo correctamente, cantidad actualizada.",
                                status: true
                            })
                            handleUsageSaved()
                        }}
                        dateOfExpiration={dataReagent.expirationDate}
                        stock={dataReagent.quantity}
                        unitOfMeasure={dataReagent.unitOfMeasure}
                        onClose={() => {
                            setOpenModalUsage(false)

                        }} />

                }
            />

            {/* show error fetch */}
            {errorFetch.status && (
                <Box>
                    {errorFetch.message}
                </Box>
            )}

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


            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "20px"
            }}>
                <ButtonBack />
                <Box>
                    <Button
                        endIcon={<Download />}
                        onClick={() => alert("en desarrollo.")}
                    >
                        Descargar esta informacion.
                    </Button>
                </Box>
            </Box>


            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mt: "50px"
            }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant='h2' component={"h2"} sx={{ color: "primary.main" }}>Reactivo /  </Typography>
                    <Typography variant='h2' component={"h2"} sx={{ color: "text.primary", pl: "5px", opacity: "0.60" }}> {dataReagent.reagentName}</Typography>

                </Box>

                <Box>
                    <Button onClick={() => setOpenModalUsage(true)} variant='outlined' startIcon={<HandymanOutlined />}>Registrar uso</Button>
                </Box>
            </Box>

            <Divider>Informacion</Divider>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
                mt: "20px"
            }}>

                {/* main information */}
                <Paper elevation={3} sx={{ minHeight: "400px", minWidth: "300px", p: "20px" }}>
                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Nombre : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.reagentName}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Id (sistema): </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.reagentsId}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Placa sena : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.senaInventoryTag}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Lote : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.batch}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Unidades : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.units}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Cantidad disponible : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.quantity} {dataReagent.unitOfMeasure}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Estado de cantidad: </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.state}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Estado del reactivo : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.stateExpiration}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Fecha de vencimiento : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.expirationDate}</Typography>
                    </Box>
                </Paper>

                {/* image and description */}
                <Paper elevation={3} sx={{ minHeight: "400px", minWidth: "300px", p: "20px" }}>

                    <Box sx={{ display: "flex", mb: "30px", justifyContent: "center", width: "100%", }}>
                        <Box sx={{ width: "50%" }}>
                            {dataReagent.imageUrl !== null
                                ? (<img src={dataReagent.imageUrl} width={"100%"} height={"100%"} alt="reagentImage" />)
                                : (<img src={notImage} width={"100%"} height={"100%"} alt="reagentImage" />)}
                        </Box>
                        <Box sx={{ width: "50%", pl: "10px" }}>
                            <Typography sx={{ fontWeight: "500", opacity: "0.90" }}>Descripción : </Typography>
                            <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.reagentName}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Cuentadante : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.responsibleName}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Ubicación : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.locationName}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Uso : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.usageName}</Typography>
                    </Box>

                    <Box sx={{ display: "flex", mb: "10px" }}>
                        <Typography variant="caption" sx={styleSubtitleInfo}>Registrado el : </Typography>
                        <Typography sx={{ opacity: "0.60", pl: "10px" }}>{dataReagent.createAt}</Typography>
                    </Box>

                </Paper>



                <Paper
                    elevation={3}
                    sx={{
                        minHeight: "400px",
                        minWidth: "300px",
                        p: "20px",
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                        Total de archivos: {uploadedFiles.length}
                    </Typography>

                    {/* Imagen si no hay archivos */}
                    {uploadedFiles.length <= 0 && (
                        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flex: 1 }}>
                            <Typography>No hay archivos</Typography>
                            <img
                                src={notFiles}
                                width={"200px"}
                                height={"200px"}
                                alt="reagentImage"
                            />
                        </Box>
                    )}

                    {/* Contenedor scroll solo de archivos */}
                    {uploadedFiles.length > 0 && (
                        <Box
                            sx={{
                                flex: 1,
                                overflowY: "auto",
                                maxHeight: "300px",
                                mb: 2,
                                pr: 1,
                                display: "flex",
                                flexWrap: "wrap",
                                p: "2px",
                                gap: 2,
                                scrollbarWidth: "thin",
                                "&::-webkit-scrollbar": {
                                    width: "6px",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    backgroundColor: "#8884",
                                    borderRadius: "10px",
                                },
                            }}
                        >
                            {uploadedFiles.map((file) => (
                                <FileCard
                                    key={file.equipmentMediaId}
                                    file={file}
                                    onDelete={deleteFile}
                                />
                            ))}
                        </Box>
                    )}

                    {/* Input oculto y botones */}
                    <input
                        type="file"
                        multiple
                        ref={filesInputRef}
                        style={{ display: "none" }}
                        onChange={handleFilesChange}
                    />

                    <Box sx={{ mt: "auto", pt: 2 }}>
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
                            <Typography sx={{ fontWeight: "bold", mt: 1 }}>
                                {files.length} archivo(s) seleccionado(s)
                            </Typography>
                        )}
                    </Box>
                </Paper>



            </Box>

            
            <Box sx={{
                width: "100%",
                mt: "40px"
            }}>
                <StatusBoxExpirationDate date={dataReagent.expirationDate} />
            </Box>


            {usagesReagent.length <= 0 && (
                <>
                    <Box sx={{
                        width: "100%",
                        textAlign: "center",
                        mt: "100px"
                    }}>
                        No hay usos registrados para este reactivo
                    </Box>
                </>
            )}



            <Divider sx={{ pt: "50px" }}>Informacion de usos de este reactivo</Divider>

            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                    gap: 3,
                    mt: 6,
                    mb: 10,
                }}
            >
                {usagesReagent.map((usage) => (
                    <CardUsageReagent usage={usage} dataReagent={dataReagent} />
                ))}
            </Box>


        </Box>
    );
};

export default ReagentInfo;