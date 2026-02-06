import {
    Box,
    Button,
    IconButton,
    InputAdornment,
    MenuItem,
    Switch,
    TextField,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import api from "../../../service/axiosService";
import SimpleBackdrop from "../../SimpleBackDrop";
import { AuthContext } from "../../../context/AuthContext";
import { InfoOutlined } from "@mui/icons-material";

const UserForm = ({
    data = null,
    onClose,
    update,
    success,
    emailCurrentUser,
}) => {
    const [formData, setFormData] = useState({
        userId: null,
        name: "",
        dni: null,
        phoneNumber: null,
        email: "",
        position: "",
        available: true,
        roleName: "",
    });
    const [isLoanding, setIsLoanding] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { authObject, logout } = useContext(AuthContext);
    const [roleList, setRoleList] = useState([]);
    const [errorsList, setErrorList] = useState({});
    const [errorMessage, setErrorMessage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleImageChange = (e) => {
        setImageFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.userId == null) {
            saveUser(formData);
        } else {
            updateUser(formData);
        }
    };

    const saveUser = async (dto) => {
        setIsLoanding(true);
        try {
            const formData = new FormData();
            formData.append(
                "dto",
                new Blob([JSON.stringify(dto)], { type: "application/json" }),
            );
            if (imageFile != null) {
                formData.append("image", imageFile);
            }

            const res = await api.post("/users/save", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status == 201) {
                console.log(res);
                console.log(authObject);

                update(res.data);
                onClose();
            }
        } catch (error) {
            console.error(error);

            if (error.response) {
                const backendError = error.response.data;
                if (backendError.errors) {
                    setErrorList({
                        ...backendError.errors,
                    });
                }
            }

            if (error.response) {
                const backendError = error.response.data;
                setErrorMessage(backendError.message);
            }
        } finally {
            setIsLoanding(false);
        }
    };

    const updateUser = async (dto) => {
        setIsLoanding(true);
        try {
            const formData = new FormData();
            formData.append(
                "dto",
                new Blob([JSON.stringify(dto)], { type: "application/json" }),
            );
            if (imageFile != null) {
                formData.append("image", imageFile);
            }

            const res = await api.put(`/users/update/${dto.userId}`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log(res);

            if (res.status == 200) {
                onClose();
                success();

                update(res.data);
                if (
                    res.data.email === authObject.email &&
                    `ROLE_${res.data.roleName}` !== authObject.role
                ) {
                    await logout();
                }
                onClose();
            }
        } catch (error) {
            if (error.response) {
                const backendError = error.response.data;
                if (backendError.errors) {
                    setErrorList({
                        ...backendError.errors,
                    });
                }
            }

            if (error.response) {
                const backendError = error.response.data;
                setErrorMessage(backendError.message);
            }
        } finally {
            setIsLoanding(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const getRole = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get("/role/getAll");
            if (res.status == 200) {
                setRoleList(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    useEffect(() => {
        getRole();

        if (data && Object.keys(data).length > 0) {
            setIsEdit(true);
            setFormData({ ...data });
        } else {
            setIsEdit(false);
        }
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
            }}
        >
            <SimpleBackdrop open={isLoanding} />
            <Typography
                variant="h3"
                sx={{ minWidth: "300px", pb: "20px", textAlign: "center" }}
            >
                {isEdit ? "Editar usuario" : "Agregar un nuevo usuario."}
            </Typography>
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "200px 200px",
                    gap: "20px",
                    mb: "40px",
                }}
            >
                <TextField
                    label="Nombre"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    type="number"
                    label="Numero de cedula"
                    name="dni"
                    value={formData.dni || ""}
                    onChange={handleChange}
                    error={!!errorsList?.dni}
                    helperText={errorsList?.dni}
                    required
                    fullWidth
                />

                <TextField
                    type="number"
                    label="Numero de telefono"
                    name="phoneNumber"
                    value={formData.phoneNumber || ""}
                    onChange={handleChange}
                    required
                    error={!!errorsList?.phoneNumber}
                    helperText={errorsList?.phoneNumber}
                    fullWidth
                />

                <TextField
                    type="email"
                    label="Email"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    label="posicion"
                    name="position"
                    value={formData.position || ""}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <TextField
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    InputLabelProps={{ shrink: true }}
                    sx={{ flex: "1 1 100%" }}
                />

                <TextField
                    select
                    label="Rol en el sistema"
                    name="roleName"
                    value={formData.roleName || ""}
                    onChange={handleChange}
                    required
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <Tooltip
                                    title="Si cambias tu rol deberas de iniciar sesion nuevamente"
                                    arrow
                                    placement="top"
                                >
                                    <IconButton size="small" edge="end">
                                        <InfoOutlined
                                            fontSize="small"
                                            color="primary"
                                        />
                                    </IconButton>
                                </Tooltip>
                            </InputAdornment>
                        ),
                    }}
                    sx={{ flex: "1 1 calc(50% - 8px)" }}
                >
                    {roleList.length < 1 && (
                        <Typography>no hay roles para mostrar.</Typography>
                    )}
                    {roleList.map((role) => {
                        return (
                            <MenuItem key={role.roleId} value={role.nameRole}>
                                {role.nameRole}
                            </MenuItem>
                        );
                    })}
                </TextField>

                <Typography
                    sx={{
                        gridColumn: "1 / -1",
                        color: "#d32f2f",
                        fontSize: "0.85rem",
                        textAlign: "center",
                        mt: 1,
                    }}
                >
                    ⚠️ Si cambias tu rol, tu sesión se cerrará automáticamente y
                    deberás iniciar sesión nuevamente.
                </Typography>

                {emailCurrentUser == formData.email ? (
                    ""
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Typography sx={{ textAlign: "center" }}>
                            Activar o desactivar cuenta
                        </Typography>
                        <Switch
                            name="available"
                            checked={formData.available}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    available: e.target.checked,
                                })
                            }
                        />
                    </Box>
                )}
            </Box>

            {errorMessage && (
                <Typography sx={{ color: "red" }}>{errorMessage}</Typography>
            )}
            <Button variant="outlined" type="submit">
                {isEdit ? "Editar usuario" : "Registrar usuario."}
            </Button>

            {!isEdit && (
                <Typography
                    sx={{
                        textAlign: "center",
                        fontSize: "0.90rem",
                        opacity: "0.50",
                        p: "30px",
                    }}
                >
                    ** Una vez creado el usuario, podra ingresar al sistema
                    mediante nombre de usuario y contraseña <br /> o el email
                    que registre. <br /> El nombre de usuario y contraeña por
                    defecto una vez creado sera su numero de identificacion{" "}
                    <br /> el usuario podra cambiar estos datos dentro del
                    sistema***
                </Typography>
            )}
        </Box>
    );
};

export default UserForm;
