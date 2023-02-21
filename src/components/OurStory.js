import { Grid, Paper, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import { getOurStory, getOurStoryCardSection } from '../util/AdminUtil'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Button, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

const OurStory = () => {

    const sections = getOurStory();
    const cardSections = getOurStoryCardSection();
    const marginLeft = {marginLeft: {md: "100px"}};
    const marginRight = {marginRight: {md: "100px"}};

    return (
        <Container>

            {/* TODO image jumbotron  */}

            <Box mt={8} mb={10} align="center">
                <Typography variant='h4' p={2} sx={{textTransform: 'uppercase'}}>
                    the work of a lifetime
                </Typography>
                <Typography sx={{width: {xs: "90%", sm: "70%", md: "60%"}}} textAlign="justify">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa autem soluta doloribus animi omnis hic ex distinctio architecto non expedita vel suscipit porro, sunt voluptate commodi, pariatur illo consectetur harum iure temporibus debitis nisi eligendi voluptatum nulla. Minus quos eum asperiores saepe officiis eos, quam ipsam, nostrum a ut quae architecto fuga! Mollitia rerum nihil excepturi dolorum nostrum id laboriosam illum illo, nemo error aliquid odit? Officia nemo animi labore pariatur dolorem iusto eaque obcaecati quasi tempora. Ea, odit in.
                </Typography>
                <Typography variant='h5' textAlign="center" ml={18} mt={2}>
                    - Ted, Founder 
                </Typography>
            </Box>

            {/* Section for big screens */}
            <Box sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                {sections.map(section => {
                    return <Box mt={5} key={section.smallHeader}>
                            <Grid container align="center">
                                {section.leftImage && 
                                    <Grid item md={6} >
                                        <img width="100%" src={section.imagePath} alt={section.smallHeader} /> 
                                    </Grid>
                                }
                                    <Grid item md={6}>
                                        <Box sx={section.leftImage ? marginLeft: marginRight} p={3} >
                                            <Typography textAlign="start" variant='h6' mb={1} sx={{textTransform: 'uppercase'}}>
                                                {section.smallHeader}
                                            </Typography>
                                            <Typography textAlign="start" variant='h4' mb={2} sx={{textTransform: 'uppercase'}}>
                                                {section.bigHeader}
                                            </Typography>
                                            <Typography  textAlign="start">
                                                {section.sectionText}
                                            </Typography>
                                        </Box>
                                    </Grid>

                                {!section.leftImage && 
                                    <Grid item md={6} >
                                        <img width="100%" src={section.imagePath} alt={section.smallHeader} /> 
                                    </Grid>
                                }
                            </Grid>
                        </Box>
                })}
            </Box>

            {/* smaller/mobile screens */}
            <Box sx={{ display: { xs: 'block', sm: 'block', md: 'none'}}}  >
                {sections.map(section => {
                    return <Box mt={5} key={section.smallHeader}>
                            <Paper elevation={5}>
                            <Grid container align="center">
                                <Grid item md={12} >
                                    <img width="100%" src={section.imagePath} alt={section.smallHeader} /> 
                                </Grid>
                                <Grid item md={12}>
                                    <Box p={3} >
                                        <Typography textAlign="start" variant='h6' mb={1} sx={{textTransform: 'uppercase'}}>
                                            {section.smallHeader}
                                        </Typography>
                                        <Typography textAlign="start" variant='h4' mb={2} sx={{textTransform: 'uppercase'}}>
                                            {section.bigHeader}
                                        </Typography>
                                        <Typography  textAlign="start">
                                            {section.sectionText}
                                        </Typography>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                        </Box>
                })}
            </Box>
            <br />
            <br />
            <br />
            <br />
            
        {/* TODO image jumbotron  */}

        {/* 3 Card Section */}
        <Grid container align="center" spacing={5}>
            {cardSections.map(section => {
                return <Grid item xs={12} sm={4} md={4} key={section.header} >
                        <Card>
                        <CardActionArea component={Link} to={section.url} sx={{transition: "transform 0.35s ease-in-out", "&:hover": { transform: "scale3d(1.05, 1.05, 1)" }}}>
                        <CardMedia
                        component="img"
                        height="300"
                        image={section.imagePath}
                        alt={section.header}
                        />
                        </CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{textTransform: 'uppercase'}}>
                            {section.header}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {section.text}
                        </Typography>
                        </CardContent>
                        <Button component={Link} to={section.url} variant="contained" sx={{marginBottom: '20px'}}>
                            {section.buttonText}
                        </Button>
                        </Card>
                    </Grid>
            })}
        </Grid>
        <br />
        <br />
        </Container>
    )
}

export default OurStory