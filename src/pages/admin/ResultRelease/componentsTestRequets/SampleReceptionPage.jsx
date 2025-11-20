import { Box, Button, Tooltip, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../../../service/axiosService";
import SimpleBackdrop from "../../../../components/SimpleBackDrop";
import { ArrowBack, Circle, ScienceOutlined } from "@mui/icons-material";
import ButtonBack from "../../../../components/ButtonBack";
import notImage from "../../../../assets/images/no-image-icon-6.png";
import SampleReceptionForm from "../../../../components/forms/TestRequest/SampleReceptionForm";

/*
RECEPTION PAGE OF ONE TEST REQUEST

here all samples going to be show for select witch will register reception
when the user select one, the system show the form to 


*/

const SampleReceptionPage = () => {
    const { testRequestId } = useParams();
    const [isLoanding, setIsLoanding] = useState(false);
    const [requestData, setRequestData] = useState({});
    const [samples, setSamples] = useState([]);
    const theme = useTheme();
    const [sampleSelected, setSampleSelected] = useState({});
    const [isSampleSelected, setIsSampleSelected] = useState(false);

    const getSampleData = async () => {
        setIsLoanding(true);
        try {
            const res = await api.get(
                `/testRequest/get-by-id/${testRequestId}`
            );
            if (res.status == 200) {
                setSamples(res.data.samples);
                setRequestData(res.data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoanding(false);
        }
    };

    const closeAndUpdateList = (sampleId, imageUrl) => {
        const updatedList = samples.map((sample) => {
            if (sample.sampleId == sampleId) {
                sample.statusReception = true;
                sample.sampleImage = imageUrl;
                return sample;
            } else {
                return sample;
            }
        });

        setSamples(updatedList);
        setIsSampleSelected(false);
    };

    useEffect(() => {
        getSampleData();
    }, []);

    return (
        <Box>
            <SimpleBackdrop
                open={isLoanding}
                text="Cargando todas las muestras"
            />
            <ButtonBack />
            <Box
                sx={{
                    mt: "20px",
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "40px",
                    }}
                >
                    <ScienceOutlined
                        sx={{ mr: "10px", color: "primary.main" }}
                    />
                    <Typography
                        sx={{
                            mr: "10px",
                            fontWeight: "bold",
                            opacity: "0.90",
                        }}
                    >
                        Ensayo
                    </Typography>
                    <Typography> #{requestData.requestCode}</Typography>
                    <Circle
                        sx={{
                            m: "0px 10px",
                            width: "15px",
                            color: "primary.main",
                        }}
                    />
                    <Typography
                        sx={{
                            mr: "10px",
                            fontWeight: "bold",
                            opacity: "0.90",
                        }}
                    >
                        {" "}
                        Recepción de muestras
                    </Typography>
                </Box>
            </Box>
            <Typography
                variant="h3"
                component={"h3"}
                sx={{
                    textAlign: "center",
                    mt: "50px",
                    color: "primary.main",
                }}
            >
                Elige una muestra para registrar recepción
            </Typography>
            <Typography
                variant="body2"
                sx={{ textAlign: "center", mb: "50px" }}
            >
                hay {samples.length} muestras para recepción
            </Typography>

            {/* ////////////////////////// OPTIONS OF SAMPLES TO SELECTE */}
            {!isSampleSelected ? (
                <Box
                    sx={{
                        mt: "40px",
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(200px, 1fr))",
                        gap: "10px",
                    }}
                >
                    {samples.map((sample) => {
                        return (
                            <Tooltip
                                key={sample.sampleCode}
                                title={"Seleccionar esta muestra"}
                            >
                                <Box
                                    onClick={() => {
                                        setSampleSelected(sample);
                                        setIsSampleSelected(true);
                                    }}
                                    sx={{
                                        bgcolor: "background.default",
                                        border: `1px solid ${theme.palette.border.primary}`,
                                        height: "100px",
                                        borderRadius: "20px",
                                        display: "flex",
                                        justifyContent: "center",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        p: "20px",
                                        ":hover": {
                                            bgcolor: `${
                                                theme.palette.primary.main + 10
                                            } `,
                                            border: `1px solid ${theme.palette.primary.main} `,
                                            transform: "scale(1.03)",
                                            boxShadow: 5,
                                        },
                                        cursor: "pointer",
                                    }}
                                >
                                    <Typography>{sample.matrix}</Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            color: sample.statusReception
                                                ? "primary.main"
                                                : "red",
                                        }}
                                    >
                                        {sample.statusReception
                                            ? "Ya registro recepcion"
                                            : "No ah registrado recepcion"}
                                    </Typography>
                                </Box>
                            </Tooltip>
                        );
                    })}
                </Box>
            ) : (
                //  ///////////////// UI TO SHOW THE FORM TO SAVE RECEPTION DATA
                <Box>
                    <Button
                        onClick={() => setIsSampleSelected(false)}
                        startIcon={<ArrowBack />}
                        variant="text"
                        sx={{
                            mb: "20px",
                        }}
                    >
                        Volver a elegir
                    </Button>
                    <Box
                        sx={{
                            width: "100%",
                            minHeight: "450px",
                            border: `1px solid ${theme.palette.border.primary}`,
                            mb: "40px",
                            borderRadius: "20px",

                            display: "flex",
                            p: "20px",
                        }}
                    >
                        <Box
                            sx={{
                                width: "30%",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    mb: "20px",
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {sampleSelected.matrix}
                                </Typography>
                                <Circle
                                    sx={{
                                        width: "15px",
                                        ml: "10px",
                                        mr: "10px",
                                        color: "primary.third",
                                    }}
                                />
                                <Typography>
                                    {sampleSelected.sampleCode}
                                </Typography>
                            </Box>
                            <Box>
                                <img
                                    src={
                                        sampleSelected.sampleImage
                                            ? sampleSelected.sampleImage
                                            : notImage
                                    }
                                    width={"300px"}
                                    alt="imagenSample"
                                />
                            </Box>
                        </Box>

                        {/* FORM TO SAVE RECEPTION */}
                        <SampleReceptionForm
                            data={sampleSelected}
                            onClose={(sampleId, sampleImage) => {
                                // This method ensures that when a user registers a sample reception, they are redirected back to the reception section
                                //  and the sample list is updated so that the newly registered sample appears as received.

                                // return also the image if have
                                closeAndUpdateList(sampleId, sampleImage);
                            }}
                        />
                    </Box>
                </Box>
            )}
        </Box>
    );
};

export default SampleReceptionPage;
