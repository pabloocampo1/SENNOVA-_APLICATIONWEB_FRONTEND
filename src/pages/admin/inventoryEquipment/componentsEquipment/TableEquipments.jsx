import { Delete, Edit, Info } from "@mui/icons-material";
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../../../../context/AuthContext";

const TableEquipments = ({
    dataEquipments = [],
    isMobile,
    getMaintenanceStatus,
    setOpenEditEquipment,
    setEquipmentToEdit,
    setEquipmentToDeleteId,
    setOpenModalDelete,
    navigate,
}) => {
    const { authObject } = useContext(AuthContext);

    return (
        <>
            {dataEquipments.length < 1 ? (
                <Typography sx={{ textAlign: "center" }}>
                    No hay equipos
                </Typography>
            ) : (
                <TableContainer
                    component={Paper}
                    sx={{
                        width: "100%",
                        mt: "20px",
                        overflowX: "auto",
                        overflowY: "hidden",
                        borderRadius: "12px",
                        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",

                        "&::-webkit-scrollbar": {
                            height: "8px",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#bfbfbf",
                            borderRadius: "10px",
                        },
                        "&::-webkit-scrollbar-thumb:hover": {
                            backgroundColor: "#9a9a9a",
                        },
                    }}
                >
                    <Table
                        stickyHeader
                        sx={{
                            width: "100%",
                        }}
                        aria-label="tabla de equipos"
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    ID
                                </TableCell>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    Código interno
                                </TableCell>
                                <TableCell sx={{ fontWeight: "700" }}>
                                    Nombre
                                </TableCell>
                                {!isMobile && (
                                    <>
                                        <TableCell sx={{ fontWeight: "700" }}>
                                            Mantenimiento
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "700" }}>
                                            Modelo
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "700" }}>
                                            Ubicación
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "700" }}>
                                            Estado
                                        </TableCell>
                                        <TableCell sx={{ fontWeight: "700" }}>
                                            Creado
                                        </TableCell>
                                        <TableCell
                                            sx={{ fontWeight: "700" }}
                                            align="right"
                                        >
                                            Acciones
                                        </TableCell>
                                    </>
                                )}
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {dataEquipments.map((equipment) => (
                                <TableRow key={equipment.equipmentId} hover>
                                    <TableCell sx={{ opacity: "0.70" }}>
                                        {equipment?.equipmentId ?? "NaN"}
                                    </TableCell>
                                    <TableCell sx={{ opacity: "0.70" }}>
                                        {equipment?.internalCode?.trim() ||
                                            "NaN"}
                                    </TableCell>
                                    <TableCell sx={{ opacity: "0.70" }}>
                                        {equipment?.equipmentName?.trim() ||
                                            "NaN"}
                                    </TableCell>

                                    {!isMobile && (
                                        <>
                                            <TableCell sx={{ opacity: "0.70" }}>
                                                {(() => {
                                                    const status =
                                                        getMaintenanceStatus(
                                                            equipment?.maintenanceDate,
                                                        );
                                                    return (
                                                        <Box
                                                            sx={{
                                                                width: "110px",
                                                                bgcolor:
                                                                    status.color,
                                                                border: status.border,
                                                                borderRadius:
                                                                    "15px",
                                                                textAlign:
                                                                    "center",
                                                                p: "8px",
                                                                fontSize:
                                                                    "0.85rem",
                                                            }}
                                                        >
                                                            {status.label ||
                                                                "NaN"}
                                                        </Box>
                                                    );
                                                })()}
                                            </TableCell>

                                            <TableCell sx={{ opacity: "0.70" }}>
                                                {equipment?.model?.trim() ||
                                                    "NaN"}
                                            </TableCell>
                                            <TableCell sx={{ opacity: "0.70" }}>
                                                {equipment?.locationName?.trim() ||
                                                    "NaN"}
                                            </TableCell>

                                            <TableCell sx={{ opacity: "0.70" }}>
                                                {equipment?.available !==
                                                undefined ? (
                                                    equipment.available ? (
                                                        <Box
                                                            sx={{
                                                                width: "100px",
                                                                bgcolor:
                                                                    "#07f60f30",
                                                                border: "2px solid green",
                                                                borderRadius:
                                                                    "15px",
                                                                textAlign:
                                                                    "center",
                                                                p: "8px",
                                                                fontSize:
                                                                    "0.85rem",
                                                            }}
                                                        >
                                                            Disponible
                                                        </Box>
                                                    ) : (
                                                        <Box
                                                            sx={{
                                                                width: "100px",
                                                                bgcolor:
                                                                    "#f6070730",
                                                                border: "2px solid red",
                                                                borderRadius:
                                                                    "15px",
                                                                textAlign:
                                                                    "center",
                                                                p: "8px",
                                                                fontSize:
                                                                    "0.85rem",
                                                            }}
                                                        >
                                                            No Disponible
                                                        </Box>
                                                    )
                                                ) : (
                                                    "NaN"
                                                )}
                                            </TableCell>

                                            <TableCell sx={{ opacity: "0.70" }}>
                                                {equipment?.createAt
                                                    ? new Date(
                                                          equipment.createAt,
                                                      ).toLocaleDateString(
                                                          "es-CO",
                                                      )
                                                    : "NaN"}
                                            </TableCell>
                                        </>
                                    )}

                                    <TableCell align="right">
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() => {
                                                setEquipmentToEdit(equipment);
                                                setOpenEditEquipment(true);
                                            }}
                                        >
                                            <Edit fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            disabled={
                                                authObject.role !==
                                                "ROLE_SUPERADMIN"
                                            }
                                            size="small"
                                            color="primary"
                                            onClick={() => {
                                                setEquipmentToDeleteId(
                                                    equipment.equipmentId,
                                                );
                                                setOpenModalDelete(true);
                                            }}
                                        >
                                            <Delete fontSize="small" />
                                        </IconButton>
                                        <IconButton
                                            size="small"
                                            color="primary"
                                            onClick={() =>
                                                navigate(
                                                    `/system/inventory/equipments/info/${equipment.equipmentId}`,
                                                )
                                            }
                                        >
                                            <Info fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </>
    );
};

export default TableEquipments;
