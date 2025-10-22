
import { Box, Button, Typography } from "@mui/material";
import ProfileUI from "./ProfileUI";
import { DarkMode, NotificationAdd, NotificationImportant, Notifications, Settings, Sunny } from "@mui/icons-material";
import ProfileInfo from "./NotificationPopover";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import NotificationPopover from "./NotificationPopover";
import imageLogoSennova from '../assets/images/sennova_logo_sin_fondo.png'


const TopBar = () => {
 
    const { darkMode, toggleDarkMode } = useContext(ThemeContext);



    return (
        <Box
            sx={{
                height: "10vh",
                bgcolor: "background.paper",
                display: { xs: "none", md: "flex" },
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
                {/* <Typography sx={{ fontSize: "24px" }}>Bienvenido, </Typography>
                <Typography sx={{ color: "primary.main", fontWeight: "bold", fontSize: "26px", pl: "7px" }}> {authObject.name}</Typography> */}
                <Box sx={{ mt: "15%" }}>
                <img src={imageLogoSennova} width={250} alt="logo sennova" />
            </Box>

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
