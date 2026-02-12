import {
    Box,
    Button,
    MenuItem,
    Pagination,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../../../service/axiosService";
import { useNavigate } from "react-router-dom";
import SimpleBackdrop from "../../../../../components/SimpleBackDrop";
import { formatDateTime } from "../../../../../Utils/DateUtils";

const SamplesDelivered = () => {
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
            const res = await api.get(`/sample/get-all-delivered?page=${page}`);
            // this requets return one page

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
                text="Cargando muestras entregadas"
            />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <Typography variant="h6" sx={{ mt: "20px" }}>
                        Muestras entregadas
                    </Typography>
                    <Typography>
                        Puedes dar click a las muestras para ver sus respectivos
                        ensayos
                    </Typography>
                    <Typography sx={{ mt: "20px" }}>
                        Total de muestras enviadas:{" "}
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
                            <TableCell>Fecha de envio</TableCell>
                            <TableCell>Emial cliente</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((sample, index) => {
                            return (
                                <Tooltip
                                    title={`Click para ver ensayo de la muestra ${sample.sampleCode} ${sample.matrix}`}
                                >
                                    <TableRow
                                        key={index}
                                        sx={{
                                            ":hover": {
                                                bgcolor: "background.default",
                                                borderLeft: "3px solid green",
                                            },
                                        }}
                                    >
                                        <TableCell>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 500,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: 290,
                                                    color: "text.secondary",
                                                }}
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
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 500,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: 290,
                                                    color: "text.secondary",
                                                }}
                                            >
                                                {formatDateTime(
                                                    sample.deliveryDate,
                                                )}
                                            </Typography>
                                        </TableCell>

                                        <TableCell>
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    fontWeight: 500,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                    maxWidth: 290,
                                                    color: "text.secondary",
                                                }}
                                            >
                                                {sample.customerEmail}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() =>
                                                    navigate(
                                                        `/system/result/test-request/${sample.testRequestId}`,
                                                    )
                                                }
                                            >
                                                Ensayo
                                            </Button>
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

export default SamplesDelivered;
