import React from 'react'
import AppBar from '@mui/material/AppBar';
import BigNavbar from './BigNavbar';
import MobileNavbar from './MobileNavbar';
import StickyTopNavbar from './StickyTopNavbar';

const Navbar = (props) => {

    return (
        <AppBar component="nav" elevation={0}>
            <StickyTopNavbar />
            <BigNavbar />
            <MobileNavbar drawerWidth={props.drawerWidth} />
        </AppBar>
    );
}

export default Navbar;