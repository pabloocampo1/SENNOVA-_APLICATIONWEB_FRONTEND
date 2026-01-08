import {
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Typography,
    useTheme,
} from "@mui/material";
import React from "react";
import UserUIMiniCard from "../../CustomerAndUsers/UserUIMiniCard";
import { Groups2Outlined, PersonAdd } from "@mui/icons-material";

const MembersOfTestRequest = ({ toggleDrawer, team = [], removeMember }) => {
    const theme = useTheme();

    return (
        <Card
            sx={{
                mb: 8,
                borderRadius: "20px",
                border: `1px solid ${theme.palette.border.primary}`,
            }}
        >
            <CardContent>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Groups2Outlined sx={{ mr: 1 }} />
                        <Typography
                            variant="h3"
                            sx={{ color: "text.secondary" }}
                        >
                            Equipo asignado
                        </Typography>
                    </Box>

                    <Chip
                        label={`${team.length} miembros`}
                        color="primary"
                        size="small"
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                {team.length === 0 ? (
                    <EmptyTeamState onAdd={toggleDrawer(true)} />
                ) : (
                    <>
                        <Grid container spacing={2}>
                            {team.map((user) => (
                                <Grid item xs={12} sm={6} md={4} key={user.id}>
                                    <UserUIMiniCard
                                        user={user}
                                        onDeleteMember={(userId) =>
                                            removeMember(userId)
                                        }
                                    />
                                </Grid>
                            ))}
                        </Grid>

                        <Box
                            sx={{
                                mt: 3,
                                display: "flex",
                                justifyContent: "center",
                            }}
                        >
                            <Button
                                variant="outlined"
                                startIcon={<PersonAdd />}
                                onClick={toggleDrawer(true)}
                                sx={{ borderRadius: "20px" }}
                            >
                                Agregar miembro
                            </Button>
                        </Box>
                    </>
                )}
            </CardContent>
        </Card>
    );
};

const EmptyTeamState = ({ onAdd }) => (
    <Box
        sx={{
            textAlign: "center",
            py: 6,
            opacity: 0.85,
        }}
    >
        <Typography variant="body1" sx={{ mb: 2 }}>
            No hay integrantes asignados a este ensayo
        </Typography>

        <Button variant="contained" startIcon={<PersonAdd />} onClick={onAdd}>
            Agregar primer integrante
        </Button>
    </Box>
);

export default MembersOfTestRequest;
