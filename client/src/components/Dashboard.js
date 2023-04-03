import { Container, Divider, Grid, Link } from '@mui/material';
import { Box } from '@mui/system'
import React, { useContext } from 'react'
import { Link as RouterLink } from 'react-router-dom';
import UserContext from './context/UserContext';
import UserDrawer from './Orders/UserDrawer';


const Dashboard = () => {

    const {user, logoutUser} = useContext(UserContext);
    console.log(user.user);

    return (
        <Container>
            <Box mt={10}>

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




                    </Grid>

                </Grid>

            </Box>
        </Container>

    )
}

export default Dashboard