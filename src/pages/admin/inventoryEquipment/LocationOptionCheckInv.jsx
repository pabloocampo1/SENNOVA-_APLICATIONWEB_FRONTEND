import { ArrowBackOutlined, QrCodeScanner } from '@mui/icons-material';
import { Box, Button, Card, CardActionArea, Typography, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchBar from '../../../components/SearchBar';
import api from '../../../service/axiosService';
import EquipmentsByLocationCompo from './componentsEquipment/EquipmentsByLocationCompo';
import SimpleBackdrop from '../../../components/SimpleBackDrop';
import GenericModal from '../../../components/modals/GenericModal';
import ScamCompo from '../../../components/scam/ScamCompo';
import ReagentByLocationCompo from '../inventoryReagent/ReagentByLocationCompo';

const LocationOptionCheckInv = () => {

    const { typeInventory } = useParams();

    const [locationsData, setLocationData] = useState([]);
    const navigate = useNavigate();
    const theme = useTheme();
    const [search, setSearch] = useState("");
    const [errorFetch, setErrorFetch] = useState(false);
    const [showElementByLocation, setShowElementByLocation] = useState(false);
    const [elementsByLocationData, setElementsByLocationData] = useState([]);
    const [isLoanding, setIsLoanding] = useState(false);
    const [locationName, setLocationName] = useState("");
    const [locationSelectedId, setLocationSelectedId] = useState(null);
    const [openScanner, setOpenScanner] = useState(false);

    const handleSearch = (value) => {
        setShowElementByLocation(false)
        setSearch(value);
    };

    const fetchData = async () => {
        setIsLoanding(true)
        try {
            const res = await api.get("/location/getAll");
            if (res.status === 200) {
                setLocationData(res.data);
            }
        } catch (error) {
            alert("ocurrió un error: ", error.data);
        } finally {
            setIsLoanding(false)
        }
    };


    const handleScamCode = (code) => {
        getByISenaInventoryTag(code);
        setOpenScanner(false)

    }

    const fetchDataByLocationId = async (locationId, name) => {
        setLocationSelectedId(locationId)

        setIsLoanding(true)
        try {
            if (typeInventory == "equipment") {
                const res = await api.get(`/equipment/get-all-by-location/${locationId}`);
                if (res.status == 200) {
                    setElementsByLocationData(res.data);
                    setShowElementByLocation(true);
                }
            }

            if (typeInventory == "reagent") {
                const res = await api.get(`/reagent/getAllByLocation/${locationId}`);
                console.log("response: ");
                console.log(res);
                
                
                if (res.status == 200) {
                    setElementsByLocationData(res.data);
                    setShowElementByLocation(true);
                }
            }
        } catch (error) {
            console.error(error);

        } finally {
            setIsLoanding(false)

        }
        setLocationName(name)

    }

    const getByISenaInventoryTag = async (code) => {
        try {
            const res = await api.get(`/equipment/get-all-by-sena-inventory-tag/${code}`);
            setElementsByLocationData(res.data)
            setShowElementByLocation(true)

        } catch (error) {
            console.log(error);

        }
    }


    const searchLocationByName = async () => {
        setIsLoanding(true)
        try {
            const response = await api.get(`/location/getByName/${search}`);

            if (response.status !== 200) {
                setErrorFetch(true)
            } else {
                setLocationData(response.data)
            }

        } catch (error) {
            console.error(error);
            setErrorFetch(true)
        } finally {
            setIsLoanding(false)
        }
    }

    useEffect(() => {
        if (search) {
            searchLocationByName();
        } else {
            fetchData();
        }

    }, [search]);

    useEffect(() => {

    }, [elementsByLocationData])

    return (
        <Box
            sx={{
                width: "100%",
                minHeight: "100vh",
                position: "relative",
                display: "flex",
                justifyContent: "center",
                px: { xs: 2, sm: 4, md: 6 },

            }}
        >

            <SimpleBackdrop open={isLoanding} />

            <GenericModal open={openScanner} compo={<ScamCompo handleScamCode={(code) => handleScamCode(code)} />} onClose={() => setOpenScanner(false)} />

            {/* Botón back */}
            <Box
                sx={{
                    px: 2,
                    py: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "15px",
                    border: `1px solid ${theme.palette.primary.main}`,
                    position: "absolute",
                    top: 20,
                    left: 20,
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                        bgcolor: theme.palette.action.hover,
                    },
                }}
                onClick={() => navigate(`/system/inventory/check/${typeInventory}`)}
            >
                <ArrowBackOutlined sx={{ color: "primary.main", mr: 1 }} />
                <Typography sx={{ color: "primary.main", fontWeight: 600 }}>Volver</Typography>
            </Box>

            <Box
                sx={{
                    width: "100%",
                    pt: { xs: "70px", md: "120px" },
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                {/* Encabezado */}
                <Box sx={{ textAlign: "center", mb: {xs:3, mb:4},mt: {xs:4, mb:3},  display: "flex", flex:"wrap" }}>
                    <SearchBar placeholder={"Buscar Ubicación..."} onSearch={handleSearch} />
                    <Button
                        variant="contained"
                        startIcon={<QrCodeScanner />}
                        onClick={() => setOpenScanner(true)}
                        sx={{
                            ml: "20px"
                        }}
                    >
                        Escanear
                    </Button>
                </Box>
                <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
                    Empezar por...
                </Typography>

                {errorFetch && (<Typography sx={{ bgcolor: "red" }}>Ocurrio un error intentado traer la informacion.</Typography>)}


                {!showElementByLocation ?

                    (
                        <Box
                            sx={{
                                display: "grid",
                                  gridTemplateColumns: {xs:"repeat(auto-fill, minmax(250px, 1fr))" ,mb:"repeat(auto-fill, minmax(330px, 1fr))"},
                                gap: 3,
                                width: "100%",
                                mt: 4,
                               
                                mx: "auto",
                                justifyContent: "center",
                            }}
                        >
                            {locationsData.map((location) => (
                                <Card
                                    key={location.equipmentLocationId}
                                    elevation={3}
                                    onClick={() => fetchDataByLocationId(location.equipmentLocationId, location.locationName)}
                                    sx={{
                                        borderRadius: "16px",
                                        border: `1px solid ${theme.palette.divider}`,
                                        transition: "all 0.3s ease",
                                        "&:hover": {
                                            transform: "translateY(-5px) scale(1.02)",
                                            boxShadow: `0 6px 20px ${theme.palette.primary.main}40`,
                                            border: `2px solid ${theme.palette.primary.main}`,
                                        },
                                    }}
                                >
                                    <CardActionArea
                                        sx={{
                                            height: "120px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            bgcolor: "background.paper",
                                            p: 2,
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                fontWeight: 600,
                                                textAlign: "center",
                                                color: theme.palette.text.primary,
                                            }}
                                        >
                                            {location.locationName}
                                        </Typography>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                    )

                    :

                    (
                        <>
                            {typeInventory == "equipment" && (<EquipmentsByLocationCompo equipments={elementsByLocationData} back={() => setShowElementByLocation(false)} locationName={locationName} refresh={(locationSelectedId, locationName) => fetchDataByLocationId(locationSelectedId, locationName)} locationId={locationSelectedId}  />)}
                            {typeInventory == "reagent" && (
                                <ReagentByLocationCompo
                                    data={elementsByLocationData}
                                    back={() => setShowElementByLocation(false)}
                                    locationName={locationName}
                                    refresh={(locationSelectedId, locationName) => fetchDataByLocationId(locationSelectedId, locationName)}
                                    locationId={locationSelectedId}
                                    
                                    
                                     />)}
                        </>

                    )
                }
            </Box>
        </Box>
    );
};

export default LocationOptionCheckInv;
