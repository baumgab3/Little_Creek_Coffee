import React from 'react'
import AppBar from '@mui/material/AppBar';
import BigNavbar from './BigNavbar';
import MobileNavbar from './MobileNavbar';
import TopNavbar from './TopNavbar';
import { Box } from '@mui/system';
import { CssBaseline, Toolbar } from '@mui/material';

const Navbar = (props) => {

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" elevation={0}>
            <TopNavbar />
            <BigNavbar />
            <MobileNavbar drawerWidth={props.drawerWidth} />
        </AppBar>
        <Toolbar />
        </Box>
    );
}

export default Navbar;