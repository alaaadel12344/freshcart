
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function Layout({ cartCount }) {
  return (
    <>
      <Navbar cartCount={cartCount} />
      <div className="container my-4">
        <Outlet />
      </div>
    </>
  );
}
