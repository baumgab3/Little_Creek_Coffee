import { Box, Grid, Typography, Link } from '@mui/material'
import { Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import UserDrawer from '../Orders/UserDrawer'
import { Link as RouterLink } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import { getStateAbbreviation } from '../../util/AdminUtil';

const UserAddress = () => {

    const {user} = useContext(UserContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [addressObj, setAddressObj] = useState({});

    useEffect(() => {
        const url = `http://localhost:8081/addresses/${user.id}`;
        const token = localStorage.getItem('accessToken');
        axios.get(url, {
            headers: {
                'Authorization' : `Bearer ${token}`
            }
        })
        .then((response) => {

            if (response.status !== 200) {
                throw new Error("Error retrieving addresses");
            }

            setIsLoaded(true);
            setAddressObj(response.data);
        })
        .catch(err => {
            console.log("error fetching user address previews", err);
        })

    }, []);

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

                        {isLoaded && 
                        <Grid container>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant='h5' sx={{fontWeight: 'bold'}}>
                                    Billing Address
                                </Typography>

                                {/* Billing Address */}
                                <Box mt={2}>
                                    <Link component={RouterLink} to="/my-account/edit-address/billing" underline="hover">Edit</Link>
                                </Box>
                                {addressObj.billing.length !== 0 && 
                                <Box>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        {addressObj.billing.FirstName} {addressObj.billing.LastName}
                                    </Typography>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        {addressObj.billing.StreetAddress}
                                    </Typography>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        {addressObj.billing.City}, {getStateAbbreviation(addressObj.billing.State)} {addressObj.billing.ZipCode} 
                                    </Typography>
                                </Box>
                                }
                            </Grid>

                            {/* Shipping Address */}
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant='h5' sx={{fontWeight: 'bold'}}>
                                    Shipping Address
                                </Typography>

                                <Box mt={2}>
                                    <Link component={RouterLink} to="/my-account/edit-address/shipping" underline="hover">Edit</Link>
                                </Box>
                                {addressObj.shipping.length !== 0 &&
                                <Box>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        {addressObj.shipping.FirstName} {addressObj.shipping.LastName}
                                    </Typography>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        {addressObj.shipping.StreetAddress}
                                    </Typography>
                                    <Typography sx={{fontStyle: 'italic'}}>
                                        {addressObj.shipping.City}, {getStateAbbreviation(addressObj.shipping.State)} {addressObj.shipping.ZipCode}
                                    </Typography>
                                </Box>
                                }
                            </Grid>
                        </Grid>
                        }

                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default UserAddress