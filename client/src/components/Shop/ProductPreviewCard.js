import React from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const ProductPreviewCard = (props) => {
    const product = props.product;
    return (
        <Box sx={{ maxWidth: 345 }} align="center" mb={3}>
            <CardActionArea>
            <CardMedia
                component="img"
                height="100%"
                image="/images/holder_2.jpg"
                sx={{transition: "transform 0.35s ease-in-out", "&:hover": { transform: "scale3d(.96, .96, 1)" }}}
                alt=""
            />
            </CardActionArea>

            <CardContent >
                <Link to="/" component={RouterLink} underline="hover" color="inherit">
                    {product.name}
                </Link>
                {/* <Typography variant="body2" sx={{textTransform: 'uppercase'}}>
                    
                </Typography> */}
            </CardContent>

            <Typography sx={{fontWeight: 'bold'}}>
                {product.priceRange}
            </Typography>
            
        </Box>
    )
}

export default ProductPreviewCard