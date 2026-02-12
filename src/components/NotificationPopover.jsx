import { Notifications, Circle, Close } from "@mui/icons-material";
import {
    Box,
    IconButton,
    Typography,
    Badge,
    Tooltip,
    Drawer,
    Fade,
    Chip,
    Avatar,
    Stack,
    alpha,
} from "@mui/material";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../service/axiosService";
import { isSameDate, timeAgo } from "../Utils/DateUtils";
import SimpleBackdrop from "./SimpleBackDrop";

const NotificationPopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { authObject } = useAuth();
    const [hasNew, setHasNew] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [audio] = useState(
        () => new Audio("/public/mixkit-correct-answer-tone-2870.mp3"),
    );
    const [loading, setLoading] = useState(false);

    const open = Boolean(anchorEl);

    useEffect(() => {
        audio.load();
    }, [audio]);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () =>
                new SockJS("https://sennovaback.duckdns.org/ws-notifications"),
            reconnectDelay: 5000,
            debug: (str) => console.log("STOMP DEBUG:", str),
            onConnect: () => {
                console.log("✅ Conectado a WS");
                client.subscribe("/topic/notifications", (message) => {
                    setHasNew(true);
                    audio
                        .play()
                        .catch((err) =>
                            console.warn(
                                "⚠️ Navegador bloqueó el sonido:",
                                err,
                            ),
                        );
                });
            },
            onStompError: (frame) => {
                console.error("Broker error:", frame.headers["message"]);
            },
        });

        client.activate();
        return () => client.deactivate();
    }, [audio]);

    useEffect(() => {
        if (open) {
            setLoading(true);
            const fetchNotifications = async () => {
                try {
                    const res = await api.get(
                        `/notifications/getAll/${authObject.username}`,
                    );
                    setNotifications(res.data);
                    setHasNew(false);
                } catch (error) {
                    console.error("Error cargando notificaciones:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchNotifications();
        }
    }, [open, authObject.username]);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Tooltip
                title={
                    hasNew ? "¡Tienes nuevas notificaciones!" : "Notificaciones"
                }
                arrow
                placement="bottom"
            >
                <IconButton
                    onClick={handleClick}
                    sx={{
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        "&:hover": {
                            transform: "scale(1.1)",
                            bgcolor: alpha("#000", 0.04),
                        },
                    }}
                >
                    <Badge
                        color="error"
                        variant="dot"
                        invisible={!hasNew}
                        sx={{
                            "& .MuiBadge-dot": {
                                animation: hasNew
                                    ? "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                                    : "none",
                                boxShadow: hasNew
                                    ? "0 0 0 4px rgba(244, 67, 54, 0.2)"
                                    : "none",
                                "@keyframes pulse": {
                                    "0%, 100%": {
                                        opacity: 1,
                                        transform: "scale(1)",
                                    },
                                    "50%": {
                                        opacity: 0.8,
                                        transform: "scale(1.2)",
                                    },
                                },
                            },
                        }}
                    >
                        <Notifications
                            sx={{ color: "text.secondary" }}
                            fontSize="medium"
                        />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: {
                        width: { xs: "100%", sm: 420 },
                        bgcolor: "background.default",
                    },
                }}
            >
                {/* Header */}
                <Box
                    sx={{
                        p: 3,
                        pb: 2,
                        borderBottom: 1,
                        borderColor: "divider",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        bgcolor: alpha("#000", 0.02),
                    }}
                >
                    <SimpleBackdrop open={loading} />
                    <Box>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: 700, mb: 0.5 }}
                        >
                            Notificaciones
                        </Typography>
                        {notifications.length > 0 && (
                            <Typography
                                variant="caption"
                                sx={{
                                    color: "text.secondary",
                                    fontWeight: 500,
                                }}
                            >
                                {notifications.length} notificación
                                {notifications.length !== 1 ? "es" : ""}
                            </Typography>
                        )}
                    </Box>

                    <IconButton
                        onClick={handleClose}
                        size="small"
                        sx={{
                            bgcolor: alpha("#000", 0.04),
                            "&:hover": {
                                bgcolor: alpha("#000", 0.08),
                                transform: "rotate(90deg)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        <Close fontSize="small" />
                    </IconButton>
                </Box>

                {/* Content */}
                <Box sx={{ p: 2, overflowY: "auto", flex: 1 }}>
                    {notifications.length === 0 ? (
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                py: 8,
                                px: 3,
                                textAlign: "center",
                            }}
                        >
                            <Box
                                sx={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: "50%",
                                    bgcolor: alpha("#000", 0.03),
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mb: 2,
                                }}
                            >
                                <Notifications
                                    sx={{
                                        fontSize: 40,
                                        color: "text.disabled",
                                    }}
                                />
                            </Box>
                            <Typography
                                variant="h6"
                                sx={{ fontWeight: 600, mb: 0.5 }}
                            >
                                No hay notificaciones
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Cuando recibas notificaciones, aparecerán aquí
                            </Typography>
                        </Box>
                    ) : (
                        <Stack spacing={1.5}>
                            {notifications.map((n, i) => {
                                const isToday = isSameDate(n.date, new Date());

                                return (
                                    <Fade
                                        in={true}
                                        timeout={300}
                                        style={{
                                            transitionDelay: `${i * 50}ms`,
                                        }}
                                        key={i}
                                    >
                                        <Box
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                p: 2,
                                                borderRadius: 2,
                                                bgcolor: isToday
                                                    ? alpha("#4caf50", 0.05)
                                                    : alpha("#000", 0.02),
                                                border: 1,
                                                borderColor: isToday
                                                    ? alpha("#4caf50", 0.2)
                                                    : alpha("#000", 0.06),
                                                transition: "all 0.3s ease",
                                                cursor: "pointer",
                                                position: "relative",
                                                "&:hover": {
                                                    transform:
                                                        "translateX(-4px)",
                                                    boxShadow:
                                                        "4px 4px 12px rgba(0,0,0,0.08)",
                                                    borderColor: "primary.main",
                                                    bgcolor: isToday
                                                        ? alpha("#4caf50", 0.08)
                                                        : alpha("#000", 0.04),
                                                },
                                                "&::before": isToday
                                                    ? {
                                                          content: '""',
                                                          position: "absolute",
                                                          left: 0,
                                                          top: 0,
                                                          bottom: 0,
                                                          width: 4,
                                                          bgcolor:
                                                              "success.main",
                                                          borderRadius:
                                                              "0 4px 4px 0",
                                                      }
                                                    : {},
                                            }}
                                        >
                                            <Avatar
                                                src={
                                                    n.imageUser ||
                                                    "https://w7.pngwing.com/pngs/693/741/png-transparent-logo-computer-software-industry-design.png"
                                                }
                                                alt={n.actorUser}
                                                sx={{
                                                    width: 48,
                                                    height: 48,
                                                    border: 2,
                                                    borderColor: isToday
                                                        ? "success.main"
                                                        : "divider",
                                                    boxShadow:
                                                        "0 2px 8px rgba(0,0,0,0.1)",
                                                }}
                                            />

                                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    <Chip
                                                        label={n.type}
                                                        size="small"
                                                        sx={{
                                                            height: 22,
                                                            fontSize: "0.7rem",
                                                            fontWeight: 600,
                                                            bgcolor: alpha(
                                                                "#000",
                                                                0.06,
                                                            ),
                                                        }}
                                                    />
                                                    {isToday && (
                                                        <Chip
                                                            icon={
                                                                <Circle
                                                                    sx={{
                                                                        fontSize: 8,
                                                                    }}
                                                                />
                                                            }
                                                            label="Nueva"
                                                            size="small"
                                                            color="success"
                                                            sx={{
                                                                height: 22,
                                                                fontSize:
                                                                    "0.7rem",
                                                                fontWeight: 600,
                                                            }}
                                                        />
                                                    )}
                                                </Box>

                                                <Typography
                                                    sx={{
                                                        fontWeight: 600,
                                                        mb: 1,
                                                        lineHeight: 1.4,
                                                        fontSize: "0.95rem",
                                                    }}
                                                >
                                                    {n.message}
                                                </Typography>

                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 1,
                                                    }}
                                                >
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: isToday
                                                                ? "success.main"
                                                                : "error.main",
                                                            fontWeight: 600,
                                                        }}
                                                    >
                                                        {isToday
                                                            ? "Hoy"
                                                            : timeAgo(n.date)}
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: "text.secondary",
                                                        }}
                                                    >
                                                        •
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        sx={{
                                                            color: "text.secondary",
                                                            fontWeight: 500,
                                                        }}
                                                    >
                                                        {n.actorUser}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Fade>
                                );
                            })}
                        </Stack>
                    )}
                </Box>
            </Drawer>
        </Box>
    );
};

export default NotificationPopover;
