import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { CardMedia, useMediaQuery } from '@mui/material';
import CoffeeTable from './CoffeeTable';
import parse from 'html-react-parser';
import CustomerComments from './CustomerComments';
import Iframe from 'react-iframe'

const TabsSection = (props) => {

    const [value, setValue] = React.useState(0);
    const smallScreen = useMediaQuery("(max-width: 500px)");
    const productDetails = props.productDetails;
    const isCoffee = productDetails.Category === "coffee" ? true: false;
    const hasComments = productDetails.customerComments ? true : false;
    
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const a11yProps = (index) => {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const TabPanel = (props) => {
        const { children, value, index, ...other } = props;
    
        return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
            )}
        </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
      };
    

    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs orientation={smallScreen ? "vertical" : "horizontal"}  value={value} onChange={handleChange} aria-label="product tabs">
                <Tab label="Description" {...a11yProps(0)} />
                {isCoffee && <Tab label="Coffee Details" {...a11yProps(1)} /> }
                {hasComments && <Tab label="Customer Comments" {...a11yProps(2)} /> }
                {isCoffee && <Tab label="#BetterBrewing Video" {...a11yProps(3)} /> }

            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {parse(productDetails.Description)}
            </TabPanel>

            {/* Display table about coffee info if product is coffee */}
           {isCoffee && <TabPanel value={value} index={1}>
                <CoffeeTable coffeeDetails={productDetails.coffeeDetails} />
            </TabPanel> }

            {/* Display comments if product has comments */}
            {hasComments && <TabPanel value={value} index={2}>
                <CustomerComments comments={productDetails.customerComments} />
            </TabPanel> }

            {/* Display video for coffee products */}
            {isCoffee && <TabPanel value={value} index={3}>
            <Typography variant="h4">
                <b>#BetterBrewing Video</b>
            </Typography>
            <Iframe url="http://www.youtube.com/embed/xDMP3i36naA"
                width="100%"
                height="550px"
                id=""
                className=""
                display="block"
                position="relative"
            />
            </TabPanel> }
        
        </Box>
        
        
    )
}

export default TabsSection


