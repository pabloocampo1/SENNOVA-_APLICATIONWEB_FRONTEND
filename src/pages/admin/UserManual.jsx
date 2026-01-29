import React, { useState } from "react";
import {
    Box,
    Typography,
    Tabs,
    Tab,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Container,
    useTheme,
} from "@mui/material";
import {
    HelpOutline,
    AutoStories,
    CheckCircle,
    ChevronRight,
} from "@mui/icons-material";

import { helpContent } from "../../Utils/UserGuideData";

const UserManual = () => {
    const [activeTab, setActiveTab] = useState(0);
    const theme = useTheme();

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <Box
            component={"section"}
            sx={{
                flexGrow: 1,
                display: "flex",
                height: "87vh",
                width: "100%",
                gap: 3,
                borderRadius: "20px",
                p: "20px",
                bgcolor: "background.default",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    width: 280,
                    borderRadius: 3,
                    border: "1px solid",
                    borderColor: "divider",
                    overflowY: "auto",

                    "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor:
                            theme.palette.mode === "dark" ? "#555" : "#ccc",
                        borderRadius: "10px",
                        border: "2px solid transparent",
                        backgroundClip: "content-box",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: theme.palette.primary.main,
                    },
                }}
            >
                <Box p={3}>
                    <Typography variant="h6" fontWeight="800" color="primary">
                        Centro de ayuda
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        Manual de usuario
                    </Typography>
                </Box>
                <Divider />
                <Tabs
                    orientation="vertical"
                    value={activeTab}
                    onChange={handleTabChange}
                    sx={{
                        "& .MuiTabs-indicator": { left: 0, width: 4 },
                        "& .MuiTab-root": {
                            alignItems: "flex-start",
                            textAlign: "left",
                            px: 3,
                            textTransform: "none",
                            fontSize: "0.9rem",
                        },
                    }}
                >
                    {helpContent.map((item) => (
                        <Tab
                            key={item.id}
                            label={item.title}
                            icon={<ChevronRight fontSize="small" />}
                            iconPosition="end"
                        />
                    ))}
                </Tabs>
            </Paper>

            <Box
                sx={{
                    flexGrow: 1,
                    overflowY: "auto",

                    "&::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "transparent",
                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor:
                            theme.palette.mode === "dark" ? "#555" : "#ccc",
                        borderRadius: "10px",
                        border: "2px solid transparent",
                        backgroundClip: "content-box",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: theme.palette.primary.main,
                    },
                }}
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 5,
                        borderRadius: 3,
                        border: "1px solid",
                        borderColor: "divider",
                        minHeight: "100%",
                    }}
                >
                    <Box display="flex" alignItems="center" mb={3} gap={2}>
                        <AutoStories color="primary" fontSize="large" />
                        <Typography variant="h4" fontWeight="700">
                            {helpContent[activeTab].title}
                        </Typography>
                    </Box>

                    <Typography
                        variant="body1"
                        sx={{
                            color: "text.secondary",
                            fontSize: "1.1rem",
                            mb: 4,
                        }}
                    >
                        {helpContent[activeTab].content}
                    </Typography>

                    {helpContent[activeTab].image && (
                        <Box
                            sx={{
                                width: "100%",
                                maxHeight: 400,
                                overflow: "hidden",
                                borderRadius: 2,
                                border: "1px solid",
                                borderColor: "divider",
                                mb: 4,
                                backgroundColor: "grey.100",
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <img
                                alt={helpContent[activeTab].title}
                                src={helpContent[activeTab].image}
                                style={{
                                    width: "auto",
                                    height: "100%",
                                    objectFit: "contain",
                                }}
                            />
                        </Box>
                    )}

                    <Typography variant="h6" fontWeight="700" gutterBottom>
                        Descripcion:
                    </Typography>

                    <List>
                        {helpContent[activeTab].steps.map((step, index) => (
                            <ListItem key={index} disablePadding sx={{ py: 1 }}>
                                <ListItemIcon sx={{ minWidth: 40 }}>
                                    <CheckCircle
                                        color="success"
                                        fontSize="small"
                                    />
                                </ListItemIcon>
                                <ListItemText
                                    primary={step}
                                    primaryTypographyProps={{
                                        variant: "body1",
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>

                    <Divider sx={{ my: 4 }} />

                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.disabled",
                        }}
                    >
                        <HelpOutline sx={{ mr: 1, fontSize: 18 }} />
                        <Typography variant="caption">
                            Can't find what you need? Contact system support.
                        </Typography>
                    </Box>
                </Paper>
            </Box>
        </Box>
    );
};

export default UserManual;
