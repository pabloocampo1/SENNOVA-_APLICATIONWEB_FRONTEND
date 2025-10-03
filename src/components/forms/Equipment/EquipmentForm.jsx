import { Box, Button, TextField, Typography, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../service/axiosService";

const EquipmentForm = ({ method, errors = {}, data = null, isEdit }) => {
    const [formData, setFormData] = useState({
        equipmentId: null,
        internalCode: "",
        equipmentName: "",
        brand: "",
        model: "",
        serialNumber: "",
        acquisitionDate: "",
        maintenanceDate: "",
        amperage: "",
        voltage: "",
        equipmentCost: "",
        state: "",
        responsibleId: "",
        locationId: "",
        description: "",
        usageId: "",
        imageUrl: "",
        senaInventoryTag: ""
    });


    const [users, setUsers] = useState([]);
    const [locations, setLocations] = useState([]);
    const [usages, setUsages] = useState([]);

    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };


    const handleForm = (e) => {
        e.preventDefault();


        if (!data) {

            method(formData, imageFile);
        } else {


            const equipmentRequestDto = {
                equipmentId: formData.equipmentId,
                internalCode: formData.internalCode,
                equipmentName: formData.equipmentName,
                brand: formData.brand,
                model: formData.model,
                serialNumber: Number(formData.serialNumber),
                acquisitionDate: formData.acquisitionDate,
                maintenanceDate: formData.maintenanceDate,
                amperage: formData.amperage,
                voltage: formData.voltage,
                equipmentCost: Number(formData.equipmentCost),
                state: formData.state,
                responsibleId: Number(formData.responsibleId),
                description: formData.description,
                locationId: Number(formData.locationId),
                usageId: Number(formData.usageId),
                imageUrl: formData.imageUrl,
                senaInventoryTag: formData.senaInventoryTag
            };
            method(equipmentRequestDto, imageFile);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const fetchUsages = async () => {
        try {
            const res = await api.get("/usage/equipment/getAll");
            setUsages(res.data)
        } catch (error) {
            console.log(error);

        }
    }
    const fetchUsers = async () => {
        try {
            const res = await api.get("/users/getAll");
            setUsers(res.data)
        } catch (error) {
            console.log(error);

        }
    }
    const fetchLocations = async () => {
        try {
            const res = await api.get("/location/getAll");
            setLocations(res.data)
        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
      
        if (data) {
            console.log(data);
            setFormData({
                ...data,
                acquisitionDate: data.acquisitionDate?.split("T")[0] || "",
                maintenanceDate: data.maintenanceDate?.split("T")[0] || "",
                locationName: data.locationName || "",
                locationId: data.locationId || "",
                usageName: data.usageName || "",
                usageId: data.usageId || "",
                description: data.description || "",
                responsibleId: data.responsibleId || "",
                responsibleName: data.responsibleName || ""
            });
        }


        fetchUsers()
        fetchLocations()
        fetchUsages()
    }, [data]);

    return (
        <Box
            component="form"
            onSubmit={handleForm}
            sx={{
                width: "100%",
                maxWidth: "900px",
                mx: "auto",
                p: 3,
                borderRadius: 2,
                display: "flex",
                flexDirection: "column",
                gap: 2,
            }}
        >
            <Typography
                component="h2"
                sx={{
                    textAlign: "center",
                    fontSize: "22px",
                    fontWeight: "600",
                    mb: 2,
                }}
            >
                {isEdit ? "Editar equipo" : "Agregar equipo"}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 2,
                }}
            >
                <TextField
                    label="Código interno"
                    name="internalCode"
                    value={formData.internalCode}
                    onChange={handleChange}
                    required
                    error={!!errors?.internalCode}
                    helperText={errors?.internalCode}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    label="Placa sena"
                    name="senaInventoryTag"
                    value={formData.SenaInventoryTag}
                    onChange={handleChange}
                    error={!!errors?.SenaInventoryTag}
                    helperText={errors?.SenaInventoryTag}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    label="Nombre del equipo"
                    name="equipmentName"
                    value={formData.equipmentName}
                    onChange={handleChange}
                    required
                    error={!!errors?.equipmentName}
                    helperText={errors?.equipmentName}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    label="Marca"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    label="Modelo"
                    name="model"
                    value={formData.model}
                    onChange={handleChange}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    type="number"
                    label="Número de serie"
                    name="serialNumber"
                    value={formData.serialNumber}
                    onChange={handleChange}
                    required
                    error={!!errors?.serialNumber}
                    helperText={errors?.serialNumber}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    type="date"
                    label="Fecha de adquisición"
                    name="acquisitionDate"
                    value={formData.acquisitionDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                    error={!!errors?.acquisitionDate}
                    helperText={errors?.acquisitionDate}
                />

                <TextField
                    type="date"
                    label="Fecha de mantenimiento"
                    name="maintenanceDate"
                    value={formData.maintenanceDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    required
                    error={!!errors?.maintenanceDate}
                    helperText={errors?.maintenanceDate}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    label="Amperaje"
                    name="amperage"
                    value={formData.amperage}
                    onChange={handleChange}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    label="Voltaje"
                    name="voltage"
                    value={formData.voltage}
                    onChange={handleChange}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    type="number"
                    label="Costo del equipo"
                    name="equipmentCost"
                    value={formData.equipmentCost}
                    onChange={handleChange}
                    required
                    error={!!errors?.equipmentCost}
                    helperText={errors?.equipmentCost}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />

                <TextField
                    select
                    label="Estado"
                    name="state"
                    value={formData.state || ""}
                    onChange={handleChange}
                    required
                    error={!!errors?.state}
                    helperText={errors?.state}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                >
                    <MenuItem value="Activo">Activo</MenuItem>
                    <MenuItem value="Dado de baja">Dado de baja</MenuItem>
                    <MenuItem value="Fuera de servicio">Fuera de servicio</MenuItem>
                </TextField>

                <TextField
                    select
                    label="Responsable"
                    name="responsibleId"
                    value={formData.responsibleId || ""}
                    onChange={handleChange}
                    required
                    error={!!errors?.state}
                    helperText={errors?.state}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                >

                    {users.length < 1 && (<Typography>No hay usuarios</Typography>)}
                    {users.map(user => {
                        return <MenuItem key={user.userId} value={user.userId}>{user.name}</MenuItem>
                    })}
                </TextField>

                <TextField
                    select
                    label="Ubicación"
                    name="locationId"
                    value={formData.locationId || ""}
                    onChange={handleChange}
                    required
                    error={!!errors?.state}
                    helperText={errors?.state}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                >
                    {locations.length < 1 && (<Typography>No hay ubicaciones</Typography>)}
                    {locations.map(location => {
                        return <MenuItem key={location.equipmentLocationId} value={location.equipmentLocationId}>{location.locationName}</MenuItem>
                    })}
                </TextField>


                <TextField
                    select
                    label="uso"
                    name="usageId"
                    value={formData.usageId || ""}
                    onChange={handleChange}
                    required
                    error={!!errors?.state}
                    helperText={errors?.state}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                >
                    {usages.length < 1 && (<Typography>No hay usos.</Typography>)}
                    {usages.map(usages => {
                        return <MenuItem key={usages.equipmentUsageId} value={usages.equipmentUsageId}>{usages.usageName}</MenuItem>
                    })}
                </TextField>
                <Box>
                    {formData.imageUrl && (
                        <Box>
                            <img src={formData.imageUrl} alt="image of equipment" width={"100px"} />
                        </Box>
                    )}
                </Box>
                <TextField
                    label="Descripción"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    error={!!errors?.description}
                    helperText={errors?.description}
                    multiline

                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                />
                <TextField
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: "1 1 100%" }}
                />
            </Box>

            <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
            >
                {isEdit ? "Editar" : "Guardar"}
            </Button>

            {errors && (
                <Typography sx={{ color: "red", textAlign: "center" }}>
                    {typeof errors === "string"
                        ? errors 
                        : Object.values(errors)[0]} 
                </Typography>
            )}
        </Box>
    );
};

export default EquipmentForm;
