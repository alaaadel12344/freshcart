import React from "react";
import { Link } from "react-router-dom";

export default function Wishlist({ wishlistItems, products, removeFromWishlist, addToCart }) {
  
  const wishlistProducts = products.filter((p) => wishlistItems.includes(p._id));

  if (wishlistProducts.length === 0) {
    return <p style={{ padding: 20, fontSize: 18 }}>Your wishlist is empty.</p>;
  }

  return (
    <div style={{ maxWidth: 900, margin: "20px auto", padding: 20 }}>
      <h2 style={{ marginBottom: 20 }}>My Wishlist</h2>
      {wishlistProducts.map((product) => (
        <div
          key={product._id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            borderBottom: "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <img
            src={product.imageCover}
            alt={product.title}
            style={{ width: 80, height: 80, objectFit: "cover", borderRadius: 8 }}
          />
          <div style={{ flex: 1 }}>
            <Link
              to={`/product/${product._id}`}
              style={{ fontSize: 18, fontWeight: "600", textDecoration: "none", color: "#333" }}
            >
              {product.title}
            </Link>
            <p style={{ margin: "6px 0" }}>{product.price} EGP</p>
            <div style={{ display: "flex", gap: 12 }}>
              <button
                onClick={() => addToCart(product)}
                style={{
                  backgroundColor: "#27ae60",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(product._id)}
                style={{
                  backgroundColor: "#e74c3c",
                  color: "white",
                  border: "none",
                  borderRadius: 5,
                  padding: "6px 12px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
