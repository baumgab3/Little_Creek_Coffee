import { Box, Button, Drawer, Grid, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import SmallBreadCrumbs from '../SmallBreadCrumbs';
import BrowserDrawer from './BrowserDrawer';
import TuneIcon from '@mui/icons-material/Tune';
import ProductCategoryList from './ProductCategoryList';
import ProductCategoryListAll from './ProductCategoryListAll';


const ShopContainer = (props) => {
    const { param1, param2 } = useParams();
    const [isLoaded, setIsLoaded] = useState(false);
    const [products, setProducts] = useState([]);
    const [err, setErr] = useState(null);
    
    const url = 'http://localhost:8081/product-category' + `/${param1}/${param2}`;


    useEffect(() => {
        // console.log("loading data", url);
        // fetch(url)
        //     .then(res => {
        //         if (res.status >= 400) {
        //             setIsLoaded(false);
        //             throw new Error("Server Error!"); //TODO
        //         }
        //         return res.json();
        //     })
        //     .then(products => {
        //         setProducts(products);
        //         setIsLoaded(true);
        //         console.log(products);

        //     }, err => {
        //         console.log("error");
        //         setErr(err);
        //         setIsLoaded(false);
        //     })
        // handleDrawerToggle();
        setMobileOpen(false);
    }, [url, param1, param2])

    const [mobileOpen, setMobileOpen] = useState(false);

    const drawerWidth = 240;

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={() => handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <BrowserDrawer />
        </Box>
    );

    const { window } = props;

    const container = window !== undefined ? () => window().document.body : undefined;    


    return <>
            <Container>
                <Box mt={6}>
                <Box align="center" sx={{display: {xs:"block", sm: "block", md: "none"}}}>
                    <Box display="flex" align="center" justifyContent="center" mb={3}>
                    <SmallBreadCrumbs /> 
                    </Box>
                    
                    <Button variant="outlined" onClick={handleDrawerToggle} >
                        <TuneIcon sx={{fontSize: '25px'}}/> Filter
                    </Button>
                </Box>

                <Grid container>
                    <Grid item md={4} sx={{display: {xs:"none", sm: "none", md: "block"}}}>
                        <SmallBreadCrumbs />
                        <BrowserDrawer /> 
                    </Grid>

                    <Grid item md={8} sx={{marginTop: {xs :"50px", sm: "50px", md: "85px"}}}>
                        {param1 && param2 && <ProductCategoryList  /> }
                        {!param2 && <ProductCategoryListAll /> }
                    </Grid>
                </Grid>
                </Box>
            </Container>


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
        </>
}

export default ShopContainer 