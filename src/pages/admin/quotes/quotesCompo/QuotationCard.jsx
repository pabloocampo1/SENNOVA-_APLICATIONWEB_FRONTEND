import {
    CancelOutlined,
    CheckCircleOutline,
    Error,
    HourglassBottomOutlined,
    ReadMore,
    WatchOutlined,
} from "@mui/icons-material";
import {
    Box,
    Button,
    Paper,
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
import React from "react";

const QuotationCard = ({ data = {}, openInfo, setQuotateSelected }) => {
    const theme = useTheme();

    const asignedStateColorBorder = (state) => {
        switch (state) {
            case "PENDIENTE":
                return "7px solid #FBBF24";

            case "ACEPTADA":
                return "7px solid #22C55E";

            case "RECHAZADA":
                return "7px solid #EF4444";

            default:
                break;
        }
    };

    const formatCurrency = (value) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 2,
        }).format(value);

    const asignedStyleState = (state) => {
        switch (state) {
            case "PENDIENTE":
                return {
                    bgcolor: "#FBBF2420",
                    color: "#FBBF24",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "5px",
                };

            case "ACEPTADA":
                return {
                    bgcolor: "#22C55E20",
                    color: "#22C55E",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "5px",
                };

            case "RECHAZADA":
                return {
                    bgcolor: "#EF444420",
                    color: "#EF4444",
                    borderRadius: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    p: "5px",
                };
            default:
                break;
        }
    };
    const asignedIcon = (state) => {
        switch (state) {
            case "PENDIENTE":
                return <HourglassBottomOutlined />;

            case "ACEPTADA":
                return <CheckCircleOutline />;

            case "RECHAZADA":
                return <CancelOutlined />;
            default:
                break;
        }
    };

    return (
        <Tooltip title={`Ensayo : ` + data.requestCode}>
            <Box
                onClick={() => {
                    setQuotateSelected(data);
                    openInfo();
                }}
                key={data.testRequestId}
                sx={{
                    minHeight: "auto",
                    bgcolor: "background.default",
                    border: `1px solid ${theme.palette.border.primary}`,
                    borderRadius: "20px",
                    p: "10px",
                    borderLeft: asignedStateColorBorder(data.state),
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <Typography sx={{ fontWeight: "bold" }}>
                        COTIZACION - {data.state}
                    </Typography>

                    <Typography sx={asignedStyleState(data.state)}>
                        {asignedIcon(data.state)}
                    </Typography>
                </Box>
                <Typography>cliente - {data.customer.customerName}</Typography>

                <Box
                    sx={{
                        mt: "20px",
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-around",
                        alignItems: "center",
                    }}
                >
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: "500" }}>
                            Precio total estimado
                        </Typography>
                        <Typography variant="body2">
                            {formatCurrency(data.price)}
                        </Typography>
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ fontWeight: "500" }}>
                            fecha
                        </Typography>
                        <Typography variant="body2">{data.createAt}</Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        mt: "40px",
                        mb: "30px",
                    }}
                >
                    <Typography sx={{ textAlign: "center" }}>
                        Muestras
                    </Typography>
                    <TableContainer
                        component={Paper}
                        sx={{
                            width: "100%",
                            mt: "20px",
                            overflowX: "auto",
                            overflowY: "auto",
                            maxHeight: 250,
                            borderRadius: "12px",
                            boxShadow: "0 4px 10px rgba(0,0,0,0.05)",

                            "&::-webkit-scrollbar": {
                                height: "8px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#bfbfbf",
                                borderRadius: "2px",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#9a9a9a",
                            },
                        }}
                    >
                        <Table
                            stickyHeader
                            sx={{
                                width: "100%",
                            }}
                            aria-label="tabla de equipos"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell
                                        sx={{
                                            fontWeight: "700",
                                            textAlign: "center",
                                        }}
                                    >
                                        Matrix
                                    </TableCell>
                                    <TableCell
                                        sx={{
                                            fontWeight: "700",
                                            textAlign: "center",
                                        }}
                                    >
                                        Analisis
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {data.samples.map((sample) => (
                                    <TableRow key={sample.sampleId} hover>
                                        <TableCell
                                            sx={{
                                                opacity: "0.70",
                                                textAlign: "center",
                                            }}
                                        >
                                            {sample.matrix}
                                        </TableCell>
                                        <TableCell
                                            sx={{
                                                opacity: "0.70",
                                                textAlign: "center",
                                            }}
                                        >
                                            {sample.totalAnalysis}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
        </Tooltip>
    );
};

export default QuotationCard;
