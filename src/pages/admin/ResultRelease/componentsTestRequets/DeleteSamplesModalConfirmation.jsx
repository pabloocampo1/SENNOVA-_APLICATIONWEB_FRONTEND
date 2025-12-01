import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";

const DeleteSamplesModalConfirmation = ({
    onClose,
    samplesSelected = [],
    updateSave,
}) => {
    const [isLoanding, setIsLoanding] = useState(false);

    const onDelete = () => {
        console.log(samplesSelected);
    };

    return (
        <Box>
            <SimpleBackdrop open={isLoanding} />
            <Typography
                sx={{
                    fontWeight: "bold",
                    mt: "20px",
                    textAlign: "center",
                }}
            >
                ¿Seguro que quieres eliminar las muestras seleccionadas?
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    textAlign: "center",
                }}
            >
                Estas muestras pueden estar relacionadas a un ensayo, una vez
                eliminadas las muestras no podras accedeer a ellas
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    mt: "30px",
                    mb: "20px",
                }}
            >
                <Button
                    onClick={() => onClose()}
                    sx={{ mr: "20px" }}
                    color="error"
                    variant="outlined"
                >
                    Cancelar
                </Button>
                <Button
                    color="info"
                    variant="contained"
                    onClick={() => onDelete()}
                >
                    Eliminar
                </Button>
            </Box>
        </Box>
    );
};

export default DeleteSamplesModalConfirmation;
