import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


const UserDrawer = () => {

    const [active, setActive] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

        switch (window.location.pathname) {
            case "/my-account":
                setActive("dashboard");
                break;

            case "/my-orders":
                setActive("orders");
                break;

            case "/my-account/edit-address":
                setActive("addresses");
                break;

            case "/my-account/edit-account":
                setActive("account-details");
                break;

            default:
                setActive("dashboard");
        }

    }, []);

    const handleMouseEnter = (id) => {
        const boxes = document.getElementsByClassName("box-dashboard");

        for (const box of boxes) {
            document.getElementById(box.id).setAttribute('style', 'color: gray; border-right: 0px');
        }

        for (const box of boxes) {
            if (box.id === id) {
                document.getElementById(id).setAttribute('style', 'color: black; cursor: pointer; border-right: 3px solid black');
            }
        }
    }

    const handleMouseOut = (id) => {
        const boxes = document.getElementsByClassName("box-dashboard");

        for (const box of boxes) {
            if (box.id === active) {
                document.getElementById(box.id).setAttribute('style', 'color: black; cursor: pointer; border-right: 3px solid black');
            }
            else if (box.id == id) {
                document.getElementById(id).setAttribute('style', 'color: gray; border-right: 0px');
            }
        }
    }

    const handleSetActive = (id) => {
        setActive(id);

        if (id === "dashboard") {
            navigate("/my-account");
        }

        if (id === "orders") {
            navigate("/my-orders");
        }

        if (id === "addresses") {
            navigate("/my-account/edit-address");
        }

        if (id === "account-details") {
            navigate("/my-account/edit-account");
        }

    }

    return (
        <Box mr={3}>
            <Box
            sx={{borderBottom: 1, color: active === "dashboard" ? "black" : "gray", borderRight: active === "dashboard" ? "3px solid black" : "", height: '35px', marginTop: '5px', padding: '5px'}}

            className="box-dashboard"
            id="dashboard"
            onMouseEnter={(e) => handleMouseEnter(e.target.id)}
            onMouseLeave={(e) => handleMouseOut(e.target.id)}
            onClick={(e) => handleSetActive(e.target.id)}
            >
                    Dashboard
            </Box>
            <Box
            sx={{borderBottom: 1, color: active === "orders" ? "black" : "gray", borderRight: active === "orders" ? "3px solid black" : "", height: '35px', padding: '5px'}}
            className="box-dashboard"
            id="orders"
            onMouseEnter={(e) => handleMouseEnter(e.target.id)}
            onMouseLeave={(e) => handleMouseOut(e.target.id)}
            onClick={(e) => handleSetActive(e.target.id)}
            >
                Orders
            </Box>
            <Box
            sx={{borderBottom: 1, color: active === "addresses" ? "black" : "gray", borderRight: active === "addresses" ? "3px solid black" : "", height: '35px', padding: '5px'}}
            className="box-dashboard"
            id="addresses"
            onMouseEnter={(e) => handleMouseEnter(e.target.id)}
            onMouseLeave={(e) => handleMouseOut(e.target.id)}
            onClick={(e) => handleSetActive(e.target.id)}
            >
                    Addresses
            </Box>
            <Box
            sx={{borderBottom: 1, color: active === "account-details" ? "black" : "gray", borderRight: active === "account-details" ? "3px solid black" : "", height: '35px', padding: '5px'}}
            className="box-dashboard"
            id="account-details"
            onMouseEnter={(e) => handleMouseEnter(e.target.id)}
            onMouseLeave={(e) => handleMouseOut(e.target.id)}
            onClick={(e) => handleSetActive(e.target.id)}
            >
                    Account Details
            </Box>
        </Box>
    )
}

export default UserDrawer