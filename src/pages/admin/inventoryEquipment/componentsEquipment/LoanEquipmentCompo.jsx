import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CardLoadEquipmentInfo from './CardLoadEquipmentInfo';
import api from '../../../../service/axiosService';
import SimpleBackdrop from '../../../../components/SimpleBackDrop';

const LoanEquipmentCompo = ({ idEquipment }) => {
    const [dataLoan, setDataLoan] = useState([]);
    const [isLoanding, setIsLoanding] = useState(false);

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



    useEffect(() => {
        getLoad()
        console.log(dataLoan);

    }, [])


    return (
        <>
           
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
                {isLoanding && ( <SimpleBackdrop open={isLoanding} />)}
               {dataLoan.map((data) => {
                return  <CardLoadEquipmentInfo key={data.equipmentLoanId} data={data} />
               })}
               

            </Box>
        </>
    );
};

export default LoanEquipmentCompo;