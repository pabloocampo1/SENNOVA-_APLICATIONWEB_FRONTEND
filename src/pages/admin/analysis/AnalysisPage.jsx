import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Divider,
    IconButton,
    Pagination,
    Snackbar,
    Stack,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import api from "../../../service/axiosService";
import {
    Add,
    AssessmentOutlined,
    Delete,
    Details,
    Edit,
    Layers,
    Search,
} from "@mui/icons-material";
import GenericModal from "../../../components/modals/GenericModal";
import CreateProductForm from "../../../components/forms/Product/ProductForm";
import ProductForm from "../../../components/forms/Product/ProductForm";
import SearchBar from "../../../components/SearchBar";
import { AuthContext } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const AnalysisPage = () => {
    const [productData, setProductData] = useState([]);
    const [errorFetch, setErrorFetch] = useState(false);
    const [errorDelete, setErrorDelete] = useState({
        status: false,
        product: "",
    });
    const [success, setSuccess] = useState({
        status: false,
        product: "",
        message: "",
    });
    const [page, setPage] = useState(0);
    const [createProductState, setCreateProductState] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [open, setOpen] = useState(false);
    const [errorsCreate, setErrorCreated] = useState([]);
    const [productToEdit, setProductToEdit] = useState(null);
    const [search, setSearch] = useState("");
    const { authObject } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (event, value) => {
        setPage(value - 1);
    };

    const fetchData = async () => {
        try {
            const response = await api.get(`/analysis/getAll?page=${page}`);

            if (response.status !== 200) {
                setErrorFetch(true);
            } else {
                let totalPagesResponse = response.data.totalPages;
                setProductData(response.data.content);
                setTotalPages(totalPagesResponse);
            }
        } catch (error) {
            console.error(error);

            setErrorFetch(true);
        }
    };

    const deleteAnalysis = async (id, analysisName) => {
        try {
            const response = await api.delete(`/analysis/delete/${id}`);
            if (response.status == 200) {
                fetchData();
                setErrorDelete({
                    ...errorDelete,
                    status: false,
                    product: "",
                });
                setSuccess({
                    ...success,
                    message: "Se Elimino el producto existosamente.",
                    product: analysisName,
                    status: true,
                });
                setOpen(true);
            } else {
                setErrorDelete({
                    ...errorDelete,
                    status: true,
                    product: analysisName,
                });
                setOpen(true);
            }
        } catch (error) {
            console.error(error);
            setErrorDelete({
                ...errorDelete,
                status: true,
                product: analysisName,
            });
            setOpen(true);
        }
    };

    const saveProduct = async (product) => {
        try {
            const response = await api.post("/analysis/save", product);
            console.log(response);
            if (response.status == 201) {
                fetchData();
                setCreateProductState(false);
                setSuccess({
                    ...success,
                    message: "Se agreogo el producto exitosamente.",
                    product: response.data.analysis,
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

    const editProduct = async (product, id) => {
        try {
            const response = await api.put(`/analysis/update/${id}`, product);

            if (response.status == 200) {
                fetchData();
                setSuccess({
                    ...success,
                    message: "Se edito el producto exitosamente.",
                    product: response.data.analysis,
                    status: true,
                });

                setProductToEdit(null);
                setOpen(true);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                const backendError = error.response.data;
                setErrorCreated(backendError.errors);
            }
        }
    };

    const searchProductsByName = async () => {
        try {
            const response = await api.get(`/analysis/getByName/${search}`);

            if (response.status !== 200) {
                setErrorFetch(true);
            } else {
                setProductData(response.data);
            }
        } catch (error) {
            console.error(error);
            setErrorFetch(true);
        }
    };

    useEffect(() => {
        if (search) {
            searchProductsByName();
        } else {
            fetchData();
        }
    }, [page, search]);

    if (errorFetch) {
        return (
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
                    <Typography variant="body1" sx={{ fontWeight: "600" }}>
                        Hubo un error al obtener los productos
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
                mb: "100px",
                p: "20px",
                borderRadius: "20px",
                bgcolor: "background.default",
            }}
        >
            <Box sx={{ pt: "40px", pb: "30px" }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <AssessmentOutlined
                        sx={{ color: "#39A900", mr: 2, fontSize: "32px" }}
                    />

                    <Typography
                        component="h1"
                        sx={{
                            fontSize: "28px",
                            fontWeight: "bold",

                            lineHeight: 1.2,
                        }}
                    >
                        Gestión de{" "}
                        <span style={{ color: "#39A900" }}>Análisis</span>
                    </Typography>
                </Box>

                <Typography
                    variant="body1"
                    sx={{
                        color: "#666",
                        maxWidth: "800px",
                        fontSize: "16px",
                        lineHeight: 1.6,
                    }}
                >
                    Panel central de control del sistema. Aquí puedes{" "}
                    <strong>administrar análisis</strong>, gestionar{" "}
                    <strong>matrices</strong> y configurar la relación entre
                    ellas. Además, permite la asignación de{" "}
                    <strong>personal capacitado</strong> para garantizar la
                    trazabilidad y calidad de cada proceso.
                </Typography>

                <Divider
                    sx={{ mt: 3, borderColor: "#e0e0e0", width: "100%" }}
                />
            </Box>

            {/* modal to create one product*/}
            <GenericModal
                open={createProductState}
                compo={
                    <ProductForm
                        isEdit={false}
                        data={null}
                        errors={errorsCreate}
                        method={(product) => saveProduct(product)}
                    />
                }
                onClose={() => setCreateProductState(false)}
            />

            {/* modal to edit one product*/}
            <GenericModal
                open={productToEdit}
                compo={
                    <ProductForm
                        authObject={authObject}
                        deleteAnalysis={(id, name) => deleteAnalysis(id, name)}
                        isEdit={true}
                        data={productToEdit}
                        errors={errorsCreate}
                        method={(product, id) => editProduct(product, id)}
                    />
                }
                onClose={() => setProductToEdit(null)}
            />

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <SearchBar onSearch={(value) => setSearch(value)} />
                    <Button
                        variant="contained" // Puedes usar 'outlined' o 'text'
                        startIcon={<Layers />}
                        onClick={() => navigate("/system/products/matrices")} // Cambia la ruta por la tuya
                        sx={{ textTransform: "none", ml: "20px" }} // Para que el texto no salga todo en mayúsculas
                    >
                        <Typography>Administrar matrices</Typography>
                    </Button>
                </Box>
                <Box>
                    <Button
                        variant="outlined"
                        onClick={() => setCreateProductState(true)}
                    >
                        {" "}
                        <Add /> Agregar un nuevo producto
                    </Button>
                </Box>
            </Box>

            <Box>
                {productData.length < 1 && (
                    <Typography sx={{ textAlign: "center", pt: "100px" }}>
                        No hay productos para mostrar, agrega uno.
                    </Typography>
                )}
                {errorDelete.status && (
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={() => {
                            setOpen(false);
                            setErrorDelete({ status: false, product: null });
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
                            Ocurrió un error al intentar eliminar el producto:{" "}
                            {errorDelete.product}
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
                                product: "productName",
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
                            {success.message} : {success.product}
                        </Alert>
                    </Snackbar>
                )}

                <Box sx={{ width: "100%", mt: 3 }}>
                    {productData.length < 1 ? (
                        <Typography
                            sx={{
                                textAlign: "center",
                                pt: "100px",
                                opacity: 0.7,
                                fontSize: "18px",
                            }}
                        >
                            No hay analisis para mostrar, agrega uno.
                        </Typography>
                    ) : (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr",
                                    sm: "1fr 1fr",
                                    md: "1fr 1fr 1fr",
                                },
                                gap: 2,
                            }}
                        >
                            {productData.map((prod) => (
                                <Card
                                    key={prod.analysisId}
                                    sx={{
                                        borderRadius: "12px",
                                        boxShadow: 2,
                                        bgcolor: "background.paper",
                                    }}
                                >
                                    <CardContent>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: "bold", mb: 1 }}
                                        >
                                            {prod.analysisName} -{" "}
                                        </Typography>
                                        {prod.available ? (
                                            <Typography
                                                sx={{ color: "primary.main" }}
                                            >
                                                Activo
                                            </Typography>
                                        ) : (
                                            <Typography color="error">
                                                Inactivo
                                            </Typography>
                                        )}

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            <strong>Método:</strong>{" "}
                                            {prod.method}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            <strong>Equipo:</strong>{" "}
                                            {prod.equipment}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            <strong>Unidades:</strong>{" "}
                                            {prod.units}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            <strong>Notas:</strong> {prod.notes}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{
                                                mt: 1,
                                                fontWeight: "bold",
                                                color: "primary.main",
                                            }}
                                        >
                                            💲{" "}
                                            {prod.price.toLocaleString("es-CO")}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            sx={{
                                                display: "block",
                                                mt: 1,
                                                opacity: 0.7,
                                            }}
                                        >
                                            Creado: {prod.createAt} |
                                            Actualizado: {prod.updateAt}
                                        </Typography>

                                        <Box
                                            sx={{
                                                width: "100%",
                                                display: "flex",
                                                justifyContent: "flex-end",
                                                gap: 1,
                                                mt: 1,
                                            }}
                                        >
                                            <IconButton
                                                fontSize="small"
                                                sx={{
                                                    cursor: "pointer",
                                                    color: "primary.main",
                                                }}
                                                onClick={() =>
                                                    setProductToEdit(prod)
                                                }
                                            >
                                                <Button
                                                    sx={{
                                                        textTransform: "none",
                                                    }}
                                                    onClick={() =>
                                                        navigate(
                                                            `/system/products/${prod.analysisId}/${prod.analysisName}`,
                                                        )
                                                    }
                                                    startIcon={
                                                        <Details
                                                            sx={{
                                                                color: "primary.main ",
                                                            }}
                                                            fontSize="small"
                                                        />
                                                    }
                                                >
                                                    Detalles
                                                </Button>
                                            </IconButton>

                                            <IconButton
                                                fontSize="small"
                                                sx={{
                                                    cursor: "pointer",
                                                    color: "primary.main",
                                                }}
                                                onClick={() =>
                                                    setProductToEdit(prod)
                                                }
                                            >
                                                <Edit
                                                    sx={{
                                                        color: "primary.main ",
                                                    }}
                                                    fontSize="small"
                                                />
                                            </IconButton>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
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

export default AnalysisPage;
