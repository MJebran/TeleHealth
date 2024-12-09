import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [activePath, setActivePath] = useState(location.pathname);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

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
        {[
          { path: "/", icon: "bi-house-fill", label: "Home" },
          { path: "/contact", icon: "bi-person-fill", label: "Contact" },
          { path: "/about", icon: "bi-info-circle-fill", label: "About" },
          { path: "/agreements", icon: "bi-file-earmark-text-fill", label: "Agreements" },
          { path: "/roles", icon: "bi-person-badge-fill", label: "Roles" },
          { path: "/users", icon: "bi-people-fill", label: "Users" },
          { path: "/apply", icon: "bi-clipboard-plus", label: "Apply" },
          { path: "/cases", icon: "bi-briefcase-fill", label: "Cases" },
        ].map((item, index) => (
          <Link
            key={index}
            className={`navbar-brand d-flex flex-column align-items-center ms-4 ${
              activePath === item.path ? "active" : ""
            }`}
            to={item.path}
            onClick={() => setActivePath(item.path)}
          >
            <i
              className={`bi ${item.icon}`}
              style={{
                fontSize: "1.5rem",
                color: activePath === item.path ? "#74c0cc" : "white",
                transition: "color 0.2s ease-in-out",
              }}
            />
            <span
              style={{
                fontSize: "0.85rem",
                color: activePath === item.path ? "#74c0cc" : "white",
                marginTop: "0.25rem",
              }}
            >
              {item.label}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
