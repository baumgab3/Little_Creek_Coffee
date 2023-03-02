import React, { useState } from 'react'
import { CardActionArea, Grid, Modal, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import { getServingOurCommunity, getFoundingOwners, getEmployeeOwners, getCoffeeGeeks, getCoreCommitments } from '../../util/AdminUtil'
import CommitmentCard from './CommitmentCard'
import EmployeeCard from './EmployeeCard'
import CenterDivider from '../CenterDivider'

const InsideLittleCreek = () => {

    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: {xs: '95%', sm: '70%', md: '55%'},
        height: 'auto',
        bgcolor: 'white',
        boxShadow: 24,
        p: 4,
    };

    const foundingOwners = getFoundingOwners();
    const employeeOwners = getEmployeeOwners();
    const geeks = getCoffeeGeeks();
    const coreCommitments = getCoreCommitments();
    const companyCommitments = getServingOurCommunity();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleModalOpen = () => setIsModalOpen(true);
    const handleModalClose = () => setIsModalOpen(false);


    return (
        <>
        {/* Todo image jumotron */}

        {/* Stakeholder section */}
        <Container>
        <Grid container spacing={2} mt={8} mb={4} p={2}>
            <Grid item xs={12} textAlign="justify">
                <CenterDivider text="serving stakeholders" />
                <br />
                <Typography variant="p">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolores delectus totam error unde quam necessitatibus deleniti repellendus 
                    sit laudantium voluptatibus fugit repellat vero beatae quaerat, ab iste ipsa sed tempora aut ut officiis praesentium facilis. Dicta 
                    ommodi exercitationem suscipit numquam sint impedit iure veritatis sit perferendis vitae quidem alias est iusto voluptatibus eligendi 
                    modi ad excepturi debitis, nostrum aliquam? Amet dolore, inventore veniam ipsam officiis reprehenderit non vero ipsum asperiores 
                    earum laudantium expedita facere molestias voluptates a nam iste atque?
                </Typography>
            </Grid>
        </Grid>
            <CenterDivider text="company commitments" />
        </Container>

        {/* TODO - opening same modal for each commitment click, low priority right now */}
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Grid container spacing={2} p={2}>
            <Grid item xs={12}>
                <Box sx={modalStyle} p={2}>
                    {companyCommitments.map(current => {
                        return <Typography variant={current.variant} key={current.idx}>
                                    {current.text}
                                </Typography>
                    })}
                </Box>
            </Grid>
            </Grid>
        </Modal>


        {/* company commitments */}
        <Container maxWidth="true" disableGutters>
        <Grid container spacing={2} p={2} mb={4}>
            <Grid item xs={12} sm={6} md={3} >
                <CardActionArea onClick={handleModalOpen}>
                    <CommitmentCard header="serving our community" imagePath="../images/holder_3.jpg" />
                </CardActionArea>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
                <CardActionArea onClick={handleModalOpen}>
                    <CommitmentCard header="environmental commitment" imagePath="../images/holder_3.jpg" />
                </CardActionArea>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
                <CardActionArea onClick={handleModalOpen}>
                    <CommitmentCard header="suppliers & accountability" imagePath="../images/holder_3.jpg" />
                </CardActionArea>
            </Grid>
            <Grid item xs={12} sm={6} md={3} >
                <CardActionArea onClick={handleModalOpen}>
                    <CommitmentCard header="impact report" imagePath="../images/holder_3.jpg" />
                </CardActionArea>
            </Grid>
        </Grid>
        </Container>

        {/* owner section */}
        <Container>
            <CenterDivider text="stone creek coffee owners" />
            <Grid container spacing={5} p={2} >
                <Grid item xs={12} sm={6} md={6}>
                    <Typography variant='h6' sx={{textTransform: 'uppercase'}}>
                        {foundingOwners.header}
                    </Typography>
                    <br />
                    <Typography variant='p'>
                    {foundingOwners.text}
                    </Typography>

                </Grid>

            {foundingOwners.owners.map(owner => {
                return <Grid item xs={12} sm={3} md={3} align="center" key={owner.name}>
                        <EmployeeCard name={owner.name} title={owner.title} socialMediaLink={owner.socialMediaLink} />
                    </Grid>
            })}            
            </Grid>
        </Container>

        {/* employee owners section */}
        <Container>
            <Grid container spacing={5} p={2} >
                <Grid item xs={12} sm={4} >
                    <Typography variant='h6' sx={{textTransform: 'uppercase'}}>
                        {employeeOwners.header}
                    </Typography>
                    <br />
                    <Typography variant='p'>
                    {employeeOwners.text}
                    </Typography>

                </Grid>

                <Grid item xs={12} sm={8}>
                    <Grid container spacing={3} p={1}>
                        {employeeOwners.owners.map(owner => {
                            return <Grid item sm={6} md={4} align="center" key={owner.name}>
                                    <EmployeeCard name={owner.name} title={owner.title} socialMediaLink={owner.socialMediaLink} />
                                </Grid>
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Container>


        {/* coffee geeks */}
        <Container>
        <Grid container mb={12} spacing={4} p={2} align="center">
            <Grid item xs={12} textAlign="justify">
                <CenterDivider text="our coffee geeks" />
            </Grid>

            {geeks.map(geek => {
                            return <Grid item xs={12} sm={4} md={3} align="center" key={geek.name}>
                                    <EmployeeCard name={geek.name} title={geek.title} socialMediaLink={geek.socialMediaLink} />
                                </Grid>
            })}
        </Grid>
        </Container>

        {/* core commitments */}
        <Container maxWidth={false} disableGutters>
            <Box sx={{backgroundImage: 'url(../images/holder_5.jpg)', height: 'auto', paddingBottom: '50px'}}>
             <Container>
                <Grid container spacing={4} align="left" sx={{color: 'white'}} p={1}>
                    <Grid item xs={12} >
                    <Typography variant='h4'>
                     Core Commitments
                     </Typography>
                    </Grid>
                    {coreCommitments.map(commitment => {
                        return <Grid item xs={12} sm={6} md={4} key={commitment.title}>
                                    <Typography variant="h6" sx={{textTransform: 'uppercase'}}>
                                        {commitment.title}
                                    </Typography>
                                    <Typography variant="p">
                                        {commitment.text}
                                    </Typography>
                            </Grid>
                    })}
                </Grid>
             </Container>

            </Box>
        </Container>


        <br />
        <br />
        <br />
        <br />
        
        </>
    )
}

export default InsideLittleCreek