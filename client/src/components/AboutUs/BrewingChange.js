import { Button, Divider, Grid, Stack, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React from 'react'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { getBrewingChangeSections } from '../../util/AdminUtil'; 
import { Link } from 'react-router-dom';

const BrewingChange = () => {

    const brewingChangeSections = getBrewingChangeSections();

    return (
        <Container>
        <Grid container spacing={2} mt={8} p={2}>
            <Grid item xs={12} textAlign="justify">
                <Typography variant='h4' sx={{textTransform: 'uppercase'}} gutterBottom>
                    Brewing Change
                </Typography>
                <Divider/>
                <Typography mt={2}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, culpa?
                </Typography>
                <br />
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse, vel doloribus. Totam, reprehenderit iste labore dolorum dolor porro excepturi provident vitae et, animi similique itaque accusamus velit earum sequi officiis?
                </Typography>
                <br />
                <Typography>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil tempore atque officiis voluptate quis, maiores necessitatibus aliquam quasi quas dicta repellendus amet quibusdam nisi?
                </Typography>
                <br />
                <Typography>
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore, vel.
                </Typography>
            </Grid>
        </Grid>


        {brewingChangeSections.map(section => {
            return <Box mt={5} key={section.header}>
                    <Grid container mt={2}>
                        <Grid item xs={12} >
                            <Divider/>
                                <Typography variant='h6' sx={{textTransform: 'uppercase', padding: '5px'}} align="center">
                                    <KeyboardArrowDownIcon sx={{marginBottom: '-5px'}} />  completed project: {section.header}
                                </Typography>
                            <Divider/>
                        </Grid>
                    </Grid>

                    <Grid container spacing={2} mt={2}>
                        <Grid item xs={12} sm={6} md={4}>
                            <img  width="100%" src="../images/holder_2.jpg" alt={section.header} />
                        </Grid>
                        <Grid item xs={12} sm={6} md={8} mt={1}>
                            <Typography mb={2}>
                                PROJECT SUMMARY: {section.projectSummary}
                            </Typography>
                            <Typography mb={2}>
                                IMPACT: {section.impact}
                            </Typography>
                            <Typography mb={2}>
                                PROJECT LEADER: {section.projectLeader}
                            </Typography>
                            <Typography mb={2}>
                                PROJECT TIMELINE: {section.projectTimeLine}
                            </Typography>

                            <Stack direction="column" spacing={2}>
                            {section.buttons.map(button => {
                                return <Button
                                            key={button.text} 
                                            component={Link} to={button.url}
                                            variant="outlined" 
                                            target={button.url.includes("http") ? "_blank" : ""}
                                            >
                                            {button.text}
                                        </Button>
                            })}
                            </Stack>
                      
                      
                        </Grid>
                    </Grid>
                </Box>
        })}

        </Container>
    )
}

export default BrewingChange