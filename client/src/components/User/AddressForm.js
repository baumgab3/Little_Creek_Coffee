import { Button, FormControl, Grid, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import UserDrawer from '../Orders/UserDrawer'

const AddressForm = () => {

    const {addressType} = useParams();
    // capitalize first letter in addressType
    const type = addressType.charAt(0).toUpperCase() + addressType.substring(1);

    const [state, setState] = useState("");

    const handleStateChange = (event) => {
        setState(event.target.value);
      };


    return (
        <Container>
            <Box mt={10}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                        <UserDrawer />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>
                        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                            {type} Address
                        </Typography>


                        <Box mt={1} sx={{ '& .MuiTextField-root': { mr: 1, mt: {xs: "10px"}, width: {xs: "100%", sm: "47%", md: "45%"} },}}>
                            <TextField id="outlined-multiline-flexible" label="First name" required />
                            <TextField id="outlined-multiline-flexible" label="Last name" required />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            id="outlined-multiline-flexible"
                            label="Company name (optional)"
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        <Box mt={3}>
                            <Typography sx={{fontWeight: 'bold'}}>
                                Country / Region
                            </Typography>
                            <Typography mt={1} sx={{fontWeight: 'bold'}}>
                               United States (US)
                            </Typography>
                        </Box>


                        <Box mt={1} sx={{ '& .MuiTextField-root': { mr: 1, mt: {xs: "10px"}, width: {xs: "100%", sm: "47%", md: "45%"} },}}>
                            <TextField id="outlined-multiline-flexible" label="Street Address" required />
                            <TextField id="outlined-multiline-flexible" label="Apartment, suit, etc (optional)" />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            id="outlined-multiline-flexible"
                            label="Town / City"
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        <Box mt={3}>
                            <FormControl sx={{width: {xs: "100%", sm: "95%", md: "91%"}}}>
                            <InputLabel id="state-select-label">State</InputLabel>
                            <Select
                                labelId="state-select-label"
                                id="state-select-label"
                                value={state}
                                label="State"
                                onChange={handleStateChange}
                            >
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                            </FormControl>
                        </Box>


                        <Box mt={3}>
                            <TextField 
                            id="outlined-multiline-flexible"
                            label="ZIP Code"
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        {addressType === 'billing' &&
                        <>
                        <Box mt={3}>
                            <TextField 
                            id="outlined-multiline-flexible"
                            label="Phone"
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            id="outlined-multiline-flexible"
                            label="Email Address"
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>
                        </>
                        }

                        <Box mt={3}>
                            <Button variant="contained" sx={{textTransform: 'uppercase', height: "45px"}}>save address</Button>
                        </Box>


                    </Grid>

                </Grid>
            </Box>

            <br/>
            <br/>
            <br/>
            <br/>
        </Container>
    )
}

export default AddressForm