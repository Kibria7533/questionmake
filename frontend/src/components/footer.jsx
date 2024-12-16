// Enhanced Footer Component
import React from "react";
import { FaFacebookF, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#000", // Dark background
      color: "#fff",
      padding: "40px 20px",
      fontFamily: "Arial, sans-serif",
      lineHeight: "1.5",
    },
    footerContainer: {
      display: "flex",
      justifyContent: "space-between",
      flexWrap: "wrap",
      maxWidth: "1200px",
      margin: "0 auto",
    },
    footerSection: {
      flex: "1 1 200px",
      marginBottom: "20px",
    },
    sectionTitle: {
      fontWeight: "bold",
      marginBottom: "10px",
      fontSize: "1.1rem",
    },
    linkList: {
      listStyle: "none",
      padding: 0,
      margin: 0,
    },
    linkItem: {
      marginBottom: "8px",
    },
    link: {
      color: "#ccc",
      textDecoration: "none",
      fontSize: "0.9rem",
    },
    socialIcons: {
      display: "flex",
      gap: "15px",
      marginTop: "20px",
    },
    icon: {
      color: "#fff",
      fontSize: "1.2rem",
      cursor: "pointer",
    },
    copyright: {
      textAlign: "center",
      borderTop: "1px solid #444",
      paddingTop: "10px",
      marginTop: "20px",
      fontSize: "0.9rem",
      color: "#ccc",
    },
  };

  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        {/* Logo Section */}
        <div style={styles.footerSection}>
          <h2 style={{ color: "#3b82f6", fontWeight: "bold", fontSize: "1.5rem" }}>
            QUESTIONHAT
          </h2>
        </div>

        {/* Platform Links */}
        <div style={styles.footerSection}>
          <div style={styles.sectionTitle}>Platform</div>
          <ul style={styles.linkList}>
            <li style={styles.linkItem}>
              <a href="/" style={styles.link}>
                Home
              </a>
            </li>
            <li style={styles.linkItem}>
              <a href="/exams" style={styles.link}>
                All Exams
              </a>
            </li>
            <li style={styles.linkItem}>
              <a href="/pro" style={styles.link}>
                ExamTopics PRO
              </a>
            </li>
            <li style={styles.linkItem}>
              <a href="/training" style={styles.link}>
                Training Courses
              </a>
            </li>
          </ul>
        </div>

        {/* Account Links */}
        <div style={styles.footerSection}>
          <div style={styles.sectionTitle}>Account</div>
          <ul style={styles.linkList}>
            <li style={styles.linkItem}>
              <a href="/logout" style={styles.link}>
                Logout
              </a>
            </li>
            <li style={styles.linkItem}>
              <a href="/reset-password" style={styles.link}>
                Reset Password
              </a>
            </li>
          </ul>
        </div>

        {/* Company Links */}
        <div style={styles.footerSection}>
          <div style={styles.sectionTitle}>Company</div>
          <ul style={styles.linkList}>
            <li style={styles.linkItem}>
              <a href="/contact" style={styles.link}>
                Contact Us
              </a>
            </li>
            <li style={styles.linkItem}>
              <a href="/about" style={styles.link}>
                About Us
              </a>
            </li>
            <li style={styles.linkItem}>
              <a href="/terms" style={styles.link}>
                Terms
              </a>
            </li>
            <li style={styles.linkItem}>
              <a href="/privacy" style={styles.link}>
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Resources Links */}
        <div style={styles.footerSection}>
          <div style={styles.sectionTitle}>Resources</div>
          <ul style={styles.linkList}>
            <li style={styles.linkItem}>
              <a href="/forum" style={styles.link}>
                Forum
              </a>
            </li>
            <li style={styles.linkItem}>
              <a href="/news" style={styles.link}>
                News
              </a>
            </li>
            <li style={styles.linkItem}>
              <a href="/dmca" style={styles.link}>
                DMCA
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Social Icons */}
      <div style={{ textAlign: "center" }}>
        <div style={styles.socialIcons}>
          <a href="#" style={styles.icon}>
            <FaFacebookF />
          </a>
          <a href="#" style={styles.icon}>
            <FaTwitter />
          </a>
          <a href="#" style={styles.icon}>
            <FaLinkedin />
          </a>
          <a href="#" style={styles.icon}>
            <FaInstagram />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div style={styles.copyright}>
        © 2024 QUESTIONHAT. All rights reserved.
      </div>
    </footer>
  );
};
