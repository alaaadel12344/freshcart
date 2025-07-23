import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        email,
        password,
      });

 
      localStorage.setItem("userToken", data.token);

      toast.success("Logged in successfully!");
      navigate("/"); 
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-light min-vh-100">
      <nav className="bg-white shadow-sm py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fw-bold text-dark d-flex align-items-center" to="/">
            <i className="fa-solid fa-cart-shopping text-success fa-lg me-2"></i>
            fresh cart
          </Link>
          <div>
            <Link to="/register" className="text-secondary text-decoration-none me-3">
              register
            </Link>
            <Link to="/login" className="text-secondary text-decoration-none">
              log in
            </Link>
          </div>
        </div>
      </nav>

      <div className="container py-5">
        <div className="w-100 mx-auto" style={{ maxWidth: "600px" }}>
          <h3 className="fw-bold mb-4">login now</h3>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label fw-semibold">
              Email :
            </label>
            <input
              type="email"
              className="form-control mb-3"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password" className="form-label fw-semibold">
              Password :
            </label>
            <input
              type="password"
              className="form-control mb-3"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Link to="/forget-password" className="fw-semibold small d-block mb-3 text-success">
              forget your password?
            </Link>

            <div className="text-end">
              <button type="submit" className="btn btn-outline-dark" disabled={loading}>
                {loading ? "Logging in..." : "login now"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
