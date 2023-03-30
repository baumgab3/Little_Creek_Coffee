import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from './context/UserContext';

const UserOrders = () => {

    const {getUserOrders, orders} = useContext(UserContext);

    useEffect(() => {

        const loadOrders = () => {
            getUserOrders();
        }

        loadOrders();

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