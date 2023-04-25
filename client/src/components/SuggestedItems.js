import { Box, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import ProductImage from './ProductImage'
import ProductPreviewCard from './Shop/ProductPreviewCard';


const SuggestedItems = ({product}) => {
    
    // TODO - this is terrible - fix in backend!
    const productObj = {
        id: product.Id,
        name: product.Name,
        priceRange: product.priceRange,
    }

    return (
        <Box mt={5}>
            <Divider />

            <Typography mt={1} mb={1} variant='h6' sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                you may also like...
            </Typography>

            <Box>
                <Grid container spacing={3}>
                    <Grid item xs={6} sm={4} md={3}>
                        <ProductPreviewCard product={productObj} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <ProductPreviewCard product={productObj} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <ProductPreviewCard product={productObj} />
                    </Grid>
                    <Grid item xs={6} sm={4} md={3}>
                        <ProductPreviewCard product={productObj} />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    )
}

export default SuggestedItems