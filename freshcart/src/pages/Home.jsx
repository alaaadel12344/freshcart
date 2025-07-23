import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

export default function Home({ addToCart, wishlistItems, toggleWishlist }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  async function getHomeData() {
    try {
      const { data: productRes } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      const { data: categoryRes } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      setProducts(productRes.data);
      setCategories(categoryRes.data);
    } catch (error) {
      console.error("API error:", error);
    }
  }

  useEffect(() => {
    getHomeData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home container py-4">
    
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={15}
        slidesPerView={4}
        breakpoints={{
          0: { slidesPerView: 2 },
          576: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          992: { slidesPerView: 5 },
        }}
        className="mb-4 pb-2"
      >
        {categories.map((cat) => (
          <SwiperSlide key={cat._id}>
            <div className="text-center border rounded shadow-sm bg-white">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-100"
                style={{ height: "120px", objectFit: "cover", borderTopLeftRadius: "0.375rem", borderTopRightRadius: "0.375rem" }}
              />
              <p className="fw-semibold text-success small py-2 m-0">{cat.name}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search for a product..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

     
      <h4 className="fw-bold mb-3">Best Products</h4>
      <div className="row g-3">
        {filteredProducts.map((product) => (
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
                      <i className="fa-solid fa-star"></i> {product.ratingsAverage.toFixed(1)}
                    </span>
                  </div>
                </div>
              </Link>

             
              <button
                className="add-btn btn btn-success w-100 rounded-2"
                onClick={() => {
                  addToCart(product);
                  toast.success("Product added to cart successfully", {
                    position: "top-left",
                  });
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