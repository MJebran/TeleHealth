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
      <div
        className={`container d-flex ${
          isMobile ? "justify-content-center" : "justify-content-start"
        }`}
      >
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
          className={`navbar-brand d-flex ${
            isMobile ? "flex-column align-items-center" : "align-items-center ms-4"
          }`}
          to="/inventory"
        >
          <i className="bi bi-box-seam-fill" />
          {isMobile && <span>Inventory</span>}
        </Link>
        <Link
          className={`navbar-brand d-flex ${
            isMobile ? "flex-column align-items-center" : "align-items-center ms-4"
          }`}
          to="/contact"
        >
          <i className="bi bi-person-fill" />
          {isMobile && <span>Contact</span>}
        </Link>
        <Link
          className={`navbar-brand d-flex ${
            isMobile ? "flex-column align-items-center" : "align-items-center ms-4"
          }`}
          to="/about"
        >
          <i className="bi bi-info-circle-fill" />
          {isMobile && <span>About</span>}
        </Link>
        <Link
          className={`navbar-brand d-flex ${
            isMobile ? "flex-column align-items-center" : "align-items-center ms-4"
          }`}
          to="/agreements"
        >
          <i className="bi bi-file-earmark-text-fill" />
          {isMobile && <span>Agreements</span>}
        </Link>
        <Link
          className={`navbar-brand d-flex ${
            isMobile ? "flex-column align-items-center" : "align-items-center ms-4"
          }`}
          to="/roles"
        >
          <i className="bi bi-person-badge-fill" />
          {isMobile && <span>Roles</span>}
        </Link>
        <Link
          className={`navbar-brand d-flex ${
            isMobile ? "flex-column align-items-center" : "align-items-center ms-4"
          }`}
          to="/users"
        >
          <i className="bi bi-people-fill" />
          {isMobile && <span>Users</span>}
        </Link>
        <Link
          className={`navbar-brand d-flex ${
            isMobile ? "flex-column align-items-center" : "align-items-center ms-4"
          }`}
          to="/apply"
        >
          <i className="bi bi-clipboard-plus" />
          {isMobile && <span>Apply</span>}
          </Link>
          //add link to case Detail 
        <Link
          className={`navbar-brand d-flex ${
            isMobile ? "flex-column align-items-center" : "align-items-center ms-4"
          }`}
          to="/cases"
        >   
          <i className="bi bi-briefcase-fill" />
          {isMobile && <span>Cases</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
