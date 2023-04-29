import { Box, Button } from '@mui/material'
import React, { useEffect } from 'react'

const Sandbox = () => {

    useEffect(() => {
      // const dateObj = new Date();
      // console.log(dateObj);
      const dateStr = "Sat Apr 29 2023 11:36:06 GMT-0500 (Central Daylight Time)";
      const date = new Date(dateStr);


      console.log(date.getMonth());
    })

    return (
      <Box mt={10}>

      </Box>
    )
}

export default Sandbox