import {
    CloseOutlined,
    PersonAddAlt1Outlined,
    RemoveCircle,
} from "@mui/icons-material";
import { Avatar, Box, Tooltip, Typography, useTheme } from "@mui/material";
import React from "react";

const UserUIMiniCard = ({
    user = {},
    onDeleteMember,
    addMember,
    isToAdd = false,
}) => {
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

            {isToAdd ? (
                <>
                    <Tooltip title="Agregarlo al ensayo">
                        <PersonAddAlt1Outlined
                            onClick={() => addMember(user.userId)}
                        />
                    </Tooltip>
                </>
            ) : (
                <>
                    <Tooltip title="Sacarlo del ensayo">
                        <CloseOutlined
                            onClick={() => onDeleteMember(user.userId)}
                        />
                    </Tooltip>
                </>
            )}
        </Box>
    );
};

export default UserUIMiniCard;
