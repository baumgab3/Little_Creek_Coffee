import { Button, Divider, Grid } from '@mui/material';
import { Box, Container } from '@mui/system'
import { useContext } from 'react'
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import CartItem from './CartItem';

const Checkout = () => {
    
    const {cart, cartSize, getCartTotal, getUniqueID, placeOrder} = useContext(CartContext);
    const {user} = useContext(UserContext);

    if (!cart || cartSize === 0) {
        return (
            <Container>
                <Box mt={10}>
                    Your cart is currently empty.
                </Box>
            </Container>
        )
    }

    return (
    <Container>

        <Grid container spacing={1} mt={10}>
            <Grid item xs={12} sm={12} md={7}>

            <Grid container mt={10}>
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

                <Box align="right" mt={1}>
                    SubTotal ({cartSize} items): ${getCartTotal()}
                </Box>
                <Box mt={4} align="right">
                    {user && cartSize !== 0 && <Button onClick={placeOrder} variant="contained" mt={4}>Place Order</Button>}
                </Box>
            </Grid>

            <Grid item xs={12} sm={12} md={5} align="center">
                product checkout
            </Grid>
        </Grid>

    </Container>
    )
}

export default Checkout