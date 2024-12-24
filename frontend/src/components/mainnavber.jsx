"use client";

import React, { useState, useEffect } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../redux/store";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const MainNavbar = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    dispatch(logout());
    router.push("/login");
  };

  const setToken = async () => {
    const token = await localStorage.getItem("access_token");
    if (token) {
      const token = await localStorage.getItem("access_token");
      dispatch(login({ token }));
    }
  };

  const fetchMenuData = async () => {
    try {
      const response = await fetch(`${BASE_URL}/exam-category/exam-with-categories`);
      if (!response.ok) {
        throw new Error("Failed to fetch menu data");
      }
      const data = await response.json();
      const formattedData = data.map((category) => ({
        category: category.name,
        items: category.exams.map((exam) => ({
          name: exam.name,
          link: `/exams/${exam.id}`,
        })),
      }));
      setMenuData(formattedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    setToken();
    fetchMenuData();
  }, [dispatch]);

  const styles = {
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      backgroundColor: "#222",
      color: "white",
      padding: "10px 20px",
      position: "sticky",
      top: "0",
      zIndex: "1000",
    },
    logo: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
    menu: {
      display: "flex",
      alignItems: "center",
      gap: "20px",
    },
    menuItem: {
      color: "white",
      textDecoration: "none",
      cursor: "pointer",
      position: "relative",
    },
    dropdownMenu: {
      position: "absolute",
      top: "100%",
      left: "0",
      backgroundColor: "white",
      color: "#222",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
      display: isDropdownOpen ? "block" : "none",
      minWidth: "400px",
    },
    dropdownItem: {
      padding: "5px 10px",
      textDecoration: "none",
      color: "#222",
      display: "block",
      borderBottom: "1px solid #ddd",
    },
    dropdownItemLast: {
      borderBottom: "none",
    },
    actions: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    profileButton: {
      display: "flex",
      alignItems: "center",
      gap: "5px",
      backgroundColor: "transparent",
      border: "1px solid white",
      color: "white",
      padding: "5px 10px",
      borderRadius: "5px",
      cursor: "pointer",
    },
    authLinks: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    authLink: {
      color: "white",
      textDecoration: "none",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo} onClick={() => router.push("/")}>
      
      </div>

      {/* Menu */}
      <div style={styles.menu}>
        <a href="/" style={styles.menuItem}>
          হোম
        </a>
        <div
          style={styles.menuItem}
          onMouseEnter={() => setIsDropdownOpen(true)}
          onMouseLeave={() => setIsDropdownOpen(false)}
        >
          জনপ্রিয় প্রশ্ন সমূহ
          <div style={styles.dropdownMenu}>
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div style={{ color: "red" }}>Error: {error}</div>
            ) : (
              menuData.map((menu, index) => (
                <div key={index}>
                  <strong>{menu.category}</strong>
                  {menu.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      style={{
                        ...styles.dropdownItem,
                        ...(idx === menu.items.length - 1 && styles.dropdownItemLast),
                      }}
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              ))
            )}
          </div>
        </div>
        <a href="/news" style={styles.menuItem}>
          সংবাদ
        </a>
        <a href="/view-all-exam" style={styles.menuItem}>
          সবপ্রশ্ন
        </a>
        <a href="/contact" style={styles.menuItem}>
          যোগাযোগ
        </a>
      </div>

      {/* Actions */}
      <div style={styles.actions}>
        {/* Search Button */}
        <button style={styles.button}>
          <FaSearch />
        </button>

        {/* Authentication Links */}
        {isAuthenticated ? (
          <div className="dropdown">
            <button style={styles.profileButton}>
              <FaUserCircle /> প্রোফাইল
            </button>
            <div style={styles.dropdownMenu}>
              <a href="/profile" style={styles.dropdownItem}>
                প্রোফাইল দেখুন
              </a>
              <button
                onClick={handleLogout}
                style={{ ...styles.dropdownItem, color: "red" }}
              >
                লগ আউট
              </button>
            </div>
          </div>
        ) : (
          <div style={styles.authLinks}>
            <a href="/login" style={styles.authLink}>
              সাইন-ইন
            </a>
            |
            <a href="/signup" style={styles.authLink}>
              সাইন আপ
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
