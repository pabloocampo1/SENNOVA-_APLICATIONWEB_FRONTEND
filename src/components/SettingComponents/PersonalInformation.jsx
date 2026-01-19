import {
    Box,
    Button,
    TextField,
    Typography,
    Avatar,
    Snackbar,
    Alert,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../service/axiosService";

const PersonalInformation = () => {
    const { authObject, setAuthObject } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const [responseAlert, setResponseAlert] = useState({
        status: false,
        message: "",
    });
    const [formData, setFormData] = useState({
        userId: 0,
        name: "",
        jobPosition: "",
        phoneNumber: "",
        profileImage: null,
    });

    const [preview, setPreview] = useState("");

    const fetchData = async () => {
        try {
            const res = await api.get(`/users/getByEmail/${authObject.email}`);
            const data = res.data;
            setFormData({
                userId: data.userId || 0,
                name: data.name || "",
                jobPosition: data.position || "",
                phoneNumber: data.phoneNumber || "",
                profileImage: null,
            });

            setPreview(data.imageProfile);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, profileImage: file });
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataToSend = new FormData();
        dataToSend.append("name", formData.name);
        dataToSend.append("jobPosition", formData.jobPosition);
        dataToSend.append("phoneNumber", formData.phoneNumber);
        dataToSend.append("userId", formData.userId);

        if (formData.profileImage) {
            dataToSend.append("image", formData.profileImage);
        }

        try {
            const res = await api.put("/users/updateProfile", dataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setResponseAlert({
                status: true,
                message: "Se actualizo correctamente el perfil",
            });
            setAuthObject({
                ...authObject,
                imageProfile: res.data.imageProfile,
            });
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (loading) return <Typography>Cargando datos...</Typography>;

    return (
        <Box sx={{ width: "300px", maxWidth: "500px", p: "20px" }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "600" }}>
                Configuración de Perfil
            </Typography>

            {responseAlert.status && (
                <Snackbar
                    open={responseAlert.status}
                    autoHideDuration={5000}
                    onClose={() => {
                        setResponseAlert({
                            ...responseAlert,
                            status: false,
                        });
                        setResponseAlert({
                            status: false,
                            message: "",
                        });
                    }}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                >
                    <Alert
                        severity="success"
                        onClose={() =>
                            setResponseAlert({
                                status: false,
                                message: "",
                            })
                        }
                        sx={{ width: "100%" }}
                    >
                        {responseAlert.message}
                    </Alert>
                </Snackbar>
            )}

            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        mb: 1,
                    }}
                >
                    <Box sx={{ position: "relative" }}>
                        <Avatar
                            src={preview}
                            sx={{
                                width: 110,
                                height: 110,
                                border: "3px solid",
                                borderColor: "primary.main",
                                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                            }}
                        />
                        <Button
                            variant="contained"
                            component="label"
                            sx={{
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                minWidth: 0,
                                width: 32,
                                height: 32,
                                borderRadius: "50%",
                                p: 0,
                            }}
                        >
                            +
                            <input
                                type="file"
                                hidden
                                accept="image/*"
                                onChange={handleFileChange}
                            />
                        </Button>
                    </Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        Click para cambiar foto
                    </Typography>
                </Box>

                <TextField
                    name="name"
                    label="Nombre Completo"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    name="jobPosition"
                    label="Cargo"
                    value={formData.jobPosition}
                    onChange={handleChange}
                    fullWidth
                />

                <TextField
                    name="phoneNumber"
                    type="text"
                    label="Teléfono"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    fullWidth
                />

                <Button variant="outlined" component="label">
                    Subir Foto de Perfil
                    <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </Button>

                <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                    Guardar Cambios
                </Button>
            </Box>
        </Box>
    );
};

export default PersonalInformation;
