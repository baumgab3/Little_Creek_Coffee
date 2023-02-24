import { Card, CardMedia, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const CommitmentCard = ({header, imagePath}) => {
    return (
        <Card >
        <Box style={{ position: "relative" }}>      
            <CardMedia 
            sx={{transition: "transform 0.35s ease-in-out", "&:hover": { transform: "scale3d(1.05, 1.05, 1)" }}}
            component="img" 
            image={imagePath}
            alt={header} /> 
            <Box style={{position: "absolute", color: "white", top: "40%", left: "50%", transform: "translateX(-50%)"}} align="center"> 
                <Typography variant='h5' sx={{textTransform: 'uppercase'}}>
                    {header}
                </Typography>
            </Box> 
        </Box>
    </Card>
    )
}

export default CommitmentCard