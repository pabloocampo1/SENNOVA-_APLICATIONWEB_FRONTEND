import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";

import {
    Inventory2Outlined,
    Palette,
    ReportProblemOutlined,
} from "@mui/icons-material";

const OptionCheckInvAndReportEquipments = ({ navigate }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                gap: "10px",
                mt: "20px",
            }}
        >
            <Tooltip title="Chequeo de inventario">
                <Box
                    sx={{
                        width: { xs: "95%", md: "48%" },
                        height: "200px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        borderRadius: "12px",
                        bgcolor: "background.paper",
                        borderColor: "divider",
                        "&:hover": {
                            bgcolor: "action.hover",
                        },
                        border: `1px solid ${theme.palette.border.primary}`,
                    }}
                >
                    <Inventory2Outlined
                        color="info"
                        sx={{ fontSize: 60, mb: 1 }}
                    />
                    <Typography variant="subtitle1">
                        Chequeo de inventario
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: "20px" }}
                    >
                        Buscar, verificar y gestiónar equipos dentro del
                        inventario
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            navigate("/system/inventory/check/equipment")
                        }
                    >
                        Ir
                    </Button>
                </Box>
            </Tooltip>

            <Tooltip title="Equipos reportados">
                <Box
                    sx={{
                        width: { xs: "95%", md: "48%" },
                        height: "200px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        cursor: "pointer",
                        borderRadius: "12px",
                        bgcolor: "background.paper",
                        textAlign: "center",
                        borderColor: "divider",
                        "&:hover": {
                            bgcolor: "action.hover",
                        },
                        border: `1px solid ${theme.palette.border.primary}`,
                    }}
                >
                    <ReportProblemOutlined
                        color="warning"
                        sx={{ fontSize: 60, mb: 1 }}
                    />
                    <Typography variant="subtitle1">
                        Equipos reportados
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: "text.secondary", mb: "20px" }}
                    >
                        Todos los equipos que fueron reportados.
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={() =>
                            navigate("/system/inventory/equipment/report")
                        }
                    >
                        Ir
                    </Button>
                </Box>
            </Tooltip>
        </Box>
    );
};

export default OptionCheckInvAndReportEquipments;
