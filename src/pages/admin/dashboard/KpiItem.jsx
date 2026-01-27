import { Box, Chip, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const KpiItem = ({
    label,
    value,
    color = "primary.main",
    link = "",
    theme,
}) => {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                px: 2,
            }}
        >
            <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 0.5 }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontWeight: 700,
                    fontSize: "1.4rem",
                    color,
                }}
            >
                {value}
            </Typography>

            <Link to={link}>
                <Chip
                    sx={{
                        width: "50px",
                        mt: "10px",
                        border: `1px solid ${theme.palette.border.primary}`,
                    }}
                    label="Ver"
                />
            </Link>
        </Box>
    );
};
