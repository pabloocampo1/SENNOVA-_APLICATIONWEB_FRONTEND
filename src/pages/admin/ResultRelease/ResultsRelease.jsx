import {
    AccessTime,
    Biotech,
    CalendarMonth,
    CalendarMonthOutlined,
    CalendarToday,
    CheckCircle,
    InfoOutline,
    Science,
    TrendingUp,
    Visibility,
} from "@mui/icons-material";
import {
    Avatar,
    AvatarGroup,
    Box,
    Button,
    Chip,
    Divider,
    FormControl,
    InputLabel,
    LinearProgress,
    MenuItem,
    Select,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchBar from "../../../components/SearchBar";
import api from "../../../service/axiosService";

const ResultsRelease = () => {
    const theme = useTheme();
    const [testRequest, setTestRequest] = useState([]);

    const getTestRequestAccepted = async () => {
        try {
            const res = await api.get("/testRequest/get-all-info-summary");
            setTestRequest(res.data);
        } catch (error) {
            console.error(error);
        }
    };

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

    const getStatusConfig = (status) => {
        const configs = {
            "En proceso": {
                label: "En Proceso",
                color: "info",
                icon: <AccessTime sx={{ fontSize: 16 }} />,
            },
            Terminada: {
                label: "Completado",
                color: "success",
                icon: <CheckCircle sx={{ fontSize: 16 }} />,
            },
            "En Vencida": {
                label: "Completado",
                color: "error",
                icon: <InfoOutline sx={{ fontSize: 16 }} />,
            },
            "Espera de recepción": {
                label: "Pendiente",
                color: "warning",
                icon: <Biotech sx={{ fontSize: 16 }} />,
            },
        };
        return configs[status] || configs["Espera de recepción"];
    };
    useEffect(() => {
        getTestRequestAccepted();
    }, []);

    return (
        <Box
            sx={{
                bgcolor: "background.default",
                minHeight: "100%",
                p: "20px",
                borderRadius: "20px",
            }}
        >
            {/* HEADER */}
            <Box>
                {/* info about header */}
                <Box>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Science sx={{ color: "primary.main", mr: "15px" }} />
                        <Typography component={"h2"} variant="h2">
                            Ensayos Activos
                        </Typography>

                        <Chip
                            label={testRequest.length}
                            sx={{
                                bgcolor: `${theme.palette.primary.main}40`,
                                ml: "15px",
                                fontWeight: "bold",
                                textAlign: "center",
                            }}
                        />
                    </Box>
                    <Box>
                        <Typography variant="body1" sx={{ opacity: "0.80" }}>
                            Cotizaciones aceptadas que ahora se encuentran en
                            proceso de ensayo
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {/* options */}
            <Box
                sx={{
                    mt: "40px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                    }}
                >
                    <SearchBar
                        // onSearch={(e) => getDataBySearch(e)}
                        placeholder="Buscar ensayo por codigo"
                    />

                    <FormControl
                        sx={{
                            width: "150px",
                            borderRadius: "20px",
                            ml: "20px",
                        }}
                    >
                        <InputLabel id="demo-simple-select-label">
                            filtrar por:
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            label="Filtrar por:"
                            // value={}
                            // onChange={(e) =>
                            //     getDataByState(e.target.value)
                            // }
                            sx={{
                                borderRadius: "10px",
                            }}
                        >
                            <MenuItem value={"PENDIENTE"}>
                                Sin recepcion de muestras
                            </MenuItem>
                            <MenuItem value={"ACEPTADA"}>En Proceso</MenuItem>
                            <MenuItem value={"RECHAZADA"}>
                                Entregadas {"(Finalizadas)"}
                            </MenuItem>
                            <MenuItem value={"all"}>
                                Vencidas {"(Tiempo finalizado)"}
                            </MenuItem>
                            <MenuItem value={"all"}>Todas</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Box>

            {/* CONTENT */}

            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns:
                        "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "20px",
                    mt: "40px",
                }}
            >
                {testRequest.map((test, index) => {
                    const configStatus = getStatusConfig(test.deliveryStatus);

                    return (
                        <Box
                            key={index}
                            sx={{
                                bgcolor: "background.paper",
                                border: `1px solid ${theme.palette.border.primary}`,
                                minHeight: "450px",
                                p: "20px",
                                borderRadius: "15px",
                            }}
                        >
                            <Typography variant="body1">Ensayo</Typography>
                            <Typography
                                sx={{
                                    fontWeight: "bold",
                                    mt: "10px",
                                    fontSize: "1.2rem",
                                    opacity: "0.80",
                                }}
                            >
                                #ENS-{test.requestCode}
                            </Typography>

                            <Chip
                                sx={{
                                    mt: "10px",
                                }}
                                icon={configStatus.icon}
                                color={configStatus.color}
                                label={configStatus.label}
                            />

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
                                Ensayo con {test.totalSample} muestras y{" "}
                                {test.totalAnalysis} análisis
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
                                        Fecha de aceptacion:{" "}
                                        {formattDate(test.approvalDate)}
                                    </Typography>
                                </Box>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        mt: "10px",
                                    }}
                                >
                                    <CalendarMonthOutlined
                                        sx={{ mr: "10px" }}
                                    />
                                    <Typography
                                        variant="body2"
                                        sx={{ color: "text.secondary" }}
                                    >
                                        Fecha de entrega:{" "}
                                        {test.dueDate == null
                                            ? "Sin fecha"
                                            : formattDate(test.approvalDate)}
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
                                        <Typography
                                            variant="caption"
                                            color="text.secondary"
                                        >
                                            Progreso
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >{`${Math.round(
                                            test.progress
                                        )}%`}</Typography>
                                    </Box>
                                    <Box sx={{ width: "100%", mr: 1 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={test.progress}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                bgcolor:
                                                    theme.palette.grey[200],
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
                                            {test.teamAssigned.length > 1 ? (
                                                <>
                                                    {test.teamAssigned.map(
                                                        (user, idx) => (
                                                            <Tooltip
                                                                key={idx}
                                                                title={
                                                                    user.name
                                                                }
                                                                arrow
                                                            >
                                                                <Avatar
                                                                    src={
                                                                        user.imageProfile
                                                                    }
                                                                    alt={
                                                                        user.name
                                                                    }
                                                                />
                                                            </Tooltip>
                                                        )
                                                    )}
                                                </>
                                            ) : (
                                                <Typography
                                                    sx={{ pt: "20px" }}
                                                    variant="body2"
                                                >
                                                    {" "}
                                                    Este ensayo no tiene
                                                    usuarios asignados
                                                </Typography>
                                            )}
                                        </AvatarGroup>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Box sx={{ display: "flex", gap: 1 }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        startIcon={<TrendingUp />}
                                    >
                                        Gestionar
                                    </Button>
                                </Box>
                            </Box>
                        </Box>
                    );
                })}
            </Box>
        </Box>
    );
};

export default ResultsRelease;
