import React from "react";

const AboutPage: React.FC = () => (
  <div className="container mt-5">
    <div className="card shadow-lg border-0" style={{ backgroundColor: "#E7F6FA" }}> {/* Light Background */}
      <div
        className="card-header text-white"
        style={{
          backgroundColor: "#74C0C3", // Teal for header
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-center p-3" style={{ fontFamily: "Mariupol, sans-serif" }}>TeleHealth</h2>
      </div>
      <div className="card-body" style={{ backgroundColor: "#F7F8FD" }}> {/* Soft white background */}
        <p className="lead text-center mb-4" style={{ color: "#373D44", fontFamily: "Mariupol, sans-serif" }}> {/* Dark text for contrast */}
          Welcome to TeleHealth, your trusted digital health companion.
        </p>
        <p className="text-center" style={{ color: "#373D44", fontFamily: "Mariupol, sans-serif" }}> {/* Dark text for readability */}
          Our platform is designed to seamlessly connect patients and doctors, making healthcare more accessible than ever. Patients can securely log in to upload details about their symptoms and health concerns, while licensed doctors can review cases and offer professional treatment suggestions.
        </p>
        <p className="text-center mt-4" style={{ color: "#74C0C3", fontFamily: "Mariupol, sans-serif" }}> {/* Teal highlight */}
          At TeleHealth, our goal is to provide a convenient, safe, and user-friendly experience to support your health journey.
        </p>
      </div>
      <div className="card-footer text-center" style={{ backgroundColor: "#373D44", color: "#F7F8FD" }}> {/* Dark footer with light text */}
        <p className="mb-0" style={{ fontFamily: "Mariupol, sans-serif" }}>
          "Your health, our priority."
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;
