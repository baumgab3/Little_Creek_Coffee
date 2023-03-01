import { Breadcrumbs } from '@mui/material'
import React from 'react'
import Link from '@mui/material/Link';
import {  useParams } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';


const SmallBreadCrumbs = () => {

    const { param1, param2 } = useParams();
    const breadCrumbText1 = param1.replaceAll("-", " ");
    const breadCrumbText2 = param2 ? param2.replaceAll("-", " ") : param2;

    return (
        <Breadcrumbs ml={1} aria-label="breadcrumb" sx={{textTransform: 'uppercase'}}>
            <Link 
                underline="none"
                color="inherit"
                component={RouterLink}
                to="/"
            >
                home
            </Link>

            <Link
                underline="none"
                color="inherit"
                component={RouterLink}
                to={`/product-category/${param1}`}
                sx={{fontWeight: !param2 ? 'bold': ''}}
            >
                {breadCrumbText1}
            </Link>

            {param2 && <Link
                underline="none"
                color="inherit"
                component={RouterLink}
                to={`/product-category/${param1}/${param2}`}
                sx={{fontWeight: 'bold'}}
            >
                {breadCrumbText2}
            </Link>
            }
        </Breadcrumbs>
    )
}

export default SmallBreadCrumbs