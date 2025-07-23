import { createContext, useContext, useState } from "react";


export const CartContext = createContext();


export function useCart() {
  return useContext(CartContext);
}


export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  
  function addToCart(product) {
    setCartItems((prev) => {
      const exists = prev.find((item) => item._id === product._id);
      if (exists) return prev;
      return [...prev, product];
    });
  }

 
  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item._id !== productId));
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
