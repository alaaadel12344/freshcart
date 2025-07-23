import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  async function getProductDetails() {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProduct(data.data);
    } catch (error) {
      console.error("Product details error:", error);
    }
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!product) return <div className="text-center my-5">Loading...</div>;

  return (
    <div className="container py-4">
      <div className="row g-4">
        <div className="col-md-4">
          <img src={product.imageCover} className="w-100 rounded shadow-sm" alt={product.title} />
        </div>
        <div className="col-md-8">
          <h4>{product.title}</h4>
          <p className="text-muted">{product.description}</p>
          <h5 className="text-success">EGP {product.price}</h5>
          <p className="text-warning">
            <i className="fa-solid fa-star"></i> {product.ratingsAverage}
          </p>
        </div>
      </div>
    </div>
  );
}
