import {
    Box,
    Button,
    Checkbox,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    useTheme,
} from "@mui/material";
import SimpleBackdrop from "../../../../../components/SimpleBackDrop";
import { PictureAsPdf, Visibility } from "@mui/icons-material";

const getLenght = (analisys = []) => {
    return analisys.length;
};

const SamplesExpired = ({
    styleBackgroundColorByRestDays,
    handleDataSelected,
    dataSelected,
    getDays,
    getPriority,
    setSampleSelected,
    setOpen,
    data,
}) => {
    const theme = useTheme();

    const countAnalysisCompleteBySample = (analysis = []) => {
        return analysis.reduce((c, a) => c + a.stateResult, 0);
    };

    return (
        <Box>
            <Typography variant="h6">Muestras vencidas</Typography>
            <Typography
                sx={{
                    textAlign: "center",
                    mb: "20px",
                    color: "primary.main",
                }}
            >
                {data.length <= 0 &&
                    "No hay muestras vencidas disponibles para mostrar"}
            </Typography>

            <TableContainer>
                <Table
                    sx={{
                        border: `1px solid ${theme.palette.border.primary}`,
                    }}
                >
                    <TableHead
                        sx={{
                            borderRadius: "20px",
                            bgcolor: "background.default",
                        }}
                    >
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Muestra {"(Matrix)"}</TableCell>
                            <TableCell>Codigo {"(muestra)"}</TableCell>
                            <TableCell>Total de analisis</TableCell>
                            <TableCell>PDF</TableCell>
                            <TableCell>Dias restantes</TableCell>
                            <TableCell>Prioridad</TableCell>
                            <TableCell>Ver</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((sample, index) => {
                            return (
                                <TableRow
                                    key={index}
                                    sx={{
                                        width: "100%",
                                        height: "50px",
                                        borderBottom: "1px solid blue",
                                        borderLeft: `10px solid ${styleBackgroundColorByRestDays(
                                            sample.dueDate
                                        )}`,
                                        bgcolor: ` ${styleBackgroundColorByRestDays(
                                            sample.dueDate
                                        )}10`,
                                    }}
                                >
                                    <TableCell>
                                        <Checkbox
                                            label="Seleccionar"
                                            checked={dataSelected.includes(
                                                sample.sampleId
                                            )}
                                            onChange={(e) =>
                                                handleDataSelected(
                                                    sample.sampleId,
                                                    e.target.checked
                                                )
                                            }
                                            // onClick={() =>
                                            //     handleDataSelected(
                                            //         sample.sampleId
                                            //     )
                                            // }
                                        />
                                    </TableCell>
                                    <TableCell>{sample.matrix}</TableCell>
                                    <TableCell> {sample.sampleCode}</TableCell>

                                    <TableCell>
                                        {countAnalysisCompleteBySample(
                                            sample.analysisEntities
                                        )}{" "}
                                        / {getLenght(sample.analysisEntities)}
                                    </TableCell>
                                    <TableCell>
                                        <PictureAsPdf
                                            onClick={() =>
                                                alert(
                                                    "funcionalidad en progreso"
                                                )
                                            }
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {getDays(sample.dueDate)} dias
                                    </TableCell>
                                    <TableCell>
                                        {getPriority(sample.dueDate)}
                                    </TableCell>

                                    <TableCell
                                        onClick={() => {
                                            setOpen(true),
                                                setSampleSelected(sample);
                                        }}
                                        sx={{
                                            cursor: "pointer",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Visibility />
                                            <Typography
                                                sx={{
                                                    textAlign: "center",
                                                }}
                                            >
                                                resultados
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default SamplesExpired;
