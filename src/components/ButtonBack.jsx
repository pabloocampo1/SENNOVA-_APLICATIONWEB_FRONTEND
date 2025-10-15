import { ArrowBack, BackHand } from '@mui/icons-material';
import { Backdrop, Box, Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ButtonBack = () => {
    const navigate = useNavigate();
    return (
        <Box sx={{}}>
            <Button startIcon={ <ArrowBack/>} variant='outlined' onClick={() => navigate(- 1)}>Volver atras</Button>
        </Box>
    );
};

export default ButtonBack;