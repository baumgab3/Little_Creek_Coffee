import { Box, CircularProgress, Grid } from '@mui/material'
import React from 'react'

const LoadingGif = ({style}) => {
    return (
        <Grid item xs={12}>
            <Box display="flex" justifyContent="center" alignItems="center" sx={{marginTop: {xs: '60px', md: style ? '-150px' : '-300px'} }} >
                <CircularProgress size="4rem" disableShrink  />
            </Box>
        </Grid>
    )
}

export default LoadingGif