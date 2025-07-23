
import { useEffect, useState } from "react";
import axios from "axios";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories");
        setCategories(data.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">All Categories</h2>

      <div className="row g-4">
        {categories.map((category) => (
          <div key={category._id} className="col-6 col-md-4 col-lg-3">
            <div className="card border-0 shadow-sm rounded-3 overflow-hidden h-100">
              <img
                src={category.image}
                alt={category.name}
                className="w-100"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h6 className="fw-bold m-0 text-success">{category.name}</h6>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
