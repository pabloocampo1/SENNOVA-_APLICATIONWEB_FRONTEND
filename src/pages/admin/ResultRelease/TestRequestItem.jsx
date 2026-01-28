import { getDays } from "../../../Utils/DateUtils";
import { useNavigate } from "react-router-dom";
import {
    AccessTime,
    Biotech,
    BlockOutlined,
    CalendarMonthOutlined,
    CalendarToday,
    CheckCircle,
    InfoOutline,
    TrendingUp,
    Verified,
} from "@mui/icons-material";
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Chip,
    Divider,
    LinearProgress,
    Tooltip,
    Typography,
} from "@mui/material";

const formattDate = (localDate) => {
    if (!localDate) return "";

    const fechaStr = localDate.split("T")[0];
    const fecha = new Date(fechaStr + "T00:00:00");

    const mesesAbreviados = [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dic",
    ];

    const dia = fecha.getDate();
    const mes = mesesAbreviados[fecha.getMonth()];
    const año = fecha.getFullYear();

    return `${dia} ${mes} ${año}`;
};

const TestRequestItem = ({
    theme,
    index,
    test = {},
    checkIfAreAssignedToTestRequet,
}) => {
    const navigate = useNavigate();

    const getStatusConfig = (status) => {
        const configs = {
            "En proceso": {
                label: "En Proceso",
                color: "info",
                icon: <AccessTime sx={{ fontSize: 16 }} />,
            },
            Terminada: {
                label: "Terminada (pendiente envío)",
                color: "success",
                icon: <CheckCircle sx={{ fontSize: 16 }} />,
            },
            "COMPLETADO Y ENTREGADO": {
                label: "Entregado",
                color: "success",
                icon: <CheckCircle sx={{ fontSize: 16 }} />,
            },
            Vencida: {
                label: "Vencida",
                color: "error",
                icon: <InfoOutline sx={{ fontSize: 16 }} />,
            },
            "Espera de recepción": {
                label: "Pendiente, Espera de recepción",
                color: "warning",
                icon: <Biotech sx={{ fontSize: 16 }} />,
            },
        };
        return configs[status] || configs["Espera de recepción"];
    };

    const configStatus = getStatusConfig(test.deliveryStatus);

    return (
        <Box
            key={index}
            sx={{
                position: "relative",
                bgcolor: "background.paper",
                border: `1px solid ${theme.palette.border.primary}`,
                minHeight: "450px",
                p: "20px",
                borderRadius: "15px",
                mb: "40px",
                transition: "opacity 0.3s ease",
            }}
        >
            {test.deliveryStatus === "COMPLETADO Y ENTREGADO" && (
                <Box
                    sx={{
                        width: "100%",

                        display: "flex",
                        justifyContent: "end",
                        alignItems: "center",
                        borderRadius: "16px",
                        mb: "20px",
                    }}
                >
                    <Chip
                        label="Enviado"
                        icon={<Verified color="primary.main" />}
                        sx={{
                            p: "5px",
                            color: "primary.main",
                        }}
                    />
                </Box>
            )}
            <Typography
                sx={{
                    fontWeight: "bold",
                    mt: "10px",
                    fontSize: "1.2rem",
                    opacity: "0.80",
                }}
            >
                #ENS {test.requestCode}
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                <Chip
                    sx={{
                        mt: "10px",
                        minWidth: "150px",
                        textTransform: "none",
                    }}
                    icon={configStatus.icon}
                    color={configStatus.color}
                    label={configStatus.label}
                />

                {test.deliveryStatus === "COMPLETADO Y ENTREGADO" && (
                    <Chip
                        size="small"
                        variant="outlined"
                        color="success"
                        label="Ensayo finalizado"
                        sx={{
                            mt: 1,
                            opacity: 0.8,
                            textTransform: "none",
                        }}
                    />
                )}

                <Chip
                    sx={{
                        mt: "10px",
                    }}
                    label={
                        test.dueDate == null
                            ? `Sin fecha generada`
                            : getDays(test.dueDate) <= 0
                              ? `fecha vencida`
                              : `Quedan ${getDays(
                                    test.dueDate,
                                )} dias para la entrega`
                    }
                />
            </Box>
            <Divider sx={{ my: 2 }} />

            <Typography
                variant="body2"
                sx={{
                    mb: 2,
                    height: "40px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                }}
            >
                Ensayo con {test.totalSample} muestras y {test.totalAnalysis}{" "}
                análisis
            </Typography>

            <Box sx={{ mt: "20px" }}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <CalendarToday sx={{ mr: "10px" }} />
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                    >
                        Se acepto el: {formattDate(test.approvalDate)}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",

                        mt: "10px",
                    }}
                >
                    <CalendarMonthOutlined sx={{ mr: "10px" }} />
                    <Typography
                        variant="body2"
                        sx={{
                            color: "text.secondary",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        Finalizacion:{" "}
                        {test.dueDate == null
                            ? "Sin fecha"
                            : formattDate(test.dueDate)}
                        <Tooltip
                            title={
                                test.dueDate == null
                                    ? "La fecha fin del ensayo se genera luego de recepcion de muestras"
                                    : "Esta fecha se genero luego de la recepcion de muestras"
                            }
                        >
                            <InfoOutline
                                sx={{
                                    width: "20px",
                                    ml: "5px",
                                }}
                            />
                        </Tooltip>
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        mt: "40px",
                    }}
                >
                    <Box
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            mb: "10px",
                        }}
                    >
                        <Typography variant="caption" color="text.secondary">
                            Progreso
                        </Typography>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >{`${Math.round(test.progress)}%`}</Typography>
                    </Box>
                    <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress
                            variant="determinate"
                            value={test.progress}
                            sx={{
                                height: 8,
                                borderRadius: 4,
                                border: `1px solid ${
                                    theme.palette.primary.main + 90
                                }`,
                                bgcolor: "background.paper",
                                "& .MuiLinearProgress-bar": {
                                    borderRadius: 4,
                                    background:
                                        test.progress === 100
                                            ? `linear-gradient(90deg, ${theme.palette.success.main}, ${theme.palette.success.light})`
                                            : `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                                },
                            }}
                        />
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                        mt: "20px",
                    }}
                >
                    <Box>
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: "block", mb: 0.5 }}
                        >
                            Equipo asignado
                        </Typography>
                        <AvatarGroup
                            sx={{
                                "& .MuiAvatar-root": {
                                    width: 32,
                                    height: 32,
                                    fontSize: 14,
                                    border: `2px solid ${theme.palette.background.paper}`,
                                },
                            }}
                        >
                            <AvatarGroup>
                                {test.teamAssigned.length >= 1 ? (
                                    test.teamAssigned.map((user, idx) => (
                                        <Tooltip
                                            key={idx}
                                            title={user.name}
                                            arrow
                                        >
                                            <Avatar
                                                src={user.imageProfile}
                                                alt={user.name}
                                            />
                                        </Tooltip>
                                    ))
                                ) : (
                                    <Typography
                                        sx={{ pt: "20px" }}
                                        variant="body2"
                                    >
                                        Este ensayo no tiene usuarios asignados
                                    </Typography>
                                )}
                            </AvatarGroup>
                        </AvatarGroup>
                    </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box sx={{ display: "flex", gap: 1 }}>
                    {checkIfAreAssignedToTestRequet(test.teamAssigned) ? (
                        <Button
                            fullWidth
                            variant="outlined"
                            sx={{
                                textTransform: "none",
                            }}
                            size="small"
                            startIcon={<TrendingUp />}
                            onClick={() =>
                                navigate(
                                    `/system/result/test-request/${test.testRequestId}`,
                                )
                            }
                        >
                            Gestionar
                        </Button>
                    ) : (
                        <Box
                            sx={{
                                width: "100%",
                                bgcolor: "background.default",
                                p: "10px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                borderRadius: "20px",
                            }}
                        >
                            <Typography variant="body2">
                                No tienes acceso a este ensayo
                            </Typography>
                            <BlockOutlined
                                sx={{
                                    width: "20px",
                                    ml: "5px",
                                }}
                            />
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
};

export default TestRequestItem;
