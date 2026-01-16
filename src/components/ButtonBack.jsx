import { ArrowBack, BackHand } from "@mui/icons-material";
import { Backdrop, Box, Button, Tooltip } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const ButtonBack = ({ text = "Atrás" }) => {
    const navigate = useNavigate();
    return (
        <Box sx={{}}>
            <Tooltip title="Volver atrás" arrow placement="bottom">
                <Button
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBack />}
                    sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        px: 2.5,
                        "&:hover": {
                            transform: "translateX(-4px)",
                            transition: "transform 0.2s ease",
                        },
                    }}
                >
                    {text}
                </Button>
            </Tooltip>
        </Box>
    );
};

export default ButtonBack;
