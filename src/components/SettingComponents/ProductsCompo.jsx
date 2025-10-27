import { Alert, Box, Button, Card, CardContent, IconButton, Input, Pagination, Paper, Snackbar, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../service/axiosService';
import { Add, Delete, Edit, Search } from '@mui/icons-material';
import GenericModal from '../modals/GenericModal';
import CreateProductForm from '../forms/Product/ProductForm';
import ProductForm from '../forms/Product/ProductForm';
import SearchBar from '../SearchBar';

const ProductsCompo = ({isMobile}) => {
    const [productData, setProductData] = useState([]);
    const [errorFetch, setErrorFetch] = useState(false);
    const [errorDelete, setErrorDelete] = useState({
        "status": false,
        "product": ""
    });
    const [success, setSuccess] = useState({
        "status": false,
        "product": "",
        "message": "",
    });
    const [page, setPage] = useState(0);
    const [createProductState, setCreateProductState] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [open, setOpen] = useState(false);
    const [errorsCreate, setErrorCreated] = useState([])
    const [productToEdit, setProductToEdit] = useState(null)
    const [search, setSearch] = useState("");


    const handleChange = (event, value) => {
        setPage(value - 1);
    };

    const fetchData = async () => {
        try {
            const response = await api.get(`/product/getAll?page=${page}`);

            if (response.status !== 200) {
                setErrorFetch(true)
            } else {

                let totalPagesResponse = response.data.totalPages;
                setProductData(response.data.content)
                setTotalPages(totalPagesResponse)
            }

        } catch (error) {

            console.error(error);


            setErrorFetch(true)
        }
    }

    const deleteProduct = async (id, productName) => {

        try {
            const response = await api.delete(`/product/delete/${id}`);
            if (response.status == 200) {
                fetchData()
                setErrorDelete({
                    ...errorDelete,
                    "status": false,
                    "product": ""
                })
                setSuccess({
                    ...success,
                    "message": "Se Elimino el producto existosamente.",
                    "product": productName,
                    "status": true
                })
                setOpen(true)

            } else {
                setErrorDelete({
                    ...errorDelete,
                    "status": true,
                    "product": productName
                })
                setOpen(true)
            }
        } catch (error) {
            console.error(error);
            setErrorDelete({
                ...errorDelete,
                "status": true,
                "product": productName
            })
            setOpen(true)

        }
    }


    const saveProduct = async (product) => {
        try {
            const response = await api.post("/product/save", product);
            console.log(response);
            if (response.status == 201) {
                fetchData()
                setCreateProductState(false)
                setSuccess({
                    ...success,
                    "message": "Se agreogo el producto exitosamente.",
                    "product": response.data.analysis,
                    "status": true
                })

                setOpen(true)

            }

        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                const backendError = error.response.data;
                setErrorCreated(backendError.errors)
            }
        }
    }

    const editProduct = async (product, id) => {
        try {
            const response = await api.put(`/product/update/${id}`, product);
            console.log(response);
            if (response.status == 200) {
                fetchData()
                setSuccess({
                    ...success,
                    "message": "Se edito el producto exitosamente.",
                    "product": response.data.analysis,
                    "status": true
                })

                setProductToEdit(null)
                setOpen(true)

            }

        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                const backendError = error.response.data;
                setErrorCreated(backendError.errors)
            }
        }
    }


    const searchProductsByName = async () => {
        try {
            const response = await api.get(`/product/getByName/${search}`);

            if (response.status !== 200) {
                setErrorFetch(true)
            } else {
                setProductData(response.data)
            }

        } catch (error) {
            console.error(error);
            setErrorFetch(true)
        }
    }



    useEffect(() => {
        if (search) {
            searchProductsByName()
        } else {
            fetchData()
        }
    }, [page, search])


    if (errorFetch) {
        return (
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
                    <Typography variant="body1" sx={{ fontWeight: "600" }}>
                        Hubo un error al obtener los productos
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        Por favor, inténtalo más tarde o notifica este error al soporte.
                    </Typography>
                </Alert>
            </Box>
        );
    }


    return (
        <Box sx={{
            width: "100%",
            height: "auto",
            mb: "100px",
        }}>

            <Typography component={"h3"} variant='h3' sx={{ pt: "40px", pb:"20px", fontSize:"24px" }}>
                Elementos del sistema - <span style={{color:"#39A900"}}>Productos</span>
            </Typography>


            {/* modal to create one product*/}
            <GenericModal open={createProductState} compo={<ProductForm isEdit={false} data={null} errors={errorsCreate} method={(product) => saveProduct(product)
            } />} onClose={() => setCreateProductState(false)} />

            {/* modal to edit one product*/}
            <GenericModal open={productToEdit} compo={<ProductForm isEdit={true} data={productToEdit} errors={errorsCreate} method={(product, id) => editProduct(product, id)
            } />} onClose={() => setProductToEdit(null)} />


            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between", flexWrap:"wrap" }}>
                <Box>
                    <SearchBar onSearch={(value) => setSearch(value)} />
                </Box>
                <Box>
                    <Button variant='outlined' onClick={() => setCreateProductState(true)}> <Add /> Agregar un nuevo producto</Button>
                </Box>
            </Box>

            <Box>


                {productData.length < 1 && (<Typography sx={{ textAlign: "center", pt: "100px" }}>No hay productos para mostrar, agrega uno.</Typography>)}
                {errorDelete.status && (
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={() => {
                            setOpen(false);
                            setErrorDelete({ status: false, product: null });
                        }}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        <Alert
                            severity="error"
                            onClose={() => setOpen(false)}
                            sx={{ width: "100%" }}
                        >
                            Ocurrió un error al intentar eliminar el producto: {errorDelete.product}
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
                                "message": "",
                                "product": "productName",
                                "status": false
                            })
                        }}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
                            No hay productos para mostrar, agrega uno.
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
                                    key={prod.productId}
                                    sx={{
                                        borderRadius: "12px",
                                        boxShadow: 2,
                                        bgcolor: "background.paper",
                                    }}
                                >
                                    <CardContent>
                                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1 }}>
                                            {prod.analysis}
                                        </Typography>

                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Matriz:</strong> {prod.matrix}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Método:</strong> {prod.method}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Equipo:</strong> {prod.equipment}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Unidades:</strong> {prod.units}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            <strong>Notas:</strong> {prod.notes}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            sx={{ mt: 1, fontWeight: "bold", color: "primary.main" }}
                                        >
                                            💲 {prod.price.toLocaleString("es-CO")}
                                        </Typography>

                                        <Typography
                                            variant="caption"
                                            sx={{ display: "block", mt: 1, opacity: 0.7 }}
                                        >
                                            Creado: {prod.createAt} | Actualizado: {prod.updateAt}
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
                                            <Edit fontSize="small" sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => setProductToEdit(prod)} />
                                            <Delete fontSize="small" sx={{ cursor: "pointer", color: "primary.main" }} onClick={() => deleteProduct(prod.productId, prod.analysis)} />
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))}
                        </Box>
                    )}
                </Box>

                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: "20px", mt: "20px" }}>

                    <Stack spacing={2}>
                        <Pagination count={totalPages} page={page + 1} onChange={handleChange} />
                    </Stack>
                </Box>


            </Box>

        </Box>
    );
};

export default ProductsCompo;



