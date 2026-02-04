import { Add, Remove, Science } from "@mui/icons-material";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    useTheme,
    Paper,
    Divider,
    IconButton,
    Alert,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../../service/axiosService";
import GenericModal from "../../../../components/modals/GenericModal";
import SelectAnalisysByMatrixModal from "./SelectAnalisysByMatrixModal";

const SelectAnalisysCompo = ({ saveSample }) => {
    const theme = useTheme();

    // --- ESTADOS ---
    const [matrices, setMatrices] = useState([]);
    const [analisysSelectedList, setAnalisysSelectedList] = useState([]);
    const [sampleData, setSampleData] = useState({
        matrixId: "",
        matrixName: "", // Guardamos el ID, no el nombre
        analysis: [],
        description: "",
    });
    const [error, setError] = useState("");
    const [openModalAnalisys, setOpenModalAnalisys] = useState(false);

    const fetchMatrices = async () => {
        try {
            const res = await api.get("/analysis/matrix/get-all/available");
            setMatrices(res.data);
        } catch (error) {
            console.error("Error fetching matrices:", error);
        }
    };

    // --- EFECTOS ---
    useEffect(() => {
        fetchMatrices();
    }, []);

    // --- MANEJADORES ---
    const handleMatrixChange = (e) => {
        const newMatrixId = e.target.value;
        const selectedMatrix = matrices.find((m) => m.matrixId == newMatrixId);
        console.log(selectedMatrix);

        // Si cambia la matriz, reseteamos los análisis seleccionados para evitar inconsistencias
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
        console.log(newAnalysisList);

        let updatedList = [...analisysSelectedList];

        newAnalysisList.forEach((newItem) => {
            const index = updatedList.findIndex(
                (item) => item.analysisId === newItem.analysisId,
            );

            if (index !== -1) {
                // Si ya existe, sumamos cantidad
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
            {/* Modal para seleccionar análisis (Enviamos el matrixId) */}
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
                Selecciona una matriz y los análisis correspondientes.
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                    flexDirection: { xs: "column", sm: "row" },
                }}
            >
                <TextField
                    select
                    fullWidth
                    label="Matriz"
                    value={sampleData.matrixId}
                    onChange={handleMatrixChange}
                    required
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
                    label="Descripción"
                    value={sampleData.description}
                    onChange={handleDescriptionChange}
                    placeholder="Ej: Toma en punto A"
                />
            </Box>

            <Button
                fullWidth
                variant="outlined"
                startIcon={<Add />}
                disabled={!sampleData.matrixId} // No abrir si no hay matriz
                onClick={() => setOpenModalAnalisys(true)}
                sx={{ mb: 3 }}
            >
                {!sampleData.matrixId
                    ? "Selecciona una matriz primero"
                    : "Agregar análisis"}
            </Button>

            {/* LISTA DE ANÁLISIS SELECCIONADOS */}
            <Paper
                variant="outlined"
                sx={{ minHeight: "150px", mb: 2, bgcolor: "#fafafa" }}
            >
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
