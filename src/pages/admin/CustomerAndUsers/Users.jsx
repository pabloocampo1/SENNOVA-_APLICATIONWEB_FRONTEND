import { Add, Delete, Edit } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";
import GenericModal from "../../../components/modals/GenericModal";
import UserForm from "../../../components/forms/UsersAndCustomer/UserForm";
import api from "../../../service/axiosService";
import ModalDeleteUser from "../../../components/forms/UsersAndCustomer/ModalDeleteUser";
import ModalMessage from "../../../components/modals/ModalMessage";
import { useAuth } from "../../../context/AuthContext";

const Users = ({ users = [], updateList, refresh }) => {
    const theme = useTheme();
    const { authObject } = useAuth();
    const [openModalForm, setOpenModalForm] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);
    const [userToEdit, setUserToEdit] = useState({});
    const [openMessageModal, setOpenModalMessage] = useState(false);

    const updateListUser = (object) => {
        updateList(object);
    };

    const handleDelete = (user) => {
        setUserIdToDelete(user.userId);
        setOpenModalDelete(true);
    };

    const handleCloseModalCreate = () => {
        setOpenModalForm(false);
        setUserToEdit({});
    };

    const handleUpdate = (user) => {
        setUserToEdit(user);
        setOpenModalForm(true);
    };

    const deleteUser = async () => {
        try {
            const res = await api.delete(`/users/delete/${userIdToDelete}`);

            if (res.status == 200) {
                setOpenModalDelete(false);
                refresh();
            }

            if (res.status == 409) {
                setOpenModalMessage(true);
                setOpenModalDelete(false);
            }
        } catch (error) {
            if (error.status == 409) {
                setOpenModalMessage(true);
                setOpenModalDelete(false);
            }
        } finally {
            setUserIdToDelete(null);
        }
    };

    return (
        <Box>
            <GenericModal
                open={openModalForm}
                onClose={() => handleCloseModalCreate()}
                compo={
                    <UserForm
                        data={userToEdit ?? null}
                        emailCurrentUser={authObject.email}
                        onClose={() => handleCloseModalCreate()}
                        update={(object) => updateListUser(object)}
                        success={() => refresh()}
                    />
                }
            />
            <GenericModal
                open={openModalDelete}
                onClose={() => setOpenModalDelete(false)}
                compo={
                    <ModalDeleteUser
                        onClose={() => setOpenModalDelete(false)}
                        update={(object) => updateListUser(object)}
                        deleteUser={() => deleteUser()}
                    />
                }
            />

            <GenericModal
                open={openMessageModal}
                onClose={() => setOpenModalMessage(false)}
                compo={
                    <ModalMessage
                        message={
                            "No se puede eliminar el usuario ya que contiene equipos asigandos, desactiva su cuenta o cambia de cuentadante los equipos que tiene asigandos."
                        }
                        onClose={() => setOpenModalMessage(false)}
                    />
                }
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    mb: "40px",
                }}
            >
                <Box>
                    <Typography variant="h6">
                        Administración de usuarios
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Control centralizado de accesos, roles y estado de los
                        usuarios del sistema.
                    </Typography>
                </Box>

                <Button
                    startIcon={<Add />}
                    variant="contained"
                    onClick={() => setOpenModalForm(true)}
                >
                    Nuevo usuario
                </Button>
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                }}
            >
                {users.map((user) => {
                    return (
                        <>
                            <Box
                                key={user.userId}
                                sx={{
                                    minHeight: "200px",
                                    p: "10px",

                                    borderRadius: "15px",
                                    bgcolor: "background.paper",
                                    position: "relative",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                    }}
                                >
                                    <Box sx={{}}>
                                        {authObject.email == user.email ? (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    p: "5px",
                                                    color: "primary.main",
                                                    bgcolor:
                                                        "background.default",
                                                    border: `1px solid ${theme.palette.border.primary}`,
                                                    borderRadius: "20px",
                                                }}
                                            >
                                                Tu
                                            </Typography>
                                        ) : (
                                            <Typography
                                                variant="caption"
                                                sx={{
                                                    p: "5px",
                                                    bgcolor: `${theme.palette.primary.main}20`,
                                                    borderRadius: "20px",
                                                    border: `1px solid ${theme.palette.primary.main}`,
                                                    color: "text.secondary",
                                                }}
                                            >
                                                {user.role}
                                            </Typography>
                                        )}
                                    </Box>
                                    <Box sx={{}}>
                                        <Typography
                                            variant="caption"
                                            sx={{
                                                p: "5px",
                                                bgcolor: "background.default",
                                                border: `1px solid ${theme.palette.border.primary}`,
                                                borderRadius: "20px",
                                                color: user.available
                                                    ? "text.primary"
                                                    : "red",
                                            }}
                                        >
                                            {user.available
                                                ? "Cuenta activa"
                                                : "cuenta inactiva"}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        mt: "10px",
                                    }}
                                >
                                    <Avatar
                                        src={user.imageProfile}
                                        sx={{ width: "100px", height: "100px" }}
                                    />
                                    <Typography variant="body1">
                                        {user.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            p: "3px",
                                            bgcolor: "background.default",
                                            border: `1px solid ${theme.palette.border.primary}`,
                                            borderRadius: "20px",
                                            color: "text.secondary",
                                        }}
                                    >
                                        {user.position}
                                    </Typography>
                                </Box>

                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        mt: "40px",
                                        gap: "10px",
                                        mb: "10px",
                                    }}
                                >
                                    {authObject.email == user.email ? (
                                        ""
                                    ) : (
                                        <Tooltip title="Eliminar usuario">
                                            <Button
                                                variant="outlined"
                                                onClick={() =>
                                                    handleDelete(user)
                                                }
                                                fullWidth
                                            >
                                                <Delete
                                                    sx={{
                                                        color: "primary.main",
                                                    }}
                                                />
                                            </Button>
                                        </Tooltip>
                                    )}
                                    <Tooltip title="Editar usuario">
                                        <Button
                                            variant="outlined"
                                            onClick={() => handleUpdate(user)}
                                            fullWidth
                                        >
                                            <Edit
                                                sx={{ color: "primary.main" }}
                                            />
                                        </Button>
                                    </Tooltip>
                                </Box>
                            </Box>
                        </>
                    );
                })}
            </Box>
        </Box>
    );
};

export default Users;
