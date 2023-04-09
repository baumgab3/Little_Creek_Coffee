import { createContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const navigate = useNavigate();

    const [isAccountTaken, setIsAccountTaken] = useState(false);
    const [isInvalidPassword, setIsInvalidPassword] = useState(false);
    const [isInvalidLogin, setIsInvalidLogin] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [user, setUser] = useState(null);

 
    const loginUser = (givenLogin, password) => {
        let isEmail = false;

        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(givenLogin)) {
            isEmail = true;
        }

        const url = 'http://localhost:8081/my-account';
        const userInfo = {givenLogin, password, isEmail};

        axios.post(url, userInfo)
        .then((response) => {

            if (response.status === 200) {
                setIsInvalidPassword(false);
                setIsInvalidLogin(false);
                setIsLoggedIn(true);
                setLoggedInUser(givenLogin);
                setUser(response.data.user);
                localStorage.setItem("accessToken", response.data.user.accessToken);
                navigate("/");
            }
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
        const url = 'http://localhost:8081/logout';
        
        axios.post(url)
        .then((response) => {

            if (response.status === 200) {
                setIsLoggedIn(false);
                setIsAccountTaken(false);
                setIsInvalidLogin(false);
                setLoggedInUser(null);
                setUser(null);
                localStorage.removeItem("accessToken");
                navigate("/");
            }
        })
        .catch(err => {
            // TODO - should add more error handling
        })

    }

    const createNewUser = (givenLogin, password) => {
        let isEmail = false;
        // ^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(givenLogin)) {
            isEmail = true;
        }

        const url = 'http://localhost:8081/create-account';
        const userInfo = {givenLogin, password, isEmail};
        
        axios.post(url, userInfo)
        .then((response) => {

            if (response.status === 200) {
                setIsAccountTaken(false);
                setIsLoggedIn(true);
                setLoggedInUser(givenLogin);
                setUser(response.data.user);
                localStorage.setItem("accessToken", response.data.user.accessToken);
                navigate("/");
            }

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
        <UserContext.Provider value={{ 
            createNewUser,
            loginUser,
            isAccountTaken,
            isInvalidPassword,
            isInvalidLogin,
            isLoggedIn,
            loggedInUser,
            logoutUser,
            user,
        }}>

            {children}
        </UserContext.Provider>
    );
}

export default UserContext;