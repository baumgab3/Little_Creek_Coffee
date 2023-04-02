import { Grid, Typography } from '@mui/material'
import React from 'react'
import CoffeeItemSummary from './CoffeeItemSummary';
import ColdBrewItemSummary from './ColdBrewItemSummary';
import TeaItemSummary from './TeaItemSummary';

const OrderItemSummary = ({order}) => {

    switch (order.category) {
        case "coffee":
            return <CoffeeItemSummary order={order} />
        case "cold-brew":
            return <ColdBrewItemSummary order={order} />
        case "tea":
            return <TeaItemSummary order={order} />
    }

}

export default OrderItemSummary