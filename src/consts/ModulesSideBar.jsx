import {
    AnalyticsOutlined,
    EqualizerRounded,
    DashboardCustomizeRounded,
    RequestPageOutlined,
    DocumentScanner,
    Science,
    Category,
    SupervisedUserCircleOutlined,
} from "@mui/icons-material";

export const ALL_MODULES = [
    {
        url: "/system",
        name: "Dashboard",
        icon: <AnalyticsOutlined />,
        roles: ["ROLE_SUPERADMIN", "ROLE_ADMIN", "ROLE_ANALYST"],
    },
    {
        url: "/system/inventory/equipments",
        name: "Inventario equipos",
        icon: <EqualizerRounded />,
        roles: ["ROLE_SUPERADMIN", "ROLE_ADMIN", "ROLE_ANALYST"],
    },
    {
        url: "/system/inventory/reagents",
        name: "Inventario reactivos",
        icon: <DashboardCustomizeRounded />,
        roles: ["ROLE_SUPERADMIN", "ROLE_ADMIN", "ROLE_ANALYST"],
    },
    {
        url: "/system/quotes",
        name: "Cotizaciones de ensayo",
        icon: <RequestPageOutlined />,
        roles: ["ROLE_SUPERADMIN", "ROLE_ADMIN"],
    },
    {
        url: "/system/results",
        name: "Gestión de ensayos",
        icon: <DocumentScanner />,
        roles: ["ROLE_SUPERADMIN", "ROLE_ADMIN", "ROLE_ANALYST"],
    },
    {
        url: "/system/result/execution-test",
        name: "Gestión de muestras",
        icon: <Science />,
        roles: ["ROLE_SUPERADMIN"],
    },
    {
        url: "/system/products",
        name: "Gestión de analysis",
        icon: <Category />,
        roles: ["ROLE_SUPERADMIN", "ROLE_ADMIN"],
    },
    {
        url: "/system/users",
        name: "Gestión clientes y usuarios",
        icon: <SupervisedUserCircleOutlined />,
        roles: ["ROLE_SUPERADMIN"],
    },
];
