import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import SimpleBackdrop from "../../../components/SimpleBackDrop";
import api from "../../../service/axiosService";
import { Typography } from "@mui/material";
import { SupervisedUserCircleOutlined } from "@mui/icons-material";
import Customers from "./Customers";
import Users from "./Users";

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

const CustomersAndUsersPage = () => {
    const [value, setValue] = useState(0);
    const [isLoanding, setIsLoanding] = useState(false);
    const [usersData, setUsersData] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUsers = async () => {
        try {
            const res = await api.get("/users/getAll");
            setUsersData(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        setIsLoanding(true);
        const init = async () => {
            await getUsers();
        };

        init();
        setIsLoanding(false);
    }, []);

    useEffect(() => {}, [usersData]);

    return (
        <Box
            sx={{
                width: "100%",
                bgcolor: "background.default",
                p: "20px",
                borderRadius: "20px",
            }}
        >
            <SimpleBackdrop open={isLoanding} />

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    aria-label="basic tabs example"
                >
                    <Tab label="Usuarios del sistema" {...a11yProps(0)} />
                    <Tab label="Clientes" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <CustomTabPanel value={value} index={0}>
                <Users
                    users={usersData}
                    updateList={(user) => setUsersData([...usersData, user])}
                    refresh={() => getUsers()}
                />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <Customers />
            </CustomTabPanel>
        </Box>
    );
};

export default CustomersAndUsersPage;
