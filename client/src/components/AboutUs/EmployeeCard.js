import { CardActionArea, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const EmployeeCard = ({name, title, socialMediaLink}) => {
  return (
    <CardActionArea component={Link} to={socialMediaLink} target="_blank">
        <CardMedia
        sx={{borderRadius: '50%'}}
        component="img"
        image="../images/holder_4.jpg"
        alt=""
        />
        <CardContent>
        <Typography variant="h6" sx={{textTransform: 'uppercase'}} color="text.secondary">
            {name}
        </Typography>
        <Typography variant="p" sx={{textTransform: 'uppercase'}} color="text.secondary">
            {title}
        </Typography>
        </CardContent>
    </CardActionArea>
  )
}

export default EmployeeCard