import {
    Alert,
    Box,
    Button,
    IconButton,
    Pagination,
    Paper,
    Snackbar,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import api from "../../service/axiosService";
import { Add, Delete, Edit } from "@mui/icons-material";
import GenericModal from "../modals/GenericModal";
import SearchBar from "../SearchBar";
import UsageForm from "../forms/Usage/UsageForm";
import { AuthContext } from "../../context/AuthContext";

const UsageCompo = ({ isMobile }) => {
    const [usageData, setUsageData] = useState([]);
    const [errorFetch, setErrorFetch] = useState(false);
    const [errorDelete, setErrorDelete] = useState({
        status: false,
        usage: "",
        message: "",
    });
    const [success, setSuccess] = useState({
        status: false,
        usage: "",
        message: "",
    });
    const [page, setPage] = useState(0);
    const [createUsagetState, setCreateUsagetState] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [open, setOpen] = useState(false);
    const [errorsCreate, setErrorCreated] = useState([]);
    const [usageToEdit, setUsageToEdit] = useState(null);
    const [search, setSearch] = useState("");
    const { authObject } = useContext(AuthContext);

    const handleChange = (event, value) => {
        setPage(value - 1);
    };

    const fetchData = async () => {
        try {
            const response = await api.get(`/usage/getAllPage?page=${page}`);
            console.log(response);
            console.log("respuesta de la paginacion");

            if (response.status !== 200) {
                setErrorFetch(true);
            } else {
                let totalPagesResponse = response.data.page.totalPages;
                setUsageData(response.data.content);
                setTotalPages(totalPagesResponse);
            }
        } catch (error) {
            console.error(error);

            setErrorFetch(true);
        }
    };

    const deleteUsage = async (id, usageName) => {
        try {
            const response = await api.delete(`/usage/delete/${id}`);
            if (response.status == 200) {
                fetchData();
                setErrorDelete({
                    ...errorDelete,
                    status: false,
                    usage: "",
                });
                setSuccess({
                    ...success,
                    message: "Se Elimino el uso existosamente.",
                    usage: usageName,
                    status: true,
                });
                setOpen(true);
            } else {
                setErrorDelete({
                    ...errorDelete,
                    status: true,
                    usage: usageName,
                    message: " ocurrio un error",
                });
                setOpen(true);
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                const backendError = error.response.data;
                setErrorCreated(backendError.errors);
                setErrorDelete({
                    ...errorDelete,
                    status: true,
                    usage: usageName,
                    message:
                        "No se puede eliminar este elemento porque esta relacionado a otro elemento",
                });
                setOpen(true);
            }
        }
    };

    const saveUsage = async (product) => {
        try {
            const response = await api.post("/usage/save", product);
            console.log(response);
            if (response.status == 201) {
                fetchData();
                setCreateUsagetState(false);
                setSuccess({
                    ...success,
                    message: "Se agreogo el uso exitosamente.",
                    usage: response.data.usageName,
                    status: true,
                });

                setOpen(true);
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                const backendError = error.response.data;
                setErrorCreated(backendError.errors);
            }
        }
    };

    const editUsage = async (product, id) => {
        try {
            const response = await api.put(`/usage/update/${id}`, product);
            console.log(response);
            if (response.status == 200) {
                fetchData();
                setSuccess({
                    ...success,
                    message: "Se edito el uso exitosamente.",
                    usage: response.data.usageName,
                    status: true,
                });

                setUsageToEdit(null);
                setOpen(true);
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                const backendError = error.response.data;
                setErrorCreated(backendError.errors);
            }
        }
    };

    const searchUsagesByName = async () => {
        try {
            const response = await api.get(`/usage/getAllByName/${search}`);

            if (response.status !== 200) {
                setErrorFetch(true);
            } else {
                setUsageData(response.data);
            }
        } catch (error) {
            console.error(error);
            setErrorFetch(true);
        }
    };

    useEffect(() => {
        if (search) {
            searchUsagesByName();
        } else {
            fetchData();
        }
    }, [page, search]);

    if (errorFetch) {
        return (
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
                    <Typography variant="body1" sx={{ fontWeight: "600" }}>
                        Hubo un error al obtener los usos de equipos
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Por favor, inténtalo más tarde o notifica este error al
                        soporte.
                    </Typography>
                </Alert>
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "auto",
            }}
        >
            <Typography
                component={"h3"}
                variant="h3"
                sx={{ pt: "40px", fontSize: "24px" }}
            >
                Elementos del sistema -{" "}
                <span style={{ color: "#39A900" }}>Usos</span>
            </Typography>

            {/* modal to create one usage*/}
            <GenericModal
                open={createUsagetState}
                compo={
                    <UsageForm
                        isEdit={false}
                        data={null}
                        errors={errorsCreate}
                        method={(usage) => saveUsage(usage)}
                    />
                }
                onClose={() => setCreateUsagetState(false)}
            />

            {/* modal to edit one usage*/}
            <GenericModal
                open={usageToEdit}
                compo={
                    <UsageForm
                        isEdit={true}
                        data={usageToEdit}
                        errors={errorsCreate}
                        method={(usage, id) => editUsage(usage, id)}
                    />
                }
                onClose={() => setUsageToEdit(null)}
            />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box>
                    <SearchBar onSearch={(value) => setSearch(value)} />
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        onClick={() => setCreateUsagetState(true)}
                    >
                        {" "}
                        <Add /> Agregar un nuevo uso
                    </Button>
                </Box>
            </Box>

            <Box>
                {usageData.length < 1 && (
                    <Typography sx={{ textAlign: "center", pt: "100px" }}>
                        No hay usos para mostrar, agrega uno.
                    </Typography>
                )}
                {errorDelete.status && (
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={() => {
                            setOpen(false);
                            setErrorDelete({ status: false, usage: null });
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                    >
                        <Alert
                            severity="error"
                            onClose={() => setOpen(false)}
                            sx={{ width: "100%" }}
                        >
                            {errorDelete.message}: {errorDelete.usage}
                        </Alert>
                    </Snackbar>
                )}

                {success.status && (
                    <Snackbar
                        open={open}
                        autoHideDuration={5000}
                        onClose={() => {
                            setOpen(false);
                            setSuccess({
                                ...success,
                                message: "",
                                usage: "usageName",
                                status: false,
                            });
                        }}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "right",
                        }}
                    >
                        <Alert
                            severity="success"
                            onClose={() => setOpen(false)}
                            sx={{ width: "100%" }}
                        >
                            {success.message} : {success.usage}
                        </Alert>
                    </Snackbar>
                )}

                {/* table of results*/}
                <Box sx={{ width: "100%", mt: 3 }}>
                    {usageData.length < 1 ? (
                        <Typography
                            sx={{
                                textAlign: "center",
                                pt: "100px",
                                opacity: 0.7,
                                fontSize: "18px",
                            }}
                        >
                            No hay registros para mostrar, agrega uno.
                        </Typography>
                    ) : (
                        <Paper
                            sx={{
                                width: "100%",
                                overflow: "hidden",
                                bgcolor: "background.paper",
                            }}
                        >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Nombre de Uso</TableCell>
                                        {!isMobile && (
                                            <>
                                                <TableCell>Creado</TableCell>
                                                <TableCell>
                                                    Actualizado
                                                </TableCell>
                                            </>
                                        )}
                                        <TableCell align="right">
                                            Acciones
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {usageData.map((usage) => (
                                        <TableRow
                                            key={usage.equipmentUsageId}
                                            hover
                                        >
                                            <TableCell>
                                                {usage.equipmentUsageId}
                                            </TableCell>
                                            <TableCell>
                                                {usage.usageName}
                                            </TableCell>
                                            {!isMobile && (
                                                <>
                                                    <TableCell>
                                                        {usage.createAt}
                                                    </TableCell>
                                                    <TableCell>
                                                        {usage.updateAt}
                                                    </TableCell>
                                                </>
                                            )}
                                            <TableCell align="right">
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() =>
                                                        setUsageToEdit(usage)
                                                    }
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    disabled={
                                                        authObject.role !==
                                                        "ROLE_SUPERADMIN"
                                                    }
                                                    size="small"
                                                    color="primary"
                                                    onClick={() =>
                                                        deleteUsage(
                                                            usage.equipmentUsageId,
                                                            usage.usageName,
                                                        )
                                                    }
                                                >
                                                    <Delete fontSize="small" />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Paper>
                    )}
                </Box>

                <Box
                    sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        mb: "20px",
                        mt: "20px",
                    }}
                >
                    <Stack spacing={2}>
                        <Pagination
                            count={totalPages}
                            page={page + 1}
                            onChange={handleChange}
                        />
                    </Stack>
                </Box>
            </Box>
        </Box>
    );
};

export default UsageCompo;
