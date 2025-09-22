import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

const ListMaintanence = () => {


    return (
        <Box>
    
                <Table sx={{ width: "100%"}}>
                    <TableHead sx={{ width: "100%" }}>
                        <TableRow sx={{ bgcolor: "background.default", border: "1px solid #00000040", borderRadius: "20px" }}>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Tipo</TableCell>
                            <TableCell>Notas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody sx={{ width: "100%" }}>

                        <TableRow hover>
                            <TableCell>Karen gomez cordoba</TableCell>
                            <TableCell>09/12/2022/</TableCell>
                            <TableCell>Limpieza</TableCell>
                            <TableCell>NO hay notas</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
          
        </Box>
    );
};

export default ListMaintanence;