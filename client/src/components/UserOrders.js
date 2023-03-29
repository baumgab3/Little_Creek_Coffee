import { Box, Container } from '@mui/system'
import React, { useContext, useEffect } from 'react'
import UserContext from './context/UserContext';

const UserOrders = () => {

    const {getUserOrders} = useContext(UserContext);

    useEffect(() => {
        getUserOrders();
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