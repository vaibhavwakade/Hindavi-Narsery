import React, { createContext, useState } from "react";

// Create the context
export const CartCountContext = createContext();

// Context provider component
export const CartCountContextProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    return (
        <CartCountContext.Provider value={{ cartCount, setCartCount }}>
            {children}
        </CartCountContext.Provider>
    );
};
