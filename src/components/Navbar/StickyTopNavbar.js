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
import BigNavbar from './BigNavbar';
import MobileNavbar from './MobileNavbar';

const StickyTopNavbar = () => {
    const fontSize = ".9em";
    const iconStyle = {
        fontSize: 15, 
        marginRight: '3px'
    };

    return (
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
    )
}

export default StickyTopNavbar