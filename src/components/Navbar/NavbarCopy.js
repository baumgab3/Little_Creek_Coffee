import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Grid, Popover, TextField } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Tooltip from '@mui/material/Tooltip';
import MailIcon from '@mui/icons-material/Mail';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as AdminUtil from '../../util/AdminUtil';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

const NavbarCopy = (props) => {

    const fontSize = ".9em";
    const iconStyle = {
        fontSize: 15, 
        marginRight: '3px'
    };

    const shopOptions = AdminUtil.getDropDownForShop();
    const cafeOptions = AdminUtil.getDropDownForCafes();
    const learningOptions = AdminUtil.getDropDownForLearning();
    const aboutUsOptions = AdminUtil.getDropDownForAboutUs();

    const { window } = props;
    const [mobileOpen, setMobileOpen] = useState(false);

    const drawerWidth = props.drawerWidth;
    const navItems = ['home', 'about', 'sandbox']

    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    // Vars and function for search 
    const [anchorSearchIconEl, setAnchorSearchIconEl] = useState(null);
    const [search, setSearch] = useState("");

    const isSearchOpen = Boolean(anchorSearchIconEl);
  
    const handleSearchClose = () => {
        setSearch("");
        setAnchorSearchIconEl(null);
    }
    
    const handleSearchClick = (event) => {
        setAnchorSearchIconEl(event.currentTarget);
    }

    const handleSearch = () => {
        console.log("handle search for", search);
    }

    // Vars and functions for opening/closing Shop dropdown
    const [anchorShopEl, setAnchorShopEl] = React.useState(null);
    const isShopOpen = Boolean(anchorShopEl);

    const handleShopDropDownClick = (event) => {
        setAnchorShopEl(event.currentTarget);
    };

    const handleShopDropDownClose = () => {
        setAnchorShopEl(null);
    };

    // Vars and functions for opening/closing Cafes dropdown
    const [anchorCafesEl, setAnchorCafesEl] = useState(null);
    const isCafesOpen = Boolean(anchorCafesEl);

    const handleCafesDropDownClick = (event) => {
        setAnchorCafesEl(event.currentTarget);
    };

    const handleCafesDropDownClose = () => {
        setAnchorCafesEl(null);
    };

    // Vars and functions for opening/closing Learning dropdown
    const [anchorLearningEl, setAnchorLearningEl] = useState(null);
    const isLearningOpen = Boolean(anchorLearningEl);

    const handleLearningDropDownClick = (event) => {
        setAnchorLearningEl(event.currentTarget);
    };

    const handleLearningDropDownClose = () => {
        setAnchorLearningEl(null);
    };

    // Vars and functions for opening/closing Learning dropdown
    const [anchorAboutUsEl, setAnchorAboutUsEl] = useState(null);
    const isAboutUsOpen = Boolean(anchorAboutUsEl);

    const handleAboutUsDropDownClick = (event) => {
        setAnchorAboutUsEl(event.currentTarget);
    };

    const handleAboutUsDropDownClose = () => {
        setAnchorAboutUsEl(null);
    };
    

    // drawer is what you see on mobile
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Little Creek Coffee
            </Typography>
            <Divider />
            <List>
                {navItems.map((item) => (
                <ListItem key={item} disablePadding>
                    <ListItemButton sx={{ textAlign: 'center' }}>
                        <ListItemText>
                            <Link to={`/${item}`} style={{ textDecoration: 'none', color: '#000' }} > 
                                {item}
                            </Link>
                        </ListItemText>
                    </ListItemButton>
                </ListItem>
                ))}
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
    <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" elevation={0}>

        {/* Fixed top nav for bigger screen */}
        <AppBar position="static" sx={{ height: '25px' }} color="secondary" elevation={0}>
            <Grid display={{ md: "block", sm: "none", xs: "none" }}>
                <Grid item xs={12} sx={{ marginTop:"2px", alignItems:"center", justifyContent:"center", display: 'flex'}}>
                    <Typography mr={1} fontSize={fontSize} >
                        Get The App |
                    </Typography>
                    <Typography mr={1} fontSize={fontSize} >
                        Brewing Change |
                    </Typography>
                    <Typography mr={1} fontSize={fontSize} >
                        Join Our Team |
                    </Typography>
                    <Typography mr={1} fontSize={fontSize} >
                        Wholesale Login |
                    </Typography>
                    <Typography mr={1} fontSize={fontSize} >
                        Contact Us |
                    </Typography>
                    <MailIcon sx={iconStyle} /> 
                    <Typography mr={1} fontSize={fontSize} >
                        Coffee Geek Reports
                    </Typography>
                    <Tooltip title="Follow on Facebook" arrow>  
                        <FacebookIcon sx={iconStyle} />
                    </Tooltip>
                    <Tooltip title="Follow on Instagram" arrow>  
                        <InstagramIcon sx={iconStyle} />
                    </Tooltip>
                    <Tooltip title="Follow on Twitter" arrow>  
                        <TwitterIcon sx={iconStyle} />
                    </Tooltip>
                    <Tooltip title="Send us an email - TODO" arrow>  
                        <MailIcon sx={iconStyle} />
                    </Tooltip>  
                </Grid>
            </Grid>
        </AppBar>

        {/* Big screen display */}
        <Toolbar>
            <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
            >
            <MenuIcon />
            </IconButton>

            <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'none', md: 'block' } }}
            >
            Little Creek CoffeE
            </Typography>
            
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>

            {/* search function */}
            <IconButton onClick={handleSearchClick} sx={{color: '#fff', marginTop: '4px' }}  >
                <SearchIcon  sx={{width: '100%'}} fontSize="medium"  />
            </IconButton>
            <Popover
                open={isSearchOpen}
                anchorEl={anchorSearchIconEl}
                onClose={handleSearchClose}
                anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
                }}
            >
                <Box sx={{ p: 1 }}>
                    <TextField 
                        label="Search"
                        variant="outlined"
                        value = {search}
                        onChange ={e => setSearch(e.target.value)}
                        InputProps={{
                            endAdornment: <SearchIcon onClick={handleSearch} sx={{cursor: 'pointer'}} />
                        }}
                        /> 
                </Box>
            </Popover>
            
            {/* Shop Dropdown */}
            <Button
            id="fade-button"
            aria-controls={isShopOpen ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isShopOpen ? 'true' : undefined}
            onClick={handleShopDropDownClick}
            sx = {{color: '#fff' }}
            endIcon={<KeyboardArrowDownIcon />}
            >
                Shop
            </Button>
            <Menu
            id="fade-menu"
            MenuListProps={{
            'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorShopEl}
            open={isShopOpen}
            onClose={handleShopDropDownClose}
            >
            {shopOptions.map(option => {
                return <ListItemButton component={Link} to={option.url} key={option.name}>
                            <ListItemText primary={option.name} />
                        </ListItemButton>
                  
            })}
            </Menu>

            {/* Cafe Dropdown */}
            <Button
            id="fade-button"
            aria-controls={isCafesOpen ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isCafesOpen ? 'true' : undefined}
            onClick={handleCafesDropDownClick}
            sx = {{color: '#fff' }}
            endIcon={<KeyboardArrowDownIcon />}
            >
                Cafes
            </Button>
            <Menu
            id="fade-menu"
            MenuListProps={{
            'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorCafesEl}
            open={isCafesOpen}
            onClose={handleCafesDropDownClose}
            >
            {cafeOptions.map(option => {
                return <ListItemButton component={Link} to={option.url} key={option.name}>
                            <ListItemText primary={option.name} />
                        </ListItemButton>
                  
            })}
            </Menu>

            {/* Learning Dropdown */}
            <Button
            id="fade-button"
            aria-controls={isLearningOpen ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isLearningOpen ? 'true' : undefined}
            onClick={handleLearningDropDownClick}
            sx = {{color: '#fff' }}
            endIcon={<KeyboardArrowDownIcon />}
            >
                Learning
            </Button>
            <Menu
            id="fade-menu"
            MenuListProps={{
            'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorLearningEl}
            open={isLearningOpen}
            onClose={handleLearningDropDownClose}
            >
            {learningOptions.map(option => {
                return <ListItemButton component={Link} to={option.url} key={option.name}>
                            <ListItemText primary={option.name} />
                        </ListItemButton>
                  
            })}
            </Menu>

            {/* Wholesale link */}
            <Button sx = {{color: '#fff' }} >
                <Link to="/wholesale2b" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Wholesale
                </Link>
            </Button>

            
            {/* About us Dropdown */}
            <Button
            id="fade-button"
            aria-controls={isAboutUsOpen ? 'fade-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={isAboutUsOpen ? 'true' : undefined}
            onClick={handleAboutUsDropDownClick}
            sx = {{color: '#fff' }}
            endIcon={<KeyboardArrowDownIcon />}
            >
                About Us
            </Button>
            <Menu
            id="fade-menu"
            MenuListProps={{
            'aria-labelledby': 'fade-button',
            }}
            anchorEl={anchorAboutUsEl}
            open={isAboutUsOpen}
            onClose={handleAboutUsDropDownClose}
            >
            {aboutUsOptions.map(option => {
                return <ListItemButton component={Link} to={option.url} key={option.name}>
                            <ListItemText primary={option.name} />
                        </ListItemButton>
                  
            })}
            </Menu>
            </Box>


            <Box sx={{marginLeft: '20px', display: { xs: 'none', sm: 'none', md: 'block'} }} >
                <Button color="inherit">
                    Login
                </Button>
                    |
                <Button color="inherit" >
                    <Box sx={{marginRight: '2px'}}>$00.00</Box>
                    <ShoppingCartOutlinedIcon />
                </Button>
            </Box>

            {/* Mobile Text */}
            <Box sx={{marginLeft: '20px', display: { xs: 'block', sm: 'block', md: 'none'} }} >

                <Button color="inherit" >
                    <ShoppingCartOutlinedIcon />
                </Button>
            </Box>

        </Toolbar>
        </AppBar>
        <Box component="nav">
        <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
            keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
            display: { xs: 'block', sm: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            }}
        >
            {drawer}
        </Drawer>
        </Box>
    </Box>
    );
}

export default NavbarCopy;