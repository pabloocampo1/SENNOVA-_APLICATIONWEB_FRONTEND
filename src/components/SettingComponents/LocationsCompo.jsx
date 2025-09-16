import { Alert, Box, Button, IconButton, Pagination, Paper, Snackbar, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import api from '../../service/axiosService';
import { Add, Delete, Edit } from '@mui/icons-material';
import GenericModal from '../modals/GenericModal';
import SearchBar from '../SearchBar';
import LocationForm from '../forms/Location/LocationForm';

const LocationsCompo = () => {
    const [locationData, setLocationData] = useState([]);
    const [errorFetch, setErrorFetch] = useState(false);
    const [errorDelete, setErrorDelete] = useState({
        "status": false,
        "location": "",
        "message": ""
    });
    const [success, setSuccess] = useState({
        "status": false,
        "location": "",
        "message": "",
    });
    const [page, setPage] = useState(0);
    const [createLocationState, setCreateLocationState] = useState(false);
    const [totalPages, setTotalPages] = useState();
    const [open, setOpen] = useState(false);
    const [errorsCreate, setErrorCreated] = useState([])
    const [locationToEdit, setLocationToEdit] = useState(null)
    const [search, setSearch] = useState("");


    const handleChange = (event, value) => {
        setPage(value - 1);
    };

    const fetchData = async () => {
        try {
            const response = await api.get(`/location/getAllPage?page=${page}`);

            if (response.status !== 200) {
                setErrorFetch(true)
            } else {

                let totalPagesResponse = response.data.totalPages;
                setLocationData(response.data.content)
                setTotalPages(totalPagesResponse)
            }

        } catch (error) {

            console.error(error);


            setErrorFetch(true)
        }
    }

    const deleteLocation = async (id, locationName) => {

        try {
            const response = await api.delete(`/location/delete/${id}`);
            if (response.status == 200) {
                fetchData()
                setErrorDelete({
                    ...errorDelete,
                    "status": false,
                    "location": ""
                })
                setSuccess({
                    ...success,
                    "message": "Se Elimino la ubicacion existosamente.",
                    "location": locationName,
                    "status": true
                })
                setOpen(true)

            } else {
                setErrorDelete({
                    ...errorDelete,
                    "status": true,
                    "location": locationName,
                    "message": " ocurrio un error"
                })
                setOpen(true)
            }
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data) {
                const backendError = error.response.data;
                setErrorCreated(backendError.errors)
                setErrorDelete({
                    ...errorDelete,
                    "status": true,
                    "location": locationName,
                    "message": "No se puede eliminar este elemento porque esta relacionado a otro elemento"
                })
                setOpen(true)
            }


        }
    }


    const saveLocation = async (product) => {
        try {
            const response = await api.post("/location/save", product);
            console.log(response);
            if (response.status == 201) {
                fetchData()
                setCreateLocationState(false)
                setSuccess({
                    ...success,
                    "message": "Se agrego la ubicacion exitosamente.",
                    "location": response.data.locationName,
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

    const editLocation = async (product, id) => {
        try {
            const response = await api.put(`/location/update/${id}`, product);
            console.log(response);
            if (response.status == 200) {
                fetchData()
                setSuccess({
                    ...success,
                    "message": "Se edito la ubicacion exitosamente.",
                    "location": response.data.locationName,
                    "status": true
                })

                setLocationToEdit(null)
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


    const searchLocationByName = async () => {
        try {
            const response = await api.get(`/location/getByName/${search}`);

            if (response.status !== 200) {
                setErrorFetch(true)
            } else {
                setLocationData(response.data)
            }

        } catch (error) {
            console.error(error);
            setErrorFetch(true)
        }
    }



    useEffect(() => {
        if (search) {
            searchLocationByName()
        } else {
            fetchData()
        }
    }, [page, search])


    if (errorFetch) {
        return (
            <Box sx={{ mt: 3, display: "flex", justifyContent: "center" }}>
                <Alert severity="error" sx={{ width: "100%", maxWidth: 600 }}>
                    <Typography variant="body1" sx={{ fontWeight: "600" }}>
                        Hubo un error al obtener las ubicaciones
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
        }}>

            <Typography component={"h3"} variant='h3' sx={{ pt: "40px", fontSize: "24px" }}>
                Elementos del sistema - <span style={{ color: "#39A900" }}>Ubicaciones</span>
            </Typography>


            {/* modal to create one location*/}
            <GenericModal open={createLocationState} compo={<LocationForm isEdit={false} data={null} errors={errorsCreate} method={(location) => saveLocation(location)
            } />} onClose={() => setCreateLocationState(false)} />

            {/* modal to edit one location*/}
            <GenericModal open={locationToEdit} compo={<LocationForm isEdit={true} data={locationToEdit} errors={errorsCreate} method={(location, id) => editLocation(location, id)
            } />} onClose={() => setLocationToEdit(null)} />


            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                <Box>
                    <SearchBar onSearch={(value) => setSearch(value)} />
                </Box>
                <Box>
                    <Button variant='outlined' onClick={() => setCreateLocationState(true)}> <Add /> Agregar una nueva ubicacion</Button>
                </Box>
            </Box>

            <Box>


                {locationData.length < 1 && (<Typography sx={{ textAlign: "center", pt: "100px" }}>No hay ubicaciones para mostrar, agrega uno.</Typography>)}
                {errorDelete.status && (
                    <Snackbar
                        open={open}
                        autoHideDuration={3000}
                        onClose={() => {
                            setOpen(false);
                            setErrorDelete({ status: false, location: null });
                        }}
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        <Alert
                            severity="error"
                            onClose={() => setOpen(false)}
                            sx={{ width: "100%" }}
                        >
                            {errorDelete.message}: {errorDelete.location}
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
                                "location": "",
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
                            {success.message} : {success.location}
                        </Alert>
                    </Snackbar>
                )}

                {/* table of results*/}
                <Box sx={{ width: "100%", mt: 3 }}>
                    {locationData.length < 1 ? (
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
                        <Paper sx={{ width: "100%", overflow: "hidden", bgcolor: "background.paper" }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Nombre de Ubicación</TableCell>
                                        <TableCell>Creado</TableCell>
                                        <TableCell>Actualizado</TableCell>
                                        <TableCell align="right">Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {locationData.map((location) => (
                                        <TableRow key={location.equipmentLocationId} hover>
                                            <TableCell>{location.equipmentLocationId}</TableCell>
                                            <TableCell>{location.locationName}</TableCell>
                                            <TableCell>
                                                {new Date(location.createAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(location.updateAt).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell align="right">
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() => setLocationToEdit(location)}
                                                >
                                                    <Edit fontSize="small" />
                                                </IconButton>
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    onClick={() =>
                                                        deleteLocation(location.equipmentLocationId, location.locationName)
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

                <Box sx={{ width: "100%", display: "flex", justifyContent: "center", mb: "20px", mt: "20px" }}>

                    <Stack spacing={2}>
                        <Pagination count={totalPages} page={page + 1} onChange={handleChange} />
                    </Stack>
                </Box>


            </Box>

        </Box>
    );
};

export default LocationsCompo;