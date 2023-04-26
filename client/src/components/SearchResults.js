import { Box, Breadcrumbs, Button, CircularProgress, Drawer, Grid, Link, Toolbar, Typography } from '@mui/material';
import { Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import TuneIcon from '@mui/icons-material/Tune';
import BrowserDrawer from './Shop/BrowserDrawer';
import { Link as RouterLink } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
import LoadingGif from './LoadingGif';
import axios from 'axios';
import ProductPreviewCard from './Shop/ProductPreviewCard';


const SearchResults = (props) => {

    // const { param1, param2 } = useParams();
    const [searchParams] = useSearchParams();
    const [searchString, setSearchString] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const [foundProducts, setFoundProducts] = useState([]);

    useEffect(() => {
        console.log(searchParams.get('s'));
        setSearchString(searchParams.get("s"));

        const url = `http://localhost:8081/search/${searchParams.get("s")}/`;

        axios.get(url)
        .then(res => {
            console.log(res.data);
            setIsLoaded(true);
            setFoundProducts(res.data);
        }).catch(er => {

        })


    }, [searchParams])

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
            <Container sx={{minHeight: {md: '1000px'}}}>
                <Box mt={6} sx={{minHeight: '600px'}}>
                <Box align="center" sx={{display: {xs:"block", sm: "block", md: "none"}}}>
                    <Box display="flex" align="center" justifyContent="center" mb={3}>
                        <Breadcrumbs>
                        <Link underline="none" color="inherit" component={RouterLink} to="/"> HOME </Link>
                        /
                        <Link underline="none" color="inherit" component={RouterLink} to="/product-category/roast/"> SHOP </Link>
                        /
                        <Link underline="none" color="inherit" sx={{textTransform: 'uppercase', fontWeight: 'bold'}}> Search results for “{`${searchString}`}” </Link>
                        </Breadcrumbs>
                    </Box>
                    
                    <Button variant="outlined" onClick={handleDrawerToggle} >
                        <TuneIcon sx={{fontSize: '25px'}}/> Filter
                    </Button>
                </Box>

                <Box sx={{display: {xs:"none", sm: "none", md: "block"}}}>
                    <Breadcrumbs>
                    <Link underline="none" color="inherit" component={RouterLink} to="/"> HOME </Link>
                    /
                    <Link underline="none" color="inherit" component={RouterLink} to="/product-category/roast/"> SHOP </Link>
                    /
                    <Link underline="none" color="inherit" sx={{textTransform: 'uppercase', fontWeight: 'bold'}}> Search results for “{`${searchString}`}” </Link>
                    </Breadcrumbs>
                </Box>

                <Grid container>

                    <Grid item md={4} sx={{display: {xs:"none", sm: "none", md: "block"}}}>
                        <BrowserDrawer /> 
                    </Grid>

                    { !isLoaded && <LoadingGif style="serach" /> }

                    <Grid item md={8} sx={{marginTop: {xs :"50px", sm: "50px", md: "55px"}}}>
                        <Grid container spacing={2} >
                            {isLoaded && foundProducts.map(product => {
                                return <Grid key={product.name} item xs={6} sm={4} md={3}>
                                        <ProductPreviewCard product={product} />
                                        </Grid>
                            })}

                            {isLoaded && foundProducts.length === 0 &&
                              <Box>
                                <Typography>
                                    Sorry, no products were found matching your search.

                                </Typography>
                              </Box>
                            }
                        </Grid> 
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

export default SearchResults