
import { Box, Typography } from "@mui/material";
// import imageLogoSennova from '../assets/images/sennova_logo_sin_fondo.png'
import NavBarOptions from "./navBarOptions";
import { DarkMode, Help, InfoOutline, Logout, Sunny } from "@mui/icons-material";

import { ThemeContext } from "../context/ThemeContext";


const Sidebar = () => {
   
   


    return (
        <Box
            sx={{
                width: { xs: "300px", md: "350px", lg: "400px" },
                height: "100%",
                bgcolor: "background.default",
                borderRadius: "0px 30px 30px 0px",
                // borderRight: "1px solid  #39A900",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between"
            }}
        >


        
            <Box sx={{
                width: "80%",
                mt:"100px"
            }}>
                <NavBarOptions />
            </Box>


            <Box sx={{
                width: "80%",
                mb:"50px"
            }}>
                <Box sx={{ display: "flex", alignItems: "center", mt:"20px" }}>
                    <Help sx={{ color: 'text.secondary' }} />  <Typography sx={{ pl: "10px", color: "text.secondary" }}>Ayuda</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mt:"20px" }}>
                     <InfoOutline sx={{ color: 'text.secondary' }} />  <Typography sx={{ pl: "10px", color: "text.secondary" }}>Acerca del sistema</Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default Sidebar;
