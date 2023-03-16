import { Box, Container } from '@mui/system'
import { useContext } from 'react'
import CartContext from '../../context/CartContext';

const Checkout = () => {
    
    const {cart} = useContext(CartContext);


    return (
    <Container>
        <Box mt={10}>
            checkout

        </Box>
    </Container>
    )
}

export default Checkout