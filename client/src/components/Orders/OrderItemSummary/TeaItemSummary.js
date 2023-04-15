import React from 'react'
import { Divider, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'

const TeaItemSummary = ({order}) => {

    return (
        <Grid container spacing={2}>
            <Grid item xs={8}>
                <Typography>
                    {order.name} <b>x {order.quantity}</b>
                </Typography>
            </Grid>

            <Grid item xs={4}>
                <Typography sx={{fontWeight: 'bold'}}>
                    ${order.salePrice ? order.salePrice.toFixed(2) : order.price.toFixed(2)}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default TeaItemSummary