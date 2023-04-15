import { Box, Divider, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import CartContext from './context/CartContext';
import ProductSelect from './ProductSelect';
import AddToCart from './AddToCart';

const ProductHighlight = (props) => {

    const product = props.product;
    const {addToCart} = useContext(CartContext);
    const [hasDropDowns, setHasDropDowns] = useState(true);
    const [productPricingObj, setProductPricingObj] = useState('');
    const [grind, setGrind] = useState("");
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {

        // products with no description for priceOptions won't have a drop down size bar
        for (const option of product.priceOptions) {
            // TODO - working but could clean up
            if (!option.description && option.price && !option.grind) {
                setHasDropDowns(false);
                setProductPricingObj(option);
            }
        }
    
    },[]);


    const handleProductPricingObjUpdate = (toUpdate) => {
        setProductPricingObj(toUpdate);
    }

    const handleGrindUpdate = (grind) => {
        setGrind(grind);
    }

    const handleQuantity = (operator) => {
        if (operator === "+") {
            if (quantity + 1 > 10) {
                alert("Cannot add more than 10!");
                return;
            }
            setQuantity(quantity + 1);
        } else {
            setQuantity(quantity - 1 <= 0 ? 1 : quantity - 1);
        }
    }

    const handleAddToCart = () => {
        const toAdd = {
            "id": product.Id,
            "category": product.Category,
            "name": product.Name,
            "description": productPricingObj.description,
            "grind": grind,
            "price": productPricingObj.price,
            "quantity": quantity,
        }

        addToCart(toAdd);
    }


    return (
        <Box>
            <Typography variant="h5" sx={{textTransform: "uppercase", fontWeight: "bold"}} mb={1}>
                {product.Name}
            </Typography>

            {props.showDivider && 
            <Box mt={1} mb={1}>
                <Divider sx={{ borderBottomWidth: 4, width: '10%' }} />
            </Box>
            }
            
            <Typography variant="h5" sx={{textTransform: "uppercase", fontWeight: "bold"}} mb={1}>
                {product.priceRange}
            </Typography>
            <Typography >
                {product.ShortDescription}
            </Typography>
            
            {/* display dropdowns for needed products */}
            {hasDropDowns && 
            <ProductSelect
                handleProductPricingObjUpdate={handleProductPricingObjUpdate}
                productPricingObj={productPricingObj}
                handleGrindUpdate={handleGrindUpdate}
                priceOptions={product.priceOptions}
                category={product.Category}
                grind={grind}
            />
            }

            {/* display product price */}
            <Box mt={2}>
                {productPricingObj.description && <Typography variant="h6">
                    ${productPricingObj.price.toFixed(2)}
                </Typography>}
            </Box>
        
            {/* -/+ buttons for quantity and add to cart button */}
            <AddToCart
                category={product.Category}
                productPricingObj={productPricingObj}
                quantity={quantity}
                grind={grind}
                handleQuantity={handleQuantity}
                handleAddToCart={handleAddToCart}
            />

        </Box>
        
    )
}

export default ProductHighlight