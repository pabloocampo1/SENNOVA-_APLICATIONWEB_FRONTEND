import { ArrowBackOutlined } from '@mui/icons-material';
import { Box, Tooltip, Typography, useTheme } from '@mui/material';

import { useNavigate, useParams } from 'react-router-dom';
import imageSearch from "../../../assets/images/undraw_file-search_cbur (1).svg";
import imageLocation from "../../../assets/images/undraw_delivery-location_um5t.svg";


const SelectOptionToCheckInventoryPage = () => {
    const navigate = useNavigate();
    const theme = useTheme();
    const { typeInventory } = useParams();
    

    const options = [
        {
            id: 1,
            label: "De manera individual",
            image: imageSearch,
            description: (
                <>
                    Podrás buscar un elemento de{" "}
                    <span style={{ fontWeight: 700, color:"#6A5ACD" }}>
                        {typeInventory === "reagent" ? "Reactivos" : "Equipos"}
                    </span>{" "}
                    mediante su nombre, código interno o placa SENA.
                </>
            ),
            onClick: () => {
                if (typeInventory === "reagent") {
                    navigate("/system/inventory/check/search/reagent");
                } else if (typeInventory === "equipment") {
                    navigate("/system/inventory/check/search/equipment");
                }
            },
        },
        {
            id: 2,
            label: "Por ubicación",
            image: imageLocation,
            description: (
                <>
                    Podrás buscar todos los elementos de {" "}
                    <span style={{ fontWeight: 700, color:"#6A5ACD"  }}>
                        {typeInventory === "reagent" ? "Reactivos " : "Equipos "}
                    </span> agrupados por ubicaciones
                </>
            ),
            onClick: () => {
                if (typeInventory === "reagent") {
                    navigate("/system/inventory/check/location/reagent");
                } else if (typeInventory === "equipment") {
                    navigate("/system/inventory/check/location/equipment");
                }
            },
        },
    ];


    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                px: 2,
                py: 4,
                bgcolor: "background.paper",
                position: "relative",
            }}
        >
            {/* Botón volver */}
            <Box
                sx={{
                    width: "fit-content",
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "15px",
                    border: `1px solid ${theme.palette.primary.main}`,
                    position: "absolute",
                    top: 20,
                    left: 20,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        bgcolor: theme.palette.action.hover,
                    },
                }}
                onClick={() => {
                    switch (typeInventory) {
                        case "reagent":
                            navigate("/system/inventory/reagents")
                            break;
                        case "equipment":
                            navigate("/system/inventory/equipments")
                            break;

                        default:
                            break;
                    }
                }}
            >
                <ArrowBackOutlined sx={{ color: "primary.main", mr: 1 }} />
                <Typography sx={{ color: "primary.main", fontWeight: 600 }}>Volver</Typography>
            </Box>

          
            <Typography
                variant="h4"
                component="h2"
                sx={{
                    pt:{xs:"100px", mb:"10px"},
                    pb: "30px",
                    fontWeight: "700",
                    textAlign: "center",
                }}
            >
                ¿Cómo deseas verificar tu inventario?
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
                    gap: 3,
                    width: "100%",
                    maxWidth: "700px",
                }}
            >
                {options.map((opt) => (
                    <Tooltip key={opt.id} title="Seleccionar">
                        <Box
                            onClick={opt.onClick}
                            sx={{
                                bgcolor: "background.default",
                                borderRadius: "15px",
                                p: 3,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                cursor: "pointer",
                                border: `1px solid ${theme.palette.primary.main}`,
                                boxShadow: "0 3px 10px rgba(0,0,0,0.1)",
                                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                                "&:hover": {
                                    transform: "translateY(-5px)",
                                    boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                                },
                            }}
                        >
                            <img
                                src={opt.image}
                                alt={opt.label}
                                style={{
                                    width: "120px",
                                    maxWidth: "80%",
                                    objectFit: "contain",
                                }}
                            />
                            <Typography sx={{
                                textAlign:"center",
                                fontSize:"0.90rem",
                                pt:"15px",
                                pb:"15px",
                                opacity: "0.90"
                            }}>
                                {opt.description}
                            </Typography>
                            <Typography
                                sx={{
                                    fontWeight: "600",
                                    pt: "20px",
                                    textAlign: "center",
                                }}
                            >
                                {opt.label}
                            </Typography>
                        </Box>
                    </Tooltip>
                ))}
            </Box>
        </Box>
    );
};

export default SelectOptionToCheckInventoryPage;
