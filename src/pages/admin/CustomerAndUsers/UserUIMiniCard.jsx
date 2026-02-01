import { CloseOutlined, PersonAddAlt1Outlined } from "@mui/icons-material";
import {
    Avatar,
    Box,
    Card,
    CardContent,
    IconButton,
    Tooltip,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";

const UserUIMiniCard = ({
    user = {},
    onDeleteMember,
    addMember,
    isToAdd = false,
    authObject,
}) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                height: "100%",
                borderRadius: "16px",
                border: `1px solid ${theme.palette.border.primary}`,
                transition: "all 0.2s ease",
                "&:hover": {
                    borderColor: theme.palette.primary.main,
                    boxShadow: theme.shadows[3],
                },
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 1,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                        src={user.imageProfile}
                        alt={user.name}
                        sx={{ width: 40, height: 40 }}
                    />
                </Box>

                <Typography
                    variant="caption"
                    sx={{
                        fontWeight: 500,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: 80,
                        color: "text.secondary",
                    }}
                >
                    {user.name}
                </Typography>

                {isToAdd ? (
                    <Tooltip title="Agregar al ensayo">
                        <IconButton
                            color="primary"
                            onClick={() => addMember(user.userId)}
                        >
                            <PersonAddAlt1Outlined />
                        </IconButton>
                    </Tooltip>
                ) : (
                    <Tooltip title="Eliminar del ensayo">
                        <IconButton
                            disabled={authObject.role !== "ROLE_SUPERADMIN"}
                            color="error"
                            onClick={() => onDeleteMember(user.userId)}
                        >
                            <CloseOutlined />
                        </IconButton>
                    </Tooltip>
                )}
            </CardContent>
        </Card>
    );
};

export default UserUIMiniCard;
