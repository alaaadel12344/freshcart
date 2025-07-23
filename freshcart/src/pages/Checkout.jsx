import React from "react";

const Checkout = ({ cartItems, totalPrice }) => {
  return (
    <div
      style={{
        maxWidth: 900,
        margin: "40px auto",
        padding: 20,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: 30 }}>Checkout</h1>

      <div
        style={{
          display: "flex",
          gap: 40,
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
       
        <div style={{ flex: 1, minWidth: 300 }}>
          <h2 style={{ marginBottom: 15 }}>Shipping Information</h2>
          <form>
            <div style={{ marginBottom: 15 }}>
              <label htmlFor="name">Name:</label>
              <br />
              <input
                id="name"
                type="text"
                style={{ width: "100%", padding: 8, fontSize: 16 }}
                placeholder="Your full name"
                required
              />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label htmlFor="address">Address:</label>
              <br />
              <input
                id="address"
                type="text"
                style={{ width: "100%", padding: 8, fontSize: 16 }}
                placeholder="Shipping address"
                required
              />
            </div>
            <div style={{ marginBottom: 15 }}>
              <label htmlFor="phone">Phone:</label>
              <br />
              <input
                id="phone"
                type="tel"
                style={{ width: "100%", padding: 8, fontSize: 16 }}
                placeholder="Phone number"
                required
              />
            </div>

            <h2 style={{ marginTop: 30, marginBottom: 15 }}>Payment Method</h2>
            <select
              style={{ width: "100%", padding: 8, fontSize: 16 }}
              required
              defaultValue=""
            >
              <option value="" disabled>
                Select payment method
              </option>
              <option value="credit_card">Credit Card</option>
              <option value="paypal">PayPal</option>
              <option value="cash">Cash on Delivery</option>
            </select>

            <button
              type="submit"
              style={{
                marginTop: 30,
                padding: "12px 20px",
                fontSize: 18,
                backgroundColor: "#27ae60",
                color: "white",
                border: "none",
                borderRadius: 6,
                cursor: "pointer",
              }}
            >
              Place Order
            </button>
          </form>
        </div>

       
        <div
          style={{
            flex: 1,
            minWidth: 300,
            border: "1px solid #ddd",
            borderRadius: 8,
            padding: 20,
            height: "fit-content",
          }}
        >
          <h2>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              <ul style={{ listStyle: "none", padding: 0, marginBottom: 20 }}>
                {cartItems.map((item) => (
                  <li
                    key={item._id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 10,
                      fontSize: 16,
                    }}
                  >
                    <span>
                      {item.title} x {item.qty}
                    </span>
                    <span>{(item.price * item.qty).toFixed(2)} EGP</span>
                  </li>
                ))}
              </ul>

              <hr />

              <h3 style={{ marginTop: 20, textAlign: "right" }}>
                Total: {totalPrice.toFixed(2)} EGP
              </h3>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
