import { Box, Container } from '@mui/system'
import React from 'react'

const ImageCarousel = () => {
  return (
    <Container maxWidth={false} disableGutters>
    <Box
        sx={{
        width: '200px',
        backgroundColor: 'gray'
        }}
    />
    </Container>

  )
}

export default ImageCarousel