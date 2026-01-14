import { Add, Done } from "@mui/icons-material";
import { Box, Button, TextField, Typography } from "@mui/material";
import { forwardRef, useImperativeHandle, useState } from "react";

const CustomerInfoQuote = forwardRef(
    ({ saveInfoCustomer, customerInfo = {} }, ref) => {
        const [customerData, setCustomerData] = useState(customerInfo);

        const [isSavedCustomer, setIsSavedCustomer] = useState(false);

        const handleChange = (e) => {
            setIsSavedCustomer(false);
            setCustomerData({
                ...customerData,
                [e.target.name]: e.target.value,
            });
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            const isSaveCustomer = saveInfoCustomer(customerData);
            setIsSavedCustomer(isSaveCustomer);
        };

        useImperativeHandle(ref, () => ({
            cleanForm: () => {
                setCustomerData({
                    customerName: "",
                    email: "",
                    phoneNumber: "",
                    address: "",
                    city: "",
                });

                setIsSavedCustomer(false);
            },
        }));

        return (
            <Box
                sx={{
                    width: "100%",
                    height: "100%",
                    bgcolor: "background.paper",
                    border: "1px solid #00000020",
                    borderRadius: "15px",
                    p: "20px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                }}
            >
                <Typography
                    sx={{
                        textAlign: "center",
                        fontWeight: "700",
                        mt: "50px",
                        mb: "20px",
                    }}
                >
                    Informacion del cliente
                </Typography>

                <Box
                    component={"form"}
                    onSubmit={handleSubmit}
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-evenly",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            pl: "20px",
                            pr: "20px",
                            mb: "20px",
                        }}
                    >
                        <TextField
                            label="Nombre completo"
                            name="customerName"
                            required
                            placeholder="Digite su nombre completo"
                            value={customerData.customerName || ""}
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            type="email"
                            label="Correo electronico"
                            name="email"
                            required
                            placeholder="Digite su email"
                            value={customerData.email || ""}
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            type="number"
                            required
                            label="Numero de telefono"
                            name="phoneNumber"
                            placeholder="Digite su numero de telefono"
                            value={customerData.phoneNumber || ""}
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            label="Direccion"
                            name="address"
                            required
                            placeholder="Digite direccion"
                            value={customerData.address || ""}
                            onChange={(e) => handleChange(e)}
                        />
                        <TextField
                            label="Ciudad"
                            required
                            name="city"
                            placeholder="Ciudad"
                            value={customerData.city || ""}
                            onChange={(e) => handleChange(e)}
                        />
                    </Box>

                    {!isSavedCustomer ? (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                            }}
                        >
                            <Button type="submit" variant="contained">
                                Guardar informacion
                            </Button>
                            <Typography
                                variant="body2"
                                sx={{ textAlign: "center", opacity: "0.60" }}
                            >
                                Asegurate de guardar los datos
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                height: "80px",
                                bgcolor: "green",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: "10px",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "white",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                Informacion guardada correctamente.
                            </Typography>{" "}
                            <Done sx={{ color: "white" }} />
                        </Box>
                    )}
                </Box>
            </Box>
        );
    }
);

export default CustomerInfoQuote;
