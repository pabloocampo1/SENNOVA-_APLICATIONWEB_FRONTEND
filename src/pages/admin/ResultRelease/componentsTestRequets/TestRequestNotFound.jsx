import { Delete, FindInPage } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

import { useNavigate } from "react-router-dom";

const TestRequestNotFound = () => {
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
            <FindInPage color="error" sx={{ fontSize: 70 }} />

            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                No se encontro el ensayo
            </Typography>

            <Typography
                variant="body1"
                color="text.secondary"
                sx={{ maxWidth: 500 }}
            >
                El ensayo que intentas ver ya no existe, fue eliminado o hubo un
                error en el servidor.
            </Typography>

            <Button
                variant="contained"
                sx={{ mt: 3 }}
                onClick={() => navigate(-1)}
            >
                Volver
            </Button>
        </Box>
    );
};

export default TestRequestNotFound;
