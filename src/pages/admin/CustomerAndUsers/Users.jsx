import { Delete, Edit } from '@mui/icons-material';
import { Box, Button, Divider, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import GenericModal from '../../../components/modals/GenericModal';
import UserForm from '../../../components/forms/UsersAndCustomer/UserForm';
import api from '../../../service/axiosService';
import ModalDeleteUser from '../../../components/forms/UsersAndCustomer/ModalDeleteUser';
import ModalMessage from '../../../components/modals/ModalMessage';
import { useAuth } from '../../../context/AuthContext';

const Users = ({ users = [], updateList, refresh }) => {
    const theme = useTheme();
    const {authObject} = useAuth();
    const [openModalForm, setOpenModalForm] = useState(false);
    const [openModalDelete, setOpenModalDelete] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null)
    const [userToEdit, setUserToEdit] = useState({});
    const [openMessageModal, setOpenModalMessage] = useState(false);

    const updateListUser = (object) => {
        updateList(object)
    }

    const handleDelete = (user) => {
        setUserIdToDelete(user.userId);
        setOpenModalDelete(true);
    }

    const handleCloseModalCreate = () => {
       setOpenModalForm(false)
       setUserToEdit({})
    }

    const handleUpdate = (user) => { 
       setUserToEdit(user)
       setOpenModalForm(true)
    }


    const deleteUser = async () => {
        try {
            const res = await api.delete(`/users/delete/${userIdToDelete}`);
          
            if (res.status == 200) {
                setOpenModalDelete(false)
                refresh()
            }

            if(res.status == 409){
                setOpenModalMessage(true)
                setOpenModalDelete(false)
            }


        } catch (error) {
            if(error.status == 409){
                setOpenModalMessage(true)
                setOpenModalDelete(false)
            }
        } finally {
            setUserIdToDelete(null)

        }
    }


    return (
        <Box>

            <GenericModal open={openModalForm} onClose={() => handleCloseModalCreate()} compo={<UserForm data={userToEdit ?? null} emailCurrentUser={authObject.email} onClose={() => handleCloseModalCreate()} update={(object) => updateListUser(object)} success={() => refresh()} />} />
            <GenericModal open={openModalDelete} onClose={() => setOpenModalDelete(false)} compo={<ModalDeleteUser onClose={() => setOpenModalDelete(false)} update={(object) => updateListUser(object)} deleteUser={() => deleteUser()} />} />

            <GenericModal open={openMessageModal} onClose={() => setOpenModalMessage(false)} compo={<ModalMessage message={"No se puede eliminar el usuario ya que contiene equipos asigandos, desactiva su cuenta o cambia de cuentadante los equipos que tiene asigandos."} onClose={() => setOpenModalMessage(false)} />} />

            <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%", mb: "40px" }}>
                <Typography>Todos los usuarios del sistema:</Typography>
                <Button variant='contained' onClick={() => setOpenModalForm(true)}>Registrar un nuevo usuario</Button>
            </Box>

            <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "20px" }}>
                {users.map((user) => {
                    return <>
                        <Box key={user.userId} sx={{
                            minHeight: "300px",
                            p: "20px",
                            border: `2px solid ${theme.palette.border.primary}`,
                            borderRadius: "15px"
                        }}>
                            <Box sx={{ display: "flex", position: "relative" }}>
                                <Box sx={{ mr: "10px" }}>
                                    <img width={"60px"} style={{ borderRadius: "50px" }} height={"60px"} src={user.imageProfile} alt="imageProfile" />
                                </Box>
                                <Box>
                                    <Typography sx={{ opacity: "0.90" }}>{user.name}</Typography>
                                    <Typography sx={{ opacity: "0.60" }}>{user.email}</Typography>
                                    {authObject.username == user.username ? "Tu" :  ""}
                                </Box>
                                <Box sx={{ display: "flex", justifyContent: "center", position: "absolute", right: "0", gap: "10px" }}>
                                     {authObject.username == user.username ? "" :  ( <Delete onClick={() => handleDelete(user)} sx={{ color: "primary.main" }} />)}
                                    <Edit onClick={() => handleUpdate(user)} sx={{ color: "primary.main" }} />
                                </Box>
                            </Box>
                            <Box sx={{ pt: "50px" }}>
                                <Box sx={{ display: "flex", justifyContent: "space-around", pb: "20px" }}>
                                    <Typography>{user.phoneNumber}</Typography>
                                    <Typography>{user.position}</Typography>
                                </Box>
                                <Divider />
                                <Box sx={{ display: "flex", justifyContent: "space-around", pt: "20px" }}>
                                    <Typography>creado: {user.createAt}</Typography>
                                    <Typography>{user.available ? "Cuenta activa" : "cuenta inactiva"}</Typography>
                                </Box>
                            </Box>

                            <Box sx={{ display: "flex", justifyContent: "center", mt: "40px" }}>
                                <Button onClick={() => alert("En construccion.")} variant='outlined'>Consultar mas informacion</Button>
                            </Box>
                        </Box>
                    </>
                })}
            </Box>
        </Box>
    );
};

export default Users;