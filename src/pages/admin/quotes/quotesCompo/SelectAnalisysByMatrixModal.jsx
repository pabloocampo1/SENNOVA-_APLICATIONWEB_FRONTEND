import { Science } from "@mui/icons-material";
import {
    Box,
    Button,
    Checkbox,
    TextField,
    Typography,
    useTheme,
    Paper,
    Fade,
    Alert,
    CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../../service/axiosService";

const SelectAnalisysByMatrixModal = ({
    onClose,
    matrixId,
    saveAnalysis,
    matrixName,
}) => {
    const theme = useTheme();

    // --- ESTADOS ---
    const [listAnalisysSelected, setListAnalisysSelected] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchProducts = async () => {
        setLoading(true);
        try {
            // Asumiendo que esta es tu ruta del back
            const res = await api.get(`/analysis/all-by-matrix/${matrixId}`);
            setProducts(res.data);
        } catch (error) {
            console.error("Error fetching analysis:", error);
            setErrorMessage(
                "No se pudieron cargar los análisis para esta matriz.",
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (matrixId) fetchProducts();
    }, [matrixId]);

    // --- LÓGICA DE SELECCIÓN ---

    // Simplificado: buscamos directamente por analysisId en la raíz del objeto
    const isSelected = (id) =>
        listAnalisysSelected.some((item) => item.analysisId === id);

    const toggleProduct = (product) => {
        if (isSelected(product.analysisId)) {
            setListAnalisysSelected((prev) =>
                prev.filter((p) => p.analysisId !== product.analysisId),
            );
        } else {
            // Guardamos el objeto plano + la cantidad inicial
            setListAnalisysSelected((prev) => [
                ...prev,
                { ...product, quantity: 1 },
            ]);
        }
    };

    const handleQuantityChange = (value, analysisId) => {
        const val = Math.max(1, Number(value)); // Evita negativos o cero
        setListAnalisysSelected((prev) =>
            prev.map((item) =>
                item.analysisId === analysisId
                    ? { ...item, quantity: val }
                    : item,
            ),
        );
    };

    const handleSubmit = () => {
        if (listAnalisysSelected.length === 0) {
            setErrorMessage("Selecciona al menos un análisis.");
            return;
        }
        // Enviamos la lista limpia al componente padre
        saveAnalysis(listAnalisysSelected);
    };

    return (
        <Box
            sx={{
                width: { xs: "340px", sm: "480px" },
                maxHeight: "85vh",
                display: "flex",
                flexDirection: "column",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    p: 3,
                    borderBottom: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Typography variant="h6" fontWeight={600}>
                    Seleccionar Análisis
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Matrix ID: <b>{matrixId}</b>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                    Matrix NAME: <b>{matrixName}</b>
                </Typography>
            </Box>

            {/* Content */}
            <Box
                sx={{
                    flex: 1,
                    overflowY: "auto",
                    px: 3,
                    py: 2,
                    minHeight: "200px",
                }}
            >
                {loading ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            mt: 4,
                        }}
                    >
                        <CircularProgress size={40} />
                    </Box>
                ) : products.length === 0 ? (
                    <Typography
                        align="center"
                        sx={{ mt: 4 }}
                        color="text.secondary"
                    >
                        No hay análisis disponibles.
                    </Typography>
                ) : (
                    products.map((product) => {
                        const selected = isSelected(product.analysisId);
                        const currentItem = listAnalisysSelected.find(
                            (i) => i.analysisId === product.analysisId,
                        );

                        return (
                            <Fade in key={product.analysisId}>
                                <Paper
                                    onClick={() => toggleProduct(product)}
                                    sx={{
                                        mb: 2,
                                        p: 2,
                                        cursor: "pointer",
                                        borderRadius: "12px",
                                        transition: "all 0.2s ease",
                                        border: `2px solid ${selected ? theme.palette.primary.main : theme.palette.divider}`,
                                        backgroundColor: selected
                                            ? theme.palette.action.hover
                                            : "background.paper",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                            }}
                                        >
                                            <Science
                                                color={
                                                    selected
                                                        ? "primary"
                                                        : "disabled"
                                                }
                                            />
                                            <Box>
                                                <Typography
                                                    variant="subtitle2"
                                                    fontWeight={600}
                                                >
                                                    {product.analysisName}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    {product.method} |{" "}
                                                    {product.units}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        <Checkbox
                                            checked={selected}
                                            color="primary"
                                        />
                                    </Box>

                                    {selected && (
                                        <Box
                                            sx={{
                                                mt: 2,
                                                pt: 2,
                                                borderTop: `1px solid ${theme.palette.divider}`,
                                            }}
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            <TextField
                                                type="number"
                                                label="Cantidad de muestras"
                                                size="small"
                                                fullWidth
                                                value={
                                                    currentItem?.quantity || 1
                                                }
                                                onChange={(e) =>
                                                    handleQuantityChange(
                                                        e.target.value,
                                                        product.analysisId,
                                                    )
                                                }
                                                inputProps={{ min: 1 }}
                                            />
                                        </Box>
                                    )}
                                </Paper>
                            </Fade>
                        );
                    })
                )}
            </Box>

            {/* Error & Footer */}
            {errorMessage && (
                <Alert severity="error" variant="filled" sx={{ mx: 3, mb: 1 }}>
                    {errorMessage}
                </Alert>
            )}

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    p: 3,
                    borderTop: `1px solid ${theme.palette.divider}`,
                }}
            >
                <Button variant="outlined" fullWidth onClick={onClose}>
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    fullWidth
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    Guardar
                </Button>
            </Box>
        </Box>
    );
};

export default SelectAnalisysByMatrixModal;
