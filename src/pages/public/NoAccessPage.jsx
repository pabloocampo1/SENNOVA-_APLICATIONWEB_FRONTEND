import React from "react";
import { Box, Typography, Button, Paper, Container } from "@mui/material";
import { motion } from "framer-motion";
import { LockOutlined, ArrowBackIosNew, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NoAccessPage = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "#0d1117",
                position: "relative",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    position: "absolute",
                    width: "500px",
                    height: "500px",
                    background:
                        "radial-gradient(circle, rgba(239, 68, 68, 0.1) 0%, rgba(0,0,0,0) 70%)",
                    filter: "blur(60px)",
                    zIndex: 0,
                }}
            />

            <Container maxWidth="sm" sx={{ zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 4, md: 6 },
                            textAlign: "center",
                            borderRadius: 6,
                            bgcolor: "rgba(22, 27, 34, 0.8)",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            backdropFilter: "blur(12px)",
                        }}
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        >
                            <Box
                                sx={{
                                    display: "inline-flex",
                                    p: 2,
                                    borderRadius: "50%",
                                    bgcolor: "rgba(239, 68, 68, 0.1)",
                                    color: "#ef4444",
                                    mb: 3,
                                }}
                            >
                                <LockOutlined sx={{ fontSize: 60 }} />
                            </Box>
                        </motion.div>

                        <Typography
                            variant="h4"
                            fontWeight="800"
                            gutterBottom
                            sx={{ color: "white" }}
                        >
                            Acceso Restringido
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: "text.secondary",
                                mb: 4,
                                lineHeight: 1.6,
                            }}
                        >
                            Lo sentimos, pero no tienes los permisos necesarios
                            para ver esta sección del laboratorio. Si crees que
                            esto es un error, contacta al{" "}
                            <strong>Super Administrador</strong>.
                        </Typography>

                        <Box
                            display="flex"
                            flexDirection={{ xs: "column", sm: "row" }}
                            gap={2}
                            justifyContent="center"
                        >
                            <Button
                                variant="outlined"
                                startIcon={<ArrowBackIosNew />}
                                onClick={() => navigate(-1)}
                                sx={{
                                    borderColor: "rgba(255,255,255,0.2)",
                                    color: "white",
                                    textTransform: "none",
                                    px: 3,
                                    "&:hover": {
                                        borderColor: "white",
                                        bgcolor: "rgba(255,255,255,0.05)",
                                    },
                                }}
                            >
                                Regresar
                            </Button>
                            <Button
                                variant="contained"
                                startIcon={<Home />}
                                onClick={() => navigate("/system")}
                                sx={{
                                    bgcolor: "primary.main",
                                    textTransform: "none",
                                    px: 3,
                                    fontWeight: "bold",
                                    "&:hover": { bgcolor: "primary.dark" },
                                }}
                            >
                                Ir al Dashboard
                            </Button>
                        </Box>
                    </Paper>
                </motion.div>
            </Container>
        </Box>
    );
};

export default NoAccessPage;
