import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import SmallBreadCrumbs from '../SmallBreadCrumbs'
import BrowserDrawer from './BrowserDrawer'
import {  useParams } from 'react-router-dom';
import { Button, Drawer, Grid, Toolbar, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import TabsSection from './TabsSection';
import CartContext from '../context/CartContext';
import ProductSelect from '../ProductSelect';
import AddToCart from '../AddToCart';



const ProductShowcase = (props) => {

    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;    
    const { param1 } = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [grind, setGrind] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [err, setErr] = useState(null);
    const {addToCart} = useContext(CartContext);
    const [hasDropDowns, setHasDropDowns] = useState(true);
    const [productPricingObj, setProductPricingObj] = useState('');


    useEffect(() => {
        const fetchProductDetails = () => {
            const url = `http://localhost:8081/product/${param1}`;

            fetch(url)
                .then(res => {
                    if (res.status >= 400) {
                        setIsLoaded(false);
                        throw new Error("Server Error!");
                    }
                    return res.json();
                })
                .then(product => {
                    setProductDetails(product);
                    setIsLoaded(true);

                    // products with no description for priceOptions won't have a drop down size bar
                    for (const option of product.priceOptions) {
                        if (!option.description && option.price && !option.grind) {
                            setHasDropDowns(false);
                            setProductPricingObj(option);
                        }
                    }

                }, err => {
                    console.log(err);
                    setErr(err);
                    setIsLoaded(false);
                })
        }

        fetchProductDetails();
        setMobileOpen(false);
    }, [param1])

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={() => handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <BrowserDrawer />
        </Box>
    );
        
    const handleProductPricingObjUpdate = (toUpdate) => {
        setProductPricingObj(toUpdate);
    }

    const handleGrindUpdate = (grind) => {
        setGrind(grind);
    }

    const handleQuantity = (param) => {
        if (param === "+") {
            if (quantity + 1 > 10) {
                alert("Cannot add more than 10!");
                return;
            }
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 <= 0 ? 1 : quantity - 1);
        }
    }

    const handleAddToCart = () => {
        const toAdd = {
            "id": productDetails.Id,
            "category": productDetails.Category,
            "name": productDetails.Name,
            "description": productPricingObj.description,
            "grind": grind,
            "price": productPricingObj.price,
            "quantity": quantity,
        }

        addToCart(toAdd);
    }

    if (err) {
        return {err};
    }

    return (
        <Container>
            {isLoaded && <>
            <Box mt={6} mb={6}>
                {/* BreadCrumbs for small screens */}
                <Box align="center" sx={{display: {xs:"block", sm: "block", md: "none"}}}>
                    <Box display="flex" align="center" justifyContent="center" mb={3}>
                    <SmallBreadCrumbs /> 
                    </Box>
                    
                    <Button variant="outlined" onClick={handleDrawerToggle} >
                        <TuneIcon sx={{fontSize: '25px'}}/> Filter
                    </Button>
                </Box>

                {/* BreadCrumbs for bigger screens */}
                <Grid container mb={3}>
                    <Grid item md={12} sx={{display: {xs:"none", sm: "none", md: "block"}}}>
                        <SmallBreadCrumbs />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={5}>
                        <img width="100%" src="/images/holder_6.jpg" alt="" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={7}>
                        <Typography variant="h5" sx={{textTransform: "uppercase", fontWeight: "bold"}} mb={1}>
                            {productDetails.Name}
                        </Typography>
                        <Typography variant="h5" sx={{textTransform: "uppercase", fontWeight: "bold"}} mb={1}>
                            {productDetails.priceRange}
                        </Typography>
                        <Typography >
                            {productDetails.ShortDescription}
                        </Typography>
                        
                        {/* display dropdowns for needed products */}
                        {hasDropDowns && 
                        <ProductSelect
                            handleProductPricingObjUpdate={handleProductPricingObjUpdate}
                            productPricingObj={productPricingObj}
                            handleGrindUpdate={handleGrindUpdate}
                            priceOptions={productDetails.priceOptions}
                            category={productDetails.Category}
                            grind={grind}
                        />
                        }

                        {/* display product price */}
                        <Box mt={2}>
                            {productPricingObj.description && grind && <Typography variant="h6">
                                ${productPricingObj.price.toFixed(2)}
                            </Typography>}
                        </Box>
                    
                        {/* -/+ buttons for quantity and add to cart button */}
                        <AddToCart
                            category={productDetails.Category}
                            productPricingObj={productPricingObj}
                            quantity={quantity}
                            grind={grind}
                            handleQuantity={handleQuantity}
                            handleAddToCart={handleAddToCart}
                        />

                    </Grid>
                </Grid>
            </Box>

            {/* Tabs menu for product details */}
            <TabsSection productDetails={productDetails} />

            {/* Drawer for smaller screens */}
            <Toolbar sx={{  display: { xs: 'block', sm: 'block', md: 'none' } }}>
                <Box component="nav">
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                        keepMounted: true,
                        }}
                        sx={{
                        display: { xs: 'block', sm: 'block', md: 'none' },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: "240px" },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </Toolbar>

        <br />
        <br />
        <br />
        <br />

        {/* close isLoaded check */}
        </> }

        </Container>
    )
}

export default ProductShowcase

