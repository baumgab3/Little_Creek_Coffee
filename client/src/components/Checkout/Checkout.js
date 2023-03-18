import { Divider, Grid } from '@mui/material';
import { Box, Container } from '@mui/system'
import { useContext } from 'react'
import CartContext from '../../context/CartContext';
import CartItem from './CartItem';

const Checkout = () => {
    
    const {cart} = useContext(CartContext);
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
                    return <CartItem key={cartItem.id} item={cartItem} />
                })}

                <Box align="right">
                    SubTotal (4 items): $4444.44
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