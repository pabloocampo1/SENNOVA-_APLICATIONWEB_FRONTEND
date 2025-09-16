import { NotificationAdd, Notifications } from '@mui/icons-material';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import React, { useState } from 'react';

const NotificationPopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <Box >
            <IconButton onClick={handleClick}>
                <Notifications sx={{ color: "text.secondary" }} fontSize="medium" />
            </IconButton>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <Box sx={{ p: 2, width: "400px" }}>
                    <Typography variant="subtitle1">Notificaciones</Typography>
                    <Typography variant="body2">- Nueva cotización disponible</Typography>
                    <Typography variant="body2">- Resultado emitido</Typography>
                </Box>
            </Popover>
        </Box>
    );
}

export default NotificationPopover;