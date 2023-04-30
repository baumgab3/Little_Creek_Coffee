import { Button, Checkbox, CircularProgress, Divider, FormControl, FormControlLabel, FormGroup, Grid, Grow, InputLabel, Link, MenuItem, Radio, RadioGroup, Select, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import { Box, Container } from '@mui/system'
import { useContext, useEffect, useRef, useState } from 'react'
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';
import { useNavigate } from "react-router-dom";
import CheckoutBreadCrumbs from './CheckoutBreadCrumbs';
import ShippingRadioGroup from './ShippingRadioGroup';
import Login from '../Login';
import { getStates } from '../../util/AdminUtil';
import axios from 'axios';
import { red } from '@mui/material/colors';

const Checkout = () => {

    const {cart, getCartTotal, shipping, getUniqueID} = useContext(CartContext);
    const {user} = useContext(UserContext);
    const navigate = useNavigate();
    const [displayLogin, setDisplayLogin] = useState(false);
    const states = getStates();
    const [displayShipping, setDisplayShipping] = useState(false);
    const errors = useRef([]);

    // Billing vars
    const [isBillingLoaded, setIsBillingLoaded] = useState(false);
    const [billingFname, setBillingFname] = useState("");
    const [billingLname, setBillingLname] = useState("");
    const [billingCompany, setBillingCompany] = useState("");
    const [billingAddress, setBillingAddress] = useState("");
    const [billingApartment, setBillingApartment] = useState("");
    const [billingCity, setBillingCity] = useState("");
    const [billingState, setBillingState] = useState("");
    const [billingZip, setBillingZip] = useState("");
    const [billingPhone, setBillingPhone] = useState("");
    const [billingEmail, setBillingEmail] = useState("");
    // Billing errors
    const [billingFnameError, setBillingFnameError] = useState(false);
    const [billingLnameError, setBillingLnameError] = useState(false);
    const [billingAddressError, setBillingAddressError] = useState(false);
    const [billingCityError, setBillingCityError] = useState(false);
    const [billingStateError, setBillingStateError] = useState(false);
    const [billingZipError, setBillingZipError] = useState(false);
    const [billingPhoneError, setBillingPhoneError] = useState(false);
    const [billingEmailError, setBillingEmailError] = useState(false);
    // Shipping vars
    const [isShippingLoaded, setIsShippingLoaded] = useState(false);
    const [shippingFname, setShippingFname] = useState("");
    const [shippingLname, setShippingLname] = useState("");
    const [shippingCompany, setShippingCompany] = useState("");
    const [shippingAddress, setShippingAddress] = useState("");
    const [shippingApartment, setShippingApartment] = useState("");
    const [shippingCity, setShippingCity] = useState("");
    const [shippingState, setShippingState] = useState("");
    const [shippingZip, setShippingZip] = useState("");
    // Shipping errors
    const [shippingFnameError, setShippingFnameError] = useState(false);
    const [shippingLnameError, setShippingLnameError] = useState(false);
    const [shippingAddressError, setShippingAddressError] = useState(false);
    const [shippingCityError, setShippingCityError] = useState(false);
    const [shippingStateError, setShippingStateError] = useState(false);
    const [shippingZipError, setShippingZipError] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0) 
        
        if (!user) {
            setIsBillingLoaded(true);
            setIsShippingLoaded(true);

        } else {
            setIsBillingLoaded(false);

            // page is loading with a user logged in, need to fetch billing/shipping details
            const token = localStorage.getItem('accessToken');

            const loadBilling = () => {
                const url = `http://localhost:8081/addresses/billing/${user.id}`;
                
                axios.get(url, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setIsBillingLoaded(true);
                    setBillingFname(response.data.firstName);
                    setBillingLname(response.data.lastName);
                    setBillingCompany(response.data.companyName);
                    setBillingAddress(response.data.streetAddress);
                    setBillingApartment(response.data.apartmentSuit);
                    setBillingState(response.data.state);
                    setBillingCity(response.data.city);
                    setBillingZip(response.data.zip);
                    setBillingPhone(response.data.phone);
                    setBillingEmail(response.data.email);

                })
                .catch(err => {
                    console.log("error fetching user orders", err);
                }) 
            }

            const loadShipping = () => {
                const url = `http://localhost:8081/addresses/shipping/${user.id}`;
                
                axios.get(url, {
                    headers: {
                        'Authorization' : `Bearer ${token}`
                    }
                })
                .then((response) => {
                    setIsShippingLoaded(true);
                    setShippingFname(response.data.firstName);
                    setShippingLname(response.data.lastName);
                    setShippingCompany(response.data.companyName);
                    setShippingAddress(response.data.streetAddress);
                    setShippingApartment(response.data.apartmentSuit);
                    setShippingState(response.data.state);
                    setShippingCity(response.data.city);
                    setShippingZip(response.data.zip);
                })
                .catch(err => {
                    console.log("error fetching user orders", err);
                }) 
            }

            loadBilling();
            loadShipping();
        }

    }, [user])

    const handleLoginChange = () => {
        setDisplayLogin((displayLogin) => !displayLogin);
    };

    // updates the state where the user lives
    const handleShippingChange = () => {
        setDisplayShipping((displayShipping) => !displayShipping);
    }

    const handleBillingStateChange = (event) => {
        setBillingState(event.target.value);
    }

    const placeOrder = () => {
        // reset errors
        errors.current = [];
        setBillingFnameError(false);
        setBillingLnameError(false);
        setBillingAddressError(false);
        setBillingCityError(false);
        setBillingStateError(false);
        setBillingZipError(false);
        setBillingPhoneError(false);
        setBillingEmailError(false);
        setShippingFnameError(false);
        setShippingLnameError(false);
        setShippingAddressError(false);
        setShippingCityError(false);
        setShippingStateError(false);
        setShippingZipError(false);

        if (!billingFname) {
            setBillingFnameError(true);
            errors.current.push("A billing first name is a required field.")
        }

        if (!billingLname) {
            setBillingLnameError(true);
            errors.current.push("A billing last name is a required field.")
        }

        if (!billingAddress) {
            setBillingAddressError(true);
            errors.current.push("A billing address is a required field.")
        }

        if (!billingCity) {
            setBillingCityError(true);
            errors.current.push("A billing city is a required field.")
        }

        if (!billingZip) {
            setBillingZipError(true);
            errors.current.push("A billing zip code is a required field.")
        }

        if (!billingPhone) {
            setBillingPhoneError(true);
            errors.current.push("A billing phone number is a required field.")
        }

        if (!billingEmail) {
            setBillingEmailError(true);
            errors.current.push("A billing email address is a required field.")
        }

        if (displayShipping) {
            if (!shippingFname) {
                setShippingFnameError(true);
                errors.current.push("A shipping first name is a required field.")
            }
    
            if (!shippingLname) {
                setShippingLnameError(true);
                errors.current.push("A shipping last name is a required field.")
            }
    
            if (!shippingAddress) {
                setShippingAddressError(true);
                errors.current.push("A shipping address is a required field.")
            }
    
            if (!shippingCity) {
                setShippingCityError(true);
                errors.current.push("A shipping city is a required field.")
            }
    
            if (!shippingZip) {
                setShippingZipError(true);
                errors.current.push("A shipping zip code is a required field.")
            }
        }

        // If no errors then place order
        if (errors.current.length === 0) {
            alert("valid");
        }

    }

    const userLogin = (
        <Box sx={{ m: 1 }}>
            <Login isCheckoutLogin={true} />
        </Box>
    );

    const shippingForm = (
        <Grid item xs={12}>
            {/* SHIPPING FIRST AND LAST NAME */}
            {isShippingLoaded && <>
            <Grid container mt={3}>
                <Grid item xs={12} sm={6} align="left">
                    <TextField
                        label="First name"
                        defaultValue={shippingFname}
                        onChange={(e) => setShippingFname(e.target.value)}
                        error={shippingFnameError}
                        sx={{width: {xs: "100%", sm: "95%"} }}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6} align="right" sx={{marginTop: {xs: '24px', sm: '0px'}}}>
                    <TextField
                        label="Last name"
                        defaultValue={shippingLname}
                        onChange={(e) => setShippingLname(e.target.value)}
                        error={shippingLnameError}
                        sx={{width: {xs: "100%", sm: "90%"} }}
                        required
                    />
                </Grid>
            </Grid>

            {/* SHIPPING COMPANY NAME */}
            <Grid item xs={12} mt={3} >
                <TextField
                    label="Company name (optional)"
                    defaultValue={shippingCompany}
                    onChange={(e) => setShippingCompany(e.target.value)}
                    sx={{width: "100%"}}
                />
            </Grid>

            <Box mt={3}>
                <Typography sx={{fontWeight: 'bold'}}>
                    Country / Region *
                </Typography>
                <Typography mt={1} sx={{fontWeight: 'bold'}}>
                    United States (US)
                </Typography>
            </Box>

            {/* SHIPPING STREET ADDRESS AND APARTMENT*/}
            <Grid container mt={3}>
                <Grid item xs={12} sm={6} align="left">
                    <TextField
                        label="Street address"
                        defaultValue={shippingAddress}
                        onChange={(e) => setShippingAddress(e.target.value)}
                        error={shippingAddressError}
                        placeholder="House number and street name"
                        sx={{width: {xs: "100%", sm: "95%"} }}
                        required
                    />
                </Grid>

                <Grid item xs={12} sm={6} align="right" sx={{marginTop: {xs: '24px', sm: '0px'}}}>
                    <TextField
                        label="Apartment, suite, unit, etc. (optional)"
                        defaultValue={shippingApartment}
                        onChange={(e) => setShippingApartment(e.target.value)}
                        placeholder="Apartment, suite, unit, etc. (optional)"
                        sx={{width: {xs: "100%", sm: "90%"} }}
                        required
                    />
                </Grid>
            </Grid>

            {/* SHIPPING TOWN / CITY */}
            <Grid item xs={12} mt={3} >
                <TextField
                    label="Town / City"
                    defaultValue={shippingCity}
                    onChange={(e) => setShippingCity(e.target.value)}
                    error={shippingCityError}
                    sx={{width: 1}}
                    required
                />
            </Grid>

            {/* SHIPPING STATES */}
            <Box mt={3}>
                <FormControl sx={{width: 1 }}>
                <InputLabel
                required
                >
                    State
                </InputLabel>
                <Select
                    label="State"
                    onChange={handleShippingChange}
                    MenuProps={{ sx: {maxHeight: 250} }}
                    defaultValue={shippingState}
                    error={shippingStateError}
                    value={shippingState}
                >
                    {states.map((state) => {
                        return <MenuItem key={state} value={state}>{state}</MenuItem>
                    })}
                </Select>
                </FormControl>
            </Box>

            {/* SHIPPING ZIPCODE */}
            <Grid item xs={12} mt={3} >
                <TextField
                    defaultValue={shippingZip}
                    onChange={(e) => setShippingZip(e.target.value)}
                    label="ZIP Code"
                    error={shippingZipError}
                    sx={{width: 1}}
                    required
                />
            </Grid>
          </>}
        </Grid>
    );

    
    return (
        <Container>
            <Box sx={{minHeight: '500px'}}>

            <Grid container spacing={3} mt={5}>

                {/* BREADCRUMBS */}
                <Grid item xs={12} align="center" mb={1}>
                    <CheckoutBreadCrumbs />

                    <Box align="center">
                        <Typography sx={{display: {xs: 'block', sm: 'none'}}}>
                            SHOPPING CART
                        </Typography>
                    </Box>
                </Grid>

                {/* USER ADDRESSES */}
                <Grid item xs={12} sm={12} md={7}>

                    {/* Error Box */}
                    <Box mb={1} color={red[500]}>
                        {errors.current.map((error) => {
                            return <Box key={error}>{error}</Box>;
                        })}

                        {/* {hasServerError && 
                            <Box>
                            Sorry, there a problem updating your address. If problems continues please contact us.
                            </Box>
                        } */}
                    </Box>


                    {/* Let existing user login if they want */}
                    {!user && 
                        <>
                        <Typography>
                            Returning customer? <Link href='#' onClick={() => handleLoginChange()} underline="hover">Click here to login</Link>
                        </Typography>

                        <Box sx={{ display: displayLogin ? 'flex' : 'none' }}>
                        <Grow in={displayLogin}>
                            {userLogin}
                        </Grow>
                        </Box>
                        </>
                    }

                    <Box mt={3} mb={3}>
                     <Divider sx={{ borderBottomWidth: 3 }} />
                    </Box>

                    <Typography variant='h6' sx={{fontWeight: 'bold'}}>
                        Billing Details
                    </Typography>

                    {user && !isBillingLoaded &&
                      <Box display="flex" justifyContent="center" alignItems="center" mt={6} >
                        <CircularProgress size="4rem" disableShrink />
                      </Box>
                    }

                    {(!user || isBillingLoaded) &&
                    <>
                    {/* FIRST AND LAST NAME */}
                    <Grid container mt={3}>
                        <Grid item xs={12} sm={6} align="left">
                            <TextField
                                label="First name"
                                defaultValue={billingFname}
                                onChange={(e) => setBillingFname(e.target.value)}
                                error={billingFnameError}
                                sx={{width: {xs: "100%", sm: "95%"} }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} align="right" sx={{marginTop: {xs: '24px', sm: '0px'}}}>
                            <TextField
                                label="Last name"
                                defaultValue={billingLname}
                                onChange={(e) => setBillingLname(e.target.value)}
                                error={billingLnameError}
                                sx={{width: {xs: "100%", sm: "90%"} }}
                                required
                            />
                        </Grid>
                    </Grid>

                    {/* BILLING COMPANY NAME */}
                    <Grid item xs={12} mt={3} >
                        <TextField
                            label="Company name (optional)"
                            defaultValue={billingCompany}
                            onChange={(e) => setBillingCompany(e.target.value)}
                            sx={{width: 1}}
                        />
                    </Grid>

                    <Box mt={3}>
                        <Typography sx={{fontWeight: 'bold'}}>
                            Country / Region *
                        </Typography>
                        <Typography mt={1} sx={{fontWeight: 'bold'}}>
                            United States (US)
                        </Typography>
                    </Box>

                    {/* BILLING STREET ADDRESS AND APARTMENT*/}
                    <Grid container mt={3}>
                        <Grid item xs={12} sm={6} align="left">
                            <TextField
                                label="Street address"
                                defaultValue={billingAddress}
                                onChange={(e) => setBillingAddress(e.target.value)}
                                error={billingAddressError}
                                placeholder="House number and street name"
                                sx={{width: {xs: "100%", sm: "95%"} }}
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} align="right" sx={{marginTop: {xs: '24px', sm: '0px'}}}>
                            <TextField
                                label="Apartment, suite, unit, etc. (optional)"
                                defaultValue={billingApartment}
                                onChange={(e) => setBillingApartment(e.target.value)}
                                placeholder="Apartment, suite, unit, etc. (optional)"
                                sx={{width: {xs: "100%", sm: "90%"} }}
                                required
                            />
                        </Grid>
                    </Grid>

                    {/* BILLING TOWN / CITY */}
                    <Grid item xs={12} mt={3} >
                        <TextField
                            label="Town / City"
                            defaultValue={billingCity}
                            onChange={(e) => setBillingCity(e.target.value)}
                            error={billingCityError}
                            sx={{width: 1}}
                            required
                        />
                    </Grid>

                    {/* STATES */}
                    <Box mt={3}>
                        <FormControl sx={{width: 1 }}>
                        <InputLabel
                        required
                        >
                            State
                        </InputLabel>
                        <Select
                            label="State"
                            onChange={handleBillingStateChange}
                            MenuProps={{ sx: {maxHeight: 250} }}
                            defaultValue={billingState}
                            error={billingStateError}
                            value={billingState}
                        >
                            {states.map((state) => {
                                return <MenuItem key={state} value={state}>{state}</MenuItem>
                            })}
                        </Select>
                        </FormControl>
                    </Box>

                    {/* BILLING ZIPCODE */}
                    <Grid item xs={12} mt={3} >
                        <TextField
                            label="ZIP Code"
                            defaultValue={billingZip}
                            onChange={(e) => setBillingZip(e.target.value)}
                            error={billingZipError}
                            sx={{width: 1}}
                            required
                        />
                    </Grid>

                    {/* BILLING PHONE */}
                    <Grid item xs={12} mt={3} >
                        <TextField
                            label="Phone"
                            defaultValue={billingPhone}
                            onChange={(e) => setBillingPhone(e.target.value)}
                            error={billingPhoneError}
                            sx={{width: 1}}
                            required
                        />
                    </Grid>

                    {/* BILLING EMAIL */}
                    <Grid item xs={12} mt={3}  mb={3}>
                        <TextField
                            label="Email address"
                            defaultValue={billingEmail}
                            onChange={(e) => setBillingEmail(e.target.value)}
                            error={billingEmailError}
                            sx={{width: 1}}
                            required
                        />
                    </Grid>

                    {/* CHECKBOXES */}
                    <FormGroup sx={{width: {xs: '60%', sm: '38%', md: '38%'} }}>
                    {!user &&
                    <FormControlLabel
                        control={
                            <Checkbox
                            // onClick={() => handleCheckBox()}
                        />}
                        label="Create an account"
                    />
                    }
                    <FormControlLabel
                        control={
                            <Checkbox
                            onClick={() => handleShippingChange()}
                        />}
                        label="Ship to a different address?"
                    />
                    </FormGroup>

                    <Box sx={{display: displayShipping ? 'flex' : 'none' }}>
                        <Grow in={displayShipping}>
                            {shippingForm}
                        </Grow>
                    </Box>

                    <TextareaAutosize
                        // onChange={(e) => setEmailMessage(e.target.value)}
                        // value={emailMessage}
                        aria-label="gift-message"
                        minRows={6}
                        placeholder="Gift Message (optional)"
                        style={{ width: "100%", marginTop: '24px' }}
                    />

                    <TextareaAutosize
                        // onChange={(e) => setEmailMessage(e.target.value)}
                        // value={emailMessage}
                        aria-label="order-notes-message"
                        minRows={6}
                        placeholder="Send us a message (optional)"
                        style={{ width: "100%", marginTop: '24px' }}
                    />
                </>
                 }

                </Grid>
                {/* END OF USER ADDRESS FORM */}

                
                {/* CHECKOUT DETAILS */}
                <Grid item xs={12} sm={12} md={5} mt={5} align="center">
                    <Box sx={{marginLeft: {xs: "0", sm: "0", md: "60px"}}}>
                        <Box align="center" sx={{border: "2px solid black"}}>
                            <Typography sx={{textTransform: 'uppercase', fontWeight: 'bold'}} p={1}>
                                Your Order
                            </Typography>
                        </Box>
    
                        {/* Products */}
                        <Box mt={3} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                Product
                            </Typography>
                            <Typography sx={{textTransform: 'uppercase', fontWeight: 'bold'}}>
                                Subtotal
                            </Typography>
                        </Box>

                        <Divider sx={{ borderBottomWidth: 5 }} />

                         <Box align="left" mt={1}>
                            {cart.map(item => {
                                return <Box mb={2} key={getUniqueID(item)} sx={{display:'flex', justifyContent: 'space-between'}}>
                                        <Box>
                                            <Box>
                                                {item.name.toUpperCase()}
                                            </Box>
                                            <Box sx={{fontSize: '13px'}}>
                                            QUANTITY: {item.quantity}
                                            </Box>
                                            {item.description && 
                                            <Box sx={{fontSize: '13px'}}>
                                            SIZE: {item.description}
                                            </Box>
                                            }
                                            {item.grind &&
                                            <Box sx={{fontSize: '13px'}}>
                                            GRIND TYPE: {item.grind}
                                            </Box>
                                            }
                                        </Box>

                                        <Box sx={{fontWeight: 'bold'}}>
                                            ${item.salePrice ? item.salePrice.toFixed(2) : item.price.toFixed(2)}
                                        </Box>
                                    </Box>
                            })}
                         </Box>

                         <Divider />
                        
                        {/* Subotal */}
                         <Box mt={1} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{ fontWeight: 'bold'}}>
                                Subtotal
                            </Typography>
                            <Typography sx={{ fontWeight: 'bold'}}>
                                ${getCartTotal()}
                            </Typography>
                        </Box>

                        <Divider />

                        {/* SHIPPING RADIO GROUP */}
                        <Box mt={1} mb={2} align="left">
                            <ShippingRadioGroup />
                        </Box>

                        <Divider />
                        
                        {/* COUPON */}
                        <Box mt={3} align="left">
                            <Typography variant='h6' mb={2}>
                                Have a coupon?
                            </Typography>

                            <Box mb={2}>
                                <TextField sx={{width: 1}} label="Coupon code" variant="outlined" />
                            </Box>

                            <Button sx={{width: 1, height: '50px' }} variant='outlined'>apply coupon</Button>
                        </Box>

                        {/* CREDIT CARD */}
                        <Box align="left" mt={4}>
                        <Stack direction="row" spacing={1}>
                        <RadioGroup defaultValue="creditcard">
                           <FormControlLabel control={<Radio />} value="creditcard" label="Credit Card" /> 
                        </RadioGroup>
                        
                            <img
                                src="/images/credit_card.png"
                                loading="lazy"
                                width="40"
                                height="40"
                            />

                            <img
                                src="/images/credit_card.png"
                                loading="lazy"
                                width="40"
                                height="40"
                            />

                            <img
                                src="/images/credit_card.png"
                                loading="lazy"
                                width="40"
                                height="40"
                            />
                        </Stack>

                        <Typography mt={1} mb={2}>
                            Pay securely using your credit card.
                        </Typography>

                        <TextField sx={{width: 1}} label="Card Number" variant="outlined" placeholder="**** **** **** ****" required/>

                        <Grid container mt={2}>
                            <Grid item xs={12} sm={6} align="left">
                                <TextField
                                    label="Expiration (MM/YY)"
                                    placeholder="MM/YY"
                                    sx={{width: {xs: "100%", sm: "95%"} }}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} align="right" sx={{marginTop: {xs: '16px', sm: '0px'}}}>
                                <TextField
                                    label="Card Security Code"
                                    placeholder="CSC"
                                    sx={{width: {xs: "100%", sm: "90%"} }}
                                    required
                                />
                            </Grid>
                        </Grid>

   
                        </Box>

                        {/* TAX  */}
                        <Box mt={3} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{ fontWeight: 'bold'}}>
                                Tax
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}}>
                                ${(Number(shipping) * .055).toFixed(2)}
                            </Typography>
                        </Box>
    
                        <Divider />
    
                        {/* TOTALS */}
                        <Box mt={1} mb={1} sx={{display:'flex', justifyContent: 'space-between'}}>
                            <Typography sx={{ fontWeight: 'bold'}}>
                                Total
                            </Typography>
                            <Typography sx={{fontWeight: 'bold'}}>
                                ${ (Number(getCartTotal()) + Number(shipping) + (Number(shipping) * .055)).toFixed(2) }
                            </Typography>
                        </Box>

                        <Divider sx={{ borderBottomWidth: 5 }} />

                        <Box mt={3}>
                            <Button onClick={() => placeOrder()} sx={{width: 1, height: '50px'}} variant='contained'>place order</Button>
                        </Box>

                    </Box>
                </Grid>

            </Grid>

            </Box>
        </Container>
        )
}

export default Checkout