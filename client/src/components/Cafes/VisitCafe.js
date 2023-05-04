import { ExpandMore } from '@mui/icons-material'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Card, CardMedia, Container, Typography } from '@mui/material'
import React from 'react'
import { getCafes } from '../../util/CafeUtil'
import { Link } from 'react-router-dom'

const VisitCafe = () => {

    const cafes = getCafes();

    return (
        <Container >
            <Box mt={10}>

                <Typography variant='h5' sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                    our cafes
                </Typography>

                <Box mt={5}>
                    {cafes.map(cafe => {
                        return <Accordion key={cafe.address}>
                            <AccordionSummary
                            expandIcon={<ExpandMore />}
                            aria-controls={`panel-cafe-content`}
                            id={`panel-cafe-header`}
                            >
                            <Typography sx={{textTransform: 'uppercase'}}>
                                {cafe.location}
                            </Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                            <Card>
                                <Box style={{ position: "relative" }}>
                                    <CardMedia
                                    sx={{width: '100%', height: {xs: '750px', sm: '500px'} }}
                                    component="img"
                                    image="/images/location_holder2.jpg" /> 

                                    <Box
                                    sx={{
                                        position: "absolute",
                                        color: "white",
                                        top: 100,
                                        left: {xs: "50%", sm: "35%", md: "30%"},
                                        transform: "translateX(-50%)",
                                    }}
                                    > 
                                        <Typography variant="h3">
                                            {cafe.address}
                                        </Typography>
                                        <Typography variant="h4">
                                            {cafe.location}
                                        </Typography>
                                        <Typography variant="h6">
                                            <b>Phone: </b> {cafe.phone}
                                        </Typography>
                                        <Typography variant="h6">
                                            <b>Hours:</b>
                                        </Typography>

                                        {cafe.hours.map(hour => {
                                            return <Typography key={hour} variant="h6">
                                                {hour}
                                            </Typography>
                                        })}
                                        
                                        <Box mt={3}>
                                            <Button component={Link} to={cafe.googleMapsUrl} target="_blank" variant="contained">Directions</Button>
                                        </Box>
                                    </Box>
                                </Box>
                            </Card>
                            </AccordionDetails>
                        </Accordion>
                    })}
                </Box>

            </Box>
        </Container>
        
    )
}

export default VisitCafe