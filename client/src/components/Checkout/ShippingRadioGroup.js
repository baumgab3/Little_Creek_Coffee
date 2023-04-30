import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useContext, useState } from 'react'
import CartContext from '../context/CartContext'

const ShippingRadioGroup = () => {

    const {shipping, setShipping} = useContext(CartContext);

    const handleShippingChange = (e) => {
        setShipping(e.target.value)
    }

    return (
        <FormControl>
            <FormLabel sx={{fontWeight: 'bold'}} id="shipping-group-label">Shipping</FormLabel>
            <RadioGroup
                aria-labelledby="shipping-group-label"
                name="radio-buttons-group"
                onChange={handleShippingChange}
                value={shipping}
            >
                <FormControlLabel
                    value="0"
                    control={<Radio />}
                    label={
                        <Typography>
                            Free Shipping - Ground (UPS - Carbon Neutral)
                        </Typography>
                    } 
                />
                <FormControlLabel
                    value="8.82"
                    control={<Radio />}
                    label={
                        <Typography>
                        UPS 3 Day Select: <b>$8.82</b>
                        </Typography>
                    }
                />
                <FormControlLabel
                    value="9.23"
                    control={<Radio />}
                    label={
                        <Typography>
                            UPS 2nd Day Air: <b>$9.23</b>
                        </Typography>
                    }
                />
                <FormControlLabel
                    value="17.76"
                    control={<Radio />}
                    label={
                        <Typography>
                            UPS Next Day Air: <b>$17.76</b>
                        </Typography>
                    }
                />
            </RadioGroup>
        </FormControl>
    )
}

export default ShippingRadioGroup