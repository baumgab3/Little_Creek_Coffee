import { Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import PastOrderPreview from './PastOrderPreview';

const UserOrders = () => {

    const {getOrdersPreview, orders} = useContext(UserContext);

    useEffect(() => {

        const loadOrders = () => {
            getOrdersPreview();
        }

        loadOrders();
        
    }, []);

    if (orders && orders.length === 0) {
        return (
            <Container>
                <Box mt={10}>
                    No Orders have been placed
                </Box>
            </Container>
        )
    }

    return (
        <Container>
        {orders && 
        <Box mt={10}>
            <Grid container mt={10} align="left" mb={4} sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                <Grid item xs={3}>
                    <Typography>
                        Date
                    </Typography>
                </Grid>
                <Grid item xs={3} >
                    <Typography>
                        Status
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>
                        Total
                    </Typography>
                </Grid>
                <Grid item xs={3}>
                    <Typography>
                        Actions
                    </Typography>
                </Grid>
            </Grid>

            {orders.map((order) => {
                return <PastOrderPreview key={order.id} order={order} />
            })}

        </Box>
        }

        </Container>
    )
}

export default UserOrders