import React from "react";
import { useNavigate } from "react-router-dom";

const Cart = ({ cartItems, removeFromCart, increaseQty, decreaseQty }) => {
  const navigate = useNavigate();
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ padding: "30px", maxWidth: "1000px", margin: "auto", fontSize: "18px" }}>
      <h2 style={{ fontSize: "32px", marginBottom: "25px" }}>Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <p style={{ fontSize: "22px" }}>Your cart is empty.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "30px",
              fontSize: "18px",
            }}
          >
            <thead>
              <tr style={{ borderBottom: "3px solid #ccc" }}>
                <th style={{ textAlign: "left", padding: "15px" }}>Product</th>
                <th style={{ padding: "15px" }}>Price</th>
                <th style={{ padding: "15px" }}>Quantity</th>
                <th style={{ padding: "15px" }}>Subtotal</th>
                <th style={{ padding: "15px" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => (
                <tr
                  key={item._id}
                  style={{ borderBottom: "2px solid #ddd", verticalAlign: "middle" }}
                >
                  <td
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "25px",
                      padding: "15px",
                    }}
                  >
                    <img
                      src={item.imageCover}
                      alt={item.title}
                      style={{
                        width: "80px",
                        height: "80px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <span style={{ fontSize: "20px", fontWeight: "600" }}>{item.title}</span>
                  </td>
                  <td style={{ textAlign: "center", padding: "15px", fontWeight: "600" }}>
                    {item.price} EGP
                  </td>
                  <td style={{ textAlign: "center", padding: "15px" }}>
                    <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
                      <button
                        onClick={() => decreaseQty(index)}
                        style={{
                          padding: "8px 14px",
                          fontSize: "20px",
                          cursor: "pointer",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          backgroundColor: "#f0f0f0",
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: "20px", fontWeight: "600" }}>{item.qty}</span>
                      <button
                        onClick={() => increaseQty(index)}
                        style={{
                          padding: "8px 14px",
                          fontSize: "20px",
                          cursor: "pointer",
                          borderRadius: "6px",
                          border: "1px solid #ccc",
                          backgroundColor: "#f0f0f0",
                        }}
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td style={{ textAlign: "center", padding: "15px", fontWeight: "600" }}>
                    {(item.price * item.qty).toFixed(2)} EGP
                  </td>
                  <td style={{ textAlign: "center", padding: "15px" }}>
                    <button
                      onClick={() => removeFromCart(index)}
                      style={{
                        backgroundColor: "#e74c3c",
                        color: "white",
                        border: "none",
                        padding: "10px 18px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "18px",
                        fontWeight: "600",
                      }}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ textAlign: "right", marginBottom: "30px", fontSize: "26px", fontWeight: "700" }}>
            Total: {totalPrice.toFixed(2)} EGP
          </h3>

          <div style={{ display: "flex", justifyContent: "flex-end", gap: "20px" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "14px 28px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                padding: "14px 28px",
                backgroundColor: "#27ae60",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "20px",
                fontWeight: "700",
              }}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
