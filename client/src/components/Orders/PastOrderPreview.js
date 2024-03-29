import { Divider, Grid, Link } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link as RouterLink } from "react-router-dom";


const PastOrderPreview = ({order}) => {

    const itemText = order.quantity > 1 ? "items" : "item";

    return (
        <Box mb={4}>
            <Grid container mb={2}>
                <Grid item xs={3}>
                    {order.date}
                </Grid>
                <Grid item xs={3} >
                    {order.status}
                </Grid>
                <Grid item xs={3}>
                    ${order.total.toFixed(2)} for {order.quantity} {itemText}
                </Grid>
                <Grid item xs={3} align="right" >
                    <Link component={RouterLink} to={`/my-orders/${order.id}`} underline="hover">View</Link>
                </Grid>
            </Grid>
            <Divider />
        </Box>
    )
}

export default PastOrderPreview