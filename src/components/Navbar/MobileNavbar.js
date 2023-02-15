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
import { Grid, InputAdornment, Popover, TextField } from '@mui/material';
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

const MobileNavbar = (props) => {

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
    
    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>

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
        <Toolbar sx={{  display: { xs: 'block', sm: 'block', md: 'none' } }}>

        <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' }, marginTop: '9px' }}
            >
            <MenuIcon />
            <Typography variant='h6' sx={{marginLeft: '2px', marginBottom: '2px'}}>
                Menu
            </Typography>
        </IconButton>

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
                '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
            >
            <TextField
                variant="standard"
                label="Search..."
                InputProps={{
                    endAdornment: (
                    <InputAdornment>
                        <IconButton>
                            <SearchIcon />
                        </IconButton>
                    </InputAdornment>
                    )
                }}
            />
                {drawer}
            </Drawer>
        </Box>
        


    </Toolbar> 
    )
}

export default MobileNavbar