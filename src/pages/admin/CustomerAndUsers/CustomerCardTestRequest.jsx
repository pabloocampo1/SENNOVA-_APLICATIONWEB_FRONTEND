import { Avatar, Box, Chip, Toolbar, Tooltip, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import customerPhoto from "../../../assets/images/photo_customer.svg";
import {
    CheckCircle,
    Edit,
    Email,
    LocationPin,
    Phone,
} from "@mui/icons-material";
import GenericModal from "../../../components/modals/GenericModal";
import CustomerInfoQuote from "../quotes/quotesCompo/CustomerInfoQuote";
import api from "../../../service/axiosService";
import SimpleBackdrop from "../../../components/SimpleBackDrop";

const CustomerCardTestRequest = ({ objectData = {}, updateCustomerData }) => {
    //
    const customerInfoRef = useRef();
    const [customerData, setCustomerData] = useState(objectData);
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const save = async (customerDto) => {
        setIsLoading(true);

        try {
            const res = await api.put(
                `/customers/edit/${objectData.customerId}`,
                customerDto
            );
            if (res.status == 200) {
                setCustomerData(res.data);
                updateCustomerData(res.data);
                setOpenModal(false);
                return false;
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.paper",

                borderRadius: 3,
                p: 3,
            }}
        >
            <SimpleBackdrop open={isLoading} />
            <GenericModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                compo={
                    <CustomerInfoQuote
                        saveInfoCustomer={(customerInfo) => save(customerInfo)}
                        ref={customerInfoRef}
                        customerInfo={objectData}
                    />
                }
            />
            <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
                <Tooltip title="Editar datos del cliente">
                    <Chip
                        icon={<Edit />}
                        label="Edit"
                        sx={{
                            cursor: "pointer",
                        }}
                        onClick={() => setOpenModal(true)}
                    />
                </Tooltip>
            </Box>
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
                        {customerData.customerName}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Email sx={{ mr: 0.5 }} /> {customerData.email}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <Phone sx={{ mr: 0.5 }} /> {customerData.phoneNumber}
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center" }}
                    >
                        <LocationPin sx={{ mr: 0.5 }} /> {customerData.address},{" "}
                        {customerData.city}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default CustomerCardTestRequest;
