export const rolesInfo = [
    {
        role: "SUPER_ADMINISTRADOR",
        color: "#d32f2f",
        desc: "Acceso total y control de integridad.",
        actions: [
            "Acceso a dashboard",
            "Exportar datos",
            "Gestión completa de usuarios y roles.",
            "Eliminación y edición de registros críticos.",
            "Finalización definitiva de muestras y ensayos.",
            "Configuración global del sistema.",
        ],
    },
    {
        role: "ADMIN",
        color: "#1976d2",
        desc: "Operación diaria y gestión de procesos.",
        actions: [
            "Acceso a dashboard",
            "Exportar datos",
            "Gestíon de equipos y reactivos (Inventarios).",
            "Recepción y procesamiento de muestras.",
            "Acceso a informacion  de cotizaciones.",
            "Gestíon de productos (Analisis)",
        ],
    },
    {
        role: "ANALYST",
        color: "#2e7d32",
        desc: "Gestíon de muestras e inevntario.",
        actions: [
            "Acceso a dashboard",
            "Exportar datos",
            "Registro de resultados de analisis.",
            "Acesso a ensayos.",
            "Gestion de inventarios.",
            "Registro de recepcion de muestras.",
        ],
    },
];
