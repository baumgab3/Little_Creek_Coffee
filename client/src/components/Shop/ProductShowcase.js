import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import SmallBreadCrumbs from '../SmallBreadCrumbs'
import BrowserDrawer from './BrowserDrawer'
import {  useParams } from 'react-router-dom';
import { Button, ButtonGroup, Drawer, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Toolbar, Typography } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';



const ProductShowcase = (props) => {

    const { window } = props;
    const container = window !== undefined ? () => window().document.body : undefined;    
    const { param1, param2 } = useParams();
    const [productDetails, setProductDetails] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [priceTotal, setPriceTotal] = useState(0);
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState('');
    const [grind, setGrind] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [err, setErr] = useState(null);
    const [isSizeSet, setIsSizeSet] = useState(false);

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
                    console.log("fetching...");
                    setProductDetails(product);
                    setIsLoaded(true);

                }, err => {
                    console.log(err);
                    setErr(err);
                    setIsLoaded(false);
                })
        }

        if (!isLoaded) {
            fetchProductDetails();
        } else {
            setPriceTotal(price * quantity);
        }

        setMobileOpen(false);
    }, [quantity])

    const [mobileOpen, setMobileOpen] = useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const drawer = (
        <Box onClick={() => handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <BrowserDrawer />
        </Box>
    );

    const handleUpdate = (e) => {
        setQuantity(1);
        setPrice(Number(e.target.value));
        setPriceTotal(Number(e.target.value));
        setIsSizeSet(true);
    }

    const handleQuantity = (parm) => {

        if (parm === "+") {
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
        }

    }

    return (
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
                        {/* {console.log(productDetails.priceOptions)} */}
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
                            value={price}
                            label="Size"
                            onChange={handleUpdate}
                            >
                            {productDetails.priceOptions.map(option => {
                                return <MenuItem 
                                        value={option.price}
                                        key={option.description}
                                        >
                                            {option.description}
                                        </MenuItem>
                            })}
                            </Select>
                        </FormControl>
                        </Box>
                        {/* <Box sx={{ minWidth: 120 }} mt={3}>
                        <FormControl fullWidth>
                            <InputLabel id="grind-select-label">Grind Type</InputLabel>
                            <Select
                            labelId="grind-select-label"
                            id="grind-select"
                            value={grind}
                            label="Grind Type"
                            onChange={(e) => setGrind(e.target.value)}
                            >
                            <MenuItem value={10}>Ten</MenuItem>
                            <MenuItem value={20}>Twenty</MenuItem>
                            <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        </Box> */}

                        <Box mt={2}>
                            Total: {priceTotal}
                        </Box>

                        <Box>
                        <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        >
                            <Button onClick={() => handleQuantity("-")} disabled={!isSizeSet}>-</Button>
                            <TextField value={quantity} inputProps={{min: 0, style: { textAlign: 'center', width: "25px" }}}/>
                            <Button onClick={() => handleQuantity("+")} disabled={!isSizeSet}>+</Button>
                        </ButtonGroup>
                        </Box>


                        
                    </Grid>
                    </>
                    }
                </Grid>
            </Box>

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

        </Container>
    )
}

export default ProductShowcase