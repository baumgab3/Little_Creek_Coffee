import { Box, CardMedia } from '@mui/material'
import React from 'react'
import { slugify } from '../util/AdminUtil';
import { useNavigate } from "react-router-dom";


const ProductImage = (props) => {
    const product = props.product;
    const navigate = useNavigate();


    return (
    <Box sx={{position: 'relative'}}>
        <CardMedia
            component="img"
            height="100%"
            width="100%"
            image="/images/holder_2.jpg"
            alt={product.name}
            onClick={() => {navigate(`/product/${slugify(product.name)}`)}}
        />

        {product.hasSale && 
            <Box
            sx={{
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
                height: '30%',
                width: '30%',
                borderRadius: '50%',
                top: '15px',
                left: props.isModal ? '5px' : '-10px',
                backgroundColor: "#1976d2"
                }}
            >
                <Box sx={{fontWeight: 'bold', color: 'white'}}>
                    Sale!
                </Box>
            </Box>
        } 



        {/* {product.hasSale && 
        <Box
        sx={{
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            display: 'flex',
            // height: '105px',
            // width: '105px',
            height: {xs: '80px', sm: '100px', md: '90px', lg: '105px'},
            width: {xs: '80px', sm: '100px', md: '90px', lg: '105px'},
            borderRadius: '50%',
            top: '10px',
            left: {xs: '-10px', sm: '-20px'},
            backgroundColor: "#1976d2"
            }}
        >
            <Box sx={{fontWeight: 'bold', color: 'white'}}>
                Sale!
            </Box>
        </Box>
        } */}

    </Box>
    )
}

export default ProductImage