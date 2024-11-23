import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import "./Navbar.css";


const Navbar: React.FC = () => {
  const location = useLocation();
  const sowProductDetailsPage = location.pathname.startsWith("/products/");

  return (
    <>
      <nav className="navbar mb-3 p-3">
        <h1 className="heading">E-Commerce Application</h1>
        <div className="navbar-menu">
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Product List
          </Link>
          {sowProductDetailsPage && (
            <Link
              to={location.pathname}
              className={sowProductDetailsPage ? "active" : ""}
            >
              Product Details
            </Link>
          )}
        </div>
      </nav>
      <Outlet />
    </>
  );
};

export default Navbar;
