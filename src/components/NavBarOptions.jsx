import React, { useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { ALL_MODULES } from "../consts/Modules";

const NavBarOptions = ({ onCloseMenu, theme, navigate }) => {
    const { authObject } = useAuth();

    const location = useLocation();

    const handleNavigation = (url) => {
        navigate(url);
        if (onCloseMenu) onCloseMenu();
    };

    const modules = useMemo(() => {
        return ALL_MODULES.filter((m) => m.roles.includes(authObject.role));
    }, [authObject.role]);

    return (
        <List sx={{ width: "100%", px: 1 }}>
            {modules.map((module) => {
                const isSelected = location.pathname === module.url;

                return (
                    <ListItem disablePadding key={module.url} sx={{ mb: 0.5 }}>
                        <ListItemButton
                            selected={isSelected}
                            onClick={() => handleNavigation(module.url)}
                            sx={{
                                borderRadius: "12px",
                                minHeight: "48px",
                                transition: "all 0.2s ease",

                                "&.Mui-selected": {
                                    bgcolor: "#39A90020",
                                    borderLeft: `2px solid ${theme.palette.primary.main}`,
                                    "&:hover": {
                                        bgcolor: "#39A90030",
                                    },
                                },

                                "&:hover": {
                                    bgcolor: "action.hover",
                                    transform: "translateX(4px)",
                                },
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: "40px",
                                    color: isSelected
                                        ? "primary.main"
                                        : "text.secondary",
                                }}
                            >
                                {React.cloneElement(module.icon, {
                                    fontSize: "small",
                                })}
                            </ListItemIcon>

                            <ListItemText
                                primary={module.name}
                                primaryTypographyProps={{
                                    fontSize: "0.9rem",
                                    fontWeight: isSelected ? 700 : 400,
                                    color: "text.secondary",
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                );
            })}
        </List>
    );
};

export default NavBarOptions;
