import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Collapse, Grid, InputAdornment, ListItem, ListItemButton, TextField } from '@mui/material';
import * as AdminUtil from '../../util/AdminUtil';
import SearchIcon from '@mui/icons-material/Search';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import MailOutlineOutlinedIcon from '@mui/icons-material/MailOutlineOutlined';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import MailIcon from '@mui/icons-material/Mail';
import Tooltip from '@mui/material/Tooltip';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import HomeIcon from '@mui/icons-material/Home';
import CartContext from '../context/CartContext';
import { useNavigate } from "react-router-dom";

const MobileNavbar = (props) => {

    const shopOptions = AdminUtil.getDropDownForShop();
    const cafeOptions = AdminUtil.getDropDownForCafes();
    const learningOptions = AdminUtil.getDropDownForLearning();
    const aboutUsOptions = AdminUtil.getDropDownForAboutUs();
    const {cartSize, emptyCart, setShipping} = useContext(CartContext);
    const navigate = useNavigate();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const drawerWidth = props.drawerWidth;

    useEffect(() => {

    }, [props.user])

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    // Vars and functions for opening Shop List
    const [openShop, setOpenShop] = useState(false);

    const handleShopOpen = () => {
        setOpenShop(!openShop);
    };

    // Vars and functions for opening Cafe List
    const [openCafe, setOpenCafe] = useState(false);

    const handleCafeOpen = () => {
        setOpenCafe(!openCafe);
    };

    // Vars and functions for opening Learning List
    const [openLearning, setOpenLearning] = useState(false);

    const handleLearningOpen = () => {
        setOpenLearning(!openLearning);
    };

    // Vars and functions for opening About us List
    const [opeanAboutUs, setOpenAboutUs] = useState(false);

    const handleAboutUsOpen = () => {
        setOpenAboutUs(!opeanAboutUs);
    };

    // handle search
    // const [search, setSearch] = useState("");

    // const handleSearch= () => {
    //     // TODO
    //     setSearch("");
    //     handleDrawerToggle();
    // }

    const [openLoggedIn, setOpenLoggedIn] = useState(false);

    const handleLoggedInOpen = () => {
        setOpenLoggedIn(!openLoggedIn);
    }

    const logout = () => {
        setOpenLoggedIn(false);
        setMobileOpen(false);
        props.logoutUser();
        emptyCart();
        setShipping(0);
    }
    
    const drawer = (
        <Box onClick={() => handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Divider />
            <List>
            {/* Shop List */}
            <ListItemButton onClick={handleShopOpen}>
               <ListItemText primary="Shop" />
                {openShop ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openShop} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {shopOptions.map(option => {
                return <ListItemButton component={Link} to={option.url} key={option.name} sx={{ pl: 4 }}>
                            <ListItemText onClick={handleDrawerToggle} primary={option.name} />
                        </ListItemButton>
                })}
                </List>
            </Collapse>

            {/* Cafe List */}
            <ListItemButton onClick={handleCafeOpen}>
               <ListItemText primary="Cafes" />
                {openCafe ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openCafe} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {cafeOptions.map(option => {
                return <ListItemButton component={Link} to={option.url} key={option.name} sx={{ pl: 4 }}>
                            <ListItemText onClick={handleDrawerToggle} primary={option.name} />
                        </ListItemButton>
                })}
                </List>
            </Collapse>

            {/* Learning List */}
            <ListItemButton onClick={handleLearningOpen}>
               <ListItemText primary="Learning" />
                {openLearning ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openLearning} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {learningOptions.map(option => {
                return <ListItemButton component={Link} to={option.url} key={option.name} sx={{ pl: 4 }}>
                            <ListItemText onClick={handleDrawerToggle} primary={option.name} />
                        </ListItemButton>
                })}
                </List>
            </Collapse>

            {/* Wholesale  */}
            <ListItemButton component={Link} to="/wholesale2b" >
               <ListItemText onClick={handleDrawerToggle} primary="Wholesale" />
            </ListItemButton>

            {/* Learning List */}
            <ListItemButton onClick={handleAboutUsOpen}>
               <ListItemText primary="About Us" />
                {opeanAboutUs ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={opeanAboutUs} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                {aboutUsOptions.map(option => {
                return <ListItemButton component={Link} to={option.url} key={option.name} sx={{ pl: 4 }}>
                            <ListItemText onClick={handleDrawerToggle} primary={option.name} />
                        </ListItemButton>
                })}
                </List>
            </Collapse>

            
            {/* Login  */}
            {!props.user && <ListItemButton component={Link} to="/login" >
               <ListItemText onClick={handleDrawerToggle} primary="Login" />
            </ListItemButton> }

            {/* Logged In */}
            {props.user && 
            <>
            <ListItemButton onClick={handleLoggedInOpen}>
               <ListItemText primary="My Account" />
                {openLoggedIn ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={openLoggedIn} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItemButton component={Link} to="/my-account" sx={{ pl: 4 }}>
                    <ListItemText onClick={handleDrawerToggle} primary="Account Settings" />
                </ListItemButton>
                <ListItemButton component={Link} to="/my-orders" sx={{ pl: 4 }}>
                    <ListItemText onClick={handleDrawerToggle} primary="My Orders" />
                </ListItemButton>
                <ListItemButton component={Link} to="/" sx={{ pl: 4 }}>
                    <ListItemText onClick={logout}  primary="Logout" />
                </ListItemButton>
                </List>
            </Collapse>
            </>
            }

            {/* Geeks Report  */}
            <ListItem  disablePadding>
                <ListItemButton onClick={() => alert("TO DO")}>
                    <MailOutlineOutlinedIcon />
                    <ListItemText sx={{marginLeft: '6px'}} primary="Coffee Geek Reports"  />
                </ListItemButton>
            </ListItem>

            {/* Social Media Icons  */}
            <ListItem  disablePadding>
                <ListItemButton onClick={() => AdminUtil.openURLInNewWindow("https://www.facebook.com/")} >
                    <Tooltip title="Follow on Facebook" arrow>
                        <FacebookIcon />
                    </Tooltip>
                </ListItemButton>
                <ListItemButton onClick={() => AdminUtil.openURLInNewWindow("https://www.instagram.com/")}>
                    <Tooltip title="Follow on Instagram" arrow>
                        <InstagramIcon />
                    </Tooltip>
                </ListItemButton>
                <ListItemButton onClick={() => AdminUtil.openURLInNewWindow("https://twitter.com/?lang=en")}>
                    <Tooltip title="Follow on Twitter" arrow>
                        <TwitterIcon />
                    </Tooltip>
                </ListItemButton>
                <ListItemButton to="mailto:info@doto.com">
                    <Tooltip title="Send us an email" arrow>
                        <MailIcon />
                    </Tooltip>
                </ListItemButton>
            </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;    

    return (
        <Toolbar sx={{  display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' } }}>

        <Grid container pt={1} >        

        <Grid item xs={2} sm={2} >
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { lg: 'none' }}}
                >
                <MenuIcon />
                <Typography variant='h6' sx={{marginLeft: '2px', marginBottom: '2px'}}>
                    Menu
                </Typography>
            </IconButton>
        </Grid>

        <Grid item xs={4} sm={8} sx={{ textAlign: "center", marginTop: '3px' }} >
            <Button sx = {{color: '#fff'}} >
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    <Typography 
                    variant="h6"
                    sx={{display: {xs: "none", sm: "block"}, textAlign: "center"}}
                    >
                        Little Creek Coffee
                    </Typography> 
                </Link>
            </Button>
        </Grid>

    
        <Grid item xs={6} sm={2} sx={{textAlign: 'right'}} pt={1}>
            <ButtonGroup variant="text" aria-label="text button group">
                <Button color="inherit" sx={{display: {xs: "block", sm: "none"}}} >
                    <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <HomeIcon />
                    </Link>
                </Button>
                <Button onClick={() => {navigate("/cart")}} color="inherit">
                    <Box sx={{display: 'flex', marginBottom: {xs: '6px', sm: '0px'} }}>
                        <ShoppingCartOutlinedIcon /> ({cartSize}) 
                    </Box>
                    {/* <Link to="/cart" style={{ textDecoration: 'none', color: 'inherit' }}>
                         <ShoppingCartOutlinedIcon /> ({cartSize}) 
                    </Link> */}
                    {/* <Box component={Link} to="/cart" mb={1} sx={{display: {xs:"none", sm:"block"}, color: 'inherit', textDecoration: 'none'}}>
                       ({cartSize}) 
                    </Box> */}
                </Button>
            </ButtonGroup>
        </Grid>

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
                display: { xs: 'block', sm: 'block', md: 'block', lg: 'none' },
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
            <TextField
                value={props.search}
                onChange={(e) => props.setSearch(e.target.value)}
                variant="standard"
                label="Search..."
                InputProps={{
                    endAdornment: (
                    <InputAdornment position="start">
                        <IconButton onClick={() => {props.handleSearch(); handleDrawerToggle();} }>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
                {drawer}
            </Drawer>
        </Box>
        </Grid>
    </Toolbar> 
    )
}

export default MobileNavbar