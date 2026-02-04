import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Switch,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Stack,
} from "@mui/material";
import { Edit, Add, Layers } from "@mui/icons-material";
import api from "../../../service/axiosService";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import ButtonBack from "../../../components/ButtonBack";

const MatrixAdminPage = () => {
    const [matrices, setMatrices] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);

    const [matrixData, setMatrixData] = useState({
        matrixId: null,
        matrixName: "",
        available: true,
    });

    const handleOpenCreate = () => {
        setEditMode(false);
        setMatrixData({ matrixId: null, matrixName: "", available: true });
        setOpenModal(true);
    };

    const handleOpenEdit = (matrix) => {
        setEditMode(true);
        setMatrixData(matrix);
        setOpenModal(true);
    };

    const handleSave = async () => {
        try {
            if (editMode) {
                await api.post("/analysis/matrix", matrixData);
            } else {
                await api.post("/analysis/matrix", matrixData);
            }
            setOpenModal(false);
            getData();
        } catch (error) {
            console.error("Error al guardar matrix", error);
        }
    };

    const handleToggleAvailable = async (matrix) => {
        const updatedMatrix = { ...matrix, available: !matrix.available };
        try {
            await api.post(`analysis	/matrix`, updatedMatrix);

            setMatrices(
                matrices.map((m) =>
                    m.matrixId === matrix.matrixId ? updatedMatrix : m,
                ),
            );
        } catch (error) {
            console.error("Error al cambiar estado", error);
        }
    };

    const getData = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/analysis/matrix/get-all`);
            console.log(res);

            setMatrices(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box sx={{ p: 4 }}>
            <SimpleBackdrop open={loading} />
            <ButtonBack />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={3}
                mt={3}
            >
                <Typography
                    variant="h4"
                    fontWeight="bold"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                    <Layers color="primary" fontSize="large" /> Administración
                    de Matrices
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<Add />}
                    onClick={handleOpenCreate}
                >
                    Nueva Matriz
                </Button>
            </Stack>

            <TableContainer
                component={Paper}
                elevation={3}
                sx={{ borderRadius: 3 }}
            >
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <strong>ID</strong>
                            </TableCell>
                            <TableCell>
                                <strong>Nombre de la Matriz</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Estado (Disponible)</strong>
                            </TableCell>
                            <TableCell align="right">
                                <strong>Acciones</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {matrices.map((matrix) => (
                            <TableRow key={matrix.matrixId} hover>
                                <TableCell>#{matrix.matrixId}</TableCell>
                                <TableCell>{matrix.matrixName}</TableCell>
                                <TableCell align="center">
                                    <Switch
                                        checked={matrix.available}
                                        onChange={() =>
                                            handleToggleAvailable(matrix)
                                        }
                                        color="success"
                                    />
                                </TableCell>
                                <TableCell align="right">
                                    <IconButton
                                        color="primary"
                                        onClick={() => handleOpenEdit(matrix)}
                                    >
                                        <Edit />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                fullWidth
                maxWidth="xs"
            >
                <DialogTitle fontWeight="bold">
                    {editMode ? "Editar Matriz" : "Agregar Nueva Matriz"}
                </DialogTitle>
                <DialogContent dividers>
                    <Stack spacing={3} sx={{ mt: 1 }}>
                        <TextField
                            label="Nombre de la Matriz"
                            fullWidth
                            value={matrixData.matrixName}
                            onChange={(e) =>
                                setMatrixData({
                                    ...matrixData,
                                    matrixName: e.target.value,
                                })
                            }
                            placeholder="Ej: Agua Residual, Suelo Agrícola..."
                        />
                        <Stack
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Typography>
                                ¿Está disponible actualmente?
                            </Typography>
                            <Switch
                                checked={matrixData.available}
                                onChange={(e) =>
                                    setMatrixData({
                                        ...matrixData,
                                        available: e.target.checked,
                                    })
                                }
                            />
                        </Stack>
                    </Stack>
                </DialogContent>
                <DialogActions sx={{ p: 2 }}>
                    <Button onClick={() => setOpenModal(false)} color="inherit">
                        Cancelar
                    </Button>
                    <Button
                        variant="contained"
                        onClick={handleSave}
                        disabled={!matrixData.matrixName.trim()}
                    >
                        {editMode ? "Guardar Cambios" : "Crear Matriz"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MatrixAdminPage;
