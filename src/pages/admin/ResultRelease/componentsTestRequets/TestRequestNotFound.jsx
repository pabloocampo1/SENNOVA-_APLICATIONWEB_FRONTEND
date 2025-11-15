import { Delete } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const TestRequestNotFound = ({ backTo = "/system/results" }) => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "70vh",
                textAlign: "center",
                gap: 2,
                p: 2,
            }}
        >
            <Delete color="error" sx={{ fontSize: 70 }} />

            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                Este ensayo ha sido eliminado o no existe
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 500 }}
            >
                El ensayo que intentas ver ya no existe o fue eliminado.
            </Typography>

            <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => navigate(backTo)}
            >
                Volver
            </Button>
        </Box>
    );
};

export default TestRequestNotFound;
