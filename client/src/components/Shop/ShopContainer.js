import { Box, Button, Drawer, Grid, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import {  useParams } from 'react-router-dom';
import SmallBreadCrumbs from '../SmallBreadCrumbs';
import BrowserDrawer from './BrowserDrawer';
import TuneIcon from '@mui/icons-material/Tune';
import ProductCategoryList from './ProductCategoryList';
import ProductCategoryListAll from './ProductCategoryListAll';
import CartContext from '../context/CartContext';


const ShopContainer = (props) => {
    const { param1, param2 } = useParams();
    const {addedToCartMessage, setAddedToCartMessage} = useContext(CartContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        setMobileOpen(false);
        setAddedToCartMessage("");
        setIsLoaded(true);
    }, [param1, param2])

    const [mobileOpen, setMobileOpen] = useState(false);

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
                {isLoaded && 
                <Box mt={6} sx={{minHeight: '600px'}}>
                <Box align="center" sx={{display: {xs:"block", sm: "block", md: "none"}}}>
                    <Box display="flex" align="center" justifyContent="center" mb={3}>
                        <SmallBreadCrumbs /> 
                    </Box>
                    
                    <Button variant="outlined" onClick={handleDrawerToggle} >
                        <TuneIcon sx={{fontSize: '25px'}}/> Filter
                    </Button>
                </Box>

                <Box sx={{display: {xs:"none", sm: "none", md: "block"}}}>
                    <SmallBreadCrumbs />
                </Box>

                <Grid container>

                    <Grid item xs={12} sx={{textAlign: {xs: "center", sm: "center", md: "left"}}} >
                        {addedToCartMessage && 
                          <Box mt={1}>
                            <Typography variant="h6" color="primary.main">
                               {addedToCartMessage} 
                            </Typography>
                          </Box>
                        }
                    </Grid>

                    <Grid item md={4} sx={{display: {xs:"none", sm: "none", md: "block"}}}>
                        <BrowserDrawer /> 
                    </Grid>

                    <Grid item md={8} sx={{marginTop: {xs :"50px", sm: "50px", md: "55px"}}}>
                        {/* TODO - clean this up later */}
                        {(param1 && param2 || param1 == 'cold-brew' || param1 == 'tea') && <ProductCategoryList  /> }
                        {!param2 && 
                        <ProductCategoryListAll />
                        }
                    </Grid>
                </Grid>
                </Box>

                }
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