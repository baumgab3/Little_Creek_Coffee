import { Button, Container, Divider, Grid, Link, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link as RouterLink } from "react-router-dom";

const Footer = () => {

    const smallDivider = <Divider sx={{borderBottomWidth: 5, width: "10%"}} />

    return (
            <Container>
                <Divider sx={{borderBottomWidth: 5, marginBottom: '15px'}} />
                {/* TOP FOOTER */}
                <Grid container align="left" spacing={5}>
                    <Grid item xs={12} sm={12} md={4} rowGap={4}>
                        <Typography variant='h6' sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                            contact us
                        </Typography>
                        {smallDivider}
                        
                        <Box mt={2} display="flex">
                            <Typography  sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                phone &nbsp;
                            </Typography>
                            <Typography >
                                414.456.7890
                            </Typography>
                        </Box>
                        <Box mt={2} display="flex">
                            <Typography  sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                email &nbsp;
                            </Typography>
                            <Typography >
                                little_creek@gmail.com
                            </Typography>
                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant='h6' sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                            never stop learning
                        </Typography>
                        {smallDivider}

                        <Box mt={2}>
                            <Link component={RouterLink} underline="hover">Public Classes</Link> <br/>
                            <Link component={RouterLink} underline="hover">Public Classes</Link> <br/>
                            <Link component={RouterLink} underline="hover">Public Classes</Link>
                        </Box>

                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                        <Typography variant='h6' sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                            coffee geek reports
                        </Typography>
                        {smallDivider}

                        <Box mt={2}>
                            <Typography>
                                Lorem ipsum dolor sit amet consectetur adipisicing!
                            </Typography>

                            <Box mt={2}>
                                <Button variant="outlined">
                                    sign up
                                </Button> 
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                {/* BOTTOM FOOTER */}
                <Grid container align="center" mt={5} mb={3}>
                    <Grid item xs={12} sm={12} md={12}>
                        Copyright {new Date().getFullYear()} © Little Creek Coffee:  Privacy Policy - Terms & Conditions
                    </Grid>
                </Grid>


            </Container>        
    )
}

export default Footer