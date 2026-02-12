import {
    Box,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../../../service/axiosService";
import SimpleBackdrop from "../../../../../components/SimpleBackDrop";

const SamplesWithoutReception = () => {
    const [data, setData] = useState([]);
    const [totalPagesSamplesDelivered, setTotalPagesSamplesDelivered] =
        useState(null);
    const [page, setPage] = useState(0);
    const [totalElements, setTotalElements] = useState(0);
    const [isLoanding, setIsLoanding] = useState(false);

    const theme = useTheme();
    const navigate = useNavigate();

    const handleChange = (event, value) => {
        console.log(value);

        setPage(value - 1);
    };

    const getData = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(
                `/sample/get-all-without-reception?page=${page}`,
            );

            setData(res.data.content);
            setTotalPagesSamplesDelivered(res.data.page.totalPages);
            setTotalElements(res.data.totalElements);
        } catch (error) {
            error;
        } finally {
            setIsLoanding(false);
        }
    };

    useEffect(() => {
        getData();
    }, [page]);

    return (
        <Box>
            <SimpleBackdrop
                open={isLoanding}
                text="Cargando muestras sin recepcion"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h6" sx={{ mt: "20px" }}>
                        Muestras sin recepcion
                    </Typography>
                    <Typography>
                        Puedes dar click a las muestras para digitar la
                        recepcion de muestra
                    </Typography>
                    <Typography sx={{ mt: "20px" }}>
                        Total de muestras :{" "}
                        <span style={{ fontWeight: "bold" }}>
                            {totalElements}
                        </span>
                    </Typography>
                </Box>
            </Box>

            <TableContainer
                sx={{
                    mt: "20px",
                    borderRadius: "20px",
                    border: `1px solid ${theme.palette.border.primary}`,
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                bgcolor: "background.default",
                            }}
                        >
                            <TableCell>Codigo muestra</TableCell>
                            <TableCell>Matrix</TableCell>
                            <TableCell>Codigo de ensayo</TableCell>
                            <TableCell>Estado de la muestra</TableCell>
                            <TableCell>Numero de analisis</TableCell>
                            <TableCell>Cliente</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((sample, index) => {
                            return (
                                <Tooltip
                                    title={`Click para ver registrar recepcion de la muestra ${sample.sampleCode} ${sample.matrix}`}
                                    onClick={() =>
                                        navigate(
                                            `/system/result/test-request/${sample.testRequestId}/recepcion-muestras`,
                                        )
                                    }
                                >
                                    <TableRow
                                        key={index}
                                        sx={{
                                            ":hover": {
                                                bgcolor: "background.default",
                                                borderLeft: "3px solid red",
                                            },
                                        }}
                                    >
                                        <TableCell>
                                            <Typography
                                                sx={{ fontWeight: "bold" }}
                                            >
                                                {sample.sampleCode}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{ opacity: "0.80" }}
                                            >
                                                {sample.matrix}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{ opacity: "0.80" }}
                                            >
                                                {sample.testRequestCode}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{ color: "primary.main" }}
                                            >
                                                {sample.statusReception}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{ opacity: "0.80" }}
                                            >
                                                {sample.totalAnalysis}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {sample.customerName}
                                            </Typography>
                                        </TableCell>
                                    </TableRow>
                                </Tooltip>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    mb: "20px",
                    mt: "20px",
                }}
            >
                <Stack spacing={2}>
                    <Pagination
                        count={totalPagesSamplesDelivered}
                        page={page + 1}
                        onChange={handleChange}
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default SamplesWithoutReception;
