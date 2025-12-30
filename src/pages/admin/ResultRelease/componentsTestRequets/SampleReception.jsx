import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import notImage from "../../../../assets/images/notImageAvailable.jpg";

/*
COMPONENT : INFORMATION OF RECEPCION OF THE ONE SAMPLE

this component only show reception information
*/

const SampleReception = ({ data }) => {
    const theme = useTheme();

    const EMPTY_MESSAGE = "Campo vacío";

    const checkValue = (value) => (value ? value : EMPTY_MESSAGE);

    if (!data) {
        return (
            <Box sx={{ p: "20px", textAlign: "center" }}>
                <Typography variant="h6" color="error">
                    No se han cargado los datos de recepción.
                </Typography>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                mt: "20px",
            }}
        >
            <Box
                sx={{
                    mt: "40px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}
            >
                <Typography variant="body1" sx={{ color: "primary.main" }}>
                    Informacion de recepcion de la muestra
                </Typography>
                <Typography variant="body2">{data.matrix}</Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <TableContainer
                    component={Paper}
                    sx={{
                        maxWidth: 900,
                        margin: "20px auto",
                        border: `1px solid ${theme.palette.border.primary}`,
                        borderRadius: "20px",
                    }}
                >
                    <Table aria-label="explanatory notes table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                        width: 60,
                                        textAlign: "center",
                                    }}
                                >
                                    #
                                </TableCell>
                                <TableCell
                                    sx={{
                                        fontWeight: "bold",
                                    }}
                                >
                                    Description
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            <TableRow
                                sx={{
                                    bgcolor: "background.default",
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    sx={{
                                        verticalAlign: "top",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Identificacion de la muestra
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "normal" }}>
                                    {checkValue(data.identificationSample)}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    bgcolor: "background.paper",
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    sx={{
                                        verticalAlign: "top",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Fecha de ingreso muestra
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "normal" }}>
                                    {checkValue(data.sampleEntryDate)}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    bgcolor: "background.default",
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    sx={{
                                        verticalAlign: "top",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Fecha de recepción
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "normal" }}>
                                    {checkValue(data.sampleReceptionDate)}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    bgcolor: "background.paper",
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    sx={{
                                        verticalAlign: "top",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Peso bruto
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "normal" }}>
                                    {checkValue(data.gross_weight)} {"(g)"}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    bgcolor: "background.default",
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    sx={{
                                        verticalAlign: "top",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Condicion de almacenamiento
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "normal" }}>
                                    {checkValue(data.storageConditions)}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    bgcolor: "background.paper",
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    sx={{
                                        verticalAlign: "top",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Des. empaque
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "normal" }}>
                                    {checkValue(data.packageDescription)}
                                </TableCell>
                            </TableRow>
                            <TableRow
                                sx={{
                                    bgcolor: "background.default",
                                }}
                            >
                                <TableCell
                                    component="th"
                                    scope="row"
                                    align="center"
                                    sx={{
                                        verticalAlign: "top",
                                        fontWeight: "bold",
                                    }}
                                >
                                    Imagen
                                </TableCell>
                                <TableCell sx={{ whiteSpace: "normal" }}>
                                    <img
                                        src={
                                            data.sampleImage
                                                ? data.sampleImage
                                                : notImage
                                        }
                                        alt="imageSampleReception"
                                        width={"200px"}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </Box>
    );
};

export default SampleReception;
