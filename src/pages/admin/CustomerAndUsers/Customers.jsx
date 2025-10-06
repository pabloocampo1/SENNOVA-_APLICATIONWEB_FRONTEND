import { Box } from '@mui/material';
import React from 'react';

const Customers = ({ customers = [] }) => {


    return (
        <Box>
            {customers.map((customer) => {
                return <>
                    <Box key={customer.customerId}>
                        {customer.customerName}
                    </Box>
                </>
            })}
        </Box>
    );
};

export default Customers;