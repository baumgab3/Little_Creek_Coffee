import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import { useParams } from 'react-router-dom';
import CartItem from '../Checkout/CartItem';
import { Divider, Grid, Typography } from '@mui/material';
import OrderItemSummary from './OrderItemSummary/OrderItemSummary';

const PastOrder = () => {

    const {orderId} = useParams();

    const {getOrderById, pastOrder} = useContext(UserContext);
    // const [pastOrder, setPastOrder] = useState([]);

    useEffect(() => {
        // getOrderById(orderId)

        const loadOrder = () => {
            // setPastOrder(getOrderById(orderId));
            getOrderById(orderId)

            // console.log(getOrderById(orderId));
        }

        loadOrder();
    }, [orderId]);

    if (pastOrder) {
        return (
            <Container>
                <Box mt={10}>

                    <Box mt={2} mb={2}>
                        <Typography>
                            Order # was placed on # and is currently __
                        </Typography>
                    </Box>


                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h5' sx={{fontWeight: 'bold'}}>
                                Order details
                            </Typography>
                        </Grid>
                        <Grid item xs={8}>
                            <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                                Product
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                                Total
                            </Typography>
                        </Grid>
                    </Grid>

                    <Divider sx={{borderBottomWidth: 5}} />

                    {/* <Grid container mt={1} spacing={2}>
                        {pastOrder.map((order) => {
                            return <OrderItemSummary order={order} key={order.id} />
                        })}
                    </Grid> */}
                        {pastOrder.map((order) => {
                            return <Box key={order.id} mt={2} >
                                    <OrderItemSummary order={order} />
                                    <Box mt={2}></Box>
                                    <Divider sx={{borderBottomWidth: 3}} />
                                </Box>
                        })}
                </Box>
                <br />
                <br />
                <br />
                <br />
            </Container>
        )
}

}

export default PastOrder