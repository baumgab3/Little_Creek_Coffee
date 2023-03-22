import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, Typography, Link } from '@mui/material';
import { useAuth } from './AuthProvider';
import { Link as RouterLink, useNavigate } from "react-router-dom";
import UserContext from '../context/UserContext';

const CreateAccount = () => {

    // const { setAuth } = useAuth();
    const navigate = useNavigate();

    const textFieldStyle = {width: {xs: "100%", sm: "100%", md: "150%"} , marginBottom: "25px"};
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasUsernameError, setUsernameError] = useState(false);
    const [hasPasswordError, setPasswordError] = useState(false);

    const {createNewUser} = useContext(UserContext);

    
    const handleCreateAccount = (e) => {
        e.preventDefault();
        // TODO - more validation needs to be added/better error messages later, keeping it simple for now

        // make sure a username and password is given
        if (!userName || !password) {
            !userName ? setUsernameError(true) : setUsernameError(false);
            !password ? setPasswordError(true) : setPasswordError(false);
            return;
        }


        // if user is creating with email, make sure it is valid email
        if (userName.includes("@")) {
            if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userName))) {
                setUsernameError(true);
                return;
            } 
        }


        // everything is valid
        setUsernameError(false);
        setPasswordError(false);

        createNewUser(userName, password);

        // setAuth(true);
        // navigate("/");
    }


    return (
        <>
        <Box sx={{backgroundColor: 'blue', height: ''}} p={2} mt={3} align="center">
            <Typography variant='h4'>
                Create Account
            </Typography>
        </Box>

        <Box mt={5} align="center">
            <FormControl >
                <Typography variant='h5' align='left' mb={1}>
                    Create Account
                </Typography>
                <TextField error={hasUsernameError ? true : false} onChange={(e) => setUsername(e.target.value.trim())} value={userName} sx={textFieldStyle} label="Username or email" required />
                <TextField error={hasPasswordError ? true : false} onChange={(e) => setPassword(e.target.value.trim())} value={password} sx={textFieldStyle} label="Password" type="password" required />

                <Button onClick={(e) => handleCreateAccount(e)} sx={{width: "100px"}} variant="contained">CREATE</Button>
            </FormControl>
        </Box>
        </>
    )
}

export default CreateAccount