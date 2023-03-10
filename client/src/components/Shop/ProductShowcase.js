import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SmallBreadCrumbs from '../SmallBreadCrumbs'
import BrowserDrawer from './BrowserDrawer'
import {  useParams } from 'react-router-dom';
import { Button, ButtonGroup, Drawer, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import { getGrindTypes } from '../../util/ShopUtil';
import TabsSection from './TabsSection';



const ProductShowcase = (props) => {

    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;    
    const { param1, param2 } = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [size, setSize] = useState('');
    const [grind, setGrind] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [err, setErr] = useState(null);

    const grindTypes = getGrindTypes();

    useEffect(() => {
        const fetchProductDetails = () => {
            const url = `http://localhost:8081/product/${param1}`;
            console.log("fetching product details for", param1);

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
    }, [])

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={() => handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <BrowserDrawer />
        </Box>
    );
    
    const handleSizeUpdate = (size) => {
        setSize(size);
    }

    const handleGrindUpdate = (grind) => {
        setGrind(grind);
    }

    const handleQuantity = (parm) => {

        if (parm === "+") {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
        }

    }

    const handleAddToCart = () => {
        console.log('adding to cart...', grind, size);
    }

    return (
        <Container>
            <Box mt={6} mb={6}>
                <Box align="center" sx={{display: {xs:"block", sm: "block", md: "none"}}}>
                    <Box display="flex" align="center" justifyContent="center" mb={3}>
                    <SmallBreadCrumbs /> 
                    </Box>
                    
                    <Button variant="outlined" onClick={handleDrawerToggle} >
                        <TuneIcon sx={{fontSize: '25px'}}/> Filter
                    </Button>
                </Box>

                {/* BreadCrumbs */}
                <Grid container mb={3}>
                    <Grid item md={4} sx={{display: {xs:"none", sm: "none", md: "block"}}}>
                        <SmallBreadCrumbs />
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    {isLoaded && 
                    <>
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

                        {/* disiplay dropdown options if product has sizing options*/}
                        <Box sx={{ minWidth: 120 }} mt={2}>
                        <FormControl fullWidth>
                            <InputLabel id="size-select-label">Size</InputLabel>
                            <Select
                            labelId="size-select-label"
                            id="size-select"
                            value={size}
                            label="Size"
                            onChange={(e) => handleSizeUpdate(e.target.value)}
                            >
                            {productDetails.priceOptions.map(option => {
                                return <MenuItem 
                                        value={option.description}
                                        key={option.description}
                                        >
                                            {option.description}
                                        </MenuItem>
                            })}
                            </Select>
                        </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120 }} mt={3}>
                        <FormControl fullWidth>
                            <InputLabel id="grind-select-label">Grind Type</InputLabel>
                            <Select
                            labelId="grind-select-label"
                            id="grind-select"
                            value={grind}
                            label="Grind Type"
                            onChange={(e) => handleGrindUpdate(e.target.value)}
                            >
                            {grindTypes.map(current => {
                                return <MenuItem 
                                        value={current.type}
                                        key={current.id}
                                        >
                                            {current.type}
                                        </MenuItem>
                            })}
                  
                            </Select>
                        </FormControl>
                        </Box>

                        <Box sx={{display: "flex", flexDirection: {xs: "column", sm: "row"}}} mt={4}>
                        <Box mr={2}>
                        <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        sx={{height: '40px'}}
                        >
                            <Button onClick={() => handleQuantity("-")} disabled={size ? false : true}>-</Button>
                            <TextField value={quantity} inputProps={{min: 0, style: { textAlign: 'center', width: "25px", height: '7px' }}}/>
                            <Button onClick={() => handleQuantity("+")} disabled={size ? false : true}>+</Button>
                        </ButtonGroup>
                        </Box>

                        <Button 
                        variant="contained"
                        sx={{marginTop: {xs: "10px", sm: "0"}, width: {xs: "135px", sx: "auto"}}}
                        disabled={(grind && size) ? false : true}
                        onClick={handleAddToCart}
                        >
                            add to cart
                        </Button>
                        </Box>
                    </Grid>
                    </>
                    }
                </Grid>
            </Box>

            {isLoaded && <TabsSection productDetails={productDetails} />}

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

        </Container>
    )
}

export default ProductShowcase