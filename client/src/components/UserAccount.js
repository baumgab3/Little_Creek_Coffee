import { Container, Divider, Grid } from '@mui/material';
import { Box } from '@mui/system'
import React from 'react'
import UserDrawer from './Orders/UserDrawer';


const UserAccount = () => {

    return (
        <Container>
            <Box mt={10}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                        <UserDrawer />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>
                        Account settings
                    </Grid>

                </Grid>

            </Box>
        </Container>

    )
}

export default UserAccount