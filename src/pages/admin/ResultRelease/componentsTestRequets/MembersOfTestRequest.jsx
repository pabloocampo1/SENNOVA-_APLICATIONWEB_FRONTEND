import { Box, Button, Typography } from "@mui/material";
import React from "react";
import UserUIMiniCard from "../../CustomerAndUsers/UserUIMiniCard";
import { Groups2Outlined, PersonAdd } from "@mui/icons-material";

const MembersOfTestRequest = ({ toggleDrawer, team = [], removeMember }) => {
    return (
        <Box
            sx={{
                mb: "100px",

                p: "20px",
            }}
        >
            <Box
                sx={{
                    pb: "20px",
                }}
            >
                <Typography
                    variant={"h3"}
                    component={"h3"}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {" "}
                    <Groups2Outlined sx={{ mr: "10px" }} /> Equipo asignado
                </Typography>
                <Typography variant="body2">
                    Total de usuarios en este ensayo:{" "}
                    <strong>{team.length}</strong> miembros
                </Typography>
            </Box>

            <Box>
                {team.length < 1 ? (
                    <Box
                        sx={{
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            sx={{
                                mt: "20px",
                            }}
                        >
                            No hay integrantes para este ensayo
                        </Typography>

                        <Button
                            variant="outlined"
                            startIcon={<PersonAdd />}
                            onClick={toggleDrawer(true)}
                        >
                            Agregar integrante
                        </Button>
                    </Box>
                ) : (
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "15px",
                        }}
                    >
                        {team.map((user) => {
                            return (
                                <UserUIMiniCard
                                    user={user}
                                    onDeleteMember={(userId) =>
                                        removeMember(userId)
                                    }
                                />
                            );
                        })}

                        <Button
                            variant="outlined"
                            startIcon={<PersonAdd />}
                            onClick={toggleDrawer(true)}
                            sx={{
                                borderRadius: "20px",
                            }}
                        >
                            Agregar un miembro
                        </Button>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

export default MembersOfTestRequest;
