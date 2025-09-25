import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

const ListMaintanence = ({ data = [] }) => {


    return (
        <Box>
    
            <Table sx={{ width: "100%" }}>
                <TableHead sx={{ width: "100%" }}>
                    <TableRow sx={{ bgcolor: "background.default", border: "1px solid #00000040", borderRadius: "20px" }}>
                        <TableCell>Nombre</TableCell>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Tipo</TableCell>
                        <TableCell>Notas</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{ width: "100%" }}>
                    {data.map((maintenance) => {
                        return <TableRow hover key={maintenance.maintenanceEquipmentId}>
                            <TableCell>{maintenance.performedBy}</TableCell>
                            <TableCell>{maintenance.dateMaintenance}</TableCell>
                            <TableCell>{maintenance.maintenanceType}</TableCell>
                            <TableCell>{maintenance.notes}</TableCell>
                        </TableRow>
                    })}



                </TableBody>
            </Table>

        </Box>
    );
};

export default ListMaintanence;