import { createContext, useContext, useState } from "react";
import { sha256 } from 'js-sha256';
import axios from 'axios';
import UserContext from "./UserContext";


const CartContext = createContext();

export const CartProvider = ({children}) => {

    class CartItem {
        constructor(id, category, name, description, grind, price, quantity) {
            this.id = id;
            this.category = category;
            this.name = name;
            this.description = description;
            this.grind = grind;
            this.price = price;
            this.quantity = quantity;
        }
    }

    const [cart, setCart] = useState([]);
    const [cartSize, setCartSize] = useState(0);
    const {user} = useContext(UserContext);

    const addToCart = (toAdd) => {
        const product = new CartItem(
            toAdd.id,
            toAdd.category = toAdd.category,
            toAdd.name,
            toAdd.description,
            toAdd.grind,
            toAdd.price,
            toAdd.quantity
        );

        // if we have seen item before then don't readd, just increament quantity
        for (let i = 0; i < cart.length; i++) {
            if (getUniqueID(cart[i]) === getUniqueID(product)) {

                // for now don't let more than 10 of the same product be added to cart
                if (cart[i].quantity + product.quantity > 10) {
                    alert("Cannot have more than 10 of same product in cart!");
                    return;
                }

                cart[i].quantity += product.quantity;
                setCartSize(cartSize + toAdd.quantity);

                // updateItemQuantity(product.id, product.quantity);
                return;
            }
        }

        setCartSize(cartSize + toAdd.quantity);
        setCart(cart => [product, ...cart]);
    }

    const removeFromCart = (toRemove) => {
        // verify first, just use confirm box for now
        const confirmText = "Are you sure you want to remove this item?";
        if (!window.confirm(confirmText)) {
            return;
        }

        //remove from cart array
        setCart(cart.filter(current => getUniqueID(current) !== getUniqueID(toRemove)));

        //update cart amount
        for (let i = 0; i < cart.length; i++) {
            if (getUniqueID(cart[i]) === getUniqueID(toRemove)) {
                setCartSize(cartSize - cart[i].quantity);
                break;
            }
        }
    }

    const updateItemQuantity = (item, newQuantity) => {
        for (let i = 0; i < cart.length; i++) {
            if (getUniqueID(cart[i])=== getUniqueID(item)) {
                setCartSize(cartSize + newQuantity - cart[i].quantity);
                cart[i].quantity = newQuantity;
                break;
            }
        }
    }

    const getCartTotal = () => {
        let total = 0;
        for (let i = 0; i < cart.length; i++) {
            total += cart[i].price * cart[i].quantity;
        }
        return total.toFixed(2);
    }

    const getUniqueID = (cartItem) => {
        // unique id for coffee items
        if (cartItem.category === 'coffee') {
            return sha256(cartItem.id + cartItem.grind + cartItem.description);
        }

        // unique id for tea
        if (cartItem.category === 'cold-brew') {
            return sha256(cartItem.id + cartItem.description);
        }

        // for now tea does not need a unique
        if (cartItem.category === 'tea') {
            return cartItem.id;
        }
        
    }

    const placeOrder = () => {
        console.log("placing order for", cart);
        const url = 'http://localhost:8081/orders';
        const order = {user, cart};
        
        axios.post(url, order)
        .then((response) => {
            setCart([]);
            setCartSize(0);
        })
        .catch(err => {
            // TODO - should add more error handling
        })
    }

    return (
        <CartContext.Provider value={{cart, cartSize, addToCart, removeFromCart, updateItemQuantity, getCartTotal, getUniqueID, placeOrder}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;