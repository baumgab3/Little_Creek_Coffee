import { Button, Divider, Grid, TextareaAutosize, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { getFAQs } from '../../util/AdminUtil';

const Contact = () => {
    const faqs = getFAQs();

    const [email, setEmail] = useState("");
    const [emailSubject, setEmailSubject] = useState("");
    const [emailMessage, setEmailMessage] = useState("");
    const [isValidContact, setIsValidContact] = useState(false);

    useEffect(() => {
        const isValid = () => {
            if (email && emailSubject && emailMessage) {
                setIsValidContact(true);
            } else {
                setIsValidContact(false);
            }
        }

        isValid();
    }, [email, emailSubject, emailMessage])

    const handleEmail = () => {
        // TODO
        alert("TODO");
    }

    return (
        <Container sx={{width: '80%'}}>
        <Grid container mt={8} spacing={2} rowGap={3}>
            <Grid item xs={12} sm={5} pr={2}>
                <Typography variant='h5'>
                    Customer Care
                </Typography>
                <Divider />

                <Typography mt={2}>
                   Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, eligendi expedita odit atque, officia numquam modi.
                   Eligendi fuga quas nostrum odio omnis quae earum voluptatibus cupiditate sequi. Ducimus, facilis quisquam excepturi deserunt nostrum repellat ut.
                </Typography>
                <Typography mt={2}>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ut incidunt aliquid suscipit!
                </Typography>
                <Typography mt={2}>
                    Our Customer Care service hours are: Monday - Friday: 8:30AM - 4:30PM (CST).
                </Typography>
            </Grid>
            <Grid item xs={12} sm={7} >
                <Typography variant='h5'>
                    Contact Us
                </Typography>
                <Divider />
                <br />

                <Grid container direction={"column"} spacing={2}>
                <Grid item>
                    <TextField onChange={(e) => setEmail(e.target.value)} value={email} label="Requester email" variant="outlined" style={{ width: "100%" }} required />
                </Grid>
                <Grid item>
                    <TextField onChange={(e) => setEmailSubject(e.target.value)} value={emailSubject} label="Subject" variant="outlined" style={{ width: "100%" }}  required />
                </Grid>
                <Grid item>
                 <TextareaAutosize
                        onChange={(e) => setEmailMessage(e.target.value)}
                        value={emailMessage}
                        aria-label="contact-message"
                        minRows={6}
                        placeholder="Send us a message"
                        style={{ width: "100%" }}
                    />

                <Button
                    disabled={isValidContact ? false : true}
                    onClick={handleEmail}
                    variant="contained"
                    sx={{marginTop: '15px'}}
                >
                    Submit
                </Button>

                </Grid>
                </Grid>
            </Grid>
        </Grid>

        <Typography variant='h5' mt={4}>
            FAQS
        </Typography>

        <Divider/>

        <br />

        {faqs.map(faq => {
            return <Accordion key={faq.idx}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel-${faq.idx}-content`}
                id={`panel-${faq.idx}-header`}
                >
                 <Typography sx={{textTransform: 'uppercase'}}>{faq.question}</Typography>   
                </AccordionSummary>
                <AccordionDetails>
                <Typography>{faq.answer}</Typography>
                </AccordionDetails>
            </Accordion>
        })}

        </Container>
    )
}

export default Contact