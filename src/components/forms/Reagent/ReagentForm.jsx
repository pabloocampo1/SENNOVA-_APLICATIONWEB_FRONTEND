import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../service/axiosService";
import { useAuth } from "../../../context/AuthContext";
import SimpleBackdrop from "../../SimpleBackDrop";

const unitOfMeasure = [
    "ML",
    "L",
    "UL",
    "MG",
    "G",
    "KG",
    "UG",
    "MM",
    "CM",
    "M",
    "MOL",
    "MMOL_L",
    "UMOL_L",
    "UNIT",
    "PPM",
    "PPB",
    "S",
    "MIN",
    "H",
    "C",
    "K",
];

const ReagentForm = ({ refreshData, onClose, data = {}, isEdit = false }) => {
    const { authObject } = useAuth();
    const [usages, setUsages] = useState([]);
    const [location, setLocations] = useState([]);

    const [dataForm, setDataForm] = useState({
        reagentsId: null,
        reagentName: "",
        brand: "",
        purity: "",
        units: "",
        quantity: "",
        unitOfMeasure: "",
        batch: "",
        expirationDate: "",
        senaInventoryTag: "",
        responsible: "",
        locationId: "",
        usageId: "",
        description: "",
    });
    const [imageFile, setImageFile] = useState(null);
    const [errorFetchMessage, setErrorFetchMessage] = useState("");
    const [errorFetch, setErrorFetch] = useState(false);
    const [isLoanding, setIsLoanding] = useState(false);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleInput = (e) => {
        setDataForm({
            ...dataForm,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (isEdit) {
            setIsLoanding(true);

            try {
                const formData = new FormData();

                const jsonBlob = new Blob([JSON.stringify(dataForm)], {
                    type: "application/json",
                });
                formData.append("dto", jsonBlob);

                if (imageFile) {
                    formData.append("image", imageFile);
                }

                const res = await api.put(
                    `/reagent/update/${dataForm.reagentsId}`,
                    formData,
                );
                console.log(dataForm);

                if (res.status == 200) {
                    setDataForm({});
                    refreshData();
                    onClose();
                }

                console.log(res);
            } catch (error) {
                setErrorFetchMessage(
                    "Ocurrio un error al guardar el reactivo: " +
                        error.data.message,
                );
                setErrorFetch(true);
            } finally {
                setIsLoanding(false);
            }
        } else {
            setIsLoanding(true);
            try {
                const formData = new FormData();

                const jsonBlob = new Blob([JSON.stringify(dataForm)], {
                    type: "application/json",
                });
                formData.append("dto", jsonBlob);

                if (imageFile) {
                    formData.append("image", imageFile);
                }

                const res = await api.post(
                    `/reagent/save/${authObject.username}`,
                    formData,
                );
                console.log(dataForm);

                if (res.status == 201) {
                    setDataForm({});
                    refreshData();
                    onClose();
                }

                console.log(res);
            } catch (error) {
                setErrorFetchMessage(
                    "Ocurrio un error al guardar el reactivo: " +
                        error.data.message,
                );
                setErrorFetch(true);
            } finally {
                setIsLoanding(false);
            }
        }
    };

    const fetchUsages = async () => {
        try {
            const res = await api.get("/usage/getAll");
            setUsages(res.data);
        } catch (error) {
            setErrorFetchMessage(
                "Ocurrio un error al traer la informacion de los usos: " +
                    error.data.message,
            );
            setErrorFetch(true);
        }
    };

    const fetchLocations = async () => {
        try {
            const res = await api.get("/location/getAll");
            setLocations(res.data);
        } catch (error) {
            setErrorFetchMessage(
                "Ocurrio un error al traer la informacion de las ubicaciones: " +
                    error.data.message,
            );
            setErrorFetch(true);
        }
    };

    useEffect(() => {
        setIsLoanding(true);
        setErrorFetch(false);
        setErrorFetchMessage("");

        if (data) {
            setDataForm({
                ...data,
                reagentsId: data.reagentsId,
            });
            console.log(data);
        }

        const init = async () => {
            await fetchLocations();
            await fetchUsages();
        };

        init();
        setIsLoanding(false);
    }, []);

    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: "40px",
            }}
        >
            <SimpleBackdrop open={isLoanding} />
            <Typography sx={{ pb: "30px" }}>
                {isEdit ? "Editar reactivo." : "Agregar reactivo."}
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "250px", md: "250px 250px" },
                    gap: "20px",
                }}
            >
                <TextField
                    name="reagentName"
                    label="Nombre"
                    placeholder="Nombre del reactivo"
                    onChange={handleInput}
                    value={dataForm.reagentName || ""}
                    required
                />
                <TextField
                    label="Placa SENA"
                    type="number"
                    name="senaInventoryTag"
                    placeholder="Placa sena"
                    onChange={handleInput}
                    value={dataForm.senaInventoryTag || ""}
                    required
                />

                <TextField
                    label="Marca"
                    name="brand"
                    placeholder="Marca"
                    onChange={handleInput}
                    value={dataForm.brand || ""}
                />

                <TextField
                    label="Pureza"
                    name="purity"
                    placeholder="Pureza (No mayor a 100%)"
                    onChange={handleInput}
                    value={dataForm.purity || ""}
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                />

                <TextField
                    label="Unidades"
                    name="units"
                    placeholder="Escribe las unidades"
                    onChange={handleInput}
                    value={dataForm.units || ""}
                    type="number"
                />

                <TextField
                    label="Cantidad"
                    name="quantity"
                    placeholder="Cantidad del reactivo"
                    onChange={handleInput}
                    value={dataForm.quantity ?? ""}
                    required
                    type="number"
                />

                <TextField
                    label="Fecha de expiración"
                    name="expirationDate"
                    type="date"
                    value={dataForm.expirationDate || ""}
                    onChange={handleInput}
                    required
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    select
                    label="Unidad de medida del reactivo"
                    name="unitOfMeasure"
                    value={dataForm.unitOfMeasure || ""}
                    onChange={handleInput}
                    required
                    sx={{ minWidth: "20px" }}
                >
                    {unitOfMeasure.map((unit) => (
                        <MenuItem key={unit} value={unit}>
                            {unit}
                        </MenuItem>
                    ))}
                </TextField>

                <TextField
                    select
                    name="locationId"
                    label="Ubicacion del reactivo"
                    value={dataForm.locationId}
                    onChange={handleInput}
                    required
                >
                    {location.length < 1 && (
                        <Typography>
                            No hay ubicaciones agregadas, agrega una.
                        </Typography>
                    )}
                    {location.map((location) => {
                        return (
                            <MenuItem
                                key={location.equipmentLocationId}
                                value={location.equipmentLocationId}
                            >
                                {location.locationName}
                            </MenuItem>
                        );
                    })}
                </TextField>

                <TextField
                    select
                    name="usageId"
                    label="Uso del reactivo"
                    value={dataForm.usageId}
                    onChange={handleInput}
                    required
                >
                    {usages.length < 1 && (
                        <Typography>
                            No hay ubicaciones agregadas, agrega una.
                        </Typography>
                    )}
                    {usages.map((usage) => {
                        return (
                            <MenuItem
                                key={usage.equipmentUsageId}
                                value={usage.equipmentUsageId}
                            >
                                {usage.usageName}
                            </MenuItem>
                        );
                    })}
                </TextField>

                <TextField
                    label="Cuentadante"
                    name="responsible"
                    placeholder="Cuentadante"
                    onChange={handleInput}
                    value={dataForm.responsible || ""}
                />

                <TextField
                    name="batch"
                    label="Lote"
                    placeholder="Lote "
                    onChange={handleInput}
                    value={dataForm.batch || ""}
                    type="number"
                />

                <TextField
                    label="Descripción"
                    name="description"
                    value={dataForm.description}
                    onChange={handleInput}
                    multiline
                />

                <TextField
                    type="file"
                    label="Imagen"
                    name="image"
                    onChange={handleImageChange}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: "1 1 100%" }}
                />

                {dataForm.imageUrl !== null && (
                    <Box>
                        <Typography>Imagen actual: </Typography>
                        <img
                            src={dataForm.imageUrl}
                            width={"200px"}
                            alt="imagenDeUnReactivo"
                        />
                    </Box>
                )}
            </Box>
            {errorFetch && <Typography>{errorFetchMessage}</Typography>}
            <Button
                sx={{ mt: "20px", textTransform: "none" }}
                variant="outlined"
                type="submit"
            >
                guardar
            </Button>
        </Box>
    );
};

export default ReagentForm;
