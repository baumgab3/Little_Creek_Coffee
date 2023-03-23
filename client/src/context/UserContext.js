import { createContext, useState } from "react";
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const [accountExists, setAccountExists] = useState(false);

    const loginUser = () => {

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

            setAccountExists(false);
        })
        .catch(err => {
            console.log(err.response.status);
            if (err.response.status === 409) {
                setAccountExists(true);
            }

            // TODO - should add more error handling
        })
    }

 
    return (
        <UserContext.Provider value={{ createNewUser, loginUser, accountExists }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;