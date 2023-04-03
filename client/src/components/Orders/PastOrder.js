import { Box, Container } from '@mui/system'
import React, { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { Divider, Grid, Typography } from '@mui/material';
import OrderItemSummary from './OrderItemSummary/OrderItemSummary';
import { yellow } from '@mui/material/colors';

const PastOrder = () => {

    const {orderId} = useParams();
    const {getOrderById, pastOrder} = useContext(UserContext);
    const orderStyle = {
        backgroundColor: yellow[500],
    }

    useEffect(() => {
        const loadOrder = () => {
            getOrderById(orderId);
        }

        loadOrder();
    }, [orderId]);

    if (pastOrder.orderDetails) {
        return (
            <Container>
                <Box mt={10}>

                    <Box mt={2} mb={2}>
                        <Typography>
                            Order <span style={orderStyle}>#{pastOrder.orderDetails.id}</span> was 
                            placed on <span style={orderStyle}>{pastOrder.orderDetails.placedDate}</span> and is
                            currently <span style={orderStyle}>{pastOrder.orderDetails.status}</span>.
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

                    {pastOrder.order.map((order) => {
                        return <Box key={order.id} mt={2} >
                                <OrderItemSummary order={order} />
                                <Box mt={2}></Box>
                                <Divider sx={{borderBottomWidth: 3}} />
                            </Box>
                    })}

                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={8}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                SubTotal
                            </Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                ${pastOrder.orderDetails.subTotal.toFixed(2)}
                            </Typography>
                        </Grid>
                    </Grid>

                </Box>
            </Container>
        )
}

}

export default PastOrder