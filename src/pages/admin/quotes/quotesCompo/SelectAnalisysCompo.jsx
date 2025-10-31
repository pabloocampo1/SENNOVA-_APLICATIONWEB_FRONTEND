import { Add, ExitToApp, Remove } from "@mui/icons-material";
import {
    Box,
    Button,
    MenuItem,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../../../service/axiosService";
import GenericModal from "../../../../components/modals/GenericModal";
import SelectAnalisysByMatrixModal from "./SelectAnalisysByMatrixModal";

const SelectAnalisysCompo = ({ saveSample }) => {
    const [analisysSelectedList, setAnalisysSelectedList] = useState([]);
    const [products, setProducts] = useState([]);
    const [sampleData, setSampleData] = useState({
        matrix: "",
        analysis: [],
        description: "",
    });
    const [errorObject, setErrorObject] = useState({
        isError: false,
        message: "",
    });
    const theme = useTheme();
    const [openModalAnalisys, setOpenModalAnalisys] = useState(false);

    const fetchProducts = async () => {
        try {
            const res = await api.get("/product/all");
            setProducts(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {
        setSampleData({
            ...sampleData,
            [e.target.name]: e.target.value,
        });
    };

    const deleteAnalysisToTheList = (productId) => {
        setAnalisysSelectedList((prev) =>
            prev.filter((object) => object.product.productId !== productId)
        );
    };

    const saveAnalysis = (listAnalysis = []) => {
        let updatedList = [...analisysSelectedList];

        listAnalysis.forEach((newItem) => {
            const newQuantity = Number(newItem.quantity);

            const index = updatedList.findIndex(
                (item) => item.product.productId === newItem.product.productId
            );

            if (index !== -1) {
                const currentQuantity = Number(updatedList[index].quantity);
                updatedList[index] = {
                    ...updatedList[index],
                    quantity: currentQuantity + newQuantity,
                };
            } else {
                updatedList.push({
                    ...newItem,
                    quantity: newQuantity,
                });
            }
        });

        setAnalisysSelectedList(updatedList);
        setSampleData({
            ...sampleData,
            analysis: updatedList,
        });

        if (updatedList.length >= 1) {
            setErrorObject({
                isError: false,
                message: "",
            });
        }

        setOpenModalAnalisys(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (sampleData.analysis.length < 1) {
            setErrorObject({
                isError: true,
                message: "Debes de agregar un analisis a esta prueba.",
            });
        }
        saveSample(sampleData);
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Box
            component={"form"}
            sx={{
                width: { xs: "320px", md: "500px" },
                height: "auto",
            }}
            onSubmit={handleSubmit}
        >
            {/* modal to analysys by matrix */}

            <GenericModal
                open={openModalAnalisys}
                onClose={() => setOpenModalAnalisys(false)}
                compo={
                    <SelectAnalisysByMatrixModal
                        products={products}
                        saveAnalysis={(list) => saveAnalysis(list)}
                        onClose={() => setOpenModalAnalisys(false)}
                        matrixSelected={sampleData.matrix}
                    />
                }
            />

            <Typography
                variant="body1"
                sx={{ textAlign: "center", mt: "20px", fontWeight: "500" }}
            >
                Agregar muestra
            </Typography>
            <Typography variant="body2" sx={{ textAlign: "center" }}>
                Selecciona una matriz y una descripcion para mas detalles
            </Typography>

            <Box
                sx={{
                    width: "100%",
                    height: "100px",
                    mt: "40px",
                    display: "flex",
                    justifyContent: "space-around",
                }}
            >
                <TextField
                    select
                    name="matrix"
                    label="Matriz"
                    required
                    sx={{ width: "200px" }}
                    value={sampleData.matrix || ""}
                    onChange={(e) => handleChange(e)}
                    placeholder="Selecciona la matriz"
                >
                    {products.length >= 1
                        ? [
                              ...new Map(
                                  products.map((p) => [p.matrix, p])
                              ).values(),
                          ].map((product) => (
                              <MenuItem
                                  key={product.matrix}
                                  value={product.matrix}
                              >
                                  {product.matrix}
                              </MenuItem>
                          ))
                        : [
                              <MenuItem key="no-products" disabled>
                                  No hay productos para mostrar.
                              </MenuItem>,
                          ]}
                </TextField>

                <TextField
                    name="description"
                    value={sampleData.description || ""}
                    onChange={(e) => handleChange(e)}
                    label="description"
                    placeholder="Agregar alguna descripcion de esta muestra"
                />
            </Box>

            <Button
                startIcon={<Add />}
                onClick={() => setOpenModalAnalisys(true)}
                sx={{ width: "100%" }}
                variant="outlined"
            >
                Agregar analisis a la matriz - agua
            </Button>

            <Box
                sx={{
                    width: "100%",
                    minHeight: "200px",
                    mt: "40px",
                }}
            >
                {/* show message no analisys selected */}
                {analisysSelectedList.length <= 0 ? (
                    <Box
                        sx={{
                            width: "100%",
                            minHeight: "200px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <Typography>
                            No hay analisis para esta muestra.
                        </Typography>
                    </Box>
                ) : (
                    <Box>
                        <Box
                            sx={{
                                width: "100%",
                                bgcolor: "background.default",
                                pt: "10px",
                                pb: "10px",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <Typography>Quitar</Typography>
                            <Typography>Analisis</Typography>
                            <Typography>Canti.</Typography>
                        </Box>
                        {analisysSelectedList.map((object) => (
                            <Box
                                key={object.product.productId}
                                sx={{
                                    width: "100%",
                                    pt: "10px",
                                    pb: "10px",
                                    mb: "10px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderBottom: `1px solid ${theme.palette.border.primary}`,
                                }}
                            >
                                <Remove
                                    onClick={() =>
                                        deleteAnalysisToTheList(
                                            object.product.productId
                                        )
                                    }
                                    sx={{
                                        ":hover": {
                                            bgcolor:
                                                theme.palette.border.primary,
                                            borderRadius: "50px",
                                            p: "2px",
                                        },
                                    }}
                                />
                                <Typography>
                                    {" "}
                                    {object.product.analysis}
                                </Typography>
                                <Typography> {object.quantity}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Box>
            {errorObject.isError && (
                <Typography sx={{ mt: "20px" }} color="error" variant="body1">
                    {errorObject.message}
                </Typography>
            )}

            <Box
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "end",
                }}
            >
                <Button type="submit" variant="contained">
                    Agregar muestra a la cotizacion
                </Button>
            </Box>
        </Box>
    );
};

export default SelectAnalisysCompo;
