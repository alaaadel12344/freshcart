
import React from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Products({ products, addToCart, wishlistItems, toggleWishlist }) {
  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">All Products</h2>

      <div className="row g-3">
        {products.map((product) => (
          <div className="col-6 col-md-4 col-lg-3" key={product._id}>
            <div className="product-card card position-relative overflow-hidden border-0 shadow-sm">
              <Link
                to={`/product/${product._id}`}
                className="text-decoration-none text-dark"
              >
                <img
                  src={product.imageCover}
                  alt={product.title}
                  className="w-100 product-img"
                  style={{ height: "220px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                  <p className="text-success small m-0">{product.category.name}</p>
                  <h6 className="fw-bold small">
                    {product.title.split(" ").slice(0, 3).join(" ")}
                  </h6>
                  <p className="text-muted small">
                    {product.description.split(" ").slice(0, 6).join(" ")}...
                  </p>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="fw-bold">{product.price} EGP</span>
                    <span className="text-warning small">
                      <i className="fa-solid fa-star"></i>{" "}
                      {product.ratingsAverage.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>

            
              <button
                className="add-btn btn btn-success w-100 rounded-2"
                onClick={() => {
                  addToCart(product);
                  toast.success("Product added to cart", { position: "top-left" });
                }}
              >
                + Add
              </button>

             
              <i
                className={`fa-heart fa-lg wishlist-icon position-absolute top-0 end-0 m-2 cursor-pointer ${
                  wishlistItems.includes(product._id)
                    ? "fa-solid text-danger"
                    : "fa-regular text-dark"
                }`}
                onClick={() => toggleWishlist(product._id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
