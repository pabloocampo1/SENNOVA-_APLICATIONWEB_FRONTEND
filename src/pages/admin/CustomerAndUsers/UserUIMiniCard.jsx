import { CloseOutlined, RemoveCircle } from "@mui/icons-material";
import { Avatar, Box, Typography, useTheme } from "@mui/material";
import React from "react";

const UserUIMiniCard = ({ user = {} }) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                width: "260px",
                bgcolor: "background.default",
                borderRadius: "20px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: "20px",
                ":hover": {
                    bgcolor: `${theme.palette.primary.main + 10} `,
                    border: `1px solid ${theme.palette.primary.main} `,
                },
            }}
        >
            <Avatar src={user.imageProfile} />
            <Typography variant="body2" sx={{ m: "10px" }}>
                {user.name}
            </Typography>

            <CloseOutlined
                sx={{
                    ":hover": {
                        bgcolor: "primary.third",
                        borderRadius: "20px",
                    },
                }}
            />
        </Box>
    );
};

export default UserUIMiniCard;
