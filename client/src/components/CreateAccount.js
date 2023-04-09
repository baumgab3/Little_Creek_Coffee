import React, { useContext, useState } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import { Button, Typography } from '@mui/material';
import UserContext from './context/UserContext';
import { red } from '@mui/material/colors';

const CreateAccount = () => {

    const textFieldStyle = {width: {xs: "100%", sm: "100%", md: "190%"} , marginBottom: "25px"};
    const [userName, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [hasUsernameError, setUsernameError] = useState(false);
    const [hasPasswordError, setPasswordError] = useState(false);

    const {createNewUser, isAccountTaken} = useContext(UserContext);

    
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
            
            if (!(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(userName))) {
                setUsernameError(true);
                return;
            } 
        }

        // everything is valid
        setUsernameError(false);
        setPasswordError(false);

        createNewUser(userName, password);
    }


    return (
        <>
        <Box sx={{backgroundColor: 'blue', height: ''}} p={2} mt={3} align="center">
            <Typography variant='h4'>
                Create Account
            </Typography>
        </Box>

        {/* errors */}
        <Box align="center" mt={5}>
            { isAccountTaken && <Typography variant="p" sx={{color: red[500]}}>
                Sorry, that account already exists!
            </Typography> }
        </Box>

        <Box mt={5} align="center">
            <FormControl>
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