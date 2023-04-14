import React from 'react'
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { slugify } from '../../util/AdminUtil';
import { useNavigate } from "react-router-dom";

const ProductPreviewCard = (props) => {
    const product = props.product;
    const navigate = useNavigate();

    const handleShowQuickView = (action) => {

        const elm = document.getElementById(`${slugify(product.name)}`);

        if (action === "open") {
            elm.style.width = "100%";
            elm.style.height = "35px";
            elm.style.backgroundColor = "black";
            elm.style.transition = "height .22s";
            elm.style.opacity = ".8";
        } else {
            elm.style.width = "100%";
            elm.style.height = "0px";
            elm.style.backgroundColor = "black";
            elm.style.transition = "height .22s";
            elm.style.opacity = ".8";
        }
        
    }

    const handleQuickViewHighlight = (action) => {
        const elm = document.getElementById(`${slugify(product.name)}`);

        if (action === "mouse-in") {
            elm.style.opacity = "1";
            elm.style.fontWeight = "bold";
        } else {
            elm.style.opacity = ".8";
            elm.style.fontWeight = "normal";
        }
    }

    const handleOpenQuickView = () => {
        console.log(product);
    }

    return (
        <Box
        sx={{ maxWidth: 345 }}
        align="center"
        mb={3}
        onMouseEnter={() => handleShowQuickView("open")}
        onMouseLeave={() => handleShowQuickView("close")}
        >
            <CardActionArea>
            <CardMedia
                component="img"
                height="100%"
                image="/images/holder_2.jpg"
                alt={product.name}
                onClick={() => {navigate(`/product/${slugify(product.name)}`)}}
            >
            </CardMedia>
            <Box
            id={`${slugify(product.name)}`}
            sx={{height: '0px', color: 'white', width: '100%', position: 'absolute', bottom: '1px', display: {xs: "none", sm: "block"} }}
            onMouseEnter={() => handleQuickViewHighlight("mouse-in")}
            onMouseLeave={() => handleQuickViewHighlight("mouse-out")}
            onClick={() => handleOpenQuickView()}
            >
                <Box mt={1}>
                    QUICK VIEW
                </Box>
            </Box>

            </CardActionArea>

            <CardContent >
                <Link to={`/product/${slugify(product.name)}`} component={RouterLink} underline="hover" color="inherit">
                    {product.name.toUpperCase()}
                </Link>
            </CardContent>

            <Typography sx={{fontWeight: 'bold'}}>
                {product.priceRange}
            </Typography>
            
        </Box>
    )
}

export default ProductPreviewCard