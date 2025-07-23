
import { NavLink, Link } from "react-router-dom";

export default function Navbar({ cartCount }) {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm">
      <div className="container d-flex justify-content-between align-items-center">

        <Link className="navbar-brand fw-bold text-dark me-3 d-flex align-items-center" to="/">
          <i className="fa-solid fa-cart-shopping text-success fa-xl me-2"></i>
          FreshCart
        </Link>

      
        <div className="collapse navbar-collapse justify-content-center" id="mainNav">
          <ul className="navbar-nav mb-2 mb-lg-0">
            {["", "cart", "wishlist", "products", "categories", "brands"].map((item, index) => (
              <li className="nav-item mx-2" key={index}>
                <NavLink
                  to={`/${item}`}
                  className={({ isActive }) =>
                    `nav-link px-2 ${isActive ? "text-dark fw-semibold" : "text-secondary"}`
                  }
                >
                  {item === "" ? "Home" : item.replace(/([A-Z])/g, ' $1')}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

       
        <ul className="navbar-nav d-flex flex-row align-items-center gap-3">
         
          <li className="nav-item position-relative">
            <NavLink className="nav-link text-secondary" to="/cart">
              <i className="fa-solid fa-cart-shopping fa-xl"></i>
              {cartCount > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success"
                  style={{ fontSize: "10px" }}
                >
                  {cartCount}
                </span>
              )}
            </NavLink>
          </li>

         
          <li className="nav-item">
            <NavLink className="nav-link text-secondary fw-semibold" to="/login">
              Log out
            </NavLink>
          </li>
        </ul>

      </div>
    </nav>
  );
}
