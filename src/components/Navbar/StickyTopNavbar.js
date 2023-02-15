import React from 'react'
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import Tooltip from '@mui/material/Tooltip';
import MailIcon from '@mui/icons-material/Mail';

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