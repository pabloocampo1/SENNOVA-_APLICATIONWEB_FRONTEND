import { Box } from "@mui/material";
import React from "react";
const StatusBoxExpirationDate = ({ date }) => {
    if (!date) return null; 

    const expirationDate = new Date(`${date}T00:00:00`);
    const today = new Date();

    if (isNaN(expirationDate)) {
        return <Box color="#E53935">❌ Fecha inválida</Box>;
    }

   
    const exp = new Date(expirationDate.setHours(0, 0, 0, 0));
    const now = new Date(today.setHours(0, 0, 0, 0));

    const diffTime = exp - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let color = "";
    let message = "";

    if (diffDays === 0) {
        color = "#FFB300";
        message = "✅ El reactivo vence hoy.";
    } else if (diffDays > 0) {
        color = "#4CAF50";
        message = `⚠️ Faltan ${diffDays} día${diffDays > 1 ? "s" : ""} para que expire.`;
    } else {
        color = "#E53935";
        message = `❌ El reactivo venció hace ${Math.abs(diffDays)} día${Math.abs(diffDays) > 1 ? "s" : ""}.`;
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "60px",
                border: `1px solid ${color}`,
                color,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "0.95rem",
                textAlign: "center",
                p: 1,
            }}
        >
            {message}
        </Box>
    );
};


export default StatusBoxExpirationDate;
