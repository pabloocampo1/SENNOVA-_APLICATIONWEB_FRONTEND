import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import imageLogoSennova from '../assets/images/sennova_logo_sin_fondo.png'
import logoSena from '../assets/images/logo-sena-verde-png-sin-fondo.png'

const PublicLayout = () => {
    return (
        <Box>


            <Box sx={{
                width: "100%",
                height: "10vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
            }}>

                <Box sx={{width: { xs: "150px", sm: "200px" },  }}>
                    <img src={imageLogoSennova} width={"100%"} alt="logo sennova" />
                </Box>
                <Box sx={{width: { xs: "50px", sm: "50px" },  }}>
                    <img src={logoSena} width={"100%"} alt="logo sennova" />
                </Box>

            </Box>


            <Outlet />

        </Box>
    );
};

export default PublicLayout;