import { CheckCircleOutline, WarningAmberOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const MessageSamplesSelectedExecution = ({
    onClose,
    cleanData,
    isAllSamplesAlReady,
    samples = [],
}) => {
    let title;
    let description;
    let confirmButtonText;
    let icon;

    if (samples.length == 0) {
        title = "No hay muestras seleccionadas";

        description =
            "Debes salir y seleccionar las muestras que quieres enviar";

        confirmButtonText = "Salir";
        icon = (
            <WarningAmberOutlined
                sx={{ color: "warning.main", width: 100, height: 100, mb: 4 }}
            />
        );
    } else {
        title = isAllSamplesAlReady
            ? "Todas las muestras seleccionadas tienen sus análisis finalizados"
            : "Algunas muestras aún no tienen todos los análisis";

        description = isAllSamplesAlReady
            ? "Hemos revisado toda la información y confirmado que cada una de las muestras ya tiene sus análisis finalizados. Estás listo para enviar los resultados cuando lo desees."
            : "Existen muestras que todavía no han completado todos sus análisis. No puedes enviar los resultados hasta que estén finalizadas. Puedes remover esas muestras sin finalizar de la ejecucion";

        confirmButtonText = isAllSamplesAlReady
            ? "Confirmar y enviar resultados"
            : "Sin acceso";

        icon = isAllSamplesAlReady ? (
            <CheckCircleOutline
                sx={{ color: "primary.main", width: 100, height: 100, mb: 4 }}
            />
        ) : (
            <WarningAmberOutlined
                sx={{ color: "warning.main", width: 100, height: 100, mb: 4 }}
            />
        );
    }

    return (
        <Box
            sx={{
                width: "40%",
                maxHeight: "80vh",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                p: 3,
            }}
        >
            {icon}

            <Typography sx={{ textAlign: "center", mb: 1, fontWeight: "bold" }}>
                {title}
            </Typography>

            <Typography
                variant="body2"
                sx={{ textAlign: "center", mb: 5, opacity: 0.9 }}
            >
                {description}
            </Typography>

            <Button variant="outlined" sx={{ width: 300, mb: 2 }}>
                {confirmButtonText}
            </Button>

            <Button
                variant="contained"
                sx={{ width: 300 }}
                onClick={() => {
                    onClose();
                    cleanData();
                }}
            >
                Cancelar proceso
            </Button>
        </Box>
    );
};

export default MessageSamplesSelectedExecution;
