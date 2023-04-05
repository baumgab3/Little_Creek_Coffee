import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Box, Container, Stack } from '@mui/system'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import UserDrawer from '../Orders/UserDrawer'
import { getStates } from '../../util/AdminUtil'
import { blue, red } from '@mui/material/colors'
import UserContext from '../context/UserContext'
import axios from 'axios'

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

    // two optional feields
    const [companyName, setCompanyName] = useState("");
    const [apartmentSuit, setApartmentSuit] = useState("");

    const [isAddressLoaded, setIsAddressLoaded] = useState(false);
    const [isAddressSaved, setIsAddressSaved] = useState(false);
    
    const [hasAddress, setHasAddress] = useState(false);

    const errors = useRef([]);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();

    useEffect(() => {

        const pathToUse = (addressType === 'billing') ? 'billing' : 'shipping';
        const url = `http://localhost:8081/addresses/${pathToUse}/${user.id}`;
        axios.get(url)
        .then((response) => {

            if (response.status !== 200) {
                throw new Error("Error retrieving address");   
            }

            const addressObj = response.data;
            setFirstName(addressObj.firstName);
            setLastName(addressObj.lastName);
            setStreetAddress(addressObj.streetAddress);
            setTownCity(addressObj.city);
            setState(addressObj.state);
            setZipCode(addressObj.zip);
            setApartmentSuit(addressObj.apartmentSuit);
            setCompanyName(addressObj.companyName);

            // set billing fields if needed
            if (addressType === 'billing') {
                setPhone(addressObj.phone);
                setEmail(addressObj.email);
            }

            // if firstname is set, then everything is set.  Set booleans that will allow user to drop address
            if (addressObj.firstName) {
                setHasAddress(true);
            }

            setIsAddressLoaded(true);
        })
        .catch(err => {
            console.log("error fetching user orders", err);
        })

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

        // if not errors then can make update
        if (errors.current.length === 0) {

            const addressToUpdate = {
                firstName,
                lastName,
                streetAddress,
                city: townCity,
                state,
                zip: zipCode
            }

            // add two optional fields
            addressToUpdate.apartmentSuit = apartmentSuit ? apartmentSuit : "";
            addressToUpdate.companyName = companyName ? companyName : "";

            // add two fields just for billing
            if (addressType === 'billing') {
                addressToUpdate.phone = phone;
                addressToUpdate.email = email;
            }

            const pathToUse = (addressType === 'billing') ? 'billing' : 'shipping';
            const url = `http://localhost:8081/addresses/${pathToUse}/${user.id}`;
            const data = {user, addressToUpdate};
            
            axios.post(url, data)
            .then((response) => {
    
                if (response.status !== 200) {
                    throw new Error("Error updating " + addressType + " address");
                }
                
                setIsAddressSaved(true);
                setHasAddress(true);
            })
            .catch(err => {
                console.log("error", err);
            })

        }
    }

    const removeError = (toRemove) => {
        errors.current = errors.current.filter(current => current.value != toRemove);
    }

    const handleStateChange = (event) => {
        setState(event.target.value);
    }

    const handleDeleteAddress = () => {
        const text = "Are you sure you want to forget this " + addressType + " address?"

        if (!window.confirm(text)) {
            return;
        }

        const pathToUse = (addressType === 'billing') ? 'billing' : 'shipping';
        const url = `http://localhost:8081/addresses/${pathToUse}/${user.id}`;
        
        axios.delete(url)
        .then((response) => {

            if (response.status !== 200) {
                throw new Error("Error deleting " + addressType + " address");
            }

            navigate("/my-account/edit-address");
        })
        .catch(err => {
            console.log("error deleting address", err);
        })
    }


    return (
        <Container>
            <Box mt={10}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                        <UserDrawer />
                    </Grid>
                    {isAddressLoaded && <>
                    <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>

                        {/* Error Box */}
                        <Box mt={1} mb={1} color={red[500]}>
                            {errors.current.map((error) => {
                                return <Box key={error}>{error} is a required field.</Box>;
                            })}
                        </Box>

                        {/* Success Update Box */}
                        {isAddressSaved && errors.current.length === 0 && 
                        <Box mt={1} mb={1} color={blue[500]}>
                            {type} Address has been saved!
                        </Box>
                        }
                        
                        <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                            {type} Address
                        </Typography>

                        <Box mt={1} sx={{ '& .MuiTextField-root': { mr: 1, mt: {xs: "10px"}, width: {xs: "100%", sm: "47%", md: "45%"} },}}>
                            <TextField
                            onChange={(e) => setFirstName(e.target.value.trim())}
                            label={AddressLabels.FIRST_NAME}
                            error={firstNameError}
                            defaultValue={firstName}
                            required 
                            />

                            <TextField
                            onChange={(e) => setLastName(e.target.value.trim())}
                            label={AddressLabels.LAST_NAME}
                            error={lastNameError}
                            defaultValue={lastName}
                            required />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            onChange={(e) => setCompanyName(e.target.value.trim())}
                            label="Company name (optional)"
                            defaultValue={companyName}
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
                            label={AddressLabels.STREET_ADDRESS}
                            error={streetAddressError}
                            defaultValue={streetAddress}
                            required />
                            <TextField
                            onChange={(e) => setApartmentSuit(e.target.value.trim())}
                            label="Apartment, suit, etc (optional)"
                            defaultValue={apartmentSuit}
                            />
                        </Box>

                        <Box mt={3}>
                            <TextField
                            onChange={(e) => setTownCity(e.target.value.trim())}
                            id="outlined-multiline-flexible"
                            label={AddressLabels.TOWN_CITY}
                            error={townCityError}
                            defaultValue={townCity}
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        <Box mt={3}>
                            <FormControl sx={{width: {xs: "100%", sm: "95%", md: "91%"}}}>
                            <InputLabel
                            error={stateError}
                            required
                            >
                                {AddressLabels.STATE}
                            </InputLabel>
                            <Select
                                label={AddressLabels.STATE}
                                onChange={handleStateChange}
                                MenuProps={{ sx: {maxHeight: 250} }}
                                error={stateError}
                                defaultValue={state}
                                value={state}
                            >
                                {states.map((state) => {
                                    return <MenuItem key={state} value={state}>{state}</MenuItem>
                                })}
                            </Select>
                            </FormControl>
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            onChange={(e) => setZipCode(e.target.value.trim())}
                            label={AddressLabels.ZIP}
                            error={zipCodeError}
                            defaultValue={zipCode}
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        {addressType === 'billing' &&
                        <>
                        <Box mt={3}>
                            <TextField 
                            onChange={(e) => setPhone(e.target.value.trim())}
                            label={AddressLabels.PHONE}
                            error={phoneError}
                            defaultValue={phone}
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            onChange={(e) => setEmail(e.target.value.trim())}
                            label={AddressLabels.EMAIL}
                            error={emailError}
                            defaultValue={email}
                            required
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}} />
                        </Box>
                        </>
                        }

                        <Stack spacing={2} rowGap={2} mt={3} direction={{sm: "row"}}>
                            <Button
                            variant="contained"
                            sx={{textTransform: 'uppercase', height: "45px"}}
                            onClick={handleAddressUpdate}
                            spacing={3}
                            >
                                save address
                            </Button>

                        {hasAddress && 
                            <Button
                            variant="contained"
                            sx={{textTransform: 'uppercase', height: "45px"}}
                            onClick={handleDeleteAddress}
                            align="right"
                            color="error"
                            >
                                Forget address
                            </Button>
                        }
                        </Stack>
                    </Grid>
                    </>
                    }
                </Grid>
            </Box>

            <br/>
            <br/>
            <br/>
            <br/>

        </Container>
    )
}

export default AddressForm;