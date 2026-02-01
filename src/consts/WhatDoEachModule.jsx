import {
    AssignmentTurnedIn,
    Inventory2,
    RequestQuote,
    Science,
} from "@mui/icons-material";

export const whatDoMainModules = [
    {
        title: "Gestión de Equipos",
        icon: <Inventory2 color="primary" />,
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
