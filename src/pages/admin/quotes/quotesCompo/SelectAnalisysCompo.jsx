import { Add } from '@mui/icons-material';
import { Box, Button, MenuItem, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import api from '../../../../service/axiosService';
import GenericModal from '../../../../components/modals/GenericModal';
import SelectAnalisysByMatrixModal from './SelectAnalisysByMatrixModal';

const SelectAnalisysCompo = () => {

    const [analisysSelectedList, setAnalisysSelectedList] = useState([]);
    const [products, setProducts] = useState([]);
    const [sampleData, setSampleData] = useState({
        matrix: "",
        analisys: [],
        description: ""
    })
    const [errorObject, setErrorObject] = useState({
        isError: false,
        message: ""
    })
    const [openModalAnalisys, setOpenModalAnalisys] = useState(false)

    // get all products

    // show only the matriz.

    // when the user select "add analisys" show only the prodcutos with that matriz

    // send the matriz and analisis to that sample

    const fetchProducts = async () => {
        try {
            const res = await api.get("/product/all");
            setProducts(res.data);

        } catch (error) {
            console.error(error);

        }
    }

    const handleChange = (e) => {
        setSampleData({
            ...sampleData,
            [e.target.name]: e.target.value
        })
    }


   
    const saveAnalysis = (listAnalisys) => {
        console.log("list:",listAnalisys);
        
        let originalList = analisysSelectedList;
        let newAnalysis = listAnalisys;

        let mergeList = [...originalList, ...newAnalysis];

        const conteo = mergeList.reduce((acc, product) => {
            acc[product.analysis] = (acc[product.analysis] || 0) + 1;
            return acc;
        }, {});

        const listaConteo = Object.entries(conteo).map(([analysis, quantity]) => ({
            analysis,
            quantity,
        }));


        setAnalisysSelectedList([
            ...listaConteo
        ])
        setOpenModalAnalisys(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if (sampleData.analisys.length < 1) {
            setErrorObject({
                isError: true,
                message: "Debes de agregar un analisis a esta prueba."
            })
        }
        console.log(sampleData);

    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <Box component={"form"} sx={{
            width: { xs: "320px", md: "500px" },
            height: "auto",

        }} onSubmit={handleSubmit}>

            {/* modal to analysys by matrix */}

            <GenericModal open={openModalAnalisys} onClose={() => setOpenModalAnalisys(false)} compo={<SelectAnalisysByMatrixModal products={products} saveAnalysis={(list) => saveAnalysis(list)} onClose={() => setOpenModalAnalisys(false)} matrixSelected={sampleData.matrix} />} />


            <Typography variant='body1' sx={{ textAlign: "center", mt: "20px", fontWeight: "500" }}>Agregar muestra</Typography>
            <Typography variant='body2' sx={{ textAlign: "center" }}>Selecciona una matriz y una descripcion para mas detalles</Typography>

            <Box sx={{
                width: "100%",
                height: "100px",
                mt: "40px",
                display: "flex",
                justifyContent: "space-around",
            }}>

                <TextField
                    select
                    name='matrix'
                    label="Matriz"
                    required
                    sx={{ width: "200px" }}
                    value={sampleData.matrix || ""}
                    onChange={(e) => handleChange(e)}
                    placeholder='Selecciona la matriz'
                >

                    {products.length >= 1
                        ? [...new Map(products.map((p) => [p.matrix, p])).values()].map((product) => (
                            <MenuItem key={product.matrix} value={product.matrix}>
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
                    name='description'
                    required
                    value={sampleData.description || ""}
                    onChange={(e) => handleChange(e)}
                    label="description"
                    placeholder='Agregar alguna descripcion de esta muestra'
                />

            </Box>

            <Button startIcon={<Add />} onClick={() => setOpenModalAnalisys(true)} sx={{ width: "100%" }} variant='outlined'>Agregar analisis a la matriz - agua</Button>

            <Box sx={{
                width: "100%",
                minHeight: "200px",
                mt: "40px",
            }}>

                {/* show message no analisys selected */}
                {analisysSelectedList.length <= 0 ? (
                    <Box sx={{
                        width: "100%",
                        minHeight: "200px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                        <Typography>No hay analisis para esta muestra.</Typography>
                    </Box>
                ) : (
                    <Box>
                        {analisysSelectedList.map(a => (
                            <>
                                {a.analysis}
                                {a.quantity}
                            </>
                        ))}
                    </Box>
                )}




            </Box>
            {errorObject.isError && (
                <Typography sx={{ mt: "20px" }} color='error' variant='body1'>{errorObject.message}</Typography>
            )}

            <Box sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end"
            }}>

                <Button type='submit' variant='contained'>Agregar muestra a la cotizacion</Button>
            </Box>
        </Box>
    );
};

export default SelectAnalisysCompo;