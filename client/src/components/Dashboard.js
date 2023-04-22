import { Button, Container, Grid, Link } from '@mui/material';
import { Box } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import UserContext from './context/UserContext';
import UserDrawer from './Orders/UserDrawer';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Dashboard = () => {

    const {user, logoutUser} = useContext(UserContext);
    const navigate = useNavigate();
    const token = localStorage.getItem('accessToken');

    useEffect(() => {

        if (!user) {
            navigate("/");
        } else {
            const url = `http://localhost:8081/check-authorization/${user.id}`;

            axios.get(url, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then((response) => {

                if (response.status !== 200) {
                    logoutUser();
                }

            })
            .catch(err => {
                logoutUser();
                navigate("/");
            })
        }

    }, [user]);


    return (
        <Container>
            {user && 
            <Box mt={10} sx={{minHeight: {xs: "500px", md: "0px"}}}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                        <UserDrawer />
                    </Grid>

                    <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>
                        <Box>
                          Hello <b>{user.user}</b> (not <b>{user.user}</b>? <Link component={RouterLink} onClick={() => logoutUser()} underline="hover">Log out</Link>)  
                        </Box>
                        
                        <Box mt={3}>
                            From your account dashboard you can view your <Link component={RouterLink} underline="hover" to="/my-orders">orders</Link>, 
                            manage your <Link component={RouterLink} underline="hover" to="/my-account/edit-address">shipping and billing addresses</Link>, 
                            and <Link component={RouterLink} underline="hover" to="/my-account/edit-account">edit your password and account details</Link>.
                        </Box>

                        <Box>
                        <Grid container mt={3} spacing={2}>
                            <Grid item xs={12} sm={6} md={4}>
                                <Button component={RouterLink} to="/my-orders" sx={{width: "100%"}} variant="outlined">Orders</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Button component={RouterLink} to="/my-account/edit-address" sx={{width: "100%"}} variant="outlined">Addresses</Button>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4}>
                                <Button component={RouterLink} to="/my-account/edit-account" sx={{width: "100%"}} variant="outlined">Account Details</Button>
                            </Grid>
                        </Grid> 
                        </Box>
                        
                    </Grid>
                </Grid>
            </Box>
            }
        </Container>

    )
}

export default Dashboard