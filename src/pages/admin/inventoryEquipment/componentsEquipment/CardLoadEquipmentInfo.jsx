
import { Box, Typography, Divider } from "@mui/material";
import api from "../../../../service/axiosService";
import { Delete } from "@mui/icons-material";

const CardLoadEquipmentInfo = ({ data = {}, deletedItem }) => {


    const deleteLoan = () => {
        const deleteById = async (id) => {
            try {
                const res = await api.delete(`/loan/equipment/delete/${id}`);
                console.log(res);

                if (res.data) {
                    console.log(res);
                    deletedItem(id)
                }
            } catch (error) {
                console.error(error);

            }
        }

        deleteById(data.equipmentLoanId)
    }


    return (
        <Box
            sx={{
                minHeight: "220px",
                display: "flex",
                flexDirection: "column",
                bgcolor: "background.paper",
                borderRadius: "16px",
                boxShadow: 3,
                p: 2,
                transition: "transform 0.2s, box-shadow 0.2s",
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 6,
                },
            }}
        >
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                <Typography sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                    {data.nameLoan}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <Delete sx={{ color: "red" }} onClick={() => deleteLoan()} />
                </Typography>
            </Box>

            <Divider sx={{ mb: 2 }} />


            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="body2">📅 Fecha: {data.loanDate}</Typography>
                {data.type == "Uso" ? (
                    <Box
                        sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: "12px",
                            bgcolor: "#4040deff",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                        }}
                    >
                        {data.type}
                    </Box>
                ) : (
                    <Box
                        sx={{
                            px: 2,
                            py: 0.5,
                            borderRadius: "12px",
                            bgcolor: "#39A900",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.9rem",
                        }}
                    >
                        {data.type}
                    </Box>
                )}
            </Box>

            {/* Descripción */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", mb: 0.5 }}>
                    Descripción:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {data.notes}
                </Typography>
            </Box>
        </Box>
    );
};

export default CardLoadEquipmentInfo;
