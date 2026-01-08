import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import customerPhoto from "../../../assets/images/photo_customer.svg";
import { CheckCircle, Email, LocationPin, Phone } from "@mui/icons-material";

const CustomerCardTestRequest = ({ objectData = {} }) => {
    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.paper",

                borderRadius: 3,
                p: 3,
            }}
        >
            <Typography
                sx={{
                    mb: "20px",
                    color: "text.secondary",
                }}
            >
                Informacion del cliente{" "}
            </Typography>
            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    alignItems: "center",
                }}
            >
                <Avatar src={customerPhoto} sx={{ width: 80, height: 80 }} />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: 1,
                    }}
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
        </Box>
    );
};

export default CustomerCardTestRequest;
