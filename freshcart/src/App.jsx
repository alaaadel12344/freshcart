import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Brands from "./pages/Brands";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ForgetPassword from "./pages/ForgetPassword"; // ✅ جديد

import { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
        setProducts(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchProducts();
  }, []);

  function addToCart(product) {
    const existingIndex = cartItems.findIndex((item) => item._id === product._id);
    if (existingIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].qty = (updatedItems[existingIndex].qty || 1) + 1;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
    toast.success("Added to cart");
  }

  function removeFromCart(index) {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
  }

  function increaseQty(index) {
    const updated = [...cartItems];
    updated[index].qty = (updated[index].qty || 1) + 1;
    setCartItems(updated);
  }

  function decreaseQty(index) {
    const updated = [...cartItems];
    if (updated[index].qty > 1) {
      updated[index].qty -= 1;
      setCartItems(updated);
    }
  }

  function toggleWishlist(productId) {
    if (wishlistItems.includes(productId)) {
      setWishlistItems(wishlistItems.filter((id) => id !== productId));
      toast("Removed from wishlist", { icon: "❌" });
    } else {
      setWishlistItems([...wishlistItems, productId]);
      toast.success("Added to wishlist");
    }
  }

  function removeFromWishlist(productId) {
    setWishlistItems(wishlistItems.filter((id) => id !== productId));
    toast("Removed from wishlist", { icon: "❌" });
  }

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* ✅ Login Route خارج الـ Layout */}
        <Route
          path="/login"
          element={
            <Login
              setCartItems={setCartItems}
              setWishlistItems={setWishlistItems}
            />
          }
        />

        {/* ✅ Forget Password خارج الـ Layout */}
        <Route path="/forget-password" element={<ForgetPassword />} />

        <Route path="/" element={<Layout cartCount={cartCount} />}>
          <Route
            index
            element={
              <Home
                addToCart={addToCart}
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
                products={products}
              />
            }
          />
          <Route
            path="products"
            element={
              <Products
                products={products}
                addToCart={addToCart}
                wishlistItems={wishlistItems}
                toggleWishlist={toggleWishlist}
              />
            }
          />
          <Route path="categories" element={<Categories />} />
          <Route path="brands" element={<Brands />} />
          <Route
            path="cart"
            element={
              <Cart
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                increaseQty={increaseQty}
                decreaseQty={decreaseQty}
              />
            }
          />
          <Route
            path="wishlist"
            element={
              <Wishlist
                wishlistItems={wishlistItems}
                products={products}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
              />
            }
          />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route
            path="checkout"
            element={
              <Checkout cartItems={cartItems} totalPrice={totalPrice} />
            }
          />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
