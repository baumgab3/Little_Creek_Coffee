import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'

const CoffeeItemSummary = ({order}) => {

    return (
        <>
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography>
                {order.name} <b>x {order.quantity}</b>
            </Typography>
        </Grid>


        <Grid item xs={8}>
            <Typography sx={{fontWeight: 'bold'}}>
                Size:
            </Typography>
            <Typography>
                {order.description}
            </Typography>
        </Grid>

        <Grid item xs={4}>
            <br />
            <Typography sx={{fontWeight: 'bold'}}>
                ${order.salePrice ? order.salePrice.toFixed(2) : order.price.toFixed(2)}
            </Typography>
        </Grid>
        
        <Grid item xs={12} >
            <Typography sx={{fontWeight: 'bold'}}>
                Grind Type:
            </Typography>
            <Typography>
                {order.grind}
            </Typography>
        </Grid>
        </Grid>

        </>
    )
}

export default CoffeeItemSummary