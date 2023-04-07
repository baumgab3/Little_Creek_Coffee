import { Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import { blue, red } from '@mui/material/colors'
import { Box, Container } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../context/UserContext'
import UserDrawer from './UserDrawer'

const UserAccountDetails = () => {

    const accountLabels = {
        FIRST_NAME: "First name",
        LAST_NAME: "Last name",
        DISPLAY_NAME: "Display name",
        EMAIL: "Email address"
    };

    
    const [firstName, setFirstName] = useState("");
    const [firstNameError, setFirstNameError] = useState(false);
    
    const [lastName, setLastName] = useState("");
    const [lastNameError, setLastNameError] = useState(false);

    const [displayName, setDisplayName] = useState("");
    const [displayNameError, setDisplayNameError] = useState(false);

    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);

    const [newPassword, setNewPassword] = useState("");
    const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

    const errors = useRef([]);
    const {user} = useContext(UserContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {

        const url = `http://localhost:8081/account-details/${user.id}`;

        axios.get(url)
        .then((response) => {

            if (response.status !== 200) {
                throw new Error("Error retrieving account details");   
            }

            const accountDetails = response.data;
            setIsLoaded(true);
            setFirstName(accountDetails.firstName);
            setLastName(accountDetails.lastName);
            setDisplayName(accountDetails.displayName);
            setEmail(accountDetails.email);
                 
        })
        .catch(err => {
            console.log("error retrieving account details", err);
        })


    }, [])

    const handleAccountDetailsUpdate = () => {
        errors.current = [];

        if (!firstName) {
            setFirstNameError(true);
            errors.current.push(accountLabels.FIRST_NAME);
        } else {
            setFirstNameError(false);
            removeError(accountLabels.FIRST_NAME);
        }

        if (!lastName) {
            setLastNameError(true);
            errors.current.push(accountLabels.LAST_NAME);
        } else {
            setLastNameError(false);
            removeError(accountLabels.LAST_NAME);
        }

        if (!displayName) {
            setDisplayNameError(true);
            errors.current.push(accountLabels.DISPLAY_NAME);
        } else {
            setDisplayNameError(false);
            removeError(accountLabels.DISPLAY_NAME);
        }

        if (!email) {
            setEmailError(true);
            errors.current.push(accountLabels.EMAIL);
        } else {
            setEmailError(false);
            removeError(accountLabels.EMAIL);
        }


        // if no errors then can make update
        if (errors.current.length === 0) {

            const accountDetailsUpdate = {
                firstName,
                lastName,
                displayName,
                email,
                newPassword,
                newPasswordConfirm
            }

            const url = `http://localhost:8081/update-account/${user.id}`;
            const data = {user, accountDetailsUpdate};

            axios.post(url, data)
            .then((response) => {
    
                if (response.status !== 200) {
                    throw new Error("Error updating account details");
                }

                if (response.status === 403) {
                   // TODO - passwords don't match 
                }

                setIsUpdated(true);
            })
            .catch(err => {
                console.log("error", err);
            })
        }

    }

    const removeError = (toRemove) => {
        errors.current = errors.current.filter(current => current.value != toRemove);
    }

    return (
        <Container>
            <Box mt={10}>

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={3}>
                        <UserDrawer />
                    </Grid>

                    {isLoaded && 
                    <Grid item xs={12} sm={12} md={9} sx={{marginTop: {xs :"15px", sm: "15px", md: "0"}}}>

                        {/* Error Box */}
                        <Box mt={1} mb={1} color={red[500]}>
                            {errors.current.map((error) => {
                                return <Box key={error}>{error} cannot be set blank.</Box>;
                            })}
                        </Box>

                        {/* Success Update Box */}
                        {isUpdated && errors.current.length === 0 && 
                        <Box mt={1} mb={1} color={blue[500]}>
                            Account details have been saved!
                        </Box>
                        }
                        

                        <Box mt={1} sx={{ '& .MuiTextField-root': { mr: 1, mt: {xs: "10px"}, width: {xs: "100%", sm: "47%", md: "45%"} },}}>
                            <TextField
                            label="First name"
                            onChange={(e) => setFirstName(e.target.value.trim())}
                            error={firstNameError}
                            defaultValue={firstName}
                            required 
                            />

                            <TextField
                            label="Last name"
                            onChange={(e) => setLastName(e.target.value.trim())}
                            error={lastNameError}
                            defaultValue={lastName}
                            required />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            label="Display name"
                            onChange={(e) => setDisplayName(e.target.value.trim())}
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}}
                            error={displayNameError}
                            defaultValue={displayName}
                            required
                            />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            label="Email address"
                            onChange={(e) => setEmail(e.target.value.trim())}
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}}
                            error={emailError}
                            defaultValue={email}
                            required
                            />
                        </Box>

                        <Box mt={5}>
                            <Typography>
                                Password Change
                            </Typography>
                            <Divider sx={{width: {xs: "100%", sm: "95%", md: "91%"}, borderBottomWidth: 3 }}/>
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            label="Current password"
                            defaultValue="password holder"
                            type="password"
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}}
                            />
                        </Box>

                        <Box mt={3}>
                            <TextField
                            onChange={(e) => setNewPassword(e.target.value.trim())}
                            label="New password (blank to leave unchanged)"
                            type="password"
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}}
                            />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            onChange={(e) => setNewPasswordConfirm(e.target.value.trim())}
                            label="Confirm new password"
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}}
                            type="password"
                            />
                        </Box>

                        <Stack spacing={2} rowGap={2} mt={3} direction={{sm: "row"}}>
                            <Button
                            variant="contained"
                            onClick={handleAccountDetailsUpdate}
                            sx={{textTransform: 'uppercase', height: "45px"}}
                            spacing={3}
                            >
                                save changes
                            </Button>

                        </Stack>
                    </Grid>
                    }
                </Grid>
            </Box>
        </Container>
    )
}

export default UserAccountDetails