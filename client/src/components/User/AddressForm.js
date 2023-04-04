import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserDrawer from '../Orders/UserDrawer'
import { getStates } from '../../util/AdminUtil'
import { red } from '@mui/material/colors'
import UserContext from '../context/UserContext'

const AddressForm = () => {

    const {addressType} = useParams();
    // capitalize first letter in addressType
    const type = addressType.charAt(0).toUpperCase() + addressType.substring(1);

    const AddressLabels = {
        FIRST_NAME: "First name",
        LAST_NAME: "Last name",
        STREET_ADDRESS: "Street Address",
        TOWN_CITY: "Town / City",
        STATE: "State",
        ZIP: "ZIP Code",
        PHONE: "Phone",
        EMAIL: "Email Address"
    };

    const states = getStates();

    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);

    const [streetAddress, setStreetAddress] = useState("");
    const [streetAddressError, setStreetAddressError] = useState(false);

    const [townCity, setTownCity] = useState("");
    const [townCityError, setTownCityError] = useState(false);

    const [state, setState] = useState("");
    const [stateError, setStateErrror] = useState(false);

    const [zipCode, setZipCode] = useState("");
    const [zipCodeError, setZipCodeError] = useState(false);

    const [phone, setPhone] = useState("");
    const [phoneError, setPhoneError] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const errors = useRef([]);

    const {getBillingAddress, address} = useContext(UserContext);
    const billingAddress = useRef(null);

    const [isAddressLoaded, setIsAddressLoaded] = useState(false);

    useEffect(() => {

        const loadBillingAddress = () => {
            setIsAddressLoaded(true);
            getBillingAddress();
        }


        loadBillingAddress();
    }, [])


    const handleAddressUpdate = () => {
        errors.current = [];

        if (!firstName) {
            setFirstNameError(true);
            errors.current.push(AddressLabels.FIRST_NAME);
        } else {
            setFirstNameError(false);
            removeError(AddressLabels.FIRST_NAME);
        }

        if (!lastName) {
            setLastNameError(true);
            errors.current.push(AddressLabels.LAST_NAME);
        } else {
            setLastNameError(false);
            removeError(AddressLabels.LAST_NAME);
        }

        if (!streetAddress) {
            setStreetAddressError(true);
            errors.current.push(AddressLabels.STREET_ADDRESS);
        } else {
            setStreetAddressError(false);
            removeError(AddressLabels.STREET_ADDRESS);
        }

        if (!townCity) {
            setTownCityError(true);
            errors.current.push(AddressLabels.TOWN_CITY);
        } else {
            setTownCityError(false);
            removeError(AddressLabels.TOWN_CITY);
        }

        if (!state) {
            setStateErrror(true);
            errors.current.push(AddressLabels.STATE);
        } else {
            setStateErrror(false);
            removeError(AddressLabels.STATE);
        }

        if (!zipCode) {
            setZipCodeError(true);
            errors.current.push(AddressLabels.ZIP);
        } else {
            setZipCodeError(false);
            removeError(AddressLabels.ZIP);
        }

        // errors just for billing
        if (addressType === 'billing') {
            if (!phone) {
                setPhoneError(true);
                errors.current.push(AddressLabels.PHONE);
            } else {
                setPhoneError(false);
                removeError(AddressLabels.PHONE);
            }

            if (!email) {
                setEmailError(true);
                errors.current.push(AddressLabels.EMAIL);
            } else {
                setEmailError(false);
                removeError(AddressLabels.EMAIL);
            }
        }
    }

    const removeError = (toRemove) => {
        errors.current = errors.current.filter(current => current.value != toRemove);
    }

    const handleStateChange = (event) => {
        setState(event.target.value);
      };


    return (
        <Container>
            {isAddressLoaded && <>
            <Box mt={10}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                        <UserDrawer />
                    </Grid>
                    <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>

                        {/* Error Box */}
                        <Box mt={1} mb={1} color={red[500]}>
                            {errors.current.map((error) => {
                                return <Box key={error}>{error} is a required field.</Box>;
                            })}
                        </Box>

                        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                            {type} Address
                        </Typography>

                        <Box mt={1} sx={{ '& .MuiTextField-root': { mr: 1, mt: {xs: "10px"}, width: {xs: "100%", sm: "47%", md: "45%"} },}}>
                            <TextField
                            onChange={(e) => setFirstName(e.target.value.trim())}
                            id="outlined-multiline-flexible"
                            label={AddressLabels.FIRST_NAME}
                            error={firstNameError}
                            value={address ? address.firstName : ""}
                            required 
                            />

                            <TextField
                            onChange={(e) => setLastName(e.target.value.trim())}
                            id="outlined-multiline-flexible"
                            label={AddressLabels.LAST_NAME}
                            error={lastNameError}
                            value={address ? address.lastName : ""}
                            required />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            id="outlined-multiline-flexible"
                            label="Company name (optional)"
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
                            <TextField
                            onChange={(e) => setStreetAddress(e.target.value.trim())}
                            id="outlined-multiline-flexible"
                            label={AddressLabels.STREET_ADDRESS}
                            error={streetAddressError}
                            required />
                            <TextField id="outlined-multiline-flexible" label="Apartment, suit, etc (optional)" />
                        </Box>

                        <Box mt={3}>
                            <TextField
                            onChange={(e) => setTownCity(e.target.value.trim())}
                            id="outlined-multiline-flexible"
                            label={AddressLabels.TOWN_CITY}
                            error={townCityError}
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        <Box mt={3}>
                            <FormControl sx={{width: {xs: "100%", sm: "95%", md: "91%"}}}>
                            <InputLabel
                            id="state-select-label"
                            error={stateError}
                            required
                            >
                                {AddressLabels.STATE}
                            </InputLabel>
                            <Select
                                labelId="state-select-label"
                                id="state-select-label"
                                value={state}
                                label={AddressLabels.STATE}
                                onChange={handleStateChange}
                                MenuProps={{ sx: {maxHeight: 250} }}
                                error={stateError}
                            >
                                {states.map((state) => {
                                    return <MenuItem key={state} value={state}>{state}</MenuItem>
                                })}
                            </Select>
                            </FormControl>
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            id="outlined-multiline-flexible"
                            onChange={(e) => setZipCode(e.target.value.trim())}
                            label={AddressLabels.ZIP}
                            error={zipCodeError}
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        {addressType === 'billing' &&
                        <>
                        <Box mt={3}>
                            <TextField 
                            id="outlined-multiline-flexible"
                            onChange={(e) => setPhone(e.target.value.trim())}
                            label={AddressLabels.PHONE}
                            error={phoneError}
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            id="outlined-multiline-flexible"
                            onChange={(e) => setEmail(e.target.value.trim())}
                            label={AddressLabels.EMAIL}
                            error={emailError}
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>
                        </>
                        }

                        <Box mt={3}>
                            <Button
                            variant="contained"
                            sx={{textTransform: 'uppercase', height: "45px"}}
                            onClick={handleAddressUpdate}
                            >
                                save address
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Box>

            <br/>
            <br/>
            <br/>
            <br/>

            </>
        }
        </Container>
    )
}

export default AddressForm