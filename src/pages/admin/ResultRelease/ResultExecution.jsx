import { Box, Tab, Tabs, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonBack from "../../../components/ButtonBack";
import { Try } from "@mui/icons-material";
import api from "../../../service/axiosService";
import PropTypes from "prop-types";
import ResultExecutionSamplesAvailable from "./componentsTestRequets/ResultExecutionSamplesAvailable";

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const ResultExecution = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getData = async () => {
        try {
            const res = await api.get();
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <ButtonBack />
            <Typography
                variant="h3"
                sx={{
                    mt: "20px",
                }}
            >
                Ejecucion de resultados
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: "20px" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Muestras disponibles" {...a11yProps(0)} />
                    <Tab label="Muestras vencidas" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <ResultExecutionSamplesAvailable />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Typography>hola 2</Typography>
            </CustomTabPanel>
        </Box>
    );
};

export default ResultExecution;
