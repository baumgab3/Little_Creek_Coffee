import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Typography, Link } from '@mui/material';
import { useAuth } from './AuthProvider';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import UserContext from './context/UserContext';
import { red } from '@mui/material/colors';

const Login = () => {

    const { setAuth } = useAuth();
    const navigate = useNavigate();

    const {loginUser, isInvalidPassword, isInvalidLogin, isLoggedIn} = useContext(UserContext);


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

        // TODO - do more validation

        loginUser(userName, password);

        setUsernameError(false);
        setPasswordError(false);

        // setAuth(true);
        // navigate("/");
    }

    return (
        <>
        <Box sx={{backgroundColor: 'blue', height: ''}} p={2} mt={3} align="center">
            <Typography variant='h4'>
                My Account
            </Typography>
        </Box>

        {/* errors */}
        <Box align="center" mt={5}>
            { isInvalidLogin && <Typography variant="p" sx={{color: red[500]}}>
                Username or email not found!
            </Typography> }

            { isInvalidPassword && <Typography variant="p" sx={{color: red[500]}}>
                Password is not correct!
            </Typography> }
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

                <Box mt={2}> 
                    <Link to="/create-account" component={RouterLink} underline="hover">Don't have an account? Create one!</Link>
                </Box>
            </FormControl>
        </Box>
        </>
    )
}

export default Login