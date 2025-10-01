import React, { useState } from 'react';
import BarcodeScanner from './BarCodeScanner';

import { Box, Button, Typography } from '@mui/material';

const ScamCompo = ({handleScamCode}) => {
    const [openScanner, setOpenScanner] = useState(false);


    const handleDetected = async (parsed) => {
        const code = typeof parsed === "string" ? parsed : parsed?.code ?? parsed;
        handleScamCode(code)
    };

    return (
        <Box>
            <Button variant="contained" onClick={() => setOpenScanner(true)}>
                Scan Equipment
            </Button>

            <BarcodeScanner
                open={openScanner}
                onDetected={handleDetected}
                onClose={() => setOpenScanner(false)}
            />
            verifica ajsjajs
        </Box>
    );
};

export default ScamCompo;