import React, { useContext, useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Grid, Popover, TextField } from '@mui/material';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import * as AdminUtil from '../../util/AdminUtil';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CartContext from '../context/CartContext';
import { useNavigate } from "react-router-dom";

const BigNavbar = ({logoutUser, user, displayName, handleSearch, anchorSearchIconEl, setAnchorSearchIconEl, search, setSearch}) => {

    const {cartSize, getCartTotal, emptyCart, setShipping} = useContext(CartContext);
    const shopOptions = AdminUtil.getDropDownForShop();
    const cafeOptions = AdminUtil.getDropDownForCafes();
    const learningOptions = AdminUtil.getDropDownForLearning();
    const aboutUsOptions = AdminUtil.getDropDownForAboutUs();
    const navigate = useNavigate();

    useEffect(() => {

    }, [displayName])

    // Vars and function for search 
    // const [anchorSearchIconEl, setAnchorSearchIconEl] = useState(null);
    // const [search, setSearch] = useState("");

    const isSearchOpen = Boolean(anchorSearchIconEl);

    const handleSearchClose = () => {
        setSearch("");
        setAnchorSearchIconEl(null);
    }

    const handleSearchClick = (event) => {
        setAnchorSearchIconEl(event.currentTarget);
    }

    // const handleSearch = () => {
    //     console.log("handle search for", search);
    // }

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

    // Vars and functions for logged in user  dropdown
    const [anchorLoggedInEl, setAnchorLoggedInEl] = useState(null);
    const isLoggedInOpen = Boolean(anchorLoggedInEl);

    const handleLoggedInDropDownClick = (event) => {
        setAnchorLoggedInEl(event.currentTarget);
    };

    const handleLoggedInDropDownClose = () => {
        setAnchorLoggedInEl(null);
    };

    const logout = () => {
        logoutUser();
        setShipping(0);
        emptyCart();
    }

    return (
        <Toolbar sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'block' } }}>
        <Grid container pt={1} >        

        {/* This seems to be a material issue, but I need onclick in the grid to make sure the navigate always works */}
        <Grid item md={3} lg={3} sx={{textAlign: "left"}} onClick={() => navigate("/")} >
            <Button sx = {{color: '#fff' }} >
                    <Typography 
                    variant="h6"
                    component="div"
                    sx={{marginTop: '2px'}}
                    >
                        Little Creek Coffee
                    </Typography> 
            </Button>
        </Grid>


        <Grid item md={6} sx={{textAlign: "center", paddingTop: '2px', width: "100%"}} >
        
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
                    onChange ={(e) => setSearch(e.target.value)}
                    InputProps={{
                        endAdornment: <SearchIcon onClick={() => handleSearch()} sx={{cursor: 'pointer'}} />
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
                        <ListItemText onClick={handleShopDropDownClose} primary={option.name} />
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
                        <ListItemText onClick={handleCafesDropDownClose} primary={option.name} />
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
                        <ListItemText onClick={handleLearningDropDownClose} primary={option.name} />
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
                        <ListItemText onClick={handleAboutUsDropDownClose}  primary={option.name} />
                    </ListItemButton>
        })}
        </Menu>
        </Grid>
    
        <Grid item md={3} lg={3} sx={{textAlign: 'right'}} pt={1} >
            {user &&
                <>
                <Button
                id="loggin-fade-button"
                aria-controls={isLoggedInOpen ? 'loggin-fade-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={isLoggedInOpen ? 'true' : undefined}
                onClick={handleLoggedInDropDownClick}
                sx = {{color: '#fff' }}
                endIcon={<KeyboardArrowDownIcon />}
                >
                  {/* {user.displayName ? user.displayName : user.user} */}
                  {displayName ? displayName : user.user}

                </Button>
                <Menu
                id="loggin-fade-menu"
                MenuListProps={{
                'aria-labelledby': 'loggin-fade-button',
                }}
                anchorEl={anchorLoggedInEl}
                open={isLoggedInOpen}
                onClose={handleLoggedInDropDownClose}
                >
                    <ListItemButton component={Link} to="/my-account">
                        <ListItemText onClick={handleLoggedInDropDownClose}  primary="My Account" />
                    </ListItemButton>
                    <ListItemButton component={Link} to="/my-orders">
                        <ListItemText onClick={handleLoggedInDropDownClose}  primary="My Orders" />
                    </ListItemButton>
                    <ListItemButton component={Link} onClick={logout}>
                        <ListItemText onClick={handleLoggedInDropDownClose}  primary="Logout" />
                    </ListItemButton>
                </Menu>
                </>
            }

            {!user && 
                <Button component={Link} to="login" color="inherit">Login</Button>
            }
                |
            <Button component={Link} to="cart" color="inherit" >
                <Box sx={{marginRight: '2px'}}>${getCartTotal()}</Box>
                <ShoppingCartOutlinedIcon /> ({cartSize})
            </Button>
        </Grid>
        </Grid>
    </Toolbar> 
    )
}

export default BigNavbar