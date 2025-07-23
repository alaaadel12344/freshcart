import { createContext, useContext, useState } from "react";

const StoreContext = createContext();

export function StoreProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  function toggleWishlist(id) {
    setWishlistItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function addToCart(product) {
    setCartItems((prev) => [...prev, product]);
  }

  return (
    <StoreContext.Provider value={{ wishlistItems, toggleWishlist, cartItems, addToCart }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  return useContext(StoreContext);
}
