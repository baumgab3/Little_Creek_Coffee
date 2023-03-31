import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from './context/UserContext';

const UserOrders = () => {

    const {getOrdersPreview, orders} = useContext(UserContext);

    useEffect(() => {

        const loadOrders = () => {
            getOrdersPreview();
        }

        loadOrders();
        console.log(orders);

    }, []);

    return (
        <Container>
            <Box mt={10}>
                Past Order
            </Box>
        </Container>
    )
}

export default UserOrders