import React, { useContext, useRef, useState } from 'react';
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


const Login = () => {

    const {setUser, setNavbarName} = useContext(UserContext);
    const navigate = useNavigate();

    const textFieldStyle = {width: {xs: "100%", sm: "100%", md: "150%"} , marginBottom: "25px"};

    const [password, setPassword] = useState("");
    const [login, setLogin] = useState("");

    const [emptyLoginError, setEmptyLoginError] = useState(false);
    const [emptyPasswordError, setEmptyPasswordError] = useState(false);
    const [loginNotFoundError, setLoginNotFoundError] = useState(false);
    const [incorrectPasswordError, setIncorrectPasswordError] = useState(false);

    const errors = useRef([]);
    
    const handleLogin = (e) => {
        // reset errors
        errors.current = [];
        setEmptyLoginError(false);
        setEmptyPasswordError(false);
        setLoginNotFoundError(false);
        setIncorrectPasswordError(false);

        if (!login) {
            setEmptyLoginError(true);
            errors.current.push("Username or email cannot be blank.");
        }

        if (!password) {
            setEmptyPasswordError(true);
            errors.current.push("Password cannot be blank.");
        }

        // if errors here the prevent a post to check login
        if (errors.current.length !== 0) {
            return;
        }

        let isEmail = false;
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(login)) {
            isEmail = true;
        } 

        const url = 'http://localhost:8081/my-account';
        const userInfo = {login, password, isEmail};

        axios.post(url, userInfo)
        .then((response) => {

            if (response.status === 200) {
                setUser(response.data.user);
                localStorage.setItem("accessToken", response.data.user.accessToken);

                // set diplay name if user has one (name in navbar)
                setNavbarName(response.data.user.displayName ? response.data.user.displayName : null);
                navigate("/");
            }
        })
        .catch(err => {
            // givenLogin not found
            if (err.response.status === 404) {
                setLoginNotFoundError(true);
                errors.current.push("No record found for given login.");
            }

            // incorrect passowrd
            if (err.response.status === 401) {
                setIncorrectPasswordError(true);
                errors.current.push("Incorrect password.");
            }
        })

    }


    return (
        <Box sx={{minHeight: '500px'}}>
        <Box sx={{backgroundColor: 'blue', height: ''}} p={2} mt={3} align="center">
            <Typography variant='h4'>
                My Account
            </Typography>
        </Box>

        <Box mt={5} align="center">

            <FormControl >
                {/* Error Box */}
                <Box mt={1} mb={1} color={red[500]} align="left">
                    {errors.current.map((error) => {
                        return <Box key={error}>{error}</Box>;
                    })}
                </Box>

                <Typography variant='h5' align='left' mb={1}>
                    Login
                </Typography>

                <TextField
                error={emptyLoginError || loginNotFoundError}
                onChange={(e) => setLogin(e.target.value.trim())}
                sx={textFieldStyle}
                label="Username or email"
                required
                />

                <TextField
                error={emptyPasswordError || incorrectPasswordError}
                onChange={(e) => setPassword(e.target.value.trim())}
                sx={textFieldStyle}
                label="Password"
                type="password"
                required
                />

                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />

                <Button onClick={(e) => handleLogin(e)} sx={{width: "100px"}} variant="contained">LOG IN</Button>

                <Box mt={2}> 
                    <Link to="/create-account" component={RouterLink} underline="hover">Don't have an account? Create one!</Link>
                </Box>
            </FormControl>
        </Box>
        </Box>
    )
}

export default Login