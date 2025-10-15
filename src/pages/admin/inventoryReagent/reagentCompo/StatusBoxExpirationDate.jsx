import { Box } from "@mui/material";
import React from "react";

const StatusBoxExpirationDate = ({ date }) => {

    const expirationDate = new Date(`${date}T00:00:00`);
    const today = new Date();


    const exp = new Date(expirationDate.toISOString().slice(0, 10));
    const now = new Date(today.toISOString().slice(0, 10));


    const diffTime = exp - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let status = "";
    let color = "";
    let message = "";


    if (diffDays === 0) {
        status = "today";
        color = "#FFB300";
        message = "✅ El reactivo vence hoy.";
    } else if (diffDays > 0) {
        status = "upcoming";
        color = "#4CAF50";
        message = `⚠️ Faltan ${diffDays} día${diffDays > 1 ? "s" : ""} para que expire.`;
    } else {
        status = "expired";
        color = "#E53935";
        message = `❌ El reactivo venció hace ${Math.abs(diffDays)} día${Math.abs(diffDays) > 1 ? "s" : ""}.`;
    }

    return (
        <Box
            sx={{
                width: "100%",
                height: "60px",
                bgcolor: `${color}30`,
                border: `1px solid ${color}`,
                color: color,
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
