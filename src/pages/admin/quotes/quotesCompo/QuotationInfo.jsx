import {
    Box,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";
import {
    CheckCircleOutlineOutlined,
    Circle,
    DeleteOutlineOutlined,
    InfoOutline,
} from "@mui/icons-material";
import imageLogoSennova from "../../../../assets/images/sennova_logo_sin_fondo.png";
import api from "../../../../service/axiosService";
import { AuthContext, useAuth } from "../../../../context/AuthContext";
import GenericModal from "../../../../components/modals/GenericModal";
import ModalToAcceptQuote from "./ModalToAcceptQuote";
import ModalToDeleteTestRequest from "./ModalToDeleteTestRequest";
import ModalToRejectTestRequest from "./ModalToRejectTestRequest";
import AssignMemberWhenAccept from "./assignMemberWhenAccept";

const QuotationInfo = ({ data = {}, refreshData, onClose }) => {
    const [isLoanding, setIsLoanding] = useState(false);
    const [samplesInfo, setSamplesInfo] = useState({});
    const { authObject } = useAuth(AuthContext);
    const [openModalToSendEmail, setOpenModalToSendEmail] = useState(false);
    const [openModalToRejectTestRequest, setOpenModalToRejectTestRequest] =
        useState(false);
    const [openModalToDelete, setOpenModalToDelete] = useState(false);
    const [dataTestRequest, setDataTestRequest] = useState(data);
    const [openModalAssignUsers, setOpenModalAssignUsers] = useState(false);

    const formatCurrency = (value) =>
        new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            minimumFractionDigits: 2,
        }).format(value);

    const onCloseDeleted = () => {
        onClose();
        setOpenModalToDelete(false);

        refreshData();
    };
    const asignedColorState = () => {
        switch (dataTestRequest.state) {
            case "PENDIENTE":
                return "#FBBF24";

            case "ACEPTADA":
                return "#22C55E";

            case "RECHAZADA":
                return "#EF4444";
            default:
                break;
        }
    };

    useEffect(() => {
        const getDataSamplesByTestRequest = async () => {
            setIsLoanding(true);
            try {
                const res = await api.get(
                    `/testRequest/get-samples-by-testRequestId/${data.testRequestId}`
                );
                setSamplesInfo(res.data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoanding(false);
            }
        };

        getDataSamplesByTestRequest();
    }, []);

    useEffect(() => {}, [dataTestRequest]);

    if (data.testRequestId == null) {
        return (
            <Box>
                Ocurrio un error al intentar traer la informacion de la
                cotizacion
            </Box>
        );
    }

    return (
        <Box
            sx={{
                width: { xs: "300px", md: "600px" },
                bgcolor: "background.default",
            }}
        >
            <GenericModal
                open={openModalToSendEmail}
                onClose={() => setOpenModalToSendEmail(false)}
                compo={
                    <ModalToAcceptQuote
                        updateData={(object) => {
                            setDataTestRequest(object);
                            refreshData();
                        }}
                        customerInfo={dataTestRequest.customer}
                        testRequestId={dataTestRequest.testRequestId}
                        onClose={() => setOpenModalToSendEmail(false)}
                        openSelectMembers={() => setOpenModalAssignUsers(true)}
                    />
                }
            />

            <GenericModal
                open={openModalToRejectTestRequest}
                onClose={() => setOpenModalToRejectTestRequest(false)}
                compo={
                    <ModalToRejectTestRequest
                        updateData={(object) => {
                            setDataTestRequest(object);
                            refreshData();
                        }}
                        customerInfo={dataTestRequest.customer}
                        testRequestId={dataTestRequest.testRequestId}
                        onClose={() => setOpenModalToRejectTestRequest(false)}
                    />
                }
            />
            <GenericModal
                open={openModalToDelete}
                onClose={() => setOpenModalToDelete(false)}
                compo={
                    <ModalToDeleteTestRequest
                        testRequestId={dataTestRequest.testRequestId}
                        isAccepted={dataTestRequest.isApproved}
                        onCloseDeleted={() => onCloseDeleted()}
                        requestCode={dataTestRequest.requestCode}
                        onClose={() => setOpenModalToDelete(false)}
                    />
                }
            />
            <GenericModal
                open={openModalAssignUsers}
                onClose={() => setOpenModalAssignUsers(false)}
                compo={
                    <AssignMemberWhenAccept
                        testRequestId={dataTestRequest.testRequestId}
                        requestCode={dataTestRequest.requestCode}
                        onClose={() => setOpenModalAssignUsers(false)}
                    />
                }
            />

            <SimpleBackdrop
                open={isLoanding}
                text="Cargando informacion de la cotizacion"
            />
            <Typography
                variant="caption"
                sx={{
                    mt: "30px",
                    fontWeight: "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    opacity: "0.90",
                    backgroundColor: "action.hover",
                    px: 1.2,
                    py: 0.3,
                    borderRadius: 1,
                }}
            >
                <InfoOutline /> Detalles sobre esta cotizacion
            </Typography>
            <Box
                sx={{
                    mt: "40px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "150px", sm: "200px" },
                    }}
                >
                    <img
                        src={imageLogoSennova}
                        width={"100%"}
                        alt="logo sennova"
                    />
                </Box>

                {/* options */}
                <Box onClick={() => setOpenModalToDelete(true)}>
                    {authObject.role == "ROLE_SUPERADMIN" ? (
                        <Tooltip title="Eliminar cotizacion">
                            <DeleteOutlineOutlined
                                sx={{ color: "primary.main", mr: "30px" }}
                            />
                        </Tooltip>
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
            <Divider sx={{ mt: "20px" }} />
            <Box sx={{ width: "100%", p: "40px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography sx={{ fontWeight: "bold" }}>
                        Cotizacion/ensayo #{dataTestRequest.requestCode}
                    </Typography>
                    <Box
                        sx={{
                            width: "150px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "action.hover",
                            p: "10px",
                            borderRadius: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                width: "10px",
                                height: "10px",
                                borderRadius: "100%",
                                bgcolor: asignedColorState(),
                                mr: "10px",
                            }}
                        ></Box>
                        <Typography variant="body2" color={asignedColorState()}>
                            {dataTestRequest.state}
                        </Typography>
                    </Box>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "40px",
                    }}
                >
                    <Typography variant="body2">Fecha de creacion</Typography>

                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {dataTestRequest.createAt}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                    }}
                >
                    <Typography variant="body2">Esta aceptado</Typography>

                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {!dataTestRequest.isApproved ? "No" : "Si"}
                    </Typography>
                </Box>

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                    }}
                >
                    <Typography variant="body2">
                        {!dataTestRequest.isApproved
                            ? "Fecha de rechazo"
                            : "Fecha de aprovacion"}
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {dataTestRequest.isApproved
                            ? dataTestRequest.approvalDate == null
                                ? "Sin fecha de aprovacion"
                                : dataTestRequest.approvalDate
                            : dataTestRequest.discardDate == null
                            ? "Sin fecha de rechazo"
                            : dataTestRequest.discardDate}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                    }}
                >
                    <Typography variant="body2">Total de muestras</Typography>

                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {dataTestRequest.samples.length}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                    }}
                >
                    <Typography variant="body2">Precio total</Typography>

                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {formatCurrency(dataTestRequest.price)}
                    </Typography>
                </Box>
            </Box>

            <Divider sx={{ mt: "20px" }}>Detalles de las muestras</Divider>
            <Box sx={{ width: "100%", p: "40px" }}>
                {isLoanding ? null : Object.keys(samplesInfo).length === 0 ? (
                    <Typography
                        sx={{
                            textAlign: "center",
                            fontStyle: "italic",
                            color: "text.secondary",
                        }}
                    >
                        No se cargaron las muestras para esta cotización.
                    </Typography>
                ) : (
                    Object.entries(samplesInfo).map(([k, v], index) => {
                        return (
                            <Box
                                key={k}
                                sx={{
                                    mb: "20px",
                                    bgcolor: "background.paper",
                                    p: "10px",
                                    borderRadius: "10px",
                                }}
                            >
                                <Typography
                                    variant="body2"
                                    sx={{ textAlign: "center" }}
                                >
                                    Muestra {index + 1}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: "500",
                                        mb: "20px",
                                        textAlign: "center",
                                        color: "primary.main",
                                    }}
                                >
                                    {k}
                                </Typography>

                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Analisis</TableCell>
                                                <TableCell>
                                                    P. unitario
                                                </TableCell>
                                                <TableCell>Cantidad</TableCell>
                                                <TableCell>P. total</TableCell>
                                            </TableRow>
                                        </TableHead>

                                        <TableBody>
                                            {v.map((s, index) => (
                                                <TableRow key={index}>
                                                    <TableCell>
                                                        <Box
                                                            sx={{
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                            }}
                                                        >
                                                            <Circle
                                                                sx={{
                                                                    color: "primary.third",
                                                                    width: "15px",
                                                                    mr: "5px",
                                                                }}
                                                            />
                                                            <Typography
                                                                variant="body2"
                                                                sx={{
                                                                    opacity:
                                                                        "0.80",
                                                                }}
                                                            >
                                                                {s.analysis}
                                                            </Typography>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                opacity: "0.80",
                                                            }}
                                                        >
                                                            {s.priceByAnalysis}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                opacity: "0.80",
                                                            }}
                                                        >
                                                            {
                                                                s.quantityAnalysisBySample
                                                            }
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography
                                                            variant="body2"
                                                            sx={{
                                                                opacity: "0.80",
                                                            }}
                                                        >
                                                            {formatCurrency(
                                                                s.total
                                                            )}
                                                        </Typography>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        );
                    })
                )}
            </Box>

            <Divider sx={{ mt: "20px" }}>Cliente</Divider>

            <Box sx={{ width: "100%", p: "40px" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                    }}
                >
                    <Typography variant="body2">Nombre</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {dataTestRequest.customer?.customerName ||
                            "Sin información"}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                    }}
                >
                    <Typography variant="body2">Correo</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {dataTestRequest.customer?.email || "Sin información"}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                    }}
                >
                    <Typography variant="body2">Teléfono</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {dataTestRequest.customer?.phoneNumber ||
                            "Sin información"}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                    }}
                >
                    <Typography variant="body2">Direccion</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {dataTestRequest.customer?.address || "Sin información"}
                    </Typography>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mt: "20px",
                    }}
                >
                    <Typography variant="body2">Ciudad</Typography>
                    <Typography variant="body2" sx={{ fontWeight: "700" }}>
                        {dataTestRequest.customer?.city || "Sin información"}
                    </Typography>
                </Box>
            </Box>

            {/* validate if the quotation was accepted */}
            {dataTestRequest.isApproved ? (
                <Typography
                    sx={{
                        bgcolor: "#42664030",
                        p: "20px",
                        mb: "20px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        color: "primary.main",
                    }}
                >
                    <CheckCircleOutlineOutlined /> Cotizacion aceptada
                </Typography>
            ) : (
                <>
                    <Box
                        sx={{
                            mt: "20px",
                            mb: "10px",
                            display: "flex",
                            justifyContent: "space-between",
                            p: "20px",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() =>
                                setOpenModalToRejectTestRequest(true)
                            }
                        >
                            Rechazar
                        </Button>
                        <Button
                            startIcon={<CheckCircleOutlineOutlined />}
                            variant="outlined"
                            onClick={() => setOpenModalToSendEmail(true)}
                        >
                            Aceptar cotizacion
                        </Button>
                    </Box>
                    <Typography
                        variant="body2"
                        sx={{ p: "40px", textAlign: "center", display: "flex" }}
                    >
                        <InfoOutline /> Si acepta la cotizacion, se notificará
                        al cliente por correo electrónico con las indicaciones
                        para enviar sus muestras y la información necesaria para
                        realizar el pago de la cotización. Ademas esta
                        cotizacion pasara a ser un ensayo
                    </Typography>
                </>
            )}
        </Box>
    );
};

export default QuotationInfo;
