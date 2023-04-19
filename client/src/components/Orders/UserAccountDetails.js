import { Button, Divider, Grid, Stack, TextField, Typography } from '@mui/material'
import { blue, red } from '@mui/material/colors'
import { Box, Container } from '@mui/system'
import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../context/UserContext'
import UserDrawer from './UserDrawer'
import { useNavigate } from "react-router-dom";


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

    const [emptyConfirmError, setEmptyConfirmError] = useState(false);
    const [passwordMismatchError, setPasswordMismatchError] = useState(false);

    const [emailTakenError, setEmailTakenError] = useState(false);
    const [noChangeError, setNoChangeError] = useState(false);

    const [originalDetails, setOriginalDetails] = useState({});

    const errors = useRef([]);
    const {user, logoutUser} = useContext(UserContext);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {

        if (!user) {
            navigate("/");
        } else {
            const url = `http://localhost:8081/account-details/${user.id}`;
            const token = localStorage.getItem('accessToken');

            axios.get(url, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then((response) => {

                if (response.status === 200) {
                    const accountDetails = response.data;
                    setIsLoaded(true);
                    setFirstName(accountDetails.firstName);
                    setLastName(accountDetails.lastName);
                    setDisplayName(accountDetails.displayName);
                    setEmail(accountDetails.email);
                    setOriginalDetails(response.data);
                } else {
                    logoutUser();
                }

            })
            .catch(err => {
                logoutUser();
            })
        }

    }, [user])

    const handleAccountDetailsUpdate = () => {
        errors.current = [];

        const blankError = " cannot be set blank.";
        setEmptyConfirmError(false);
        setPasswordMismatchError(false);
        setEmailTakenError(false);
        setFirstNameError(false);
        setLastNameError(false);
        setDisplayNameError(false);
        setEmailError(false);
        setNoChangeError(false);

        if (!firstName) {
            setFirstNameError(true);
            errors.current.push(accountLabels.FIRST_NAME + blankError);
        }

        if (!lastName) {
            setLastNameError(true);
            errors.current.push(accountLabels.LAST_NAME + blankError);
        }

        if (!displayName) {
            setDisplayNameError(true);
            errors.current.push(accountLabels.DISPLAY_NAME + blankError);
        }

        if (!email) {
            setEmailError(true);
            errors.current.push(accountLabels.EMAIL + blankError);
        }

        if ((newPassword && !newPasswordConfirm) || (!newPassword && newPasswordConfirm)) {
            setEmptyConfirmError(true);
            errors.current.push("New password and confirm password cannot both be blank.")
        }

        if (newPassword && newPasswordConfirm) {
            if (newPassword !== newPasswordConfirm) {
                setPasswordMismatchError(true);
                errors.current.push("Passwords do not match.")
            }
        }

        const accountDetailsUpdate = {
            firstName,
            lastName,
            displayName,
            email
        }

        if (JSON.stringify(accountDetailsUpdate) === JSON.stringify(originalDetails)) {
            if (newPassword.length === 0 || !newPasswordConfirm.length === 0) {
                setNoChangeError(true);
                errors.current.push("Nothing to update.");
            }
        }

        // if no errors then can make update
        if (errors.current.length === 0) {

            accountDetailsUpdate.newPassword = newPassword;
            accountDetailsUpdate.newPasswordConfirm = newPasswordConfirm;

            const url = `http://localhost:8081/update-account/${user.id}`;
            const data = {user, accountDetailsUpdate};
            const token = localStorage.getItem('accessToken');

            axios.post(url, data, {
                headers: {
                    'Authorization' : `Bearer ${token}`
                }
            })
            .then((response) => {

                if (response.status === 200) {
                    setIsUpdated(true);
                    delete accountDetailsUpdate.newPassword;
                    delete accountDetailsUpdate.newPasswordConfirm;
                    setOriginalDetails(accountDetailsUpdate);
                } else {
                    logoutUser();
                }

            })
            .catch(err => {

                // user tried to update their email with a taken email
                if (err.response.status === 403) {
                    setEmailTakenError(true);
                    errors.current.push(err.response.data.message);
                }

                // Unauthorized
                if (err.response.status === 401) {
                    console.log("Unauthorized");
                    logoutUser();
                }
            })
        }

    }


    return (
        <Container>
            {user &&
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
                                return <Box key={error}>{error}</Box>;
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

                            <Box sx={{display: {xs: "block", sm: "none"}, marginTop: '10px'}}>

                            </Box>

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
                            error={emailError || emailTakenError}
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
                            error={emptyConfirmError || passwordMismatchError}
                            />
                        </Box>

                        <Box mt={3}>
                            <TextField 
                            onChange={(e) => setNewPasswordConfirm(e.target.value.trim())}
                            label="Confirm new password"
                            sx={{width: {xs: "100%", sm: "95%", md: "91%"}}}
                            type="password"
                            error={emptyConfirmError || passwordMismatchError}
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
            }
        </Container>
    )
}

export default UserAccountDetails