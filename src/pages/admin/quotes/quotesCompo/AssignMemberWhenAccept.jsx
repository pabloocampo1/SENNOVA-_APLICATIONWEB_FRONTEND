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
    samples = [],
    isAddAnotherMember = false,
}) => {
    const [users, setUsers] = useState([]);
    const [usersSelected, setUsersSelected] = useState([]);
    const theme = useTheme();

    const isUserQualifiedForSamples = (userAnalyses = [], samples = []) => {
        return samples.every((sample) =>
            sample.analysisEntities?.every((entity) =>
                userAnalyses.some(
                    (ua) => ua.analysisId === entity.product?.analysisId,
                ),
            ),
        );
    };

    const fetchUsers = async () => {
        try {
            const res = await api.get("/users/available-with-competencies");
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
                objectToSend,
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
                {users.map((user, index) => {
                    const isQualified = isUserQualifiedForSamples(
                        user.qualifiedAnalyses,
                        samples,
                    );
                    return (
                        <Tooltip
                            key={index}
                            title={
                                !isQualified
                                    ? `No capacitado `
                                    : usersSelected.includes(user.userId)
                                      ? `Quitar a ${user.name}`
                                      : `Seleccionar a ${user.name}`
                            }
                        >
                            <Box
                                key={user.userId}
                                sx={{
                                    height: "140px",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    p: 2,
                                    borderRadius: "16px",
                                    position: "relative",

                                    bgcolor: isQualified
                                        ? usersSelected.includes(user.userId)
                                            ? "primary.main"
                                            : "background.paper"
                                        : "#ffebee",

                                    color:
                                        isQualified &&
                                        usersSelected.includes(user.userId)
                                            ? "primary.contrastText"
                                            : "text.primary",

                                    border: isQualified
                                        ? `1px solid ${
                                              usersSelected.includes(
                                                  user.userId,
                                              )
                                                  ? theme.palette.primary.main
                                                  : theme.palette.divider
                                          }`
                                        : `1px solid ${theme.palette.error.main}`,

                                    boxShadow: isQualified
                                        ? usersSelected.includes(user.userId)
                                            ? "0 8px 24px rgba(66,102,64,0.35)"
                                            : "0 4px 14px rgba(0,0,0,0.08)"
                                        : "none",

                                    cursor: isQualified
                                        ? "pointer"
                                        : "not-allowed",
                                    opacity: isQualified ? 1 : 0.65,

                                    transition: "all .25s ease",

                                    "&:hover": isQualified
                                        ? {
                                              transform: "translateY(-2px)",
                                              boxShadow:
                                                  "0 10px 28px rgba(0,0,0,0.18)",
                                          }
                                        : {},
                                }}
                                onClick={() => {
                                    if (!isQualified) return;

                                    setUsersSelected((prev) =>
                                        prev.includes(user.userId)
                                            ? prev.filter(
                                                  (id) => id !== user.userId,
                                              )
                                            : [...prev, user.userId],
                                    );
                                }}
                            >
                                <Avatar
                                    src={user.imageProfile}
                                    alt={user.name}
                                />

                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        ml: "20px",
                                        flex: 1,
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{ fontWeight: 600 }}
                                    >
                                        {user.name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{ opacity: 0.6 }}
                                    >
                                        {user.position}
                                    </Typography>

                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: "bold",
                                            color: isQualified
                                                ? "success.main"
                                                : "error.main",
                                        }}
                                    >
                                        {isQualified
                                            ? "Capacitado"
                                            : "No capacitado"}
                                    </Typography>
                                </Box>

                                {/* Iconos de estado (Check o Error) */}
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: 5,
                                        right: 10,
                                    }}
                                >
                                    {usersSelected.includes(user.userId) && (
                                        <CheckCircleOutline color="success" />
                                    )}
                                    {!isQualified && (
                                        <Tooltip title="Faltan competencias técnicas">
                                            <CloseOutlined color="error" />
                                        </Tooltip>
                                    )}
                                </Box>
                            </Box>
                        </Tooltip>
                    );
                })}
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
