import { CardMedia } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'

const ImageCarousel = () => {
  return (

    <Container maxWidth={false} disableGutters>
    <CardMedia
        mt={3}
        component="img"
        src="/images/banner-1.jpg"
        sx={{
        width: '100%',
        height: '90%',
        minHeight: '500px',
        maxHeight: '600px'
        }}
    >

    </CardMedia>
    </Container>

  )
}

export default ImageCarousel