import { Grid } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import UserDrawer from './UserDrawer'

const UserAccountDetails = () => {
  return (
    <Container>
        <Box mt={10}>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={3}>
                    <UserDrawer />
                </Grid>
                <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>
                    TODO - account details
                </Grid>

            </Grid>
        </Box>
    </Container>
  )
}

export default UserAccountDetails