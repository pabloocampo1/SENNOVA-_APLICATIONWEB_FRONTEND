import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Snackbar,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { ArrowBackOutlined, QrCodeScanner } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../service/axiosService";
import GenericModal from "../../../components/modals/GenericModal";
import EquipmentMaintanence from "../../../components/forms/Equipment/EquipmentMaintanence";
import ScamCompo from "../../../components/scam/ScamCompo";
import SearchBar from "../../../components/SearchBar";
import CardInventoryInfo from "./componentsEquipment/CardInventoryInfo";
import ReagentByLocationCompo from "../inventoryReagent/ReagentByLocationCompo";





// This component allows searching for equipment or reagents by their name or internal code,
// rendering an interface that displays all the corresponding cards for the found items.




const SearchOptionCheckInv = () => {
    const { typeInventory } = useParams();
    const theme = useTheme();
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [searchBy, setSearchBy] = useState("name");
    const [data, setData] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);

    const [selectedEquipment, setSelectedEquipment] = useState(null);

    const [stateToChange, setStateToChange] = useState("Activo");
    const [changeStateEquipment, setChangeStateEquipment] = useState({
        state: false,
        equipmentId: null,
    });

    const [openMaintanence, setOpenMaintanence] = useState(false);
    const [equipmentIdToMaintenance, setEquipmentIdToMaintenance] = useState(0);
    const [equipmentNameToMaintenance, setEquipmentNameToMaintenance] = useState("");
    const [responseAlert, setResponseAlert] = useState({ status: false, message: "" });
    const [openScanner, setOpenScanner] = useState(false);
    const [reportStatus, setReportStatus] = useState(() => {
        const initialStatus = {};
        data.forEach(equipment => {
            if (equipment.markReport === true) {
                initialStatus[equipment.equipmentId] = "markNotExist";
            } else if (equipment.available === true) {
                initialStatus[equipment.equipmentId] = "markExist";
            }
        });
        return initialStatus;
    });

    const open = Boolean(anchorEl);


    const getByParam = async () => {
        try {
            let res;
            if (typeInventory === "equipment") {
                if (searchBy === "name")
                    res = await api.get(`/equipment/get-all-by-name/${search}`);
                else if (searchBy === "internalCode")
                    res = await api.get(`/equipment/get-all-by-internal-code/${search}`);
            } else if (typeInventory === "reagent") {
                res = await api.get(`/reagent/getAllByName/${search}`);
            }
            if (res?.status === 200) setData(res.data);
        } catch (error) {
            console.error(error);
        }
    };

     const handleScamCode = (code) => {
        getByISenaInventoryTag(code);
        setOpenScanner(false)

    }

    const getByISenaInventoryTag = async (code) => {
        try {
            const res = await api.get(`/equipment/get-all-by-sena-inventory-tag/${code}`);
    
            setData(res.data)

        } catch (error) {
            console.log(error);

        }
    }


    const handleMarkExist = (equipmentId, type) => {
        setReportStatus(prev => ({
            ...prev,
            [equipmentId]: type
        }));

        const changeState = async () => {
            try {
                let res;
                switch (type) {
                    case "markNotExist":
                        res = await api.put(`/equipment/report-equipment/${equipmentId}`);
                        if (res.status == 200) {
                            setResponseAlert({
                                status: true,
                                message: "Se reporto el equipo correctamente."
                            })
                        }
                        break;
                    case "markExist":
                        res = await api.put(`/equipment/markEquipmentAsExisting/${equipmentId}`);
                        if (res.status == 200) {
                            setResponseAlert({
                                status: true,
                                message: "Se marco como existente correctamente."
                            })
                        }
                        break;
                    default:
                        break;

                }
                const equipmentUpdate = res.data;
                const newListEquipment = data.map(equipment => {
                    if (equipment.equipmentId == equipmentId) {
                        return equipmentUpdate
                    } else {
                        return equipment;
                    }
                })

                setData(newListEquipment);

            } catch (err) {
                console.error(err);
            }

        }
        changeState()


    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.put(
                `/equipment/change-status/${selectedEquipment.equipmentId}/${stateToChange}`
            );
            if (res.status === 200) {
                const updated = data.map((eq) =>
                    eq.equipmentId === res.data.equipmentId ? res.data : eq
                );
                setData(updated);
                setChangeStateEquipment({ state: false, equipmentId: null });
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = (event, equipment) => {
        setAnchorEl(event.currentTarget);
        setSelectedEquipment(equipment);
    };
    const handleCloseMenu = () => setAnchorEl(null);

    const openChangeState = () => {
        setChangeStateEquipment({ state: true, equipmentId: selectedEquipment.equipmentId });
        handleCloseMenu();
    };

    const addMaintenance = (id, name) => {
        setEquipmentIdToMaintenance(id);
        setEquipmentNameToMaintenance(name);
        handleCloseMenu();
        setOpenMaintanence(true);
    };

    const handleMaintanenceSend = () => {
        setResponseAlert({ status: true, message: "Se agregó el registro exitosamente" });
        setOpenMaintanence(false);
        getByParam();
    };

    useEffect(() => {
        if (search) getByParam();
    }, [search, searchBy]);

    useEffect(() => {
        const updatedStatus = {};
        data.forEach(equipment => {
            if (equipment.markReport === true) {
                updatedStatus[equipment.equipmentId] = "markNotExist";
            } else if (equipment.available === true) {
                updatedStatus[equipment.equipmentId] = "markExist";
            }
        });
        setReportStatus(updatedStatus);
    }, [data]);

    return (
        <Box sx={{ width: "100%", minHeight: "100vh", position: "relative", p: 1 }}>
            {/* Modales */}
            <GenericModal
                open={openMaintanence}
                onClose={() => setOpenMaintanence(false)}
                compo={
                    <EquipmentMaintanence
                        equipmentId={equipmentIdToMaintenance}
                        nameOfTheEquipment={equipmentNameToMaintenance}
                        send={handleMaintanenceSend}
                        onClose={() => setOpenMaintanence(false)}
                    />
                }
            />

            <GenericModal
                open={openScanner}
                onClose={() => setOpenScanner(false)}
                compo={<ScamCompo handleScamCode={(code) => handleScamCode(code)} />}
            />

            {/* Alertas */}
            <Snackbar
                open={responseAlert.status}
                autoHideDuration={5000}
                onClose={() => setResponseAlert({ status: false, message: "" })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    {responseAlert.message}
                </Alert>
            </Snackbar>

            {/* Volver */}
            <Box
                sx={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    display: "flex",
                    alignItems: "center",
                    border: `1px solid ${theme.palette.primary.main}`,
                    px: 2,
                    py: 1,
                    borderRadius: "15px",
                    cursor: "pointer",
                    "&:hover": { bgcolor: theme.palette.action.hover },
                }}
                onClick={() => navigate(`/system/inventory/check/${typeInventory}`)}
            >
                <ArrowBackOutlined sx={{ color: "primary.main", mr: 1 }} />
                <Typography sx={{ color: "primary.main", fontWeight: 600 }}>Volver</Typography>
            </Box>

            {/* Barra de búsqueda */}
            <Typography variant="h5" sx={{ mt: 8, mb: 3, textAlign: "center" }}>
                Buscar de manera individual
            </Typography>

            <Box sx={{ width:"100%", display: "flex", justifyContent: "center", gap: 2, flexWrap: "wrap" }}>
                <SearchBar placeholder={searchBy} onSearch={(value) => setSearch(value)} />
                <FormControl sx={{ width: 160, display:"flex", flexWrap:"wrap"  }}>
                    <InputLabel>Buscar por</InputLabel>
                    <Select value={searchBy} label="Buscar por" onChange={(e) => setSearchBy(e.target.value)}>
                        <MenuItem value="name">Nombre</MenuItem>
                        <MenuItem value="serialNumber">Número serial</MenuItem>
                        <MenuItem value="internalCode">Código interno</MenuItem>
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    startIcon={<QrCodeScanner />}
                    onClick={() => setOpenScanner(true)}
                >
                    Escanear
                </Button>
            </Box>

            {/* Cards */}
            <Box
                sx={{
                    width: "100%",
                    mt: 6,


                }}
            >
                {
                    typeInventory == "equipment" && (
                        <CardInventoryInfo
                            data={data}
                            handleClick={handleClick}
                            open={open}
                            anchorEl={anchorEl}
                            handleCloseMenu={handleCloseMenu}
                            openChangeState={openChangeState}
                            addMaintenance={addMaintenance}
                            navigate={navigate}
                            selectedEquipment={selectedEquipment}
                            handleSubmit={handleSubmit}
                            changeStateEquipment={changeStateEquipment}
                            stateToChange={stateToChange}
                            setStateToChange={setStateToChange}
                            setChangeStateEquipment={setChangeStateEquipment}
                            handleMarkExist={(id, type) => handleMarkExist(id, type)}
                            reportStatus={reportStatus}
                        />
                    )
                }

                {
                    typeInventory == "reagent" && (
                        <ReagentByLocationCompo
                            data={data}
                            isSearch={true}

                        />
                    )
                }



            </Box>
        </Box>
    );
};

export default SearchOptionCheckInv;
