import React from "react";
import { Box, Card, Typography, Divider, Stack, Chip } from "@mui/material";
import {
    HistoryOutlined,
    ScienceOutlined,
    PersonOutline,
    EventNoteOutlined,
} from "@mui/icons-material";

const CardUsageReagent = ({ usage = {}, dataReagent = {} }) => {
    const {
        usedBy,
        reagentUsageRecordsId,
        createAt,
        previousQuantity,
        quantity_used,
        notes,
    } = usage;

    const unit = dataReagent.unitOfMeasure || "";

    return (
        <Card
            sx={{
                p: 2.5,
                borderRadius: 4,
                boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                border: "1px solid",
                borderColor: "divider",
                transition: "transform 0.2s",
                "&:hover": { transform: "translateY(-4px)" },
            }}
        >
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="flex-start"
                mb={2}
            >
                <Stack direction="row" spacing={1} alignItems="center">
                    <PersonOutline color="primary" fontSize="small" />
                    <Typography
                        variant="subtitle1"
                        fontWeight="700"
                        lineHeight={1}
                    >
                        {usedBy}
                    </Typography>
                </Stack>
                <Chip
                    label={`ID: ${reagentUsageRecordsId}`}
                    size="small"
                    variant="outlined"
                    sx={{ fontSize: "0.65rem", height: 20 }}
                />
            </Box>

            <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                <HistoryOutlined
                    sx={{ fontSize: 16, color: "text.disabled" }}
                />
                <Typography variant="caption" color="text.secondary">
                    {new Date(createAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                </Typography>
            </Stack>

            <Divider sx={{ mb: 2, borderStyle: "dashed" }} />

            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2} mb={2}>
                <Box>
                    <Typography
                        variant="caption"
                        color="text.secondary"
                        display="block"
                    >
                        Previo
                    </Typography>
                    <Typography variant="body2" fontWeight="600">
                        {previousQuantity} {unit}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="caption"
                        color="primary"
                        display="block"
                        fontWeight="600"
                    >
                        Consumido
                    </Typography>
                    <Typography
                        variant="body2"
                        fontWeight="700"
                        color="primary"
                    >
                        - {quantity_used} {unit}
                    </Typography>
                </Box>
            </Box>

            <Box sx={{ bgcolor: "action.hover", p: 1.5, borderRadius: 2 }}>
                <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                    <EventNoteOutlined
                        sx={{ fontSize: 16, color: "text.secondary" }}
                    />
                    <Typography
                        variant="subtitle2"
                        fontWeight="600"
                        color="text.secondary"
                    >
                        Notas
                    </Typography>
                </Stack>
                <Typography
                    variant="body2"
                    sx={{
                        color: "text.primary",
                        fontStyle: notes ? "normal" : "italic",
                        opacity: notes ? 1 : 0.6,
                        whiteSpace: "pre-wrap",
                    }}
                >
                    {notes || "Sin observaciones registradas."}
                </Typography>
            </Box>
        </Card>
    );
};

export default CardUsageReagent;
