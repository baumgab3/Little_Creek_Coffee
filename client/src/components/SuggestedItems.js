import { Box, Divider, Grid, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ProductPreviewCard from './Shop/ProductPreviewCard';


const SuggestedItems = ({product}) => {

    const [isLoaded, setIsLoaded] = useState(false);
    const [suggestItems, setSuggestedItems] = useState([]);

    useEffect(() => {
        const fetchSuggestedItems = (product) => {
            const url = `http://localhost:8081/product/${product.Id}/${product.Category}/similar`;
            
            fetch(url)
            .then(res => {
                if (res.status >= 400) {
                    setIsLoaded(false);
                    throw new Error("Server Error!");
                }
                return res.json();
            })
            .then(products => {
                setSuggestedItems(products);
                setIsLoaded(true);
            }, err => {

            })
        }

        fetchSuggestedItems(product);

    }, [product]);

    return (
        <>
        {isLoaded && suggestItems.length > 0 &&
        <Box mt={5}>
            <Divider />

            <Typography mt={1} mb={1} variant='h6' sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                you may also like...
            </Typography>

            <Box>
                <Grid container spacing={3}>
                    {suggestItems.map((product) => {
                        return <Grid key={product.id} item xs={6} sm={4} md={3}>
                            <ProductPreviewCard product={product} />
                        </Grid>
                    })}
                </Grid>
            </Box> 
        </Box>
        }
        </>
    )
}

export default SuggestedItems