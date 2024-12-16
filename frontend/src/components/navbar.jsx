"use client";

import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserCircle } from "react-icons/fa";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      const loggedIn = await fakeAuthCheck();
      setIsLoggedIn(false);
    };

    checkLoginStatus();

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const fakeAuthCheck = async () => {
    return new Promise((resolve) => setTimeout(() => resolve(true), 1000));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const styles = {
    nav: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#004080",
      color: "#fff",
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
    },
    navList: {
      display: "flex",
      listStyle: "none",
      margin: 0,
      padding: 0,
    },
    navItem: {
      margin: "0 10px",
    },
    navLink: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "1rem",
      transition: "color 0.3s",
    },
    navLinkHover: {
      color: "#80bfff",
    },
    mobileMenuIcon: {
      fontSize: "1.5rem",
      cursor: "pointer",
      display: isMobileView ? "block" : "none",
      marginRight: "10px", // Added space between menu icon and profile icon
    },
    profileIcon: {
      display: isMobileView ? "block" : "none",
      fontSize: "1.5rem",
      cursor: "pointer",
    },
    mobileMenu: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100vh",
      backgroundColor: "#004080",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
      paddingTop: "20px",
      zIndex: 10,
    },
    mobileNavLink: {
      color: "#fff",
      textDecoration: "none",
      fontSize: "1.5rem",
      margin: "15px 0",
      transition: "color 0.3s",
    },
    closeButton: {
      alignSelf: "flex-start",
      color: "#fff",
      fontSize: "1.5rem",
      marginLeft: "20px",
      marginBottom: "20px",
      cursor: "pointer",
    },
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.logo}>QuestionHat</div>

      <ul style={{ ...styles.navList, display: isMobileMenuOpen || isMobileView ? "none" : "flex" }}>
        <li style={styles.navItem}>
          <a
            href="/"
            style={styles.navLink}
            onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
          >
            Home
          </a>
        </li>
        <li style={styles.navItem}>
          <a
            href="/news"
            style={styles.navLink}
            onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
          >
            News
          </a>
        </li>
        <li style={styles.navItem}>
          <a
            href="/contact"
            style={styles.navLink}
            onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
          >
            Contact
          </a>
        </li>
        {!isLoggedIn && (
          <>
            <li style={styles.navItem}>
              <a
                href="/login"
                style={styles.navLink}
                onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
                onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
              >
                Login
              </a>
            </li>
            <li style={styles.navItem}>
              <a
                href="/signup"
                style={styles.navLink}
                onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
                onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
              >
                Sign Up
              </a>
            </li>
          </>
        )}
      </ul>

      <div style={styles.mobileMenuIcon} onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {isLoggedIn && (
        <div style={styles.profileIcon}>
          <a href="/profile" style={styles.navLink}>
            <FaUserCircle />
          </a>
        </div>
      )}

      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.closeButton} onClick={toggleMobileMenu}>
            <FaTimes />
          </div>
          <a
            href="/"
            style={styles.mobileNavLink}
            onClick={toggleMobileMenu}
            onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
          >
            Home
          </a>
          <a
            href="/news"
            style={styles.mobileNavLink}
            onClick={toggleMobileMenu}
            onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
          >
            News
          </a>
          <a
            href="/contact"
            style={styles.mobileNavLink}
            onClick={toggleMobileMenu}
            onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
            onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
          >
            Contact
          </a>
          {!isLoggedIn && (
            <>
              <a
                href="/login"
                style={styles.mobileNavLink}
                onClick={toggleMobileMenu}
                onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
                onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
              >
                Login
              </a>
              <a
                href="/signup"
                style={styles.mobileNavLink}
                onClick={toggleMobileMenu}
                onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
                onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
              >
                Sign Up
              </a>
            </>
          )}
          {isLoggedIn && (
            <a
              href="/profile"
              style={styles.mobileNavLink}
              onClick={toggleMobileMenu}
              onMouseOver={(e) => (e.target.style.color = styles.navLinkHover.color)}
              onMouseOut={(e) => (e.target.style.color = styles.navLink.color)}
            >
              <FaUserCircle size={24} />
            </a>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
