import { Add, Remove, Science } from "@mui/icons-material";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    Paper,
    Divider,
    IconButton,
    Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../../service/axiosService";
import GenericModal from "../../../../components/modals/GenericModal";
import SelectAnalisysByMatrixModal from "./SelectAnalisysByMatrixModal";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";

const SelectAnalisysCompo = ({ saveSample }) => {
    const [matrices, setMatrices] = useState([]);
    const [analisysSelectedList, setAnalisysSelectedList] = useState([]);
    const [sampleData, setSampleData] = useState({
        matrixId: "",
        matrixName: "",
        analysis: [],
        description: "",
    });
    const [error, setError] = useState("");
    const [openModalAnalisys, setOpenModalAnalisys] = useState(false);
    const [loading, setLoading] = useState(false);

    const fetchMatrices = async () => {
        setLoading(true);
        try {
            const res = await api.get("/analysis/matrix/get-all/available");
            setMatrices(res.data);
        } catch (error) {
            console.error("Error fetching matrices:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMatrices();
    }, []);

    const handleMatrixChange = (e) => {
        const newMatrixId = e.target.value;
        const selectedMatrix = matrices.find((m) => m.matrixId == newMatrixId);

        setSampleData({
            ...sampleData,
            matrixName: selectedMatrix.matrixName,
            matrixId: newMatrixId,
            analysis: [],
        });
        setAnalisysSelectedList([]);
        setError("");
    };

    const handleDescriptionChange = (e) => {
        setSampleData({ ...sampleData, description: e.target.value });
    };

    const deleteAnalysis = (analysisId) => {
        const filtered = analisysSelectedList.filter(
            (item) => item.analysisId !== analysisId,
        );
        setAnalisysSelectedList(filtered);
        setSampleData({ ...sampleData, analysis: filtered });
    };

    const saveAnalysisFromModal = (newAnalysisList = []) => {
        let updatedList = [...analisysSelectedList];

        newAnalysisList.forEach((newItem) => {
            const index = updatedList.findIndex(
                (item) => item.analysisId === newItem.analysisId,
            );

            if (index !== -1) {
                updatedList[index].quantity += Number(newItem.quantity);
            } else {
                updatedList.push({
                    ...newItem,
                    quantity: Number(newItem.quantity),
                });
            }
        });

        setAnalisysSelectedList(updatedList);
        setSampleData({ ...sampleData, analysis: updatedList });
        setOpenModalAnalisys(false);
        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (analisysSelectedList.length === 0) {
            setError("Debes agregar al menos un análisis a esta muestra.");
            return;
        }
        saveSample(sampleData);
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: { xs: "100%", md: "500px" }, p: 2 }}
        >
            <SimpleBackdrop open={loading} />
            <GenericModal
                open={openModalAnalisys}
                onClose={() => setOpenModalAnalisys(false)}
                compo={
                    <SelectAnalisysByMatrixModal
                        matrixId={sampleData.matrixId}
                        matrixName={sampleData.matrixName}
                        saveAnalysis={(analysis) =>
                            saveAnalysisFromModal(analysis)
                        }
                        onClose={() => setOpenModalAnalisys(false)}
                    />
                }
            />

            <Typography
                variant="h6"
                textAlign="center"
                gutterBottom
                fontWeight="600"
            >
                Agregar Muestra
            </Typography>
            <Typography
                variant="body2"
                textAlign="center"
                color="text.secondary"
                mb={3}
            >
                Selecciona una matriz, escribe la descripción/detalles de tu
                muestra seleccionada y elije los análisis para la muestra.
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 3, // Un poco más de espacio para respirar
                    mb: 4,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "flex-start", // Alinea los items arriba por si uno es más alto
                }}
            >
                {/* Select de Matriz */}
                <TextField
                    select
                    fullWidth
                    label="Matriz"
                    value={sampleData.matrixId}
                    onChange={handleMatrixChange}
                    required
                    variant="outlined" // O "filled" según tu estilo
                >
                    {matrices.length > 0 ? (
                        matrices.map((m) => (
                            <MenuItem key={m.matrixId} value={m.matrixId}>
                                {m.matrixName}
                            </MenuItem>
                        ))
                    ) : (
                        <MenuItem disabled>
                            No hay matrices disponibles
                        </MenuItem>
                    )}
                </TextField>

                <TextField
                    fullWidth
                    required
                    label="Descripción de la muestra"
                    value={sampleData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Ej: Muestra de agua de pozo profundo..."
                    multiline
                    rows={3}
                    helperText="Proporcione detalles específicos como el estado físico, condiciones de recolección o cualquier observación técnica relevante."
                    FormHelperTextProps={{
                        sx: {
                            fontSize: "0.75rem",
                            color: "#666",
                            lineHeight: "1.2",
                            mt: 1,
                        },
                    }}
                />
            </Box>

            <Button
                fullWidth
                variant="outlined"
                startIcon={<Add />}
                disabled={!sampleData.matrixId}
                onClick={() => setOpenModalAnalisys(true)}
                sx={{ mb: 3 }}
            >
                {!sampleData.matrixId
                    ? "Selecciona una matriz primero"
                    : "Agregar el tipo de análisis para tu muestra"}
            </Button>

            <Paper variant="outlined" sx={{ minHeight: "150px", mb: 2 }}>
                {analisysSelectedList.length === 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            height: "150px",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography color="text.disabled">
                            Sin análisis seleccionados
                        </Typography>
                    </Box>
                ) : (
                    <Box sx={{ p: 1 }}>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                px: 2,
                                py: 1,
                                opacity: 0.7,
                            }}
                        >
                            <Typography variant="caption" sx={{ flex: 1 }}>
                                Acción
                            </Typography>
                            <Typography variant="caption" sx={{ flex: 3 }}>
                                Análisis
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ flex: 1 }}
                                textAlign="right"
                            >
                                Cant.
                            </Typography>
                        </Box>
                        <Divider />
                        {analisysSelectedList.map((item) => (
                            <Box
                                key={item.analysisId}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    py: 1,
                                    px: 1,
                                    borderBottom: "1px solid #eee",
                                }}
                            >
                                <Box sx={{ flex: 1 }}>
                                    <IconButton
                                        size="small"
                                        color="error"
                                        onClick={() =>
                                            deleteAnalysis(item.analysisId)
                                        }
                                    >
                                        <Remove fontSize="small" />
                                    </IconButton>
                                </Box>
                                <Typography variant="body2" sx={{ flex: 3 }}>
                                    {item.analysisName}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ flex: 1 }}
                                    textAlign="right"
                                    fontWeight="bold"
                                >
                                    {item.quantity}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Paper>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ display: "flex", justifyContent: "end" }}>
                <Button type="submit" variant="contained" size="large">
                    Confirmar Muestra
                </Button>
            </Box>
        </Box>
    );
};

export default SelectAnalisysCompo;
