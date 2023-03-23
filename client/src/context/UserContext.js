import { createContext, useState } from "react";
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [isAccountTaken, setIsAccountTaken] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isInvalidLogin, setIsInvalidLogin] = useState(false);

    const loginUser = (givenLogin, password) => {
        let isEmail = false;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(givenLogin)) {
            isEmail = true;
        }

        const url = 'http://localhost:8081/my-account';
        const userInfo = {givenLogin, password, isEmail};

        
        axios.post(url, userInfo)
        .then((response) => {
            console.log(response);

            setIsInvalidPassword(false);
            setIsInvalidLogin(false);
        })
        .catch(err => {
            console.log(err.response.status);
            // givenLogin not found
            if (err.response.status === 404) {
                setIsInvalidLogin(true);
                setIsInvalidPassword(false);
            }
            // incorrect passowrd
            if (err.response.status === 401) {
                setIsInvalidPassword(true);
                setIsInvalidLogin(false);
            }

            // TODO - should add more error handling
        })

    }

    const logoutUser = () => {

    }

    const createNewUser = (givenLogin, password) => {
        let isEmail = false;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(givenLogin)) {
            isEmail = true;
        }

        const url = 'http://localhost:8081/create-account';
        const userInfo = {givenLogin, password, isEmail};
        
        axios.post(url, userInfo)
        .then((response) => {
            console.log(response.status);

            setIsAccountTaken(false);
        })
        .catch(err => {
            console.log(err.response.status);
            if (err.response.status === 409) {
                setIsAccountTaken(true);
            }

            // TODO - should add more error handling
        })
    }

 
    return (
        <UserContext.Provider value={{ createNewUser, loginUser, isAccountTaken, isInvalidPassword, isInvalidLogin }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;