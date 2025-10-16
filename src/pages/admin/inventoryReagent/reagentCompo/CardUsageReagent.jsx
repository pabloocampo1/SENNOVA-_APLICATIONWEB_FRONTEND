import { Box, Card, Typography } from '@mui/material';
import React from 'react';

const CardUsageReagent = ({usage = {}, dataReagent}) => {
    return (
        <Card
            key={usage.reagentUsageRecordsId}
            sx={{
                p: 3,
                borderRadius: 3,
                boxShadow: "0 3px 8px rgba(0,0,0,0.1)",

            }}
        >
           
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                }}
            >
                <Typography variant="subtitle1" fontWeight="bold">
                    {usage.usedBy}
                </Typography>
                <Typography
                    variant="caption"
                    sx={{
                        color: "text.secondary",
                        backgroundColor: "action.hover",
                        px: 1.2,
                        py: 0.3,
                        borderRadius: 1,
                    }}
                >
                    ID: {usage.reagentUsageRecordsId}
                </Typography>
            </Box>

           
            <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
            >
                {new Date(usage.createAt).toLocaleDateString()}
            </Typography>

          
            <Typography sx={{ mb: 1 }}>
                Cantidad usada:{" "}
                <Box component="span" fontWeight="600">
                    {usage.quantity_used} {dataReagent.unitOfMeasure}
                </Box>
            </Typography>

            
            <Typography variant="subtitle2" fontWeight="600">
                Notas:
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    opacity: 0.8,
                    whiteSpace: "pre-wrap",
                    mt: 0.5,
                }}
            >
                {usage.notes || "Sin notas."}
            </Typography>
        </Card>
    );
};

export default CardUsageReagent;