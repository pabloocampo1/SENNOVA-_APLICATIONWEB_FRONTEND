import React, { useEffect, useState } from 'react';

import EquipmentsByLocationCompo from './componentsEquipment/EquipmentsByLocationCompo';
import { useNavigate } from 'react-router-dom';
import api from '../../../service/axiosService';
import { Button, Typography } from '@mui/material';
import ButtonBack from '../../../components/ButtonBack';

const ReportEquipments = () => {
    const navigate = useNavigate();
    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const res = await api.get("/equipment/get-reported-equipment");
            setData(res.data)

        } catch (error) {
            console.error(error);

        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div>
            <Typography component={"h3"} variant='h3' sx={{textAlign:"center", pt:"20px"}}>Equipos reportados</Typography>
            <ButtonBack />
           
            <EquipmentsByLocationCompo equipments={data} isShowReportEquipment={true} back={() => navigate("/system/inventory/equipments")} />
        </div>
    );
};

export default ReportEquipments;