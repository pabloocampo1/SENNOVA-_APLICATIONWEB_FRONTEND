import { Box } from "@mui/material";

const MaintenanceStatusBox = ({ maintenanceDate }) => {
    if (!maintenanceDate) {
        return (
            <Box
                sx={{
                    width: "100%",
                    height: "60px",
                    bgcolor: "#99999930",
                    border: "1px solid #666",
                    borderRadius: "10px",
                    mb: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                }}
            >
                Sin registro de mantenimiento
            </Box>
        );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // ✅ Forzar interpretación local
    const [year, month, day] = maintenanceDate.split("-").map(Number);
    const maintenance = new Date(year, month - 1, day);
    maintenance.setHours(0, 0, 0, 0);

    const diffTime = maintenance.getTime() - today.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    let label = "";
    let bgColor = "";
    let borderColor = "";

    if (diffDays < 0) {
        label = `⚠️ Mantenimiento vencido hace ${Math.abs(diffDays)} día(s)`;
        bgColor = "#f6070730";
        borderColor = "#f60707";
    } else if (diffDays === 0) {
        label = "📅 ¡Este equipo tiene mantenimiento hoy!";
        bgColor = "#fff40730";
        borderColor = "#ffcc00";
    } else if (diffDays <= 30) {
        label = `⏳ Próximo mantenimiento en ${diffDays} día(s)`;
        bgColor = "#fff40730";
        borderColor = "#ffcc00";
    } else {
        label = `✅ Al día (faltan ${diffDays} día(s) para su próximo mantenimiento)`;
        bgColor = "#07f60f30";
        borderColor = "#07f60f";
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "60px",
                bgcolor: bgColor,
                border: `1px solid ${borderColor}`,
                borderRadius: "10px",
                mb: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
            }}
        >
            {label}
        </Box>
    );
};

export default MaintenanceStatusBox;
