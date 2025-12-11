import { ScienceOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React from "react";

const TitleSoftware = () => {
    return (
        <Typography
            variant="h3"
            sx={{
                fontWeight: "bold",
                color: "primary.main",
                letterSpacing: "1px",
                textTransform: "uppercase",
                background: "linear-gradient(90deg, #72ef4cff, #4cafef)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                display: "flex",
                alignItems: "center",
            }}
        >
            LabSys One{" "}
            <ScienceOutlined
                sx={{
                    color: "primary.main",
                }}
            />
        </Typography>
    );
};

export default TitleSoftware;
