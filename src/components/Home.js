import { Box } from '@mui/material'
import React from 'react'
import ImageCarousel from './ImageCarousel'
import HighlightSection from './HighlightSection';


const Home = () => {
  return (
    <Box sx={{height: "400px"}}>
      <ImageCarousel />
      <HighlightSection sectionName="Never Stop Learning" />
      <HighlightSection sectionName="Wholesale Information" />

    </Box>
  )
}

export default Home