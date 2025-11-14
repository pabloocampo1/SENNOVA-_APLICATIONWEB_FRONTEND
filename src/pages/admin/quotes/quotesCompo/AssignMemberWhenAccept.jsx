import {
    Avatar,
    Box,
    Button,
    Chip,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import api from "../../../../service/axiosService";
import {
    CheckCircleOutline,
    CloseOutlined,
    PersonAddAlt1,
    Science,
} from "@mui/icons-material";

const AssignMemberWhenAccept = ({
    requestCode,
    onClose,
    testRequestId,
    isAddAnotherMember = false,
}) => {
    const [users, setUsers] = useState([]);
    const [usersSelected, setUsersSelected] = useState([]);
    const theme = useTheme();

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users/getAllAvailable");
            setUsers(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const sendUserRelationAndClose = async () => {
        const objectToSend = {
            testRequestId: testRequestId,
            users: usersSelected,
        };
        try {
            const res = await api.post(
                "/testRequest/assign-members",
                objectToSend
            );
            if (res.status == 200) {
                onClose();
            }
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <Box
            sx={{
                width: { xs: "300px", md: "700px" },
            }}
        >
            <Box
                sx={{
                    display: "grid",
                    justifyContent: "end",
                    mb: "20px",
                }}
                onClick={() => onClose()}
            >
                <CloseOutlined
                    sx={{
                        ":hover": {
                            bgcolor: `${theme.palette.primary.main + "20"}`,
                            p: "2px",
                            borderRadius: "50px",
                            border: `1pz solid ${theme.palette.primary.main}`,
                        },
                    }}
                />
            </Box>

            {isAddAnotherMember ? (
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Typography
                        sx={{
                            fontWeight: "bold",
                            textAlign: "center",
                            color: "primary.main",
                            display: "flex",
                            alignItems: "center",
                        }}
                        variant="h3"
                        component={"h3"}
                    >
                        <PersonAddAlt1 sx={{ mr: "10px" }} /> Agregar usuario
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}05 100%)`,

                        p: 3,
                        borderRadius: "12px 12px 0 0",
                        mb: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            mb: 1,
                        }}
                    >
                        <Science color="primary" sx={{ fontSize: 28 }} />
                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 600,
                                color: theme.palette.primary.main,
                            }}
                        >
                            Ensayo Aceptado
                        </Typography>
                    </Box>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ lineHeight: 1.6 }}
                    >
                        Asigna los responsables para la emisión de resultados
                        del ensayo
                        <Chip
                            label={`#${requestCode}`}
                            size="small"
                            sx={{
                                ml: 1,
                                fontWeight: 600,
                                bgcolor: theme.palette.primary.main + "20",
                                color: theme.palette.primary.main,
                            }}
                        />
                    </Typography>
                </Box>
            )}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: "30px",
                    mt: "50px",
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={{
                        fontWeight: 600,
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                    }}
                >
                    <PersonAddAlt1 fontSize="small" color="action" />
                    Usuarios Disponibles
                </Typography>
                <Chip
                    label={`${usersSelected.length} seleccionado${
                        usersSelected.length !== 1 ? "s" : ""
                    }`}
                    color="primary"
                    size="small"
                    sx={{ fontWeight: 500 }}
                />
            </Box>

            <Box
                sx={{
                    width: "100%",
                    height: "300px",
                    overflowY: "auto",
                    overflowX: "hidden",
                    p: "1px",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "10px",
                    mb: "70px",
                }}
            >
                {users.map((user, index) => (
                    <Tooltip
                        key={index}
                        title={
                            [...usersSelected].includes(user.userId)
                                ? `quitar a ${user.name}`
                                : `Seleccionar a ${user.name}`
                        }
                    >
                        <Box
                            key={index}
                            sx={{
                                height: "100px",
                                position: "relative",
                                bgcolor: [...usersSelected].includes(
                                    user.userId
                                )
                                    ? `#42664050`
                                    : `#42664010`,
                                display: "flex",
                                alignItems: "center",
                                border: [...usersSelected].includes(user.userId)
                                    ? `1px solid ${theme.palette.primary.main}`
                                    : `1px solid ${theme.palette.border.primary}`,
                                p: "10px",
                                pt: "10px",

                                borderRadius: "20px",
                            }}
                            onClick={() => {
                                if (usersSelected.includes(user.userId)) {
                                    setUsersSelected(
                                        usersSelected.filter(
                                            (id) => id !== user.userId
                                        )
                                    );
                                } else {
                                    setUsersSelected([
                                        ...usersSelected,
                                        user.userId,
                                    ]);
                                }
                            }}
                        >
                            <Avatar src={user.imageProfile} alt={user.name} />

                            <Box
                                sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    ml: "20px",
                                }}
                            >
                                <Typography variant="body1">
                                    {" "}
                                    {user.name}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ opacity: "0.50" }}
                                >
                                    {" "}
                                    {user.position}
                                </Typography>
                            </Box>
                            <Typography>
                                {[...usersSelected].includes(user.userId) ? (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 5,
                                            right: 10,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                            }}
                                            color="success"
                                        >
                                            Agregado
                                        </Typography>
                                        <CheckCircleOutline color="success" />
                                    </Box>
                                ) : (
                                    ""
                                )}
                            </Typography>
                        </Box>
                    </Tooltip>
                ))}
            </Box>

            <Button
                sx={{ width: "100%" }}
                variant="contained"
                onClick={() => sendUserRelationAndClose()}
            >
                Agregar y guardar
            </Button>
        </Box>
    );
};

export default AssignMemberWhenAccept;
