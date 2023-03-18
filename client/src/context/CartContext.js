import { createContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {

    class CartItem {
        constructor(id, name, description, grind, price, quantity) {
            this.id = id;
            this.name = name;
            this.description = description;
            this.grind = grind;
            this.price = price;
            this.quantity = quantity;
        }
    }

    const [cart, setCart] = useState([]);
    const [cartSize, setCartSize] = useState(0);

    const addToCart = (toAdd) => {
        setCartSize(cartSize + toAdd.quantity);
        const product = new CartItem(
            toAdd.id,
            toAdd.name,
            toAdd.description,
            toAdd.grind,
            toAdd.price,
            toAdd.quantity
            );

        setCart(cart => [product, ...cart]);
    }

    const removeFromCart = (toRemove) => {
        // verify first, just use confirm box for now
        const confirmText = "Are you sure you want to remove this item?";
        if (!window.confirm(confirmText)) {
            return;
        }

        //remove from cart array
        setCart(cart.filter(current => current.id !== toRemove.id));

        //update cart amount
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === toRemove.id) {
                setCartSize(cartSize - cart[i].quantity);
                break;
            }
        }
    }

    const updateItemQuantity = (id, newQuantity) => {
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].id === id) {
                setCartSize(cartSize + newQuantity - cart[i].quantity);
                cart[i].quantity = newQuantity;
                break;
            }
        }
    }

    return (
        <CartContext.Provider value={{cart, cartSize, addToCart, removeFromCart, updateItemQuantity}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;