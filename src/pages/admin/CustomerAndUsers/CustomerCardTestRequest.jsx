import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";
import customerPhoto from "../../../assets/images/photo_customer.svg";
import { CheckCircle, Email, LocationPin, Phone } from "@mui/icons-material";

const CustomerCardTestRequest = ({ objectData = {} }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.paper",
                border: `1px solid ${theme.palette.border.primary}`,
                borderRadius: 3,
                p: 3,
                display: "flex",
                gap: 3,
                alignItems: "center",
            }}
        >
            <Avatar src={customerPhoto} sx={{ width: 80, height: 80 }} />
            <Box
                sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1 }}
            >
                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {objectData.customerName}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <Email sx={{ mr: 0.5 }} /> {objectData.email}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <Phone sx={{ mr: 0.5 }} /> {objectData.phoneNumber}
                </Typography>
                <Typography
                    variant="body2"
                    sx={{ display: "flex", alignItems: "center" }}
                >
                    <LocationPin sx={{ mr: 0.5 }} /> {objectData.address},{" "}
                    {objectData.city}
                </Typography>
            </Box>
        </Box>
    );
};

export default CustomerCardTestRequest;
