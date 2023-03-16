import { createContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({children}) => {

    class CartItem {
        constructor(_id, name, price, quantity) {
            this._id = _id;
            this.name = name;
            this.price = price;
            this.quantity = quantity;
        }
    }

    const [cart, setCart] = useState([]);
    const [cartSize, setCartSize] = useState(0);

    const addToCart = (toAdd) => {
        setCartSize(cartSize + 1);
        const product = new CartItem(toAdd._id, toAdd.name, toAdd.price, toAdd.quantity);

        setCart(cart => [product, ...cart]);
    }

    return (
        <CartContext.Provider value={{cart, cartSize, addToCart}}>
            {children}
        </CartContext.Provider>
    );
}

export default CartContext;