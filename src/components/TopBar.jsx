
import { Box, Button, Typography } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import ProfileUI from "./ProfileUI";
import { DarkMode, NotificationAdd, NotificationImportant, Notifications, Settings, Sunny } from "@mui/icons-material";
import ProfileInfo from "./NotificationPopover";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NotificationPopover from "./NotificationPopover";


const TopBar = () => {
    const { authObject } = useAuth();
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);



    return (
        <Box
            sx={{
                height: "100px",
                bgcolor: "background.paper",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                px: 2,
            }}
        >

            <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
                <Typography sx={{ fontSize: "24px" }}>Bienvenido, </Typography>
                <Typography sx={{ color: "primary.main", fontWeight: "bold", fontSize: "26px", pl: "7px" }}> {authObject.name}</Typography>
            </Box>
            <Box sx={{
                display: "flex",
                alignItems: "center",
            }}>


                {darkMode ? (<Sunny onClick={() => toggleDarkMode()} fontSize="medium" sx={{ color: "text.secondary", mr: "10px" }} />) : (<DarkMode onClick={() => toggleDarkMode()} fontSize="medium" sx={{ color: "text.secondary", mr: "10px" }} />)}

                <NotificationPopover />
                <ProfileUI />
            </Box>
        </Box>
    );
};

export default TopBar;
