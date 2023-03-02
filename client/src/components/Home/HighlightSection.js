import React from 'react'
import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link as RouterLink  } from 'react-router-dom';
import Link from '@mui/material/Link';
import * as AdminUtil from '../../util/AdminUtil';

const HighlightSection = (props) => {

    const sectionName = props.sectionName;
    const sectionObj = AdminUtil.getHighlighSectionInfo(sectionName);

    return (
        <>
        <Divider>
            <Typography variant='h5' sx={{textTransform: "uppercase"}}>
                {sectionObj.title}
            </Typography>
        </Divider>

        <Grid container spacing={2} align="center" mt={2}>
            {sectionObj.section.map(section => {
                return <Grid item xs={12} sm={4} md={4} key={section.heading}>
                        <Box sx={{width: "70%", marginBottom: {xs : "15px"}}}>
                            {section.icon}
                            <Typography variant='h5'>
                                {section.heading}
                            </Typography>

                            <Typography variant='p' display="block" mt={2} mb={3}>
                                {section.isLink ? 
                                    <Link 
                                        to={section.url}
                                        component={RouterLink}
                                        color="inherit"
                                        underline="hover"
                                        >{section.text}</Link> : section.text}
                            </Typography>

                            <Button component={RouterLink} to={section.url} variant="outlined">
                                {section.buttonText}
                            </Button>
                        </Box>
                        </Grid>
            })}
        </Grid>
        </>
      );
}

export default HighlightSection