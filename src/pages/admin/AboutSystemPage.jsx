import React from "react";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Box,
    Divider,
    Chip,
    Avatar,
    IconButton,
    Tooltip,
    Paper,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import {
    Inventory,
    Science,
    RequestQuote,
    AssignmentTurnedIn,
    AdminPanelSettings,
    GitHub,
    Code,
    Update,
    Storage,
    CheckCircleOutline,
} from "@mui/icons-material";
import imageArchitecture from "../../assets/images/arquitecturaaSoftware.jpeg";

const AboutSystem = () => {
    const mainModules = [
        {
            title: "Gestión de Equipos",
            icon: <Inventory color="primary" />,
            desc: "Control total del inventario de equipos.",
            details: [
                "Registro, edición y eliminación de equipos con perfiles detallados.",
                "Gestión de documentos (Facturas, Manuales) e imágenes por equipo.",
                "Control de mantenimientos preventivos con alertas vía email y sistema.",
                "Préstamos, historial de uso y gestión dinámica de estados (Fuera de servicio, Dado de baja, etc).",
                "Búsqueda por código de barras (Manual/Escáner) y ubicación.",
                "Exportación completa del inventario a formato Excel.",
            ],
        },
        {
            title: "Reactivos y Stock",
            icon: <Science color="secondary" />,
            desc: "Seguimiento del inventario de reactivos.",
            details: [
                "Control de stock en tiempo real y registro de uso.",
                "Monitoreo de fechas de vencimiento con notificaciones automáticas.",
                "Alertas de stock crítico (cantidad cero o mínima).",
                "Almacenamiento de archivos relacionados y hojas de seguridad.",
                "Búsqueda avanzada con filtrado inteligente y paginación.",
                "Descarga de inventario detallado en Excel.",
            ],
        },
        {
            title: "Muestras y Ensayos",
            icon: <AssignmentTurnedIn color="success" />,
            desc: "Flujo operativo desde la recepción hasta el informe final.",
            details: [
                "Lista de todos los ensayos aceptados",
                "Consultar de manera eficiente la informacion de cada ensayo",
                "Registro de recepción de muestras (datos e imagen).",
                "Validación de análisis",
                "Emisión de resultado de cada analisis con proteccion de edicíon",
                "Vista previa de reporte final de cada muestra.",
                "Emisíon de ensayo, con vista previa de reportes de cada muestra, informacion de cada muestra y envio directo al cliente con firma digital y archivos pdf adicionales.",
                "Historial de envíos y trazabilidad de usuarios responsables.",
                "Emisíon de muestras independientes al cliente",
                "Ver muestras por entregar, vencidas, entregadas y  sin recepcion de muestra",
            ],
        },
        {
            title: "Cotizaciones",
            icon: <RequestQuote color="warning" />,
            desc: "Gestión comercial y conversión automática a ensayos.",
            details: [
                "Módulo para clientes: creación de cotizaciones y solicitud de análisis.",
                "Cálculo automático de precios y gestión de estados.",
                "Aceptación/Rechazo con envío de plantillas PDF vía email.",
                "Conversión directa de cotización aceptada a ensayo operativo.",
                "Consultar informacion de cotizacion",
                "Filtrar cotizaciones",
            ],
        },
    ];

    return (
        <Container
            maxWidth="xl"
            sx={{
                bgcolor: "background.default",
                borderRadius: "20px",
                p: "20px",
                mb: 4,
            }}
        >
            <Box textAlign="center" mb={6}>
                <Typography
                    variant="h2"
                    component="h2"
                    fontWeight="800"
                    gutterBottom
                    color="primary.main"
                >
                    Labsys One Software
                </Typography>
                <Typography
                    color="text.secondary"
                    sx={{
                        maxWidth: 900,
                        mx: "auto",
                        fontWeight: 400,
                        lineHeight: 1.6,
                    }}
                >
                    LIMS (Laboratory Information Management System) de alto
                    rendimiento. Diseñado para digitalizar la operativa
                    científica, garantizando la integridad de los datos, el
                    control de activos y la eficiencia en la entrega de
                    resultados.
                </Typography>
            </Box>
            <Grid container spacing={4} mb={6}>
                {mainModules.map((mod, index) => (
                    <Grid item xs={12} lg={6} key={index}>
                        <Card
                            sx={{
                                height: "100%",
                                borderRadius: 4,
                                boxShadow: "0px 10px 30px rgba(0,0,0,0.05)",
                                border: "1px solid",
                                borderColor: "divider",
                                transition: "transform 0.2s",
                                "&:hover": { transform: "translateY(-5px)" },
                            }}
                        >
                            <CardContent>
                                <Box display="flex" alignItems="center" mb={2}>
                                    <Avatar
                                        sx={{
                                            bgcolor: "action.hover",
                                            mr: 2,
                                            width: 50,
                                            height: 50,
                                        }}
                                    >
                                        {mod.icon}
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant="h5"
                                            fontWeight="700"
                                        >
                                            {mod.title}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {mod.desc}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Divider sx={{ my: 2 }} />
                                <List dense>
                                    {mod.details.map((detail, i) => (
                                        <ListItem key={i} disableGutters>
                                            <ListItemIcon sx={{ minWidth: 30 }}>
                                                <CheckCircleOutline
                                                    sx={{
                                                        fontSize: 18,
                                                        color: "primary.main",
                                                    }}
                                                />
                                            </ListItemIcon>
                                            <ListItemText
                                                primary={detail}
                                                primaryTypographyProps={{
                                                    variant: "body2",
                                                    fontWeight: 500,
                                                }}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 6,
                }}
            >
                <Box display="flex" alignItems="center" mb={3}>
                    <Code sx={{ mr: 2, color: "primary.main" }} />
                    <Typography variant="h5" fontWeight="700">
                        Especificaciones Técnicas
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                            sx={{ fontWeight: 700 }}
                        >
                            STACK TECNOLÓGICO
                        </Typography>
                        <Box display="flex" gap={1} flexWrap="wrap">
                            {[
                                "React 18",
                                "Material UI v5",
                                "Node.js",
                                "Spring JPA, Security, boot, web, event y cache",
                                "JWT Auth",
                                "Java 21",
                                "Javascript",
                                "HTML",
                                "Cloudinary",
                                "Mysql",
                                "Docker",
                            ].map((tech) => (
                                <Chip
                                    key={tech}
                                    label={tech}
                                    variant="outlined"
                                    size="small"
                                    sx={{ fontWeight: 600 }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                            sx={{ fontWeight: 700 }}
                        >
                            VERSIÓN
                        </Typography>
                        <Typography
                            variant="body1"
                            fontWeight="bold"
                            fontFamily="monospace"
                            color="primary"
                        >
                            v1.2.5-stable
                        </Typography>
                    </Grid>

                    <Grid item xs={6} md={3}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                            sx={{ fontWeight: 700 }}
                        >
                            ARQUITECTURA
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            1. Sistema Basado en API REST (Comunicación)
                        </Typography>
                        <Typography variant="body1" fontWeight="bold">
                            2. Arquitectura de Desacoplamiento o Hexagonal
                            (Estructura Interna, Clean Architecture )
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
            <Divider sx={{ mb: 4 }} />
            <Box
                display="flex"
                flexDirection={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems="center"
                gap={2}
                pb={4}
            >
                <Box display="flex" alignItems="center">
                    <Avatar sx={{ bgcolor: "primary.main", mr: 2 }}>
                        <AdminPanelSettings />
                    </Avatar>
                    <Box>
                        <Typography variant="body1" fontWeight="700">
                            Desarrollado por JUAN PABLO OCAMPO LEON
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Labsys one software © 2026 - SENA, CENTRO DE LOS
                            RECURSOS RENOVABLES LA SALADA
                        </Typography>
                    </Box>
                </Box>

                <Box display="flex" alignItems="center" gap={1}>
                    <Tooltip title="Repositorio de Código FRON-END">
                        <IconButton
                            href="https://github.com/tu-usuario/tu-proyecto"
                            target="_blank"
                        >
                            <GitHub />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Repositorio de Código BACK-END">
                        <IconButton
                            href="https://github.com/tu-usuario/tu-proyecto"
                            target="_blank"
                        >
                            <GitHub />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Modelo Base de Datos Relacional">
                        <IconButton
                            href="https://dbdiagram.io/d/MODELADO-DE-DATOS-SENOVA-689a238f1d75ee360a15bd15"
                            target="_blank"
                        >
                            <Storage />
                        </IconButton>
                    </Tooltip>
                    <Chip
                        icon={<Update />}
                        label="Último despliegue: Enero 2026"
                        color="success"
                        variant="outlined"
                        size="small"
                    />
                </Box>
            </Box>

            <Paper
                elevation={0}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    bgcolor: "background.paper",
                    border: "1px solid",
                    borderColor: "divider",
                    mb: 6,
                }}
            >
                <Box display="flex" alignItems="center" mb={3}>
                    <Storage sx={{ mr: 2, color: "secondary.main" }} />
                    <Typography variant="h5" fontWeight="700">
                        Diseño de Base de Datos
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" paragraph>
                    El sistema se apoya en una base de datos relacional diseñada
                    como fundamento lógico del proyecto. El modelo inicial fue
                    construido utilizando principios de NORMALIZACIÓN, con el
                    objetivo de: - Evitar redundancia de datos - Garantizar
                    integridad referencial - Facilitar la escalabilidad del
                    sistema - Representar correctamente la lógica del negocio
                </Typography>
                <Grid container spacing={2}>
                    {[
                        {
                            t: "Entidades Core",
                            d: "Clientes, Usuarios, Productos, Roles y Permisos.",
                        },
                        {
                            t: "Módulo Inventario",
                            d: "Equipos, Ubicaciones, Mantenimientos y Préstamos.",
                        },
                        {
                            t: "Módulo Químico",
                            d: "Reactivos, Lotes, Vencimientos y Registros de Consumo.",
                        },
                        {
                            t: "Módulo Operativo",
                            d: "Solicitudes, Muestras, Análisis de Productos y Resultados.",
                        },
                    ].map((item, i) => (
                        <Grid item xs={12} sm={6} md={3} key={i}>
                            <Box
                                sx={{
                                    p: 2,
                                    bgcolor: "action.hover",
                                    borderRadius: 2,
                                    height: "100%",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="700"
                                    color="primary"
                                >
                                    {item.t}
                                </Typography>
                                <Typography variant="caption">
                                    {item.d}
                                </Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Paper>
            <Box mt={8}>
                <Typography
                    variant="h4"
                    fontWeight="800"
                    gutterBottom
                    textAlign="center"
                >
                    Arquitectura del Sistema
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    textAlign="center"
                    mb={4}
                >
                    Labsys One utiliza una arquitectura REST y una arquitectura
                    hexagonal en su servidor para desacoplar la lógica de
                    negocio de la tecnología.
                </Typography>

                <img src={imageArchitecture} style={{ objectFit: "contain" }} />

                <Grid
                    container
                    spacing={4}
                    alignItems="stretch"
                    sx={{
                        mt: "80px",
                    }}
                >
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                height: "100%",
                                bgcolor: "action.hover",
                                borderRadius: 3,
                                border: "1px dashed",
                                borderColor: "primary.main",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="700"
                                color="primary"
                                gutterBottom
                            >
                                Front-end (User Interface)
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                paragraph
                            >
                                Interfaz reactiva de alta fidelidad encargada de
                                la visualización de datos y la interacción del
                                analista. Gestiona el estado global y la
                                seguridad del lado del cliente.
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Typography
                                    variant="caption"
                                    fontWeight="bold"
                                    display="block"
                                    gutterBottom
                                >
                                    CORE & UI:
                                </Typography>
                                <Typography variant="body2">
                                    JSX puro con <strong>Material UI v5</strong>{" "}
                                    para un diseño basado en componentes
                                    atómicos. Implementa{" "}
                                    <strong>Dark Mode</strong> dinámico y diseño
                                    responsivo para inventario.
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography
                                    variant="caption"
                                    fontWeight="bold"
                                    display="block"
                                    gutterBottom
                                >
                                    REAL-TIME & SEGURIDAD:
                                </Typography>
                                <Typography variant="body2">
                                    Comunicación bidireccional mediante{" "}
                                    <strong>WebSockets</strong> para
                                    notificaciones instantáneas. Protección de
                                    rutas con <strong>Tokens (JWT)</strong> y
                                    renderizado condicional basado en{" "}
                                    <strong>RBAC (Roles)</strong>.
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2, mt: "auto" }} />
                            <Box display="flex" gap={1} flexWrap="wrap">
                                {[
                                    "React",
                                    "MUI",
                                    "WebSockets",
                                    "JWT",
                                    "RBAC",
                                ].map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        color="primary"
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 3,
                                height: "100%",
                                bgcolor: "action.hover",
                                borderRadius: 3,
                                border: "1px dashed",
                                borderColor: "secondary.main",
                                display: "flex",
                                flexDirection: "column",
                            }}
                        >
                            <Typography
                                variant="h6"
                                fontWeight="700"
                                color="secondary"
                                gutterBottom
                            >
                                Back-end (Business Logic & Core)
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                paragraph
                            >
                                Motor central basado en{" "}
                                <strong>Arquitectura Hexagonal</strong> para
                                desacoplar las reglas de negocio de la
                                infraestructura, garantizando escalabilidad,
                                mantenibilidad y conexion con la base de datos.
                            </Typography>

                            <Box sx={{ mb: 2 }}>
                                <Typography
                                    variant="caption"
                                    fontWeight="bold"
                                    display="block"
                                    gutterBottom
                                >
                                    INFRAESTRUCTURA & PERSISTENCIA:
                                </Typography>
                                <Typography variant="body2">
                                    Construido con <strong>Java 21</strong> y{" "}
                                    <strong>Spring Boot</strong>. Gestión de
                                    datos con <strong>JPA</strong>, caché
                                    optimizada con <strong>Spring Cache</strong>{" "}
                                    y contenedores <strong>Docker</strong>.
                                </Typography>
                            </Box>

                            <Box sx={{ mb: 2 }}>
                                <Typography
                                    variant="caption"
                                    fontWeight="bold"
                                    display="block"
                                    gutterBottom
                                >
                                    SERVICIOS & SEGURIDAD:
                                </Typography>
                                <Typography variant="body2">
                                    Seguridad robusta con{" "}
                                    <strong>Spring Security</strong>,{" "}
                                    <strong>JWT</strong> y{" "}
                                    <strong>Google Auth</strong>. Integración
                                    con <strong>Cloudinary</strong> (archivos),{" "}
                                    <strong>Apache POI</strong> (Excel),{" "}
                                    <strong>Nodemailer</strong> y mapeo
                                    eficiente con <strong>MapStruct</strong>.
                                </Typography>
                            </Box>

                            <Box
                                sx={{
                                    mt: 2,
                                    p: 2,
                                    bgcolor: "background.paper",
                                    borderRadius: 2,
                                    borderLeft: "4px solid",
                                    borderColor: "warning.main",
                                }}
                            >
                                <Typography
                                    variant="subtitle2"
                                    fontWeight="800"
                                    color="warning.main"
                                    gutterBottom
                                    display="flex"
                                    alignItems="center"
                                >
                                    <Update sx={{ mr: 1, fontSize: 18 }} />{" "}
                                    SISTEMA ORIENTADO A EVENTOS (EDA)
                                </Typography>
                                <Typography variant="body2">
                                    Implementación de{" "}
                                    <strong>Spring Events</strong> para el
                                    desacoplamiento de procesos internos.
                                    Permite que acciones como el registro de un
                                    ensayo disparen automáticamente auditorías,
                                    notificaciones y actualizaciones de stock de
                                    forma asíncrona, sin afectar el tiempo de
                                    respuesta del usuario.
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2, mt: "auto" }} />
                            <Box display="flex" gap={1} flexWrap="wrap">
                                {[
                                    "Java 21",
                                    "Spring Boot",
                                    "Hexagonal",
                                    "Docker",
                                    "Apache POI",
                                    "MapStruct",
                                    "Mysql",
                                ].map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        size="small"
                                        variant="outlined"
                                        color="secondary"
                                    />
                                ))}
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default AboutSystem;
