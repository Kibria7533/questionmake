"use client";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaUsers,
  FaCog,
  FaChartBar,
  FaUserShield,
  FaBook,
  FaPlus,
  FaSearch,
  FaUserTag,
  FaKey,
} from "react-icons/fa";
import Link from "next/link";

const Sidebar = () => {
  const [isQuestionbankOpen, setIsQuestionbankOpen] = useState(false);
  const [isPermissionManagementOpen, setIsPermissionManagementOpen] = useState(false);

  const toggleQuestionbank = () => {
    setIsQuestionbankOpen(!isQuestionbankOpen);
  };

  const togglePermissionManagement = () => {
    setIsPermissionManagementOpen(!isPermissionManagementOpen);
  };

  const styles = {
    sidebar: {
      width: "250px",
      backgroundColor: "#004080",
      color: "white",
      display: "flex",
      flexDirection: "column",
      padding: "20px",
      boxShadow: "2px 0 5px rgba(0, 0, 0, 0.1)",
    },
    sidebarLogo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "white",
      marginBottom: "20px",
      textAlign: "center",
      cursor: "pointer",
    },
    sidebarItem: {
      marginBottom: "15px",
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      textAlign: "center",
      transition: "background-color 0.3s, box-shadow 0.3s",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      border: "1px solid #0056b3",
    },
    sidebarItemHover: {
      backgroundColor: "#0056b3",
    },
    icon: {
      fontSize: "1.5rem", // Increased icon size
    },
    dropdown: {
      marginLeft: "20px",
      marginTop: "10px",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    },
    dropdownItem: {
      padding: "10px",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
      display: "flex",
      alignItems: "center",
      gap: "15px",
      backgroundColor: "#0056b3",
      color: "white",
      border: "1px solid #004080",
    },
    dropdownItemHover: {
      backgroundColor: "#003d73",
    },
  };

  return (
    <div style={styles.sidebar}>
      <Link href="/" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={styles.sidebarLogo}>Question Hat</div>
      </Link>
      <Link href="/dashboard" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={styles.sidebarItem}>
          <FaTachometerAlt style={styles.icon} />
          Dashboard
        </div>
      </Link>
      <Link href="/users" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={styles.sidebarItem}>
          <FaUsers style={styles.icon} />
          Users
        </div>
      </Link>
      <Link href="/operators" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={styles.sidebarItem}>
          <FaUserShield style={styles.icon} />
          Operators
        </div>
      </Link>

      {/* Questionbank Menu */}
      <div onClick={toggleQuestionbank} style={{ ...styles.sidebarItem, cursor: "pointer" }}>
        <FaBook style={styles.icon} />
        Questionbank
      </div>
      {isQuestionbankOpen && (
        <div style={styles.dropdown}>
          <Link href="/questionbank-add" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={styles.dropdownItem}>
              <FaPlus style={styles.icon} />
              Add Question
            </div>
          </Link>
          <Link href="/questionbank-explore" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={styles.dropdownItem}>
              <FaSearch style={styles.icon} />
              Explore Questions
            </div>
          </Link>
        </div>
      )}

      {/* Permission Management */}
      <div
        onClick={togglePermissionManagement}
        style={{ ...styles.sidebarItem, cursor: "pointer" }}
      >
        <FaUserTag style={styles.icon} />
        PAM
      </div>
      {isPermissionManagementOpen && (
        <div style={styles.dropdown}>
          <Link href="/roles" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={styles.dropdownItem}>
              <FaUserShield style={styles.icon} />
              Roles
            </div>
          </Link>
          <Link href="/permissions" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={styles.dropdownItem}>
              <FaKey style={styles.icon} />
              Permissions
            </div>
          </Link>
        </div>
      )}

      <Link href="/settings" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={styles.sidebarItem}>
          <FaCog style={styles.icon} />
          Settings
        </div>
      </Link>
      <Link href="/reports" style={{ textDecoration: "none", color: "inherit" }}>
        <div style={styles.sidebarItem}>
          <FaChartBar style={styles.icon} />
          Reports
        </div>
      </Link>
    </div>
  );
};

export default Sidebar;
