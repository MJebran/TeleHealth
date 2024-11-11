import React from "react";

const ContactPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg border-0" style={{ backgroundColor: "#E7F6FA" }}> {/* Light background */}
        <div
          className="card-header text-white"
          style={{
            backgroundColor: "#74C0C3", // Teal for header
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h2 className="text-center p-3" style={{ fontFamily: "Mariupol, sans-serif" }}>Contact Us</h2>
        </div>
        <div className="card-body" style={{ backgroundColor: "#F7F8FD" }}> {/* Soft white background */}
          <p className="lead text-center mb-4" style={{ color: "#373D44", fontFamily: "Mariupol, sans-serif" }}> {/* Dark text for readability */}
            Have questions or need support? Reach out to us, and we’ll assist you promptly!
          </p>
          <ul className="list-group list-group-flush">
            <li className="list-group-item d-flex align-items-center" style={{ backgroundColor: "#F7F8FD" }}>
              <i className="bi bi-envelope-fill me-2" style={{ color: "#74C0C3" }}></i>
              <strong></strong>&nbsp;
              <a href="mailto:support@telehealthapp.com" className="text-decoration-none" style={{ color: "#74C0C3" }}>
                support@telehealthapp.com
              </a>
            </li>
            <li className="list-group-item d-flex align-items-center" style={{ backgroundColor: "#F7F8FD" }}>
              <i className="bi bi-telephone-fill me-2" style={{ color: "#74C0C3" }}></i>
              <strong></strong>&nbsp;
              +1 (555) 987-6543
            </li>
            <li className="list-group-item d-flex align-items-center" style={{ backgroundColor: "#F7F8FD" }}>
              <i className="bi bi-geo-alt-fill me-2" style={{ color: "#74C0C3" }}></i>
              <strong></strong>&nbsp;
              Timani Project, Kabul, Afghanistan
            </li>
          </ul>
          {/* Updated Business Hours Section */}
          <div className="mt-4">
            <h3 className="text-center" style={{ color: "#373D44", fontFamily: "Mariupol, sans-serif" }}>Business Hours</h3>
            <div className="d-flex justify-content-center">
              <div className="text-center">
                <i className="bi bi-clock-fill me-2" style={{ color: "#74C0C3", fontSize: "1.5rem" }}></i>
                <p style={{ color: "#373D44", fontFamily: "Mariupol, sans-serif", fontSize: "1.25rem" }}>
                  We are available 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer text-center" style={{ backgroundColor: "#373D44", color: "#F7F8FD" }}> {/* Dark footer with light text */}
          <p className="mb-0" style={{ fontFamily: "Mariupol, sans-serif" }}>We look forward to connecting with you!</p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
