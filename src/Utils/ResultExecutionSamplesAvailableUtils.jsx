import { Box } from "@mui/material";
import { getDays } from "./DateUtils";

export const getPriority = (dueDate) => {
    const days = getDays(dueDate);

    if (days >= 1 && days <= 5) {
        return (
            <Box
                sx={{
                    color: "white",
                    p: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "20px",
                    bgcolor: "#E53935",
                }}
            >
                Prioridad Alta
            </Box>
        );
    } else if (days >= 6 && days <= 10) {
        return (
            <Box
                sx={{
                    color: "white",
                    p: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "20px",
                    bgcolor: "#FB8C00",
                }}
            >
                Pri. Intermedia
            </Box>
        );
    } else if (days >= 11 && days <= 15) {
        return (
            <Box
                sx={{
                    color: "white",
                    p: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "20px",
                    bgcolor: "#1E88E5",
                }}
            >
                Prioridad baja
            </Box>
        );
    } else if (days === 0) {
        return (
            <Box
                sx={{
                    color: "white",
                    p: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "20px",
                    bgcolor: "#8E24AA",
                }}
            >
                Para hoy
            </Box>
        );
    } else {
        return (
            <Box
                sx={{
                    color: "#E53935",
                    p: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    textAlign: "center",
                    borderRadius: "20px",
                }}
            >
                Fecha vencida
            </Box>
        );
    }
};

export const styleBackgroundColorByRestDays = (dueDate) => {
    const days = getDays(dueDate);

    if (days >= 1 && days <= 5) {
        return " #E53935";
    } else if (days >= 6 && days <= 10) {
        return " #FB8C00";
    } else if (days >= 11 && days <= 15) {
        return "#1E88E5";
    } else {
        return "ya se acabo manito";
    }
};
