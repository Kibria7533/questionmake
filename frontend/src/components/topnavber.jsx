import React from "react";
import { FaEnvelope } from "react-icons/fa";

const TopNavbar = () => {
  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 20px",
      backgroundColor: "#f8f9fa",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    logoText: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#007bff",
    },
    mailContainer: {
      display: "flex",
      alignItems: "center",
    },
    mailIcon: {
      marginRight: "10px",
    },
    mailText: {
      color: "#333",
      fontWeight: "600",
      margin: "0",
    },
    mailSubtext: {
      color: "#666",
      fontSize: "0.9rem",
      margin: "0",
    },
  };

  return (
    <div style={styles.navbar}>
      {/* Logo Section */}
      <div style={styles.logoContainer}>
        <div style={styles.logoText}>প্রশ্নের হাট</div>
      </div>

      {/* Mail Section */}
      <div style={styles.mailContainer}>
        <FaEnvelope style={styles.mailIcon} size={20} color="#007bff" />
        <div>
          <p style={styles.mailText}>মেইল করুন</p>
          <p style={styles.mailSubtext}>team@questionhat.com</p>
        </div>
      </div>
    </div>
  );
};

export default TopNavbar;
