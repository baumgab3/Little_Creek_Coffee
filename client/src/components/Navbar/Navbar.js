import React, { useContext, useEffect } from 'react'
import AppBar from '@mui/material/AppBar';
import BigNavbar from './BigNavbar';
import MobileNavbar from './MobileNavbar';
import TopNavbar from './TopNavbar';
import { Box } from '@mui/system';
import { CssBaseline, Toolbar } from '@mui/material';
import UserContext from '../context/UserContext';

const Navbar = (props) => {

    const {logoutUser, user} = useContext(UserContext);

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" elevation={0}>
            <TopNavbar />

            <BigNavbar
            logoutUser={logoutUser}
            user={user}
            />
            <MobileNavbar
            logoutUser={logoutUser}
            user={user}
            drawerWidth={props.drawerWidth} />
        </AppBar>
        <Toolbar />
        </Box>
    );
}

export default Navbar;