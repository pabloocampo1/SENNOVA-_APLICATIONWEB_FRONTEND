import { Box } from "@mui/material";
import React from "react";
import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Typography,
} from "@mui/material";

const NOTES = [
    "El cliente se hará responsable de la toma de las muestras entregadas en el laboratorio, teniendo en cuenta que deben llegar previamente identificadas de forma legible, para garantizar la trazabilidad de la información de la muestra.",
    "Las muestras analizadas serán descartadas en un periodo de 15 días hábiles a partir de la entrega del informe de resultados.",
    "El tiempo estimado de entrega de resultados está estimado en 15 días hábiles. Este tiempo puede variar dependiendo de la cantidad de muestras entregadas, el tipo de ensayo y de las solicitudes que se encuentren pendientes por atender. (Cuando se presente novedades con algún análisis se le informará al cliente para realizar entrega de informe parcial).",
    "Para la entrega del informe de resultados es necesario el pago previo del servicio. El SENA por ser entidad del estado no es responsable de IVA, la factura electrónica se generará posterior al pago con el documento equivalente.",
    "El laboratorio cuenta con una política de imparcialidad, en la cual el personal se compromete a no involucrarse en actividades internas ni externas que puedan afectar la confianza en su competencia, juicio o integridad operacional.",
    "El laboratorio cuenta con una política de confidencialidad para protección de la información y los derechos de propiedad de los usuarios.",
    "El laboratorio se abstiene de emitir conceptos técnicos, opiniones o proponer acciones particulares a un proceso o empresa acerca de los resultados obtenidos.",
    "Se realizará el reporte de las incertidumbres disponibles para los ensayos sólo si es requerido.",
];

const ExplanatoryNotesQuotation = () => {
    return (
        <TableContainer
            component={Paper}
            sx={{ maxWidth: 900, margin: "20px auto", boxShadow: 3 }}
        >
            <Typography
                variant="h5"
                component="h2"
                sx={{ padding: 2, fontWeight: "bold" }}
            >
                Notas aclaratorias
            </Typography>
            <Table aria-label="explanatory notes table">
                <TableHead>
                    <TableRow>
                        <TableCell
                            sx={{
                                fontWeight: "bold",
                                width: 50,
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
                    {NOTES.map((note, idx) => (
                        <TableRow
                            key={idx}
                            sx={{
                                bgcolor:
                                    idx % 2 === 0
                                        ? "background.paper"
                                        : "background.default",
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
                                {idx + 1}
                            </TableCell>
                            <TableCell sx={{ whiteSpace: "normal" }}>
                                {note}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ExplanatoryNotesQuotation;
