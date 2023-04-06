import { Divider, Grid, Typography } from '@mui/material';
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useState } from 'react'
import UserContext from '../context/UserContext';
import PastOrderPreview from './PastOrderPreview';
import UserDrawer from './UserDrawer';

const UserOrders = () => {

    const {getOrdersPreview, orders} = useContext(UserContext);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {

        const loadOrders = () => {
            getOrdersPreview();
            setIsLoaded(true);
        }

        loadOrders();
        
    }, []);


    return (
        <Container>
        <Box mt={10}>
            <Grid container spacing={2}>

                <Grid item xs={12} sm={12} md={3}>
                    <UserDrawer />
                </Grid>

                {isLoaded && orders && orders.length === 0 &&
                    <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>
                            No Orders have been placed
                    </Grid>
                }

                {isLoaded && orders && orders.length > 0 &&
                <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>

                    <Grid container mb={2} align="left" sx={{textTransform: 'uppercase'}}>
                        <Grid item xs={3}>
                            <Typography sx={{fontWeight: 'bold'}}>
                                Date
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{fontWeight: 'bold'}}>
                                Status
                            </Typography>
                        </Grid>
                        <Grid item xs={3}>
                            <Typography sx={{fontWeight: 'bold'}}>
                                Total
                            </Typography>
                        </Grid>
                        <Grid item xs={3} align="right">
                            <Typography sx={{fontWeight: 'bold'}}>
                                Actions
                            </Typography>
                        </Grid>

                    </Grid>

                    <Box mt={-1} mb={2} >
                        <Divider sx={{ borderBottomWidth: 5 }} />
                    </Box>

                
                    {orders && orders.map((order) => {
                        return <PastOrderPreview key={order.id} order={order} />
                    })}
                </Grid>
                }

            </Grid>
        </Box>

        </Container>
    )
}

export default UserOrders