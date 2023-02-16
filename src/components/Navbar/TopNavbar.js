import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Tooltip from '@mui/material/Tooltip';
import MailIcon from '@mui/icons-material/Mail';
import { Link } from 'react-router-dom';
import * as AdminUtil from '../../util/AdminUtil';

const TopNavbar = () => {
    const fontSize = ".9em";
    const iconStyle = {
        fontSize: '20px', 
        marginRight: '3px',
        marginBottom: '3px'
    };

    const navLinks = AdminUtil.getTopNavbarLinks();

    return (
        <AppBar position="static" sx={{ height: '25px' }} color="secondary" elevation={0}>
            <Grid display={{ md: "block", sm: "none", xs: "none" }}>
                <Grid item xs={12} sx={{ marginTop:"2px", alignItems:"center", justifyContent:"center", display: 'flex'}}>
                    {/* Links */}
                    {navLinks.map(option => {
                        return <Link to={option.url} key={option.name} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Typography mb={1} mr={1} fontSize={fontSize} >{option.name} |</Typography>
                                </Link>
                    })}

                    <Tooltip title="Follow on Facebook" arrow>
                        <Link 
                            style={{ textDecoration: 'none', color: 'inherit' }} 
                            onClick={() => AdminUtil.openURLInNewWindow("https://www.facebook.com/")}>
                            <FacebookIcon sx={iconStyle} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Follow on Instagram" arrow>
                        <Link 
                            style={{ textDecoration: 'none', color: 'inherit' }} 
                            onClick={() => AdminUtil.openURLInNewWindow("https://www.instagram.com/")}>
                            <InstagramIcon sx={iconStyle} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Follow on Twitter" arrow>
                        <Link 
                            style={{ textDecoration: 'none', color: 'inherit' }} 
                            onClick={() => AdminUtil.openURLInNewWindow("https://twitter.com/?lang=en")}>
                            <TwitterIcon sx={iconStyle} />
                        </Link>
                    </Tooltip>
                    <Tooltip title="Send us an email" arrow>
                        <Link 
                            style={{ textDecoration: 'none', color: 'inherit' }} 
                            to="mailto:info@doto.com">
                            <MailIcon sx={iconStyle} />
                        </Link>
                    </Tooltip>
                </Grid>
            </Grid>
        </AppBar>
    )
}

export default TopNavbar