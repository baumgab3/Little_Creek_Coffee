import { Box, Button, CardMedia, Link, Stack, Typography } from '@mui/material'
import React from 'react'
import ImageCarousel from '../ImageCarousel'
import HighlightSection from './HighlightSection';
import CenterDivider from '../CenterDivider';
import { Container } from '@mui/system';
import { Link as RouterLink } from 'react-router-dom';


const Home = () => {
  return (
    <Box mt={8}>
      <ImageCarousel />

      <Container>
        <HighlightSection sectionName="Never Stop Learning" />
      </Container>

      <Box m={5}>
        <Container>
          <CenterDivider text="join our team" />
        </Container>
        <br/>
        <Typography>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aut ipsum et esse beatae praesentium, accusamus consequuntur quo reiciendis
            modi possimus quibusdam minus nihil eius perspiciatis sed soluta fugiat? Click <Link component={RouterLink} to="/join-our-team" underline="none">HERE</Link>
        </Typography>
      </Box>

        <CardMedia align="center" sx={{backgroundImage: 'url(../images/holder_9.jpg)', width: "100%", height: "450px"}}>
          {/* <img src="../images/holder_9.jpg" width="100%" height="100%" alt="" /> */}
          <Box sx={{color: 'white', position: "absolute", marginTop: "100px", left: "50%", transform: "translateX(-50%)"}}>
            <Typography variant='h3' sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
              shop by roast level
            </Typography>

            <Box mt={4} sx={{position: "absolute", marginTop: "20px", left: "50%", transform: "translateX(-50%)"}} >
              <Stack direction="row" spacing={1}>
                <Button variant="contained" component={RouterLink} to="/product-category/roast/light/">Light</Button>
                <Button variant="contained" component={RouterLink} to="/product-category/roast/medium/">Medium</Button>
                <Button variant="contained" component={RouterLink} to="/product-category/roast/dark/">Dark</Button>
                <Button variant="contained" component={RouterLink} to="/product-category/roast/decaf/">Decaf</Button>
              </Stack>
            </Box>
          </Box>

        </CardMedia>

      <Container>
        <HighlightSection sectionName="Wholesale Information" />
      </Container>

    </Box>
  )
}

export default Home