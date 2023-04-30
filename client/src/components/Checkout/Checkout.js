import { Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, ImageList, ImageListItem, Link, Radio, RadioGroup, Slide, Stack, TextField, Typography } from '@mui/material';
import { Box, Container } from '@mui/system'
import { useContext, useEffect, useState } from 'react'
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import CheckoutBreadCrumbs from './CheckoutBreadCrumbs';
import ShippingRadioGroup from './ShippingRadioGroup';
import Login from '../Login';
import Fade from '@mui/material/Fade';


const Checkout = () => {

    const {cart, getCartTotal, shipping} = useContext(CartContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [displayLogin, setDisplayLogin] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0) 
    }, [])
    
    return (
        <Container>
            <Box sx={{minHeight: '500px'}}>
    
            <Grid container spacing={3} mt={5}>
    
                {/* BREADCRUMBS */}
                <Grid item xs={12} align="center" mb={3}>
                    <CheckoutBreadCrumbs />
    
                    <Box align="center">
                        <Typography sx={{display: {xs: 'block', sm: 'none'}}}>
                            SHOPPING CART
                        </Typography>
                    </Box>
                </Grid>
    
                {/* USER ADDRESSES */}
                <Grid item xs={12} sm={12} md={7}>
                    {!user && 
                    <>
                     <Typography>
                        Returning customer? <Link href='#' onClick={() => setDisplayLogin(!displayLogin)} underline="hover">Click here to login</Link>
                     </Typography>

                    </>
                    }

    

                </Grid>
                
                {/* CHECKOUT DETAILS */}
                <Grid item xs={12} sm={12} md={5} mt={5} align="center">
                    <Box sx={{marginLeft: {xs: "0", sm: "0", md: "60px"}}}>
                        <Box align="center" sx={{border: "2px solid black"}}>
                            <Typography sx={{textTransform: 'uppercase', fontWeight: 'bold'}} p={1}>
                                Your Order
                            </Typography>
                        </Box>
    
                        {/* Products */}
                        <Box mt={3} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                Product
                            </Typography>
                            <Typography sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                Subtotal
                            </Typography>
                        </Box>

                        <Divider sx={{ borderBottomWidth: 5 }} />

                         <Box align="left" mt={1}>
                            {cart.map(item => {
                                return <Box mb={2} key={item.id} sx={{display:'flex', justifyContent: 'space-between'}}>
                                        <Box>
                                            <Box>
                                                {item.name.toUpperCase()}
                                            </Box>
                                            <Box sx={{fontSize: '13px'}}>
                                            QUANTITY: {item.quantity}
                                            </Box>
                                            {item.description && 
                                            <Box sx={{fontSize: '13px'}}>
                                            SIZE: {item.description}
                                            </Box>
                                            }
                                            {item.grind &&
                                            <Box sx={{fontSize: '13px'}}>
                                            GRIND TYPE: {item.grind}
                                            </Box>
                                            }
                                        </Box>

                                        <Box sx={{fontWeight: 'bold'}}>
                                            ${item.salePrice ? item.salePrice.toFixed(2) : item.price.toFixed(2)}
                                        </Box>
                                    </Box>
                            })}
                         </Box>

                         <Divider />
                        
                        {/* Subotal */}
                         <Box mt={1} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{ fontWeight: 'bold'}}>
                                Subtotal
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold'}}>
                                ${getCartTotal()}
                            </Typography>
                        </Box>

                        <Divider />

                        {/* SHIPPING RADIO GROUP */}
                        <Box mt={1} mb={2} align="left">
                            <ShippingRadioGroup />
                        </Box>

                        <Divider />
                        
                        {/* COUPON */}
                        <Box mt={3} align="left">
                            <Typography variant='h6' mb={2}>
                                Have a coupon?
                            </Typography>

                            <Box mb={2}>
                                <TextField sx={{width: 1}} label="Coupon code" variant="outlined" />
                            </Box>

                            <Button sx={{width: 1, height: '50px' }} variant='outlined'>apply coupon</Button>
                        </Box>

                        {/* CREDIT CARD */}
                        <Box align="left" mt={4}>
                        <Stack direction="row" spacing={1}>
                        <RadioGroup defaultValue="creditcard">
                           <FormControlLabel control={<Radio />} value="creditcard" label="Credit Card" /> 
                        </RadioGroup>
                        
                            <img
                                src="/images/credit_card.png"
                                loading="lazy"
                                width="40"
                                height="40"
                            />

                            <img
                                src="/images/credit_card.png"
                                loading="lazy"
                                width="40"
                                height="40"
                            />

                            <img
                                src="/images/credit_card.png"
                                loading="lazy"
                                width="40"
                                height="40"
                            />
                        </Stack>

                        <Typography mt={1} mb={2}>
                            Pay securely using your credit card.
                        </Typography>

                        <TextField sx={{width: 1}} label="Card Number" variant="outlined" placeholder="**** **** **** ****" required/>

                        <Grid container mt={2}>
                            <Grid item xs={12} sm={6} align="left">
                                <TextField
                                    label="Expiration (MM/YY)"
                                    placeholder="MM/YY"
                                    sx={{width: {xs: "100%", sm: "95%"} }}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} align="right" sx={{marginTop: {xs: '16px', sm: '0px'}}}>
                                <TextField
                                    label="Card Security Code"
                                    placeholder="CSC"
                                    sx={{width: {xs: "100%", sm: "90%"} }}
                                    required
                                />
                            </Grid>
                        </Grid>

   
                        </Box>

                        {/* TAX  */}
                        <Box mt={3} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{ fontWeight: 'bold'}}>
                                Tax
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}}>
                                ${(Number(shipping) * .055).toFixed(2)}
                            </Typography>
                        </Box>
    
                        <Divider />
    
                        {/* TOTALS */}
                        <Box mt={1} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{ fontWeight: 'bold'}}>
                                Total
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}}>
                                ${ (Number(getCartTotal()) + Number(shipping) + (Number(shipping) * .055)).toFixed(2) }
                            </Typography>
                        </Box>

                        <Divider sx={{ borderBottomWidth: 5 }} />

                        <Box mt={3}>
                            <Button onClick={() => navigate("/checkout")} sx={{width: 1, height: '50px'}} variant='contained'>place order</Button>
                        </Box>

                    </Box>
                </Grid>

            </Grid>

            </Box>
        </Container>
        )
}

export default Checkout