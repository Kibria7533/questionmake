import React from "react";
import { FaEnvelope } from "react-icons/fa";

const TopNavbar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center py-3 px-4">
      <div className="d-flex align-items-center">
        {/* Logo */}
        <img
          src="logo3.png"
          alt="QuestionHat Logo"
          style={{ height: "50px", marginRight: "10px" }}
        />
        {/* QUESTIONHAT Text */}
        <div
          className="text-primary"
          style={{ fontSize: "1.5rem", fontWeight: "bold" }}
        >
          QUESTIONHAT
        </div>
      </div>

      {/* Mail Section */}
      <div className="d-flex align-items-center">
        <FaEnvelope className="me-2" size={20} color="#007bff" />
        <div>
          <p className="m-0" style={{ color: "#333", fontWeight: "600" }}>
            MAIL US
          </p>
          <p className="m-0" style={{ color: "#666", fontSize: "0.9rem" }}>
            team@questionhat.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
