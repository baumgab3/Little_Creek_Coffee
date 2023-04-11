import React, { useContext, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Link as RouterLink } from "react-router-dom";
import { Button, Link, Typography } from '@mui/material';
import UserContext from './context/UserContext';
import { red } from '@mui/material/colors';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const CreateAccount = () => {

    const textFieldStyle = {width: {xs: "100%", sm: "100%", md: "150%"} , marginBottom: "25px"};
    const navigate = useNavigate();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const [emptyLoginError, setEmptyLoginError] = useState(false);
    const [emptyPasswordError, setEmptyPasswordError] = useState(false);
    const [invalidEmailError, setInvalidEmailError] = useState(false);
    const [accountTakenError, setAccountTakenError] = useState(false);

    const {setUser} = useContext(UserContext);
    const errors = useRef([]);

    const handleCreateAccount = (e) => {
        // reset errors
        errors.current = [];
        setEmptyLoginError(false);
        setEmptyPasswordError(false);
        setInvalidEmailError(false);
        setAccountTakenError(false);

        if (!login) {
            setEmptyLoginError(true);
            errors.current.push("Username or email cannot be blank.");
        } 

        if (!password) {
            setEmptyPasswordError(true);
            errors.current.push("Password cannot be blank.");
        }

        // if user is creating with email, make sure it is valid email
        let isEmail = false;
        if (login.includes("@")) {
            
            if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(login))) {
                setInvalidEmailError(true);
                errors.current.push("Email is not valid.");
            } else {
                isEmail = true;
            }
        }

        // if errors here then prevent post request
        if (errors.current.length !== 0) {
            return;
        }

        // everything was valid, make post request
        const url = 'http://localhost:8081/create-account';
        const userInfo = {login, password, isEmail};
        
        axios.post(url, userInfo)
        .then((response) => {

            if (response.status === 200) {
                setUser(response.data.user);
                localStorage.setItem("accessToken", response.data.user.accessToken);
                navigate("/");
            }

        })
        .catch(err => {
            // account is already taken
            if (err.response.status === 409) {
                setAccountTakenError(true);
                errors.current.push("Sorry, that account is already taken.");
            }
        })

    }


    return (
        <Box sx={{minHeight: '600px'}}>
        <Box sx={{backgroundColor: 'blue', height: ''}} p={2} mt={3} align="center">
            <Typography variant='h4'>
                Create Account
            </Typography>
        </Box>

        <Box mt={5} align="center">
            
            <FormControl>
                {/* Error Box */}
                <Box mt={1} mb={1} color={red[500]} align="left">
                    {errors.current.map((error) => {
                        return <Box key={error}>{error}</Box>;
                    })}
                </Box>

                <Typography variant='h5' align='left' mb={1}>
                    Create Account
                </Typography>

                <TextField
                error={emptyLoginError || invalidEmailError || accountTakenError }
                onChange={(e) => setLogin(e.target.value.trim())}
                sx={textFieldStyle}
                label="Username or email"
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

                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />

                <Button onClick={(e) => handleCreateAccount(e)} sx={{width: "100px"}} variant="contained">CREATE</Button>
                
                <Box mt={2}> 
                    <Link to="/login" component={RouterLink} underline="hover">Already have an account? Login!</Link> &nbsp; &nbsp; &nbsp;
                </Box>
            </FormControl>
        </Box>
        </Box>
    )
}

export default CreateAccount