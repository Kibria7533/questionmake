"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from next/link
import { useRouter } from "next/navigation";

const BASE_URL = "http://localhost:4000/api";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter(); // Use router for logout redirection

  const styles = {
    header: {
      height: "60px",
      backgroundColor: "#004080",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    profileContainer: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      color: "white",
      cursor: "pointer",
    },
    profileIcon: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#004080",
      fontWeight: "bold",
      fontSize: "1rem",
    },
    dropdown: {
      position: "absolute",
      top: "50px",
      right: "0",
      backgroundColor: "white",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
      borderRadius: "5px",
      width: "150px",
      zIndex: "1000",
      display: "flex",
      flexDirection: "column",
      padding: "10px",
    },
    dropdownItem: {
      padding: "10px",
      color: "#004080",
      cursor: "pointer",
      borderBottom: "1px solid #ddd",
      textDecoration: "none",
    },
    dropdownItemLast: {
      padding: "10px",
      color: "#004080",
      cursor: "pointer",
      textDecoration: "none",
    },
    loginButton: {
      padding: "8px 16px",
      fontSize: "1rem",
      backgroundColor: "#004080",
      color: "white",
      border: "1px solid white",
      borderRadius: "5px",
      cursor: "pointer",
    },
  };

  useEffect(() => {
    // Check for access_token in localStorage
    const token = localStorage.getItem("access_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access_token"); // Remove token from localStorage
    setIsLoggedIn(false);
    router.push("/login"); // Redirect to login page
  };

  return (
    <header style={styles.header}>
      <div>Admin Panel</div>
      {isLoggedIn ? (
        <div
          style={styles.profileContainer}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div style={styles.profileIcon}>P</div>
          {showDropdown && (
            <div style={styles.dropdown}>
              <Link href="/profile" style={styles.dropdownItem}>
                View Profile
              </Link>
              <div style={styles.dropdownItemLast} onClick={handleLogout}>
                Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <button style={styles.loginButton} onClick={() => router.push("/login")}>
          Login
        </button>
      )}
    </header>
  );
};

export default Header;
