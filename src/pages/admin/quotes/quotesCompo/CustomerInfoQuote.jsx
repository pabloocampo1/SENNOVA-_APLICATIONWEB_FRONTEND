import { Done, InfoOutlined } from "@mui/icons-material";
import {
    Box,
    Button,
    TextField,
    Typography,
    Alert,
    InputAdornment,
    Tooltip,
    IconButton,
} from "@mui/material";
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
                    dni: "",
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
                    border: "1px solid",
                    borderColor: "divider",
                    borderRadius: "16px",
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "start",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
            >
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: "center",
                        fontWeight: "700",
                        mt: 2,
                        mb: 1,
                        color: "text.primary",
                    }}
                >
                    Información del Cliente
                </Typography>

                <Typography
                    variant="body2"
                    sx={{
                        textAlign: "center",
                        color: "text.secondary",
                        mb: 3,
                        px: 2,
                    }}
                >
                    Complete sus datos para generar la cotización
                </Typography>

                <Alert
                    severity="info"
                    icon={<InfoOutlined />}
                    sx={{
                        mb: 3,
                        borderRadius: "12px",
                        "& .MuiAlert-message": {
                            width: "100%",
                        },
                    }}
                >
                    <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, mb: 0.5 }}
                    >
                        Información importante:
                    </Typography>
                    <Typography variant="caption" component="div">
                        • El <strong>correo electrónico</strong> se usará para
                        enviar la cotización y los resultados de análisis.
                    </Typography>
                    <Typography variant="caption" component="div">
                        • El <strong>número de teléfono</strong> nos permite
                        contactarte para coordinar la entrega de muestras.
                    </Typography>
                </Alert>

                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 2.5,
                            mb: 3,
                        }}
                    >
                        <TextField
                            label="Nombre completo"
                            name="customerName"
                            required
                            placeholder="Ej: Juan Pérez García"
                            value={customerData.customerName || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                },
                            }}
                        />

                        <TextField
                            label="Documento de identidad (DNI/Cédula)"
                            name="dni"
                            required
                            placeholder="Ej: 1234567890"
                            value={customerData.dni || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            inputProps={{
                                maxLength: 15,
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                },
                            }}
                        />

                        <TextField
                            type="email"
                            label="Correo electrónico"
                            name="email"
                            required
                            placeholder="ejemplo@correo.com"
                            value={customerData.email || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip
                                            title="Enviaremos tu cotización y resultados a este correo"
                                            arrow
                                            placement="top"
                                        >
                                            <IconButton size="small" edge="end">
                                                <InfoOutlined
                                                    fontSize="small"
                                                    color="primary"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                },
                            }}
                        />

                        <TextField
                            type="tel"
                            required
                            label="Número de teléfono"
                            name="phoneNumber"
                            placeholder="Ej: 3001234567"
                            value={customerData.phoneNumber || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Tooltip
                                            title="Te contactaremos para coordinar la entrega de muestras"
                                            arrow
                                            placement="top"
                                        >
                                            <IconButton size="small" edge="end">
                                                <InfoOutlined
                                                    fontSize="small"
                                                    color="primary"
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </InputAdornment>
                                ),
                            }}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                },
                            }}
                        />

                        <TextField
                            label="Dirección"
                            name="address"
                            required
                            placeholder="Ej: Calle 123 #45-67"
                            value={customerData.address || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                },
                            }}
                        />

                        <TextField
                            label="Ciudad"
                            required
                            name="city"
                            placeholder="Ej: Medellín"
                            value={customerData.city || ""}
                            onChange={handleChange}
                            fullWidth
                            variant="outlined"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "10px",
                                },
                            }}
                        />
                    </Box>

                    {!isSavedCustomer ? (
                        <Box
                            sx={{
                                width: "100%",
                                display: "flex",
                                flexDirection: "column",
                                gap: 1,
                            }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{
                                    borderRadius: "10px",
                                    py: 1.5,
                                    fontWeight: 600,
                                    textTransform: "none",
                                    fontSize: "1rem",
                                }}
                            >
                                Guardar Información
                            </Button>
                            <Typography
                                variant="caption"
                                sx={{
                                    textAlign: "center",
                                    color: "text.secondary",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    gap: 0.5,
                                }}
                            >
                                <InfoOutlined
                                    fontSize="small"
                                    sx={{ fontSize: "14px" }}
                                />
                                Asegúrate de guardar los datos antes de
                                continuar
                            </Typography>
                        </Box>
                    ) : (
                        <Alert
                            severity="success"
                            icon={<Done />}
                            sx={{
                                borderRadius: "12px",
                                py: 2,
                                alignItems: "center",
                                "& .MuiAlert-message": {
                                    width: "100%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                },
                            }}
                        >
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: 600,
                                    textAlign: "center",
                                }}
                            >
                                ✓ Información guardada correctamente
                            </Typography>
                        </Alert>
                    )}
                </Box>
            </Box>
        );
    },
);

export default CustomerInfoQuote;
