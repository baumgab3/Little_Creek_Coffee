import { Divider, FormControl, Grid, MenuItem, Select, Stack, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import CartContext from '../../context/CartContext';

const CartItem = ({item}) => {

    const [quantity, setQuantity] = useState(item.quantity);
    const [subTotal, setSubTotal] = useState(item.quantity * item.price);
    const total = useRef(item.quantity);

    const {removeFromCart, updateItemQuantity} = useContext(CartContext);

    const handleQuantityChange = (event) => {
        total.value = event.target.value;

        if (total.value === 0) {
            removeFromCart(item);
            return;
        }

        setQuantity(event.target.value);
        setSubTotal(total.value * item.price);
        updateItemQuantity(item.id, total.value);
    }


    return (
        <Box>
            <Grid container >
                <Grid item xs={3} sm={2}>
                    <Box p={1} >
                        <img width="100%" src="../images/holder_2.jpg" alt="" /> 
                    </Box>
                </Grid>
                <Grid item xs={7} sm={6} align="left">
                    <Box mt={1} ml={2}>
                        {item.name}
                    </Box>
                    <Box ml={2}>
                        {item.description && 
                        <Typography sx={{fontSize: '13px'}}>
                            SIZE: {item.description}
                        </Typography> }

                        {item.grind && 
                        <Typography sx={{fontSize: '13px'}}>
                            GRIND TYPE: {item.grind}
                        </Typography>}

                        <Stack direction="row">
                            <Typography sx={{fontSize: '13px', display: {xs: "inherit", sm: "none"}}}>
                                {item.quantity} x &nbsp;
                            </Typography>
                            <Typography sx={{fontSize: '13px', fontWeight: 'bold', display: {xs: "inherit", sm: "none"}}}>
                                ${item.price.toFixed(2)}
                            </Typography>
                        </Stack>
                    </Box>
                </Grid>
                <Grid item sm={1} sx={{display: {xs:"none", sm: "block"}}} >
                    <Box mt={1} >
                        ${item.price.toFixed(2)}
                    </Box>
                </Grid>
                <Grid item xs={2} sm={2} sx={{textAlign: {xs: "right", sm: "center"}}}>
                    <Box mt={1} >
                        <FormControl sx={{width: "70px"}} size="small">
                        <Select
                            inputProps={{ 'aria-label': 'Without label' }}
                            defaultValue={item.quantity}
                            value={quantity}
                            onChange={handleQuantityChange}
                        >
                            <MenuItem value={0}>0</MenuItem>                            
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                        </FormControl>
                    </Box>
                </Grid>
                <Grid item sm={1} sx={{display: {xs:"none", sm: "block"}}} >
                    <Box mt={1} >
                        ${subTotal.toFixed(2)}
                    </Box>
                </Grid>
            </Grid>
            <Divider />
        </Box>
    )
}

export default CartItem