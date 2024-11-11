import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      className={`navbar ${
        isMobile ? "navbar-bottom" : "navbar-expand-lg"
      } navbar-dark bg-dark`}
    >
      <div className="container d-flex justify-content-${isMobile ? 'center' : 'start'}">
        <Link
          className={`navbar-brand d-flex ${
            isMobile ? "flex-column align-items-center" : "align-items-center"
          }`}
          to="/"
        >
          <i className="bi bi-house-fill" />
          {isMobile && <span>Home</span>}
        </Link>
        <Link
          className="navbar-brand d-flex align-items-center ms-4"
          to="/inventory"
        >
          <i className="bi bi-box-seam-fill" />
          {isMobile && <span>Inventory</span>}
        </Link>
        <Link
          className={`navbar-brand d-flex ${
            isMobile
              ? "flex-column align-items-center"
              : "align-items-center ms-4"
          }`}
          to="/contact"
        >
          <i className="bi bi-person-fill" />
          {isMobile && <span>Contact</span>}
        </Link>
        <Link
          className={`navbar-brand d-flex ${
            isMobile
              ? "flex-column align-items-center"
              : "align-items-center ms-4"
          }`}
          to="/about"
        >
          <i className="bi bi-info-circle-fill" />
          {isMobile && <span>About</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;