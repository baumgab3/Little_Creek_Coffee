import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { getShopCategories } from '../../util/ShopUtil';
import { useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const BrowserDrawer = () => {
    const { param1, param2 } = useParams();
    const navigate = useNavigate();
    const categoryToggleIconStyle = {color: 'black', "&:hover": {backgroundColor: 'white', color: '#3c52b2'}};
    const categoreis = getShopCategories();
    const categoryButtonStyle = {color: 'black'};

    // handles Roast 
    const [toggleRoasts, setToggleRoasts] = useState(false);

    const handleToggleRoasts = () => {
        setToggleRoasts(!toggleRoasts);
    };

    const handleOpenRoasts = () => {
        if (!toggleRoasts) {
            setToggleRoasts(true);
        }
    }

    // handles Region 
    const [toggleRegions, setToggleRegions] = useState(false);

    const handleToggleRegions = () => {
        setToggleRegions(!toggleRegions);
    };

    const handleOpenRegions = () => {
        if (!toggleRegions) {
            setToggleRegions(true);
        }
    }

    // handles Bulk
    const [toggleBulk, setToggleBulk] = useState(false);

    const handleToggleBulk = () => {
        setToggleBulk(!toggleBulk);
    };

    const handleOpenBulk = () => {
        if (!toggleBulk) {
            setToggleBulk(true);
        }
    }

    // handles Subscriptions
    const [toggleSubscription, setToggleSubscription] = useState(false);

    const handleToggleSubscriptions = () => {
        setToggleSubscription(!toggleSubscription);
    };

    const handleOpenSubscriptions = () => {
        if (!toggleSubscription) {
            setToggleSubscription(true);
        }
    }

    // handles Merchandise
    const [toggleMerchandise, setToggleMerchandise] = useState(false);

    const handleToggleMerchandise = () => {
        setToggleMerchandise(!toggleMerchandise);
    };

    const handleOpenMerchandise = () => {
        if (!toggleMerchandise) {
            setToggleMerchandise(true);
        }
    }

    const [active, setActive] = useState("");

    const evaluate = (str) => {
     
    }

    useEffect(() => {

        const setOpenDrawer = () => {
            switch (param1) {
                case 'roast': setToggleRoasts(true); break;
                case 'region': setToggleRegions(true); break;
                // case 'subscription': setToggleSubscription(true); break;
                case 'merchandise': setToggleMerchandise(true); break;
                default: // don't want anything to open for default
            }
        }

        switch (window.location.pathname) {
            // ROASTS
            case "/product-category/roast":
            case "/product-category/roast/":
                setActive("roast");
                break;
            case "/product-category/roast/light":
            case "/product-category/roast/light/":
                setActive("light");
                break;
            case "/product-category/roast/medium":
            case "/product-category/roast/medium/":
                setActive("medium");
                break;
            case "/product-category/roast/dark":
            case "/product-category/roast/dark/":
                setActive("dark");
                break;
            case "/product-category/roast/decaf":
            case "/product-category/roast/decaf/":
                setActive("decaf");
                break;

            // REGIONS
            case "/product-category/region/":
            case "/product-category/region":
                setActive("region");
                break;
            case "/product-category/region/africa/":
            case "/product-category/region/africa":
                setActive("africa");
                break;
            case "/product-category/region/central-america/":
            case "/product-category/region/central-america":
                setActive("central america");
                break;
            case "/product-category/region/south-america/":
            case "/product-category/region/south-america":
                setActive("south america");
                break;
            case "/product-category/region/compositions/":
            case "/product-category/region/compositions":
                setActive("compositions");
                break;
        
            // MERCHANDISE
            case "/product-category/merchandise/":
            case "/product-category/merchandise":
                setActive("merchandise");
                break;
            case "/product-category/merchandise/brewing-tools/":
            case "/product-category/merchandise/brewing-tools":
                setActive("brewing tools");
                break;
            case "/product-category/merchandise/clothing/":
            case "/product-category/merchandise/clothing":
                setActive("clothing");
                break;
            case "/product-category/merchandise/drinkware/":
            case "/product-category/merchandise/drinkware":
                setActive("drinkware");
                break;
            case "/product-category/merchandise/other-merch/":
            case "/product-category/merchandise/other-merch":
                setActive("other merch");
                break;

            // COLD BREW
            case "/product-category/cold-brew/":
            case "/product-category/cold-brew":
                setActive("cold brew");
                break;

            // TEA
            case "/product-category/tea/":
            case "/product-category/tea":
                setActive("tea");
                break;
        }
        
        
        setOpenDrawer();

    }, [param1, param2]);


    return (
        <Box align="left" >
            <Box ml={1} mb={1}>
                <Typography mt={4}>
                    BROWSE
                </Typography>
                <Divider sx={{width: '30px', borderBottomWidth: 3}} />
            </Box>

            {/* TODO - using eval for now to get something on the screen */}
            {categoreis.map(current => {
                return <Box key={current.category}>
                        <Button 
                        component={Link}
                        onClick={() => {eval(current.openAllFunction)}}
                        id={current.category}
                        to={current.categoryUrl}
                        sx={categoryButtonStyle} >
                            <Typography sx={{width: '150px', fontWeight: active === current.category ? 'bold' : ''}} >
                                {current.category}
                            </Typography>
                        </Button>
                        {current.subCategories &&
                            <>
                             <Button onClick={eval(current.toggleFunction)} sx={categoryToggleIconStyle} >
                                {eval(current.toggleBoolean) ? <ExpandLess /> : <ExpandMore  />}
                            </Button>
                            <Collapse in={eval(current.toggleBoolean)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding >
                                {current.subCategories.map(category => {
                                return <ListItemButton
                                        className="btn"
                                        value={category.name}
                                        // onClick={() => handleSetActive(category.name)}
                                        id={category.name}
                                        sx={{width: '200px'}}
                                        component={Link} 
                                        to={category.url}
                                        key={category.name} >
                                            <ListItemText
                                            disableTypography
                                            primary={category.name}
                                            sx={{fontWeight: active === category.name.toLocaleLowerCase() ? 'bold' : ''}}
                                            />
                                        </ListItemButton>
                                })}
                                </List>
                            </Collapse>
                            </>
                        }
                    </Box>
            })}
        </Box>
    )
}

export default BrowserDrawer;