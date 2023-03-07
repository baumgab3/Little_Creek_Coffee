import React, { useState } from 'react'
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import CoffeeTable from './CoffeeTable';



const TabsSection = (props) => {

    const [value, setValue] = React.useState(0);
    const smallScreen = useMediaQuery("(max-width: 500px)");
    const productDetails = props.productDetails;
    const productParagraphs = productDetails.Description.split("<:::>");

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
            <Tabs orientation={smallScreen ? "vertical" : "horizontal"}  value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Coffee Details" {...a11yProps(1)} />
                <Tab label="Customer Comments" {...a11yProps(2)} />
                <Tab label="#BetterBrewing Video" {...a11yProps(3)} />

            </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {productParagraphs.map((paragraph, idx) => {
                    return <Box key={idx} mb={3}>
                                <Typography >
                                    {paragraph}
                                </Typography>
                            </Box>
                })}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <CoffeeTable productDetails={productDetails} />
            </TabPanel>
            <TabPanel value={value} index={2}>
                Item Three
            </TabPanel>
        </Box>
        
    )
}

export default TabsSection