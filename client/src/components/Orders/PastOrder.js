import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { Divider, Grid, Typography } from '@mui/material';
import OrderItemSummary from './OrderItemSummary/OrderItemSummary';
import { yellow } from '@mui/material/colors';
import UserDrawer from './UserDrawer';
import axios from 'axios';

const PastOrder = () => {

    const {orderId} = useParams();
    // const {getOrderById, pastOrder} = useContext(UserContext);
    const {user} = useContext(UserContext);
    const orderStyle = {
        backgroundColor: yellow[500],
    }
    
    const [pastOrder, setPastOrder] = useState({});

    useEffect(() => {
        const url = `http://localhost:8081/orders/view-order/${orderId}/${user.id}`;
        const token = localStorage.getItem('accessToken');

        axios.get(url, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((response) => {
            return setPastOrder(response.data);
        })
        .catch(err => {
            console.log("error fetching user orders", err);
        })

    }, [orderId, user.id]);

        return (
            <Container>
                <Box mt={10}>
                    
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={12} md={3}>
                        <UserDrawer />
                    </Grid>

                    <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>


                    <Box mt={2} mb={2}>
                       {pastOrder.orderDetails &&  <Typography>
                            Order <span style={orderStyle}>#{pastOrder.orderDetails.id}</span> was 
                            placed on <span style={orderStyle}>{pastOrder.orderDetails.placedDate}</span> and is
                            currently <span style={orderStyle}>{pastOrder.orderDetails.status}</span>.
                        </Typography>
                        }
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

                    {pastOrder.orderDetails && pastOrder.order.map((order) => {
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
                            {pastOrder.orderDetails && <Typography variant="h6" sx={{fontWeight: 'bold'}}>
                                ${pastOrder.orderDetails.subTotal.toFixed(2)}
                            </Typography>
                            }
                        </Grid>
                    </Grid>
                    </Grid>


                </Grid>
                </Box>
            </Container>
        )


}

export default PastOrder