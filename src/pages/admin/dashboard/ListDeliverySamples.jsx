import React from "react";
import {
    Box,
    Typography,
    Button,
    Avatar,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Chip,
    alpha,
    useTheme,
} from "@mui/material";
import {
    ScienceOutlined,
    ChevronRight,
    CalendarTodayOutlined,
    PersonOutline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const ListDeliverySamples = ({ data = [] }) => {
    const theme = useTheme();
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: { xs: "100%", md: "55%" },
                height: "500px",
                bgcolor: "background.paper",
                borderRadius: "20px",
                p: 3,
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
                border: `1px solid ${theme.palette.divider}`,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5 }}>
                Estado de las muestras y cotizaciones
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Analisis de estados de muestras y cotizaciones 2026
            </Typography>

            <Box sx={{ flexGrow: 1, overflowY: "auto", pr: 1 }}>
                {data.length > 0 ? (
                    <List disablePadding>
                        {data.map((item, index) => (
                            <React.Fragment key={item.id}>
                                <ListItem
                                    alignItems="flex-start"
                                    sx={{
                                        px: 1,
                                        py: 1.5,
                                        borderRadius: "12px",
                                        transition: "0.2s",
                                        "&:hover": {
                                            bgcolor: alpha(
                                                theme.palette.action.hover,
                                                0.04,
                                            ),
                                        },
                                    }}
                                    secondaryAction={
                                        <Button
                                            variant="outlined"
                                            size="small"
                                            endIcon={<ChevronRight />}
                                            onClick={() =>
                                                navigate(
                                                    `/system/result/test-request/${item.testRequestId}`,
                                                )
                                            }
                                            sx={{
                                                textTransform: "none",
                                                borderRadius: "8px",
                                                fontWeight: 600,
                                            }}
                                        >
                                            Ver Ensayo
                                        </Button>
                                    }
                                >
                                    <ListItemAvatar>
                                        <Avatar
                                            sx={{
                                                bgcolor: alpha(
                                                    theme.palette.primary.main,
                                                    0.1,
                                                ),
                                                color: "primary.main",
                                            }}
                                        >
                                            <ScienceOutlined />
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 1,
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle2"
                                                    sx={{ fontWeight: 700 }}
                                                >
                                                    {item.sampleCode}
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    sx={{
                                                        color: "text.disabled",
                                                    }}
                                                >
                                                    • {item.requestCode}
                                                </Typography>
                                            </Box>
                                        }
                                        secondary={
                                            <Box sx={{ mt: 0.5 }}>
                                                <Typography
                                                    variant="body2"
                                                    color="text.primary"
                                                    sx={{ fontWeight: 500 }}
                                                >
                                                    {item.matrixSample}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        gap: 2,
                                                        mt: 0.5,
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        <PersonOutline
                                                            sx={{
                                                                fontSize: 14,
                                                                color: "text.secondary",
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {
                                                                item.responsibleName.split(
                                                                    " ",
                                                                )[0]
                                                            }{" "}
                                                        </Typography>
                                                    </Box>
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            alignItems:
                                                                "center",
                                                            gap: 0.5,
                                                        }}
                                                    >
                                                        <CalendarTodayOutlined
                                                            sx={{
                                                                fontSize: 14,
                                                                color: "text.secondary",
                                                            }}
                                                        />
                                                        <Typography
                                                            variant="caption"
                                                            color="text.secondary"
                                                        >
                                                            {new Date(
                                                                item.sentAt,
                                                            ).toLocaleDateString()}
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                            </Box>
                                        }
                                    />
                                </ListItem>
                                {index < data.length - 1 && (
                                    <Divider
                                        variant="inset"
                                        component="li"
                                        sx={{ opacity: 0.6 }}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Box sx={{ textAlign: "center", mt: 5 }}>
                        <Typography variant="body2" color="text.secondary">
                            No hay envíos registrados recientemente.
                        </Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default ListDeliverySamples;
