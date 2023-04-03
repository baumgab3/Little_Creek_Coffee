import { Box, Grid, Typography, Link } from '@mui/material'
import { Container } from '@mui/system'
import React from 'react'
import UserDrawer from '../Orders/UserDrawer'
import { Link as RouterLink } from 'react-router-dom';


const UserAddress = () => {
    
    return (
        <Container>
            <Box mt={10}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                        <UserDrawer />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>

                        <Box mb={2}>
                            The following addresses will be used on the checkout page by default.
                        </Box>

                        <Grid container>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant='h5' sx={{fontWeight: 'bold'}}>
                                    Billing Address
                                </Typography>

                                <Box mt={2}>
                                    <Link component={RouterLink} to="/my-account/edit-address/billing" underline="hover">Edit</Link>
                                </Box>
                                <Box>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        FirstName LastName
                                    </Typography>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        1111 S street
                                    </Typography>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        City, State Zip
                                    </Typography>
                                </Box>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant='h5' sx={{fontWeight: 'bold'}}>
                                    Shipping Address
                                </Typography>

                                <Box mt={2}>
                                    <Link component={RouterLink} to="/my-account/edit-address/shipping" underline="hover">Edit</Link>
                                </Box>
                                <Box>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        FirstName LastName
                                    </Typography>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        1111 S street
                                    </Typography>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        City, State Zip
                                    </Typography>
                                </Box>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default UserAddress