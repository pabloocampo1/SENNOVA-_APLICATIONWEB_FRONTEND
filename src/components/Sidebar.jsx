
import { Box, Typography } from "@mui/material";

import NavBarOptions from "./navBarOptions";
import {  Help, InfoOutline } from "@mui/icons-material";
import ProfileUI from "./ProfileUI";



const Sidebar = () => {

    return (
        <Box
            sx={{
                minWidth: {lg: "310px", xl: "400px" },
                height: "100%",
                bgcolor: "background.default",
                borderRadius: "0px 30px 30px 0px",
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-around"
            }}
        >

             <Box sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
            }}>
               <ProfileUI />
               
            </Box>


            <Box sx={{
                width: "80%",
            }}>
                <NavBarOptions />
            </Box>


            <Box sx={{
                width: "80%",
                
            }}>
                <Box sx={{ display: "flex", alignItems: "center", mt: "20px" }}>
                    <Help sx={{ color: 'text.secondary' }} />  <Typography sx={{ pl: "10px", color: "text.secondary" }}>Ayuda</Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mt: "20px" }}>
                    <InfoOutline sx={{ color: 'text.secondary' }} />  <Typography sx={{ pl: "10px", color: "text.secondary" }}>Acerca del sistema</Typography>
                </Box>
            </Box>

        </Box>
    );
};

export default Sidebar;
