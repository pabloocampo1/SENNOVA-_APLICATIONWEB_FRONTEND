import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";
import customerPhoto from "../../../assets/images/photo_customer.svg";
import { CheckCircle, Email, LocationPin, Phone } from "@mui/icons-material";

const CustomerCardTestRequest = ({ objectData = {} }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "40%",
                height: "370px",
                bgcolor: "background.paper",
                p: "20px 10px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "20px",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", mb: "5px" }}>
                <Typography
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                    variant="caption"
                >
                    <CheckCircle /> Informacion del cliente
                </Typography>
            </Box>
            <Box
                sx={{
                    width: "400px",
                    height: "100px",
                    bgcolor: `${theme.palette.primary.main + 10} `,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "20px",
                    borderRadius: "30px",
                }}
            >
                <Avatar src={customerPhoto} />

                <Box>
                    <Typography variant="body1" sx={{ fontWeight: "500" }}>
                        {objectData.customerName}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: "text.secondary",
                        }}
                    >
                        {" "}
                        <Email sx={{ width: "20px", mr: "5px" }} />{" "}
                        {objectData.email}
                    </Typography>
                </Box>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "column",
                }}
            >
                <Box sx={{ mt: "20px", mb: "20px" }}>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: "bold",
                            opacity: "0.90",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <Phone color="info" sx={{ width: "20px", mr: "5px" }} />{" "}
                        Numero de telefono
                    </Typography>
                    <Typography variant="body2">
                        {objectData.phoneNumber}
                    </Typography>
                </Box>

                <Box>
                    <Typography
                        variant="body1"
                        sx={{
                            fontWeight: "bold",
                            opacity: "0.90",
                            display: "flex",
                            alignItems: "center",
                        }}
                    >
                        <LocationPin color="secondary" /> Direccion
                    </Typography>
                    <Typography variant="body2">
                        {objectData.address}, {objectData.city}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CustomerCardTestRequest;
