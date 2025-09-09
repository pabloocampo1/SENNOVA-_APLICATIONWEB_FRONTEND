import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';

const SystemLayaout = () => {

    return (
        <Box sx={{
            width:"100vw",
            height:"100vh",
    
        }}>
            <Outlet />
        </Box>
    );
};

export default SystemLayaout;