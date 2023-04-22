import { createContext, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({children}) => {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [navbarName, setNavbarName] = useState(null);
 
    const logoutUser = () => {
        const url = 'http://localhost:8081/logout';
        
        axios.post(url)
        .then((response) => {

            if (response.status === 200) {
                setUser(null);
                setNavbarName(null);
                localStorage.removeItem("accessToken");
                navigate("/");
            }
        })
        .catch(err => {
            setUser(null);
            localStorage.removeItem("accessToken");
            navigate("/");
        })

    }
 
    return (
        <UserContext.Provider value={{ 
            logoutUser,
            setUser,
            setNavbarName,
            navbarName,
            user,
        }}>

            {children}
        </UserContext.Provider>
    );
}

export default UserContext;