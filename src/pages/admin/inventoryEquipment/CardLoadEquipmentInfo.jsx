
import { Box, Typography, Divider } from "@mui/material";

const CardLoadEquipmentInfo = () => {
    return (
        <Box
            sx={{
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                borderRadius: "16px",
                boxShadow: 3,
                p: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    Karen Perez
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    ID: 23
                </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />

           
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body2">📅 Fecha: 20/02/2023</Typography>
                <Box
                    sx={{
                        px: 2,
                        py: 0.5,
                        borderRadius: "12px",
                        bgcolor: "#39A900",
                        color: "white",
                        fontWeight: "bold",
                        fontSize: "0.9rem",
                    }}
                >
                    Uso
                </Box>
            </Box>

            {/* Descripción */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Descripción:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Tengo plata tengo
                </Typography>
            </Box>
        </Box>
    );
};

export default CardLoadEquipmentInfo;
