import { Box, Typography } from "@mui/material";

import NavBarOptions from "./navBarOptions";
import { Help, InfoOutline, Settings } from "@mui/icons-material";
import ProfileUI from "./ProfileUI";
import TitleSoftware from "./TitleSoftware";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minWidth: { lg: "310px", xl: "400px" },
                height: "100%",
                bgcolor: "background.default",
                borderRadius: "0px 30px 30px 0px",
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <TitleSoftware />
            </Box>

            <Box
                sx={{
                    width: "80%",
                }}
            >
                <NavBarOptions />
            </Box>

            <Box
                sx={{
                    width: "80%",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "20px",
                        cursor: "pointer",
                    }}
                    onClick={() => navigate("/system/settings")}
                >
                    <Settings sx={{ color: "text.secondary" }} />{" "}
                    <Typography sx={{ pl: "10px", color: "text.secondary" }}>
                        Config / elementos del sistema
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "20px",
                        cursor: "pointer",
                    }}
                >
                    <Help sx={{ color: "text.secondary" }} />{" "}
                    <Typography sx={{ pl: "10px", color: "text.secondary" }}>
                        Ayuda
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "20px",
                        cursor: "pointer",
                    }}
                >
                    <InfoOutline sx={{ color: "text.secondary" }} />{" "}
                    <Typography sx={{ pl: "10px", color: "text.secondary" }}>
                        Acerca del sistema
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Sidebar;
