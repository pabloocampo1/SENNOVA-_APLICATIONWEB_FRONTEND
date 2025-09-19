import { Box, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { formatMonthYear } from '../../../Utils/DateUtils';


const CardsSummaryEquipment = () => {

    const fetchData = async () => {

    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <Box
            sx={{
                width: "100%",
                display: "grid",
                gap: 2,
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                mt:"20px"
            }}
        >
            <Box sx={{  border: "1px solid #39A90060", p: 2, height: "110px", borderRadius: "10px", display: "flex",gap:"10px" , justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor:"background.default" }}>
                <Typography sx={{fontWeight:"bold", textAlign:"center"}}>Total de quipos registrados</Typography>
                <Typography sx={{color:"text.secondary"}}>23</Typography>
            </Box>
            <Box sx={{  border: "1px solid #39A90060", p: 2, height: "110px", borderRadius: "10px", display: "flex",gap:"10px" , justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor:"background.default" }}>
                <Typography sx={{fontWeight:"bold", textAlign:"center"}}>Equipos para mantenimiento - {formatMonthYear(new Date())}</Typography>
                <Typography sx={{color:"text.secondary"}}>23</Typography>
            </Box>
            <Box sx={{  border: "1px solid #39A90060", p: 2, height: "110px", borderRadius: "10px", display: "flex",gap:"10px" , justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor:"background.default" }}>
                <Typography sx={{fontWeight:"bold", textAlign:"center"}}>Total de equipos activos</Typography>
                <Typography sx={{color:"text.secondary"}}>23</Typography>
            </Box>
            <Box sx={{  border: "1px solid #39A90060", p: 2, height: "110px", borderRadius: "10px", display: "flex",gap:"10px" , justifyContent: "center", alignItems: "center", flexDirection: "column", bgcolor:"background.default" }}>
                <Typography sx={{fontWeight:"bold", textAlign:"center"}}>Total de equipos inactivos</Typography>
                <Typography sx={{color:"text.secondary"}}>23</Typography>
            </Box>
        </Box>
    );
};

export default CardsSummaryEquipment;