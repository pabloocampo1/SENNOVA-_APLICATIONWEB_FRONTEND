import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Avatar,
    Chip,
    Divider,
    Button,
    Stack,
    Paper,
    IconButton,
    Tooltip,
} from "@mui/material";
import {
    Science,
    Biotech,
    Scale,
    Paid,
    Event,
    Description,
    AddCircle,
    GroupAdd,
    Layers,
    RemoveCircle,
    DeleteForeverOutlined,
} from "@mui/icons-material";
import api from "../../../service/axiosService";
import { useParams } from "react-router-dom";
import ButtonBack from "../../../components/ButtonBack";
import GenericModal from "../../../components/modals/GenericModal";
import AssignModal from "./ComponentsAnalysis/AssignModalAnalysis";
import AssignModalAnalysis from "./ComponentsAnalysis/AssignModalAnalysis";
import SimpleBackdrop from "../../../components/SimpleBackDrop";

const ProductsInfoPage = () => {
    const [data, setData] = useState({});
    const [dataUsers, setDataUsers] = useState([]);
    const [dataMatrix, setDataMatrix] = useState([]);
    const { analysisId } = useParams();
    const [openUserModal, setOpenUserModal] = useState(false);
    const [openMatrixModal, setOpenMatrixModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const getData = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/analysis/${analysisId}`);
            console.log(res);

            setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getDataUsers = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/users/getAllAvailable`);
            console.log(res);

            setDataUsers(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const getDataMatrices = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/analysis/matrix/get-all/available`);
            console.log(res);

            setDataMatrix(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const assignUsers = async (ids = []) => {
        setLoading(true);
        const object = {
            users: ids,
            analysisId: data.analysisId,
        };
        try {
            const res = await api.post(`/analysis/assign/user`, object);

            setData(res.data);
            setOpenUserModal(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const assignMatrix = async (ids = []) => {
        setLoading(true);
        const object = {
            matrices: ids,
            analysisId: data.analysisId,
        };
        try {
            const res = await api.post(`/analysis/assign/matrix`, object);

            setData(res.data);
            setOpenMatrixModal(false);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const removeMatrix = async (id) => {
        setLoading(true);
        try {
            const res = await api.post(
                `/analysis/remove/matrix/${id}/${data.analysisId}`,
            );

            setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };
    const removeUser = async (id) => {
        setLoading(true);
        try {
            const res = await api.post(
                `/analysis/remove/user/${id}/${data.analysisId}`,
            );

            setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const init = async () => {
            await getData();
            await getDataUsers();
            await getDataMatrices();
        };

        init();
    }, []);

    if (!data.analysisId)
        return <Typography>Cargando información...</Typography>;

    return (
        <Box
            sx={{
                p: "20px",
                minHeight: "100vh",
                bgcolor: "background.default",
                borderRadius: "20px",
                margin: "0 auto",
            }}
        >
            <SimpleBackdrop open={loading} />
            <AssignModalAnalysis
                open={openUserModal}
                onClose={() => setOpenUserModal(false)}
                title={"Selecciona usuarios capcitados"}
                options={dataUsers}
                type="user"
                onSave={(selected) => {
                    const ids = selected.map((u) => u.userId);
                    console.log(ids);

                    assignUsers(ids);
                }}
            />
            <AssignModalAnalysis
                open={openMatrixModal}
                onClose={() => setOpenMatrixModal(false)}
                title={"Selecciona las matrices disponibles para este analysis"}
                options={dataMatrix}
                type="matrix"
                onSave={(selected) => {
                    console.log();

                    const ids = selected.map((m) => m.matrixId);
                    console.log(ids);
                    assignMatrix(ids);
                }}
            />

            <ButtonBack />
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={4}
                mt={5}
            >
                <Box>
                    <Typography variant="h4" fontWeight="bold" color="primary">
                        {data.analysisName}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        ID de Análisis: #{data.analysisId}
                    </Typography>
                </Box>
            </Stack>

            <Grid container spacing={3}>
                <Grid item xs={14} md={7}>
                    <Card
                        elevation={3}
                        sx={{ height: "100%", borderRadius: 3 }}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                gutterBottom
                                display="flex"
                                alignItems="center"
                            >
                                <Biotech sx={{ mr: 1 }} /> Información Técnica
                            </Typography>
                            <Divider sx={{ mb: 2 }} />

                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Método
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                    >
                                        {data.method}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Equipo
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                    >
                                        {data.equipment === "null"
                                            ? "No asignado"
                                            : data.equipment}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Unidades
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                    >
                                        {data.units}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="caption"
                                        color="text.secondary"
                                    >
                                        Última Actualización
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        fontWeight="medium"
                                    >
                                        {data.updateAt}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Box sx={{ mt: 3 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                >
                                    Notas del Análisis
                                </Typography>
                                <Paper variant="outlined" sx={{ p: 2, mt: 1 }}>
                                    <Typography variant="body2">
                                        {data.notes ||
                                            "No hay notas adicionales para este análisis."}
                                    </Typography>
                                </Paper>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/*  MATRICES */}
                <Grid item xs={12} md={5}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Typography
                                    variant="h6"
                                    display="flex"
                                    alignItems="center"
                                    sx={{
                                        mr: "100px",
                                    }}
                                >
                                    <Layers sx={{ mr: 1 }} /> Matrices
                                    Aplicables
                                </Typography>
                                <Button
                                    startIcon={<AddCircle />}
                                    size="small"
                                    variant="outlined"
                                    onClick={() => setOpenMatrixModal(true)}
                                >
                                    Agregar
                                </Button>
                            </Stack>
                            <Divider sx={{ mb: 2 }} />
                            <Box
                                sx={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: 1,
                                }}
                            >
                                {data.matrices.map((matrix) => (
                                    <Chip
                                        key={matrix.matrixId}
                                        label={matrix.matrixName}
                                        color="secondary"
                                        variant="outlined"
                                        onDelete={() => {
                                            removeMatrix(matrix.matrixId);
                                        }}
                                    />
                                ))}
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                {/* USERS */}
                <Grid item xs={12}>
                    <Card elevation={3} sx={{ borderRadius: 3 }}>
                        <CardContent>
                            <Stack
                                direction="row"
                                justifyContent="space-between"
                                alignItems="center"
                                mb={2}
                            >
                                <Typography
                                    variant="h6"
                                    display="flex"
                                    alignItems="center"
                                    sx={{
                                        mr: "100px",
                                    }}
                                >
                                    <GroupAdd sx={{ mr: 1 }} /> Personal
                                    Calificado para Ejecución
                                </Typography>
                                <Button
                                    variant="contained"
                                    startIcon={<GroupAdd />}
                                    onClick={() => setOpenUserModal(true)}
                                >
                                    Asignar Personal
                                </Button>
                            </Stack>
                            <Divider sx={{ mb: 3 }} />

                            <Grid container spacing={2}>
                                {data.qualifiedUsers.map((user) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={6}
                                        md={4}
                                        key={user.userId}
                                    >
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                p: 2,
                                                display: "flex",
                                                alignItems: "center",
                                                borderRadius: 2,
                                            }}
                                        >
                                            <Avatar
                                                src={user.imageProfile}
                                                sx={{
                                                    width: 56,
                                                    height: 56,
                                                    mr: 2,
                                                    border: "2px solid #1976d2",
                                                }}
                                            />
                                            <Box>
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight="bold"
                                                >
                                                    {user.name}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="text.secondary"
                                                >
                                                    {user.position}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: "primary.main",
                                                        fontWeight: "bold",
                                                    }}
                                                >
                                                    {user.role}
                                                </Typography>
                                            </Box>
                                            <Tooltip title="Quitar">
                                                <Chip
                                                    key={user.userId}
                                                    color="secondary"
                                                    variant="outlined"
                                                    onDelete={() => {
                                                        removeUser(user.userId);
                                                    }}
                                                />
                                            </Tooltip>
                                        </Paper>
                                    </Grid>
                                ))}
                            </Grid>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ProductsInfoPage;
