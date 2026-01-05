import { Box, Tab, Tabs, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ButtonBack from "../../../components/ButtonBack";
import { Try } from "@mui/icons-material";
import api from "../../../service/axiosService";
import PropTypes from "prop-types";
import ResultExecutionSamplesAvailable from "./componentsTestRequets/ResultExecution/ResultExecutionSamplesAvailable";

import SamplesDelivered from "./componentsTestRequets/ResultExecution/SamplesDelivered";
import SamplesWithoutReception from "./componentsTestRequets/ResultExecution/SamplesWithoutReception";

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
    const theme = useTheme();

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
            <Typography
                variant="h3"
                sx={{
                    mt: "20px",
                    color: "primary.main",
                    textAlign: "center",
                }}
            >
                Gestion de muestras
            </Typography>

            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: "20px" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="styled tabs"
                    sx={{
                        backgroundColor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 1,
                        "& .MuiTab-root": {
                            textTransform: "none",
                            fontWeight: "500",

                            "&.Mui-selected": {
                                color: "primary.main",
                                backgroundColor: "background.default",
                                borderRadius: 2,
                                border: `1px solid ${theme.palette.border.primary}`,
                            },
                        },
                    }}
                >
                    <Tab label="Disponibles" {...a11yProps(0)} />

                    <Tab label="Entregadas" {...a11yProps(1)} />
                    <Tab label="Sin recepcion" {...a11yProps(2)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <ResultExecutionSamplesAvailable />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <SamplesDelivered />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
                <SamplesWithoutReception />
            </CustomTabPanel>
        </Box>
    );
};

export default ResultExecution;
