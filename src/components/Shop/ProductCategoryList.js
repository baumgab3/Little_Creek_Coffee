import { Grid, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import ProductPreviewCard from './ProductPreviewCard';
import { Link as RouterLink } from 'react-router-dom';


const ProductCategoryList = (props) => {

    const { param1, param2 } = useParams();
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();

    useEffect(() => {
        if (props.isWithParam) {
            setCategory(props.category);
            setSubCategory(props.subCategory);
        } else {
           setCategory(param1);
           setSubCategory(param2);
        }

        // make request to get products

    }, [param1, param2]);


    return (
        <>
        <Link to={`/product-category/${category}/${subCategory}`} component={RouterLink} underline="hover">
            <Typography variant="h5" sx={{textTransform: "uppercase", fontWeight: "bold"}} mb={2}>
                {category} / {subCategory}
            </Typography>
        </Link>

        <Grid container spacing={2} >
            <Grid item xs={6} sm={4} md={3}>
                <ProductPreviewCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <ProductPreviewCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <ProductPreviewCard />
            </Grid>
            <Grid item xs={6} sm={4} md={3}>
                <ProductPreviewCard />
            </Grid>
        </Grid>
        </>
    )
}

export default ProductCategoryList