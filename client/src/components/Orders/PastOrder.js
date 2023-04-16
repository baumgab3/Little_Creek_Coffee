import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import { useParams } from 'react-router-dom';
import { Button, Divider, Grid, Typography } from '@mui/material';
import OrderItemSummary from './OrderItemSummary/OrderItemSummary';
import { yellow } from '@mui/material/colors';
import UserDrawer from './UserDrawer';
import axios from 'axios';
import CartContext from '../context/CartContext';
import { useNavigate } from "react-router-dom";

const PastOrder = () => {

    const {orderId} = useParams();
    // const {getOrderById, pastOrder} = useContext(UserContext);
    const {user} = useContext(UserContext);
    const { addPastOrderToCart } = useContext(CartContext);
    const navigate = useNavigate();
    const [isLoaded, setIsLoaded] = useState(false);
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
            setIsLoaded(true);
            return setPastOrder(response.data);
        })
        .catch(err => {
            console.log("error fetching user orders", err);
        })

    }, [orderId, user.id]);

    const handleBuyAgain = async () => {
        // when buying orders from the past we need to make sure we are using the latest pricing and 
        // not the pricing when the item was bought
        
        const updatedPastOrder = [];

        for (const order of pastOrder.order) {
            // copy of original order that will have updated prices
            const orderClone = {... order};
            const priceObj = await getOrderPrice(order);
            orderClone.price = priceObj.price;
            orderClone.salePrice = priceObj.salePrice;
            updatedPastOrder.push(orderClone);
        }

        const pastOrderObj = {
            quantity: pastOrder.orderDetails.quantity,
            order: updatedPastOrder
        }


        addPastOrderToCart(pastOrderObj);

        navigate("/cart");
    }

    const getOrderPrice = async (order) => {
        const productId = order.id

        // if order doesn't have description just add a blank to make life easier below
        if (!order.description) {
            order.description = "";
        }

        const url = `http://localhost:8081/product/price/${productId}`;
        let price = {};
        await axios.get(url)
        .then((response) => {
            const priceArray = response.data;

            // products can have multiple prices, loop through and find current price to compare
            for (const priceObj of priceArray) {
                if (priceObj.description === order.description) {
                    // if product has sale, return its latest sale price
                    price = {"price": priceObj.price, "salePrice": priceObj.salePrice};
                    break;
                }
            }

        })
        .catch(err => {
            console.log("error get price", err);
        })

        return price;
    }

    return (
        <Container>
            <Box mt={10}>
                
            <Grid container spacing={2}>

                <Grid item xs={12} sm={12} md={3}>
                    <UserDrawer />
                </Grid>

                {isLoaded && 
                <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>
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
                        return <Box key={order.orderId} mt={2} >
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

                        <Grid item xs={12}>
                            <Button onClick={handleBuyAgain} variant='contained'>Buy Again</Button>
                        </Grid>

                    </Grid>
                    
                </Grid>
                }
            </Grid>
            </Box>
            <br/>
            <br/>
            <br/>
            <br/>
        </Container>
    )


}

export default PastOrder