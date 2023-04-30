import { Breadcrumbs, Button, Divider, FormControl, FormControlLabel, FormLabel, Grid, Link, RadioGroup, Stack, Typography } from '@mui/material';
import { Box, Container } from '@mui/system'
import { useContext } from 'react'
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import CartItem from './CartItem';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
import CheckoutBreadCrumbs from './CheckoutBreadCrumbs';
import Radio from '@mui/material/Radio';
import ShippingRadioGroup from './ShippingRadioGroup';

const Cart = () => {
    
    const {cart, emptyCart, cartSize, getCartTotal, getUniqueID, placeOrder, shipping, setShipping} = useContext(CartContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();


    if (!cart || cartSize === 0) {
        return (
            <Container>
                <Box mt={10} sx={{minHeight: '400px'}}>
                    Your cart is currently empty.
                </Box>
            </Container>
        )
    }

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

            {/* SHOPPING CART */}
            <Grid item xs={12} sm={12} md={7}>
                <Box>
                    <Button variant='text' onClick={() => navigate("/product-category/roast/")}>
                        <KeyboardBackspaceIcon /> &nbsp; Continue Shopping
                    </Button>
                </Box>

                <Grid container mt={3}>
                    <Grid item xs={8} sm={8}>
                        Product
                    </Grid>
                    <Grid item sm={1} sx={{display: {xs: "none", sm: "block"}}}>
                        Price
                    </Grid>
                    <Grid item xs={4} sm={2} sx={{textAlign: {xs: "right", sm: "center"}}}>
                        Quantity
                    </Grid>
                    <Grid item sm={1} sx={{display: {xs: "none", sm: "block"}}}>
                        Subtotal
                    </Grid>
                </Grid>

                <Divider />

                {cart.map(cartItem => {
                    return <CartItem key={getUniqueID(cartItem)} item={cartItem} />
                })}

                <Box align="right" mt={3}>
                    SubTotal ({cartSize} items): ${getCartTotal()}
                </Box>
                <Box mt={4} align="right">
                    <Button onClick={emptyCart} color="error" variant="contained" mt={4}>Empty Cart</Button> &nbsp;
                    {user && cartSize !== 0 && <Button onClick={placeOrder} variant="contained" mt={4}>Place Order</Button>}
                </Box>
            </Grid>
            
            {/* CHECKOUT DETAILS */}
            <Grid item xs={12} sm={12} md={5} mt={5} align="center">
                <Box sx={{marginLeft: {xs: "0", sm: "0", md: "60px"}}}>
                    <Box align="center" sx={{border: "2px solid black"}}>
                        <Typography sx={{fontWeight: 'bold'}} p={1}>
                            CART TOTALS
                        </Typography>
                    </Box>

                    {/* SUBTOTAL */}
                    <Box mt={3} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                        <Typography>
                            Subtotal
                        </Typography>
                        <Typography sx={{fontWeight: 'bold'}}>
                            ${getCartTotal()}
                        </Typography>
                    </Box>

                    <Divider />

                    {/* SHIPPING RADIO GROUP */}
                    <Box mt={1} mb={2} align="left">
                        <ShippingRadioGroup />
                    </Box>

                    <Divider />

                    {/* TAX  */}
                    <Box mt={1} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            Tax
                        </Typography>
                        <Typography sx={{fontWeight: 'bold'}}>
                            ${(Number(shipping) * .055).toFixed(2)}
                        </Typography>
                    </Box>

                    <Divider />

                    {/* TOTALS */}
                    <Box mt={1} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            Total
                        </Typography>
                        <Typography sx={{fontWeight: 'bold'}}>
                            ${ (Number(getCartTotal()) + Number(shipping) + (Number(shipping) * .055)).toFixed(2) }
                        </Typography>
                    </Box>

                    <Divider sx={{ borderBottomWidth: 5 }} />

                    <Box mt={3}>
                        <Button onClick={() => navigate("/checkout")} sx={{width: 1, height: '50px' }} variant='contained'>proceed to checkout</Button>
                    </Box>

                </Box>
            </Grid>

        </Grid>

        </Box>
    </Container>
    )
}

export default Cart