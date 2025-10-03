import { Notifications } from '@mui/icons-material';
import { Box, IconButton, Popover, Typography, Badge, Tooltip, Divider, useTheme, Drawer } from '@mui/material';
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../service/axiosService';
import { formatDateTime, isSameDate, timeAgo } from "../Utils/DateUtils"


const NotificationPopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const { authObject } = useAuth();
    const theme = useTheme();
    const [hasNew, setHasNew] = useState(false);
    const [notifications, setNotifications] = useState([]);
    const [audio] = useState(() => new Audio("/public/mixkit-correct-answer-tone-2870.mp3"));

    const open = Boolean(anchorEl);

    useEffect(() => {
        audio.load();
    }, [audio]);

    useEffect(() => {
        const client = new Client({
            webSocketFactory: () => new SockJS("http://localhost:8080/ws-notifications"),
            reconnectDelay: 5000,
            debug: (str) => console.log("STOMP DEBUG:", str),
            onConnect: () => {
                console.log("✅ Conectado a WS");
                client.subscribe("/topic/notifications", (message) => {
                    setHasNew(true);
                    audio.play().catch(err =>
                        console.warn("⚠️ Navegador bloqueó el sonido (necesita interacción):", err)
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
            const fetchNotifications = async () => {
                try {
                    const res = await api.get(`/notifications/getAll/${authObject.username}`);
                    setNotifications(res.data);
                    setHasNew(false);

                } catch (error) {
                    console.error("Error cargando notificaciones:", error);
                }
            };
            fetchNotifications();
        }
    }, [open, authObject.username]);


    useEffect(() => {

    }, [notifications])


    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box>
            <Tooltip title={hasNew ? "¡Tienes nuevas notificaciones!" : "Notificaciones"}>
                <IconButton onClick={handleClick}>
                    <Badge
                        color="success"
                        variant="dot"
                        invisible={!hasNew}
                    >
                        <Notifications sx={{ color: "text.secondary" }} fontSize="medium" />
                    </Badge>
                </IconButton>
            </Tooltip>

            <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 500, p: 2 }
                }}
            >
                <Typography sx={{ pb: "20px", fontWeight: "bold" }} variant="h5">
                    Notificaciones
                </Typography>

                {notifications.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        No hay notificaciones
                    </Typography>
                ) : (
                    notifications.map((n, i) => (
                        <Box
                            key={i}
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                m: "10px 0",
                                border: isSameDate(n.date, new Date())
                                    ? `1px solid ${theme.palette.border.primary}`
                                    : "",
                                borderRadius: "15px",
                                p: 1
                            }}
                        >
                            <Box sx={{ width: "60px", height: "60px", borderRadius: "100%", overflow: "hidden" }}>
                                <img
                                    src={n.imageUser}
                                    alt="userImage"
                                    width="100%"
                                    height="100%"
                                    style={{ borderRadius: "100%" }}
                                />
                            </Box>

                            <Box sx={{ ml: "20px", flex: 1 }}>
                                <Typography>{n.type}</Typography>
                                <Typography sx={{ fontWeight: "bold" }}>{n.message}</Typography>
                                <Box sx={{ display: "flex", mt: "10px", flexWrap: "wrap" }}>
                                    {isSameDate(n.date, new Date()) ? (
                                        <Typography sx={{ color: "primary.main", pr: "5px" }}>Hoy</Typography>
                                    ) : (
                                        <Typography sx={{ color: "red", opacity: "0.7", pr: "5px" }}>
                                            {timeAgo(n.date)}
                                        </Typography>
                                    )}
                                    <Typography sx={{ pr: "5px", color: "text.primary", opacity: 0.6 }}>
                                        - {n.actorUser}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    ))
                )}
            </Drawer>

        </Box>
    );
};

export default NotificationPopover;
