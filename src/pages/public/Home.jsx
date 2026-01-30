import React from "react";
import { Box, Typography, Button, Container, Grid, Stack } from "@mui/material";
import { motion } from "framer-motion";
import {
    Login,
    RequestQuote,
    Science,
    Biotech,
    ScienceOutlined,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import imageLogoSennova from "../../assets/images/sennova_logo_sin_fondo.png";
import logoSena from "../../assets/images/logo-sena-verde-png-sin-fondo.png";

const Home = () => {
    const navigate = useNavigate();

    const orbVariants = {
        animate: {
            y: [0, -20, 0],
            x: [0, 10, 0],
            transition: {
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    const particles = Array.from({ length: 40 }, (_, i) => ({
        id: i,
        size: Math.random() * 6 + 2,
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 10,
        color: [
            "rgba(147, 51, 234, 0.6)",
            "rgba(34, 197, 94, 0.6)",
            "rgba(59, 130, 246, 0.6)",
            "rgba(236, 72, 153, 0.6)",
            "rgba(245, 158, 11, 0.6)",
        ][Math.floor(Math.random() * 5)],
    }));

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#0d1117",
                color: "white",
                position: "relative",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
            }}
        >
            {particles.map((particle) => (
                <Box
                    key={particle.id}
                    component={motion.div}
                    animate={{
                        y: [0, -100, 0],
                        x: [0, Math.random() * 50 - 25, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: particle.duration,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: particle.delay,
                    }}
                    sx={{
                        position: "absolute",
                        left: `${particle.left}%`,
                        top: `${particle.top}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        borderRadius: "50%",
                        backgroundColor: particle.color,
                        boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
                        zIndex: 0,
                    }}
                />
            ))}

            <Box
                component={motion.div}
                variants={orbVariants}
                animate="animate"
                sx={{
                    position: "absolute",
                    top: "10%",
                    right: "15%",
                    width: "350px",
                    height: "350px",
                    background:
                        "radial-gradient(circle, rgba(147, 51, 234, 0.25) 0%, rgba(0,0,0,0) 70%)",
                    filter: "blur(70px)",
                    zIndex: 0,
                }}
            />
            <Box
                component={motion.div}
                variants={orbVariants}
                animate="animate"
                sx={{
                    position: "absolute",
                    bottom: "15%",
                    left: "10%",
                    width: "450px",
                    height: "450px",
                    background:
                        "radial-gradient(circle, rgba(34, 197, 94, 0.2) 0%, rgba(0,0,0,0) 70%)",
                    filter: "blur(90px)",
                    zIndex: 0,
                }}
            />
            <Box
                component={motion.div}
                variants={orbVariants}
                animate="animate"
                sx={{
                    position: "absolute",
                    top: "50%",
                    right: "5%",
                    width: "300px",
                    height: "300px",
                    background:
                        "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, rgba(0,0,0,0) 70%)",
                    filter: "blur(60px)",
                    zIndex: 0,
                }}
            />

            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
                    `,
                    backgroundSize: "50px 50px",
                    zIndex: 0,
                    opacity: 0.3,
                }}
            />

            <Container maxWidth="lg" sx={{ zIndex: 1, position: "relative" }}>
                <Box
                    component={motion.div}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    sx={{
                        width: "100%",
                        height: "10vh",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 4,
                        px: 2,
                    }}
                >
                    <Box
                        sx={{
                            width: { xs: "150px", sm: "200px" },
                            filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
                        }}
                    >
                        <img
                            src={imageLogoSennova}
                            width="100%"
                            alt="logo sennova"
                            style={{ display: "block" }}
                        />
                    </Box>
                    <Box
                        sx={{
                            width: { xs: "50px", sm: "60px" },
                            filter: "drop-shadow(0 0 20px rgba(255,255,255,0.1))",
                        }}
                    >
                        <img
                            src={logoSena}
                            width="100%"
                            alt="logo sena"
                            style={{ display: "block" }}
                        />
                    </Box>
                </Box>

                <Grid container spacing={4} alignItems="center">
                    <Grid item xs={12} md={7}>
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Box
                                component={motion.div}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                sx={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: 1,
                                    px: 2,
                                    py: 0.8,
                                    mb: 3,
                                    borderRadius: "50px",
                                    border: "1px solid rgba(147, 51, 234, 0.3)",
                                    background: "rgba(147, 51, 234, 0.1)",
                                    backdropFilter: "blur(10px)",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 8,
                                        height: 8,
                                        borderRadius: "50%",
                                        bgcolor: "#22c55e",
                                        boxShadow: "0 0 10px #22c55e",
                                    }}
                                />
                                <Typography
                                    variant="caption"
                                    sx={{
                                        color: "rgba(255,255,255,0.9)",
                                        fontWeight: 600,
                                        fontSize: "0.85rem",
                                    }}
                                >
                                    Sistema de Gestión laboratorio SENNOVA
                                </Typography>
                            </Box>

                            <Typography
                                variant="h1"
                                fontWeight="800"
                                sx={{
                                    fontSize: { xs: "2.8rem", md: "5.5rem" },
                                    background:
                                        "linear-gradient(135deg, #ffffff 0%, #a3a3a3 50%, #737373 100%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    mb: 2,
                                    lineHeight: 1.1,
                                    textShadow:
                                        "0 0 40px rgba(255,255,255,0.1)",
                                }}
                            >
                                Labsys One Software
                            </Typography>

                            <Typography
                                variant="h5"
                                sx={{
                                    mb: 4,
                                    maxWidth: "600px",
                                    lineHeight: 1.7,
                                    color: "rgba(255,255,255,0.7)",
                                    fontSize: { xs: "1rem", md: "1.25rem" },
                                }}
                            >
                                Realiza solicitudes de análisis de laboratorio
                                de forma digital. Cotiza, envía tus muestras y
                                recibe tus resultados sin complicaciones.
                            </Typography>
                            <Stack
                                direction={{ xs: "column", sm: "row" }}
                                spacing={2}
                                component={motion.div}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                            >
                                <Button
                                    variant="contained"
                                    size="large"
                                    startIcon={<Login />}
                                    onClick={() => navigate("/signIn")}
                                    sx={{
                                        bgcolor: "primary.main",
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: "12px",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                        position: "relative",
                                        overflow: "hidden",

                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    Inicio de sesion
                                </Button>
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<ScienceOutlined />}
                                    onClick={() => navigate("/cotizacion")}
                                    sx={{
                                        color: "white",
                                        borderColor: "rgba(255,255,255,0.2)",
                                        px: 4,
                                        py: 1.5,
                                        borderRadius: "12px",
                                        fontWeight: "bold",
                                        textTransform: "none",
                                        fontSize: "1.1rem",
                                        backdropFilter: "blur(10px)",
                                        background: "rgba(255,255,255,0.02)",
                                    }}
                                >
                                    Solicitar Ensayo
                                </Button>
                            </Stack>
                        </motion.div>
                    </Grid>

                    <Grid
                        item
                        xs={12}
                        md={5}
                        sx={{
                            display: { xs: "none", md: "flex" },
                            justifyContent: "center",
                        }}
                    >
                        <Box
                            component={motion.div}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                                y: [0, -10, 0],
                            }}
                            transition={{
                                opacity: { duration: 0.8, delay: 0.4 },
                                scale: { duration: 0.8, delay: 0.4 },
                                y: {
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                },
                            }}
                            sx={{
                                position: "relative",
                                p: 5,
                                borderRadius: "32px",
                                border: "1px solid rgba(255,255,255,0.1)",

                                boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                                "&::before": {
                                    content: '""',
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "32px",
                                    padding: "2px",
                                    background:
                                        "linear-gradient(135deg, rgba(147, 51, 234, 0.5), rgba(34, 197, 94, 0.5))",
                                    mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    WebkitMask:
                                        "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                                    maskComposite: "exclude",
                                },
                            }}
                        >
                            <Box
                                sx={{
                                    position: "relative",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Science
                                    sx={{
                                        fontSize: 120,
                                        color: "primary.main",
                                        opacity: 0.9,
                                        filter: "drop-shadow(0 0 30px rgba(147, 51, 234, 0.5))",
                                    }}
                                />
                                <Biotech
                                    component={motion.svg}
                                    animate={{
                                        rotate: [0, 10, -10, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                    sx={{
                                        fontSize: 70,
                                        color: "secondary.main",
                                        position: "absolute",
                                        bottom: -20,
                                        right: -20,
                                        filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))",
                                    }}
                                />
                            </Box>

                            {[...Array(8)].map((_, i) => (
                                <Box
                                    key={i}
                                    component={motion.div}
                                    animate={{
                                        scale: [1, 1.5, 1],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        delay: i * 0.2,
                                    }}
                                    sx={{
                                        position: "absolute",
                                        width: "8px",
                                        height: "8px",
                                        borderRadius: "50%",
                                        bgcolor:
                                            i % 2 === 0
                                                ? "primary.main"
                                                : "secondary.main",
                                        boxShadow: `0 0 15px ${i % 2 === 0 ? "rgba(147, 51, 234, 0.8)" : "rgba(34, 197, 94, 0.8)"}`,
                                        top: `${50 + 40 * Math.cos((i * Math.PI) / 4)}%`,
                                        left: `${50 + 40 * Math.sin((i * Math.PI) / 4)}%`,
                                        transform: "translate(-50%, -50%)",
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Home;
