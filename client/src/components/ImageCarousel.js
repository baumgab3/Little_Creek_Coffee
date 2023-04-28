import { Button, Card, CardContent, CardMedia, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useRef, useState } from 'react'
import TripOriginIcon from '@mui/icons-material/TripOrigin';


const ImageCarousel = () => {

    const images = ["/images/banner-1.jpg", "/images/banner-2.jpg", "/images/holder_2.jpg", "/images/holder_7.jpg", "/images/holder_5.jpg"];
    const idx = useRef(0);
    const activeIdx = useRef(0);
    const [currentImage, setCurrentImage] = useState(images[idx.current]);

    const handleHover = (action, id, idx) => {

      if (idx === activeIdx.current) {
          return;
      }

      if (action === "in") {
          document.getElementById(id).style.color="#1976d2";
          document.getElementById(id).style.cursor="pointer";
      } else {
          document.getElementById(id).style.color="white";
      }
      
    }

    const handleClick = (id, idx) => {
      activeIdx.current = idx;
      setCurrentImage(images[idx]);

      const elms = document.getElementsByClassName("home-page-banner");

      for (const current of elms) {
          if (current.id !== id) {
            document.getElementById(current.id).style.color="white";
          } else {
            document.getElementById(id).style.color="#1976d2";
          }
      }

    }

    return (


      <Container maxWidth={false} disableGutters>
      
      <Card elevation={0} sx={{position: "relative"}}>
        <CardMedia
            mt={3}
            component="img"
            src={currentImage}
            sx={{
            width: '100%',
            // height: '90%',
            // minHeight: '500px',
            height: '600px',
            maxHeight: '600px'
            }}
        />


        <CardContent component="div">
          <Box sx={{
                  position: "absolute",
                  color: "white",
                  top: "20%",
                  left: {xs: "50%", md: "40%"},
                  // left: {xs: "50%", sm: "50%", md: "75%"},
                  transform: "translateX(-50%)"
                }}
            >
            <Box sx={{width: {xs: '100%', md: '60%'}, minWidth: {xs: '0px', md: '400px'} }}>
              <Typography variant="h3" mb={1}>
                 Lorem, ipsum.
              </Typography>
              
              <Typography variant="body">
                 Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </Typography>

              <Box mt={3}>
                <Button variant="outlined" color='inherit'>
                    View more
                </Button>
              </Box>

            </Box>
          </Box>

          <Box align="center" mt={-10}>
            {images.map((current, idx) => {
              return <TripOriginIcon
                        onMouseEnter={() => handleHover("in", current, idx)}
                        onMouseLeave={() => handleHover("out", current, idx)}
                        onClick={() => handleClick(current, idx)}
                        id={current}
                        key={current}
                        className="home-page-banner"
                        sx={{color: idx === activeIdx.current ? "primary.main" : "white", fontSize: '40px'}}
                      />
            })}
          </Box>


        </CardContent>
      </Card>


      </Container>

    )
}

export default ImageCarousel