import { Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Link as RouterLink } from "react-router-dom";

const CheckoutBreadCrumbs = () => {

    const [isCart, setIsCart] = useState(false);
    const [isDetails, setIsDetails] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const path = window.location.pathname;

        if (path === "/cart") {
            setIsCart(true);
        } else if (path === '/checkout') {
            setIsDetails(true);
        } else {
            setIsComplete(true);
        }

        
    }, [])

    const breadcrumbs = [
        <Link
            component={RouterLink}
            underline="hover"
            key="1"
            color="inherit"
            to="/cart"
            sx={{fontWeight: isCart ? "bold" : ""}}
            >
          SHOPPING CART
        </Link>,
        <Link
            component={RouterLink}
            underline="hover"
            key="2"
            color="inherit"
            to="/checkout"
            sx={{fontWeight: isDetails ? "bold" : ""}}
        >
          CHECKOUT DETAILS
        </Link>,
        <Typography
            key="3"
            color="inherit"
            sx={{fontWeight: isComplete ? "bold" : ""}}
        >
          ORDER COMPLETE
        </Typography>,
      ];



    return (
        <Stack spacing={2} sx={{display: {xs: 'none', sm: 'flex'}, justifyContent: 'center', alignItems: 'center'}}>
            <Breadcrumbs
                separator={<NavigateNextIcon  fontSize="large" />}
                aria-label="breadcrumb"
            >
                {breadcrumbs}
            </Breadcrumbs>
        </Stack>
    )
}

export default CheckoutBreadCrumbs