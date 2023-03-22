import { createContext, useState } from "react";

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const loginUser = () => {

    }

    const logoutUser = () => {

    }

    const createNewUser = (givenLogin, password) => {
        let isEmail = false;

        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(givenLogin)) {
            isEmail = true;
        }

        console.log(givenLogin, password, isEmail);
    }

 
    return (
        <UserContext.Provider value={{ createNewUser, loginUser }}>
            {children}
        </UserContext.Provider>
    );
}

export default UserContext;