import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Grid, Modal, Typography } from '@mui/material';
import { useAuth } from './AuthProvider';
import { useNavigate } from "react-router-dom";

const Login = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const textFieldStyle = {width: {xs: "100%", sm: "100%", md: "150%"} , marginBottom: "25px"};
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasUsernameError, setUsernameError] = useState(false);
    const [hasPasswordError, setPasswordError] = useState(false);
    
    const handleLogin = (e) => {
        e.preventDefault();

        if (!userName || !password) {
            !userName ? setUsernameError(true) : setUsernameError(false);
            !password ? setPasswordError(true) : setPasswordError(false);
            return;
        }

        setAuth(true);
        navigate("/");
    }

    return (
        <>
        <Box sx={{backgroundColor: 'blue', height: ''}} p={2} mt={3} align="center">
            <Typography variant='h4'>
                My Account
            </Typography>
        </Box>

        <Box mt={5} align="center">
            <FormControl >
                <Typography variant='h5' align='left' mb={1}>
                    Login
                </Typography>
                <TextField error={hasUsernameError ? true : false} onChange={(e) => setUsername(e.target.value.trim())} value={userName} sx={textFieldStyle} label="Username or email" required />
                <TextField error={hasPasswordError ? true : false} onChange={(e) => setPassword(e.target.value.trim())} value={password} sx={textFieldStyle} label="Password" type="password" required />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me" />

                <Button onClick={(e) => handleLogin(e)} sx={{width: "100px"}} variant="contained">LOG IN</Button>
            </FormControl>
        </Box>
        </>
    )
}

export default Login