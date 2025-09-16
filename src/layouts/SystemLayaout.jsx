// SystemLayout.jsx
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { Outlet } from "react-router-dom";

const SystemLayout = () => {
    return (
        <Box
            sx={{
                display: "flex",
                width: "100vw",
                height: "100vh",
                bgcolor: "background.paper",
            }}
        >

            <Sidebar />
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",

                }}
            >
                <TopBar />
                <Box
                    sx={{
                        flex: 1,
                        p: 2,
                        overflowY: "auto", 
                        overflowX: "hidden", 
                       
                    }}
                >
                <Outlet />
            </Box>
        </Box>
        </Box >
    );
};

export default SystemLayout;
