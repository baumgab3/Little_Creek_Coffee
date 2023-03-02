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
    const [toggleRoasts, setToggleRoasts] = useState(true);
    const [isActiveRoast, setIsActiveRoast] = useState(true);
    const [isActivLight, setIsActiveLight] = useState(false);

    useEffect(() => {

    }, [param1, param2]);


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

    return (
        <Box align="left">
            <Box ml={1} mb={1}>
                <Typography mt={4}>
                    BROWSE
                </Typography>
                <Divider sx={{width: '30px', borderBottomWidth: 3}} />
            </Box>

                {/* <Box >
                    <Button 
                    component={Link}
                    to="/product-category/roasts"
                    onClick={handleOpenRoasts}
                    sx={categoryButtonStyle} >
                        <Typography sx={{width: '150px'}}>
                            Roast
                        </Typography>
                    </Button>
                    <Button onClick={handleToggleRoasts} sx={categoryToggleIconStyle} >
                        {toggleRoasts ? <ExpandLess /> : <ExpandMore  />}
                    </Button>
                    <Collapse in={toggleRoasts} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                        <ListItemButton 
                        sx={{width: '200px'}}
                        component={Link}
                        to="/product-category/roasts/light"
                        >
                            <ListItemText primary="Light" />
                        </ListItemButton>
                        </List>
                    </Collapse>
                </Box> */}


            {categoreis.map(current => {
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
                                return <ListItemButton sx={{width: '200px'}} component={Link} to={category.url} key={category.name} >
                                            <ListItemText primary={category.name} />
                                        </ListItemButton>
                                })}
                                </List>
                            </Collapse>
                            </>
                        }
                    </Box>
            })}

            {/* <Box>
                <Button component={Link} onClick={eval(roasts.openAllFunction)} to="/product-category/roast" sx={categoryButtonStyle} >
                    <Typography sx={{width: '150px'}}>
                        {roasts.category}
                    </Typography>
                </Button>

                <Button onClick={eval(roasts.toggleFunction)} sx={categoryToggleIconStyle} >
                    {eval(roasts.toggleBoolean) ? <ExpandLess /> : <ExpandMore  />}
                </Button>
                <Collapse in={eval(toggleRoasts)} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                    {roasts.subCategories.map(category => {
                    return <ListItemButton sx={{width: '200px'}} component={Link} to={category.url} key={category.name} >
                                <ListItemText primary={category.name} />
                            </ListItemButton>
                    })}
                    </List>
                </Collapse>
            </Box> */}
            

        </Box>
    )
}

export default BrowserDrawer;