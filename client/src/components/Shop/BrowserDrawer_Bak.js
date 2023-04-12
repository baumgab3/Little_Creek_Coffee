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

const BrowserDrawer = () => {
    const { param1, param2 } = useParams();

    const categoryToggleIconStyle = {color: 'black', "&:hover": {backgroundColor: 'white', color: '#3c52b2'}};
    const categoreis = getShopCategories();
    const categoryButtonStyle = {color: 'black', "&:hover": {backgroundColor: 'white', color: '#3c52b2'}};

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

    const handleSectionToggle = (section) => {
        console.log("set active", section);

        if (section === 'roast') {
            handleToggleRoasts();
        }
    }

    // TODO - probably a more react way to do this, but for now straight js is the easiest
    // const setActive = (name) => {
    //     document.getElementById(name).style.textDecoration = "underline";
    //     const btns = document.getElementsByClassName("btn");

    //     for (let i = 0; i < btns.length; i++) {
    //         const currentId = btns[i].getAttribute("id");

    //         if (currentId !== name) {
    //             document.getElementById(currentId).style.textDecoration="";
    //         } 
    //     }
    // }

    const [active, setActive] = useState("");

    useEffect(() => {

        const setOpenDrawer = () => {
            switch (param1) {
                case 'roast': setToggleRoasts(true); break;
                case 'region': setToggleRegions(true); break;
                case 'buy-in-bulk': setToggleBulk(true); break;
                case 'subscription': setToggleSubscription(true); break;
                case 'merchandise': setToggleMerchandise(true); break;
                default: // don't want anything to open for default
            }
        }

        setOpenDrawer();

    }, [param1, param2]);


    return (
        <Box align="left">
            <Box ml={1} mb={1}>
                <Typography mt={4}>
                    BROWSE
                </Typography>
                <Divider sx={{width: '30px', borderBottomWidth: 3}} />
            </Box>

            {/* ROAST SECTION */}
            <Box>
                <Button
                // onClick={handleToggleRoasts}
                component={Link}
                onClick={handleOpenRoasts}
                to="/product-category/roast/"
                sx={categoryButtonStyle} >
                    <Typography sx={{width: '150px'}}>
                         Roast
                    </Typography>
                </Button>
                <Button 
                onClick={handleToggleRoasts}
                sx={categoryToggleIconStyle} >
                {toggleRoasts ? <ExpandLess /> : <ExpandMore  />}
                </Button>

                <Collapse in={toggleRoasts} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItemButton
                        className="btn"
                        value="Light"
                        id="Light"
                        sx={{width: '200px'}}
                        component={Link} 
                        to="/product-category/roast/light/"
                        >
                        <ListItemText primary="Light" />
                        </ListItemButton>

                        <ListItemButton
                        className="btn"
                        value="Medium"
                        id="Medium"
                        sx={{width: '200px'}}
                        component={Link} 
                        to="/product-category/roast/medium/"
                        >
                        <ListItemText primary="Medium" />
                        </ListItemButton>
                    </List>
                </Collapse>


            </Box>

            {/* TODO - using eval for now to get something on the screen */}
            {/* {categoreis.map(current => {
                return <Box key={current.category}>
                        <Button 
                        component={Link}
                        onClick={eval(current.openAllFunction)}
                        to={current.categoryUrl}
                        sx={categoryButtonStyle} >
                            <Typography sx={{width: '150px'}}>
                                {current.category}
                            </Typography>
                        </Button>
                        {current.subCategories &&
                            <>
                             <Button onClick={eval(current.toggleFunction)} sx={categoryToggleIconStyle} >
                                {eval(current.toggleBoolean) ? <ExpandLess /> : <ExpandMore  />}
                            </Button>
                            <Collapse in={eval(current.toggleBoolean)} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                {current.subCategories.map(category => {
                                return <ListItemButton
                                        className="btn"
                                        value={category.name}
                                        onClick={() => setActive(category.name)}
                                        id={category.name}
                                        sx={{width: '200px'}}
                                        component={Link} 
                                        to={category.url}
                                        key={category.name} >
                                            <ListItemText primary={category.name} />
                                        </ListItemButton>
                                })}
                                </List>
                            </Collapse>
                            </>
                        }
                    </Box>
            })} */}
        </Box>
    )
}

export default BrowserDrawer;