import { Box } from '@mui/system'
import React from 'react'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { getGrindTypes } from '../util/ShopUtil';


const ProductSelect = (props) => {
    const priceOptions = props.priceOptions;
    const category = props.category;
    const grindTypes = getGrindTypes();

    // coffee drop down
    if (category === "coffee") {
        return (
            <>
            <Box sx={{ minWidth: 120 }} mt={3}>
            <FormControl fullWidth>
                <InputLabel id="size-select-label">Size</InputLabel>
                <Select
                labelId="size-select-label"
                id="size-select"
                value={props.productPricingObj}
                label="Size"
                onChange={(e) => props.handleProductPricingObjUpdate(e.target.value)}
                >
                {priceOptions.map(option => {
                    return  <MenuItem 
                            value={option}
                            key={option.description}
                            >
                                {option.description}
                            </MenuItem>
                })}
                </Select>
            </FormControl>
            </Box>

            <Box sx={{ minWidth: 120 }} mt={3}>
            <FormControl fullWidth>
                <InputLabel id="grind-select-label">Grind Type</InputLabel>
                <Select
                labelId="grind-select-label"
                id="grind-select"
                value={props.grind}
                label="Grind Type"
                onChange={(e) => props.handleGrindUpdate(e.target.value)}
                >
                {grindTypes.map(current => {
                    return <MenuItem 
                            value={current.type}
                            key={current.id}
                            >
                                {current.type}
                            </MenuItem>
                })}
        
                </Select>
            </FormControl>
            </Box>
            </>
        )
    }

    // cold-brew drop down
    if (category === "cold-brew") {
        return (
            <Box sx={{ minWidth: 120 }} mt={3}>
            <FormControl fullWidth>
                <InputLabel id="size-select-label">Size</InputLabel>
                <Select
                labelId="size-select-label"
                id="size-select"
                value={props.productPricingObj}
                label="Size"
                onChange={(e) => props.handleProductPricingObjUpdate(e.target.value)}
                >
                {priceOptions.map(option => {
                    return  <MenuItem 
                            value={option}
                            key={option.description}
                            >
                                {option.description}
                            </MenuItem>
                })}
                </Select>
            </FormControl>
            </Box>
        )
    }


    return (
        <>
        </>
    )
}

export default ProductSelect