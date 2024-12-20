"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/store";
import { FaUserCircle } from "react-icons/fa"; // Importing a user icon

const Header = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Access Redux state
  const isLoggedIn = useSelector((state) => state.user.isAuthenticated);
  const [showDropdown, setShowDropdown] = useState(false);

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
      gap: "10px",
      color: "white",
      cursor: "pointer",
    },
    profileIcon: {
      fontSize: "2rem", // Adjust icon size
      color: "white",
    },
    dropdown: {
      position: "absolute",
      top: "50px",
      right: "0",
      backgroundColor: "white",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      borderRadius: "8px",
      width: "200px",
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
      fontSize: "1rem",
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

  const handleLogout = () => {
    // Remove token from localStorage
    localStorage.removeItem("access_token");
    
    // Dispatch logout action to update Redux state
    dispatch(logout());
  
    // Redirect to the login page
    router.push("/login");
  };
  

  return (
    <header style={styles.header}>
      <div>Admin Panel</div>
      {isLoggedIn ? (
        <div
          style={styles.profileContainer}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <FaUserCircle style={styles.profileIcon} /> {/* Using React Icon */}
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
