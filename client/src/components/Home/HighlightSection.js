import React from 'react'
import { Button, Divider, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link as RouterLink  } from 'react-router-dom';
import Link from '@mui/material/Link';
import * as AdminUtil from '../../util/AdminUtil';
import CenterDivider from '../CenterDivider';
import { useNavigate } from "react-router-dom";


const HighlightSection = (props) => {

    const sectionName = props.sectionName;
    const sectionObj = AdminUtil.getHighlighSectionInfo(sectionName);
    const navigate = useNavigate();

    const handleMouseIn = (id) => {
        document.getElementById(id).style.textDecoration='underline';
        document.getElementById(id).style.cursor='pointer';
    }

    const handleMouseOut = (id) => {
        document.getElementById(id).style.textDecoration='none';
        document.getElementById(id).style.cursor='';
    }

    return (
        <Box mt={7} mb={7}>
        <CenterDivider text={sectionObj.title} />
        <Grid container spacing={2} align="center" mt={2}>
            {sectionObj.section.map(section => {
                return <Grid item xs={12} sm={4} md={4} key={section.heading}>
                        <Box sx={{width: "70%", marginBottom: {xs : "15px"}}}>
                            {section.icon}
                            <Typography variant='h5'>
                                {section.heading}
                            </Typography>

                            {section.isLink && 
                            <Box
                            mt={2} mb={3}
                            onMouseEnter={() => handleMouseIn(section.url)}
                            onMouseLeave={() => handleMouseOut(section.url)}
                            onClick={() => {navigate(section.url)}}
                            id={section.url}
                            >
                               {section.text}
                            </Box>
                            }

                            {!section.isLink && 
                                <Typography variant='p' display="block" mt={2} mb={3}>
                                    {section.text}
                                </Typography>
                            }

                            <Button component={RouterLink} to={section.url} variant="outlined">
                                {section.buttonText}
                            </Button>
                        </Box>
                        </Grid>
            })}
        </Grid>
        </Box>
      );
}

export default HighlightSection