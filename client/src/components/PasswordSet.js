import React, { useContext, useEffect, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Typography, Link } from '@mui/material';
import { Link as RouterLink } from "react-router-dom";
import UserContext from './context/UserContext';
import { red } from '@mui/material/colors';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const PasswordSet = () => {

    const {user, setUser} = useContext(UserContext);
    const navigate = useNavigate();


    useEffect(() => {
        // if a logged in user somehow got here just return them to home page
        console.log("loaded");
        if (user) {
            navigate("/");
        }
        
    }, [user])

    const textFieldStyle = { marginBottom: "25px"};

    const [login, setLogin] = useState("");
    const [code, setCode] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");


    const [emptyLoginError, setEmptyLoginError] = useState(false);
    const [emptyCodeError, setEmptyCodeError] = useState(false);
    const [emptyPasswordError, setEmptyPasswordError] = useState(false);
    const [emptyPasswordConfirmError, setEmptyPasswordConfirmError] = useState(false);
    const [loginNotFoundError, setLoginNotFoundError] = useState(false);

    const errors = useRef([]);
    
    const handleLogin = (e) => {
        // reset errors
        errors.current = [];
        setEmptyLoginError(false);
        setEmptyCodeError(false);
        setEmptyPasswordError(false);
        setEmptyPasswordConfirmError(false);
        setLoginNotFoundError(false);

        if (!login) {
            setEmptyLoginError(true);
            errors.current.push("Username or email cannot be blank.");
        }

        if (!code) {
            setEmptyCodeError(true);
            errors.current.push("A code is required to set password.")
        }

        if (!password) {
            setEmptyPasswordError(true);
            errors.current.push("Password cannot be blank.");
        }

        if (!passwordConfirm) {
            setEmptyPasswordConfirmError(true);
            errors.current.push("Confirm password cannot be blank.");
        }

        // if errors here the prevent a post to check login
        if (errors.current.length !== 0) {
            return;
        }

        let isEmail = false;
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(login)) {
            isEmail = true;
        } 

        const url = 'http://localhost:8081/my-account/set-password';
        const userInfo = {login, password};

        // axios.post(url, userInfo)
        // .then((response) => {


        // })
        // .catch(err => {
        //     // givenLogin not found
        //     if (err.response.status === 404) {
        //         setLoginNotFoundError(true);
        //         errors.current.push("No record found for given login.");
        //     }

        // })

    }


    return (
        <Box sx={{minHeight: '470px'}}>
        <Box sx={{backgroundColor: 'blue', height: ''}} p={2} mt={3} mb={5} align="center">
            <Typography variant='h4'>
                Set Password
            </Typography>
        </Box>

        <Box align="center">

            <FormControl sx={{width: "20%"}} >
                {/* Error Box */}
                <Box mt={1} mb={1} color={red[500]} align="left">
                    {errors.current.map((error) => {
                        return <Box key={error}>{error}</Box>;
                    })}
                </Box>

                <Typography variant='h5' align='left' mb={3}>
                    Set Password
                </Typography>

                <TextField
                error={emptyLoginError || loginNotFoundError}
                onChange={(e) => setLogin(e.target.value.trim())}
                sx={textFieldStyle}
                label="Email"
                required
                />

                <TextField
                error={emptyCodeError}
                onChange={(e) => setCode(e.target.value.trim())}
                sx={textFieldStyle}
                label="Code"
                required
                />

                <TextField
                error={emptyPasswordError}
                onChange={(e) => setPassword(e.target.value.trim())}
                sx={textFieldStyle}
                label="Password"
                type="password"
                required
                />

                <TextField
                error={emptyPasswordConfirmError}
                onChange={(e) => setPasswordConfirm(e.target.value.trim())}
                sx={textFieldStyle}
                label="Confirm Password"
                type="password"
                required
                />

                <Button onClick={(e) => handleLogin(e)} sx={{width: "100px"}} variant="contained">Update</Button>

            </FormControl>
        </Box>
        </Box>
    )
}

export default PasswordSet