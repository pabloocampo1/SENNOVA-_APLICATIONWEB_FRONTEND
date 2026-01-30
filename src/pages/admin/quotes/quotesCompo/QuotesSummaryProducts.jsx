import { Add, Delete, ShoppingCart, Science } from "@mui/icons-material";
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
    Chip,
    Divider,
    Fade,
} from "@mui/material";
import React from "react";
import imageAdd from "../../../../assets/images/add_image.svg";

// this component show all samples with analysis selected by the user

const QuotesSummaryProducts = ({
    samples = [],
    handleOpenModalToSelectAnalisys,
    deleteSample,
}) => {
    const theme = useTheme();

    const formatCurrency = (value) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 0,
        }).format(value);

    const totalGeneral = samples.reduce((accSample, sample) => {
        const totalSample = sample.analysis.reduce((accAnalisis, item) => {
            const price = Number(item.product.price) || 0;
            const qty = Number(item.quantity) || 0;
            return accAnalisis + price * qty;
        }, 0);
        return accSample + totalSample;
    }, 0);

    const totalAnalysis = samples.reduce(
        (acc, sample) => acc + sample.analysis.length,
        0,
    );

    return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: "16px",
                p: 3,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            }}
        >
            {/* Header */}
            <Box sx={{ mb: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 1,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <ShoppingCart color="primary" />
                        <Typography variant="h6" sx={{ fontWeight: "700" }}>
                            Resumen de Cotización
                        </Typography>
                    </Box>
                    {samples.length > 0 && (
                        <Chip
                            label={`${samples.length} ${
                                samples.length === 1 ? "muestra" : "muestras"
                            }`}
                            color="primary"
                            size="small"
                            sx={{ fontWeight: 600 }}
                        />
                    )}
                </Box>
                <Typography variant="body2" color="text.secondary">
                    {samples.length > 0
                        ? `${totalAnalysis} análisis seleccionados`
                        : "Agrega muestras y análisis para tu cotización"}
                </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

            {/* Contenido scrolleable */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    overflowX: "hidden",
                    pr: 1,
                    "&::-webkit-scrollbar": { width: "6px" },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: theme.palette.divider,
                        borderRadius: "8px",
                        "&:hover": {
                            backgroundColor: theme.palette.action.hover,
                        },
                    },
                }}
            >
                {/* Estado vacío */}
                {samples.length <= 0 && (
                    <Fade in timeout={300}>
                        <Box
                            sx={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                py: 4,
                            }}
                        >
                            <Box
                                sx={{
                                    width: "120px",
                                    height: "120px",
                                    borderRadius: "50%",
                                    bgcolor: "action.hover",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 3,
                                }}
                            >
                                <img
                                    width="80px"
                                    src={imageAdd}
                                    alt="image_add"
                                />
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: "600", mb: 1 }}
                            >
                                No hay análisis agregados
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ mb: 3, textAlign: "center", px: 2 }}
                            >
                                Comienza agregando productos y análisis para
                                generar tu cotización
                            </Typography>
                            <Button
                                onClick={() =>
                                    handleOpenModalToSelectAnalisys()
                                }
                                startIcon={<Add />}
                                variant="contained"
                                size="large"
                                sx={{
                                    borderRadius: "10px",
                                    px: 4,
                                    textTransform: "none",
                                    fontWeight: 600,
                                }}
                            >
                                Agregar Análisis
                            </Button>
                        </Box>
                    </Fade>
                )}

                {/* Lista de muestras */}
                {samples.map((sample, index) => (
                    <Fade in timeout={300} key={index}>
                        <Box
                            sx={{
                                width: "100%",
                                bgcolor: "background.default",
                                border: "1px solid",
                                borderColor: "divider",
                                borderRadius: "12px",
                                p: 2,
                                mb: 2,
                                position: "relative",
                                transition: "all 0.3s ease",
                                "&:hover": {
                                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                                    borderColor: "primary.main",
                                },
                            }}
                        >
                            {/* Botón eliminar */}
                            <IconButton
                                onClick={() => deleteSample(index)}
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: 8,
                                    right: 8,
                                    color: "error.main",
                                    bgcolor: "background.paper",
                                    "&:hover": {
                                        bgcolor: "error.light",
                                        color: "error.contrastText",
                                    },
                                }}
                            >
                                <Delete fontSize="small" />
                            </IconButton>

                            {/* Header de la muestra */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    mb: 2,
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 40,
                                        height: 40,
                                        borderRadius: "10px",
                                        bgcolor: "primary.main",
                                        color: "primary.contrastText",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontWeight: "bold",
                                        fontSize: "1.2rem",
                                    }}
                                >
                                    {index + 1}
                                </Box>
                                <Box sx={{ flex: 1 }}>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ fontSize: "0.75rem", mb: 0.5 }}
                                    >
                                        MUESTRA
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {sample.matrix}
                                    </Typography>
                                </Box>
                                <Chip
                                    icon={<Science sx={{ fontSize: "16px" }} />}
                                    label={`${sample.analysis.length} análisis`}
                                    size="small"
                                    variant="outlined"
                                    color="primary"
                                />
                            </Box>

                            {/* Tabla de análisis */}
                            <TableContainer
                                component={Paper}
                                elevation={0}
                                sx={{
                                    width: "100%",
                                    overflowX: "auto",
                                    borderRadius: "10px",
                                    border: "1px solid",
                                    borderColor: "divider",
                                    "&::-webkit-scrollbar": {
                                        height: "6px",
                                    },
                                    "&::-webkit-scrollbar-thumb": {
                                        backgroundColor: theme.palette.divider,
                                        borderRadius: "10px",
                                        "&:hover": {
                                            backgroundColor:
                                                theme.palette.action.hover,
                                        },
                                    },
                                }}
                            >
                                <Table size="small">
                                    <TableHead>
                                        <TableRow
                                            sx={{
                                                bgcolor: "action.hover",
                                            }}
                                        >
                                            <TableCell
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "0.75rem",
                                                    textTransform: "uppercase",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                Análisis
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "0.75rem",
                                                    textTransform: "uppercase",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                Precio
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "0.75rem",
                                                    textTransform: "uppercase",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                Cant.
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    fontWeight: "700",
                                                    fontSize: "0.75rem",
                                                    textTransform: "uppercase",
                                                    color: "text.secondary",
                                                }}
                                            >
                                                Total
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>

                                    <TableBody>
                                        {sample.analysis.map((object) => {
                                            const price =
                                                Number(object.product.price) ||
                                                0;
                                            const qty =
                                                Number(object.quantity) || 0;
                                            const total = price * qty;

                                            return (
                                                <TableRow
                                                    key={
                                                        object.product.productId
                                                    }
                                                    hover
                                                    sx={{
                                                        "&:last-child td": {
                                                            borderBottom: 0,
                                                        },
                                                    }}
                                                >
                                                    <TableCell>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 500,
                                                            }}
                                                        >
                                                            {
                                                                object.product
                                                                    .analysis
                                                            }
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {formatCurrency(
                                                                price,
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Chip
                                                            label={qty}
                                                            size="small"
                                                            sx={{
                                                                minWidth:
                                                                    "32px",
                                                                height: "24px",
                                                                fontSize:
                                                                    "0.75rem",
                                                            }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                fontWeight: 600,
                                                                color: "primary.main",
                                                            }}
                                                        >
                                                            {formatCurrency(
                                                                total,
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}

                                        {/* Total por muestra */}
                                        <TableRow
                                            sx={{
                                                bgcolor: "primary.main",
                                                "&:hover": {
                                                    bgcolor:
                                                        "primary.main !important",
                                                },
                                            }}
                                        >
                                            <TableCell
                                                colSpan={3}
                                                sx={{
                                                    fontWeight: "bold",
                                                    textAlign: "right",
                                                    color: "primary.contrastText",
                                                    borderBottom: 0,
                                                }}
                                            >
                                                Subtotal:
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                sx={{
                                                    fontWeight: "bold",
                                                    fontSize: "1rem",
                                                    color: "primary.contrastText",
                                                    borderBottom: 0,
                                                }}
                                            >
                                                {formatCurrency(
                                                    sample.analysis.reduce(
                                                        (acc, item) =>
                                                            acc +
                                                            item.product.price *
                                                                item.quantity,
                                                        0,
                                                    ),
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Fade>
                ))}
            </Box>

            {/* Footer con total y botón */}
            <Box
                sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: "2px solid",
                    borderColor: "divider",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 2,
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        onClick={() => handleOpenModalToSelectAnalisys()}
                        startIcon={<Add />}
                        variant="outlined"
                        sx={{
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 600,
                            px: 3,
                        }}
                    >
                        Agregar Análisis
                    </Button>

                    <Box
                        sx={{
                            textAlign: "right",
                            bgcolor: "action.hover",
                            px: 3,
                            py: 1.5,
                            borderRadius: "10px",
                            minWidth: "200px",
                        }}
                    >
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                fontWeight: 600,
                                textTransform: "uppercase",
                                display: "block",
                                mb: 0.5,
                            }}
                        >
                            Total General
                        </Typography>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: "bold",
                                color: "primary.main",
                            }}
                        >
                            {formatCurrency(totalGeneral)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default QuotesSummaryProducts;
