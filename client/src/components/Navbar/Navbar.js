import React, { useContext, useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import BigNavbar from './BigNavbar';
import MobileNavbar from './MobileNavbar';
import TopNavbar from './TopNavbar';
import { Box } from '@mui/system';
import { CssBaseline, Toolbar } from '@mui/material';
import UserContext from '../context/UserContext';
import { useNavigate } from "react-router-dom";

const Navbar = (props) => {

    const {logoutUser, user, navbarName} = useContext(UserContext);
    const [anchorSearchIconEl, setAnchorSearchIconEl] = useState(null);
    const [search, setSearch] = useState("");


    const navigate = useNavigate();

    const handleSearch = () => {
        let toSearch = search;
        setSearch("");
        setAnchorSearchIconEl(null);

        // clean up search
        toSearch = toSearch.trim();
        toSearch = toSearch.replace(/\s\s+/g, ' ');
        toSearch = toSearch.replaceAll(" ", "+");

        // console.log("handle search for", `'${toSearch}'`);

        if (!toSearch || toSearch.length === 0 || toSearch.length > 100) {
            return;
        }

        navigate(`/search/?s=${toSearch}`);
    }

    return (
        <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar component="nav" elevation={0}>
            <TopNavbar />

            <BigNavbar
            logoutUser={logoutUser}
            user={user}
            displayName={navbarName}
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            anchorSearchIconEl={anchorSearchIconEl}
            setAnchorSearchIconEl={setAnchorSearchIconEl}
            />
            <MobileNavbar
            logoutUser={logoutUser}
            user={user}
            drawerWidth={props.drawerWidth}
            displayName={navbarName}
            search={search}
            setSearch={setSearch}
            handleSearch={handleSearch}
            />
        </AppBar>
        <Toolbar />
        </Box>
    );
}

export default Navbar;