import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    rePassword: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        user
      );
      toast.success("Account created successfully!");
      setUser({
        name: "",
        email: "",
        phone: "",
        password: "",
        rePassword: "",
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <h4 className="fw-bold mb-4 text-center text-success">Register Now</h4>
      <form onSubmit={handleSubmit} className="w-75 mx-auto">
        <input
          type="text"
          name="name"
          placeholder="Name"
          className="form-control mb-3"
          value={user.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-control mb-3"
          value={user.email}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          className="form-control mb-3"
          value={user.phone}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-control mb-3"
          value={user.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="rePassword"
          placeholder="Re-enter Password"
          className="form-control mb-3"
          value={user.rePassword}
          onChange={handleChange}
          required
        />
        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}
