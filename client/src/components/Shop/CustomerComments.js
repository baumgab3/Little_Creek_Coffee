import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'

const CustomerComments = (props) => {
    const comments = props.comments;

    return (
        <Box mt={2} >
            {comments.map(comment => {
                return <Box key={comment.id} mb={2}>
                        <Typography variant="p">
                            <i><q>{comment.comment}</q>-{comment.commentPoster}</i>
                        </Typography>
                    </Box>
            })}
        </Box>
    )
}

export default CustomerComments