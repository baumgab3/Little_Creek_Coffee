import { Box, Divider, Typography } from '@mui/material'
import React from 'react'

const CenterDivider = ({text}) => {

    return (
        <>
        <Box sx={{display: {xs: 'none', sm: 'block'}}}>
        <Divider>
            <Typography variant='h5' sx={{textTransform: 'uppercase'}}>
                {text}
            </Typography>
        </Divider>
        </Box>


        <Box sx={{display: {xs: 'blcok', sm: 'none'}}} >
            <Typography variant='h5' sx={{textTransform: 'uppercase'}} align="center">
                {text}
            </Typography>
            <Divider />
        </Box>
        </>
    )
}

export default CenterDivider