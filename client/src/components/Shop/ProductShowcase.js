import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import BrowserDrawer from './BrowserDrawer'
import {  useParams } from 'react-router-dom';
import { Button, Drawer, Grid, Toolbar, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import TabsSection from './TabsSection';
import ProductHighlight from '../ProductHighlight';


const ProductShowcase = (props) => {

    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;    
    const { param1 } = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [err, setErr] = useState(null);


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
                    {/* <SmallBreadCrumbs />  */}
                    </Box>
                    
                    <Button variant="outlined" onClick={handleDrawerToggle} >
                        <TuneIcon sx={{fontSize: '25px'}}/> Filter
                    </Button>
                </Box>

                {/* BreadCrumbs for bigger screens */}
                <Grid container mb={3}>
                    <Grid item md={12} sx={{display: {xs:"none", sm: "none", md: "block"}}}>
                        {/* <SmallBreadCrumbs /> */}
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12} md={5}>
                        <img width="100%" src="/images/holder_6.jpg" alt="" />
                    </Grid>

                    <Grid item xs={12} sm={12} md={7}>
                        <ProductHighlight product={productDetails} />
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

