import {
    Avatar,
    Box,
    Button,
    Pagination,
    Stack,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import api from "../../../service/axiosService";
import {
    Circle,
    CircleOutlined,
    Delete,
    Email,
    EmailOutlined,
    LocationOn,
    PhoneAndroidOutlined,
    TurnLeftTwoTone,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Customers = () => {
    const [isLoanding, setIsLoanding] = useState(true);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [customersData, setCustomerData] = useState([]);
    const theme = useTheme();
    const navigate = useNavigate();

    const handleChangePage = (event, value) => {
        setPage(value - 1);
    };

    const getInitials = (name) => {
        return name
            .trim()
            .split(" ")
            .map((word) => word[0].toUpperCase())
            .join("");
    };
    const capitalizeFirst = (text = "") => {
        if (!text) return "";
        return text.charAt(0).toUpperCase() + text.slice(1);
    };

    function randomColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}50`;
    }

    const deleteCustomer = async (customerId) => {
        setIsLoanding(true);
        try {
            const res = await api.delete(`/customers/delete/${customerId}`);
            if (res.status == 200) {
                const newList = [...customersData].filter(
                    (c) => c.customerId !== customerId
                );
                setCustomerData(newList);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const getCustomers = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(`/customers/getAll?page=${page}`);
            setCustomerData(res.data.content);
            setTotalPages(res.data.totalPages);
        } catch (error) {
            error;
        } finally {
            setIsLoanding(false);
        }
    };

    useEffect(() => {
        getCustomers();
    }, [page]);

    return (
        <Box>
            <SimpleBackdrop open={isLoanding} text="Cargando clientes" />
            <Box>
                <Typography variant="h6">Clientes</Typography>
                <Typography variant="body2" color="text.secondary">
                    Todos los clientes registrados
                </Typography>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "49% 49%",
                    gap: "10px",
                    mt: "20px",
                }}
            >
                {customersData.map((customer, index) => {
                    return (
                        <>
                            <Box
                                key={index}
                                sx={{
                                    height: "300px",
                                    bgcolor: "background.paper",
                                    border: `1px solid ${theme.palette.border.primary}`,
                                    borderRadius: "10px",
                                    mb: "30px",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "60%",
                                        display: "flex",
                                        position: "relative",
                                    }}
                                >
                                    {/* PHOTO */}
                                    <Box
                                        sx={{
                                            width: "15%",
                                            height: "100%",

                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                bgcolor: randomColor(),
                                                width: "60px",
                                                height: "60px",
                                                borderRadius: "100%",
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center",

                                                border: `1px solid ${theme.palette.border.primary}`,
                                            }}
                                        >
                                            <Typography
                                                sx={{
                                                    fontWeight: "bold",
                                                }}
                                            >
                                                {getInitials(
                                                    customer.customerName
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    {/* INFO */}
                                    <Box
                                        sx={{
                                            width: "60%",
                                            height: "100%",
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                mb: "10px",
                                            }}
                                        >
                                            {capitalizeFirst(
                                                customer.customerName
                                            )}
                                        </Typography>
                                        <Box sx={{ display: "flex" }}>
                                            <Box sx={{ display: "flex" }}>
                                                <EmailOutlined
                                                    sx={{
                                                        color: "primary.main",
                                                    }}
                                                />
                                                <Typography variant="body2">
                                                    {customer.email}
                                                </Typography>
                                            </Box>
                                            <Circle
                                                sx={{
                                                    width: "10px",
                                                    ml: "10px",
                                                }}
                                            />
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    ml: "20px",
                                                }}
                                            >
                                                <PhoneAndroidOutlined
                                                    sx={{
                                                        color: "primary.main",
                                                    }}
                                                />
                                                <Typography variant="body2">
                                                    {customer.phoneNumber}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            top: 0,
                                            right: 0,
                                            display: "flex",
                                            alignItems: "center",
                                            mr: "20px",
                                        }}
                                    >
                                        <LocationOn
                                            sx={{
                                                width: "15px",
                                                color: "primary.main",
                                            }}
                                        />
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {customer.address} {customer.city}
                                        </Typography>
                                    </Box>
                                    {customer.testRequestId == null && (
                                        <Box
                                            sx={{
                                                position: "absolute",
                                                top: 0,
                                                left: 0,
                                                display: "flex",
                                                alignItems: "center",
                                                mr: "20px",
                                            }}
                                        >
                                            <Tooltip
                                                title={
                                                    "Elimianr cliente sin ensayo"
                                                }
                                            >
                                                <Delete
                                                    sx={{
                                                        m: "10px",
                                                        color: "text.secondary",
                                                    }}
                                                    onClick={() =>
                                                        deleteCustomer(
                                                            customer.customerId
                                                        )
                                                    }
                                                />
                                            </Tooltip>
                                        </Box>
                                    )}
                                </Box>

                                {/* INFO TEST */}
                                <Box
                                    sx={{
                                        width: "100%",
                                        height: "40%",
                                        pt: "10px",
                                        display: "grid",
                                        gridTemplateColumns: " 25% 25% 25% 25%",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            height: "100%",
                                            border: `1px solid ${theme.palette.border.primary}`,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: "500",
                                            }}
                                        >
                                            Codigo del ensayo
                                        </Typography>
                                        <Typography variant="body2">
                                            {customer.requestCode == null
                                                ? "Eliminado"
                                                : customer.requestCode}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: "100%",
                                            border: `1px solid ${theme.palette.border.primary}`,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: "500",
                                            }}
                                        >
                                            Estado del ensayo
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {customer.requestCode == null
                                                ? "Eliminado"
                                                : customer.state}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: "100%",
                                            border: `1px solid ${theme.palette.border.primary}`,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Typography
                                            variant="body1"
                                            sx={{
                                                fontWeight: "500",
                                            }}
                                        >
                                            precio del ensayo
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {customer.requestCode == null
                                                ? "Eliminado"
                                                : customer.price}
                                        </Typography>
                                    </Box>
                                    <Box
                                        sx={{
                                            height: "100%",
                                            border: `1px solid ${theme.palette.border.primary}`,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            textAlign: "center",
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            onClick={() => {
                                                if (
                                                    customer.testRequestId ==
                                                    null
                                                ) {
                                                    alert(
                                                        "El ensayo del usuario fue eliminado"
                                                    );
                                                    return;
                                                }

                                                navigate(
                                                    `/system/result/test-request/${customer.testRequestId}`
                                                );
                                            }}
                                        >
                                            Ir al ensayo
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    );
                })}
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", mt: "20px" }}>
                <Stack spacing={2}>
                    <Pagination
                        count={totalPages}
                        page={page + 1}
                        onChange={handleChangePage}
                        color="primary"
                    />
                </Stack>
            </Box>
        </Box>
    );
};

export default Customers;
