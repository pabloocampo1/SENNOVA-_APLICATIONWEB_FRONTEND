import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { formatMonthYear } from '../../../../Utils/DateUtils';
import api from '../../../../service/axiosService';


const CardsSummaryEquipment = ({ refresh }) => {
    const [data, setData] = useState({});

    const fetchData = async () => {
        try {
            const res = await api.get("/equipment/summaryStatics/card");
            if (res.status == 200) {
                setData(res.data)
                refresh()
            }
        } catch (error) {
            console.error(error);

        }
    }


    useEffect(() => {
        fetchData();
    }, [refresh]);

    if (data == null) {
        return (
            <Box>Cargando informacion....</Box>
        )
    }

    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                mt: "20px"
            }}
        >
            <Box sx={{ border: "1px solid #39A90060", p: 2, height: "110px", borderRadius: "10px", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor: "background.default" }}>
                <Typography sx={{ fontWeight: "300", textAlign: "center" }}>Total de quipos registrados</Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "1.20rem", fontWeight: "bold" }}>{data.countAll}</Typography>
            </Box>
            <Box sx={{ border: "1px solid #39A90060", p: 2, height: "110px", borderRadius: "10px", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor: "background.default" }}>
                <Typography sx={{ fontWeight: "300", textAlign: "center" }}>Equipos para mantenimiento - <span style={{ color: "#7E57C2" }}>{formatMonthYear(new Date())}</span></Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "1.20rem", fontWeight: "bold" }}>{data.countMaintenanceMonth}</Typography>
            </Box>
            <Box sx={{ border: "1px solid #39A90060", p: 2, height: "110px", borderRadius: "10px", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor: "background.default" }}>
                <Typography sx={{ fontWeight: "300", textAlign: "center" }}>Total de equipos - <span style={{ color: "#7E57C2" }}>Activos</span></Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "1.20rem", fontWeight: "bold" }}>{data.countAvailableTrue}</Typography>
            </Box>
            <Box sx={{ border: "1px solid #39A90060", p: 2, height: "110px", borderRadius: "10px", display: "flex", gap: "10px", justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor: "background.default" }}>
                <Typography sx={{ fontWeight: "300", textAlign: "center" }}>Total de equipos - <span style={{ color: "#7E57C2" }}>inactivos</span> </Typography>
                <Typography sx={{ color: "text.secondary", fontSize: "1.20rem", fontWeight: "bold" }}>{data.countAvailableFalse}</Typography>
            </Box>
        </Box>
    );
};

export default CardsSummaryEquipment;