import { Grid, Link, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import ProductPreviewCard from './ProductPreviewCard';
import { Link as RouterLink } from 'react-router-dom';
import { deslugify } from '../../util/AdminUtil';


const ProductCategoryList = (props) => {

    const { param1, param2 } = useParams();
    const [category, setCategory] = useState();
    const [subCategory, setSubCategory] = useState();
    const [products, setProducts] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [err, setErr] = useState(null);

    useEffect(() => {
        const fetchProductPreviews = () => {
            window.scrollTo(0, 0);
            const sub = !param2 ? props.subCategory : param2;
            const url = `http://localhost:8081/product-category/${param1}/${sub}/`;
            setCategory(param1);
            setSubCategory(sub);

            fetch(url)
                .then(res => {
                    if (res.status >= 400) {
                        setIsLoaded(false);
                        throw new Error("Server Error!");
                    }
                    return res.json();
                })
                .then(products => {
                    setProducts(products);
                    setIsLoaded(true);

                }, err => {
                    console.log(err);
                    setErr(err);
                    setIsLoaded(false);
                })
        }

        // make request to get products
        fetchProductPreviews();
    }, [param1, param2, props.subCategory]);


    return (
        <>
        {/* TODO clean this up later */}
        {err &&
            <Typography>
                {err}
            </Typography>
        }

        {isLoaded && 
        <>
        <Link to={subCategory ? `/product-category/${category}/${subCategory}/` : "#"} component={RouterLink} underline="hover">
            <Typography variant="h5" sx={{textTransform: "uppercase", fontWeight: "bold"}} mb={2}>
                {deslugify(category)} {subCategory && <>/ {deslugify(subCategory)}</>}
            </Typography>
        </Link>

        <Grid container spacing={2} >
            {products && products.map(product => {
                return <Grid key={product.name} item xs={6} sm={4} md={3}>
                         <ProductPreviewCard product={product} />
                        </Grid>
            })}
        </Grid>
        </>
        }
        </>
    )
}

export default ProductCategoryList