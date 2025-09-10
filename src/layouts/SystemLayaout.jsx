import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import TopBar from '../components/TopBar';

const SystemLayaout = () => {

    return (
        <Box sx={{
            width:"100vw",
            height:"100vh",
    
        }}>
            <TopBar />
            <Outlet />
        </Box>
    );
};

export default SystemLayaout;