import { Box, Button, ButtonGroup, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'

const AddToCart = (props) => {
    const sizeDescription = props.productPricingObj.description;
    const grind = props.grind;
    const category = props.category;
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [isIncrDisabled, setIsIncDisabled] = useState(true);

    useEffect(() => {
      // coffee category disabled logic
      if (category === "coffee") {
        setIsButtonDisabled((grind && sizeDescription) ? false : true);
        setIsIncDisabled(grind ? false : true);
      } else if (category === "cold-brew") {
        setIsButtonDisabled(sizeDescription ? false : true);
        setIsIncDisabled(sizeDescription ? false: true);
      } else {
        setIsButtonDisabled(false);
        setIsIncDisabled(false);
      }


    }, [grind, sizeDescription, category])

    return (
      <Box sx={{display: "flex", flexDirection: {xs: "column", sm: "row"}}} mt={2}>
      <Box mr={2}>
      <ButtonGroup
      disableElevation
      variant="contained"
      aria-label="Disabled elevation buttons"
      sx={{height: '40px'}}
      >
          <Button onClick={() => props.handleQuantity("-")} disabled={isIncrDisabled} >-</Button>
          <TextField value={props.quantity} inputProps={{min: 0, style: { textAlign: 'center', width: "25px", height: '7px' }}}/>
          <Button onClick={() => props.handleQuantity("+")} disabled={isIncrDisabled} >+</Button>
      </ButtonGroup>
      </Box>

      <Button 
      variant="contained"
      sx={{marginTop: {xs: "10px", sm: "0"}, width: {xs: "135px", sx: "auto"}}}
      disabled={isButtonDisabled}
      onClick={props.handleAddToCart}
      >
          add to cart
      </Button>
      </Box>
    )
}

export default AddToCart;