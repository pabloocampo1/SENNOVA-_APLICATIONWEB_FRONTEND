import { ArrowBackOutlined, Assignment, BackHand, Construction, Download, FileCopy, FileOpen, HandymanOutlined, RepartitionOutlined } from '@mui/icons-material';
import { Backdrop, Box, Button, Card, CardContent, Divider, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../service/axiosService';
import CardLoadEquipmentInfo from './CardLoadEquipmentInfo';
import ListMaintanence from './ListMaintanence';

const InfoRow = ({ label, value }) => (
    <Box sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
        <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
        <Typography sx={{ color: "text.secondary" }}>{value || "—"}</Typography>
    </Box>
);

const EquipmentInfo = () => {
    const { internalCode } = useParams();
    const navigate = useNavigate()
    const [data, setData] = useState({});


    const fetchData = async () => {
        try {
            const res = await api.get(`/equipment/get-all-by-internal-code/${internalCode}`);

            if (res.status == 200) {
                setData(res.data[0])
            }
        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Box>


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
            <Divider sx={{ mb: "20px" }}>Informacion</Divider>


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
                    }}
                >
                    <img src="" alt="imagen del equipo." />
                    <InfoRow label="Numero de serie" value={data.serialNumber} />
                </Box>
            </Box>

            <Box sx={{ mt: "20px", mb: "20px" }}>
                <Typography variant="h2" component={"h2"}>Archivos relacionados</Typography>
                <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100px", height: "70px", alignItems: "center" }}>
                    <FileOpen />
                    <Typography>name.docs</Typography>
                </Box>
            </Box>


            <Typography variant="h2" component={"h2"}>Historial de prestamos y mantenimientos</Typography>
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