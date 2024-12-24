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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
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
      backgroundColor: "#fff",
      color: "#222",
      padding: "20px",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      display: isDropdownOpen ? "flex" : "none",
      zIndex: "999",
      flexWrap: "wrap",
      gap: "20px",
      minWidth: "400px",
      transition: "opacity 0.3s ease, transform 0.3s ease",
      opacity: isDropdownOpen ? "1" : "0",
      transform: isDropdownOpen ? "translateY(0)" : "translateY(-10px)",
    },
    dropdownCategory: {
      flex: "1 1 200px",
    },
    dropdownTitle: {
      fontWeight: "bold",
      marginBottom: "10px",
      borderBottom: "1px solid #ddd",
      paddingBottom: "5px",
    },
    dropdownItem: {
      padding: "5px 10px",
      textDecoration: "none",
      color: "#222",
      display: "block",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
      marginBottom: "5px",
    },
    dropdownItemHover: {
      backgroundColor: "#f0f0f0",
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
      position: "relative",
    },
    profileDropdown: {
      position: "absolute",
      top: "100%",
      right: "0",
      backgroundColor: "#fff",
      color: "#222",
      padding: "10px",
      borderRadius: "5px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      display: isProfileDropdownOpen ? "block" : "none",
      zIndex: "999",
      minWidth: "150px",
      transition: "opacity 0.3s ease, transform 0.3s ease",
      opacity: isProfileDropdownOpen ? "1" : "0",
      transform: isProfileDropdownOpen ? "translateY(0)" : "translateY(-10px)",
    },
    profileDropdownItem: {
      padding: "5px 10px",
      textDecoration: "none",
      color: "#222",
      display: "block",
      borderRadius: "5px",
      transition: "background-color 0.3s ease",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logo} onClick={() => router.push("/")}>
        লোগো
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
                <div style={styles.dropdownCategory} key={index}>
                  <div style={styles.dropdownTitle}>{menu.category}</div>
                  {menu.items.map((item, idx) => (
                    <a
                      key={idx}
                      href={item.link}
                      style={{
                        ...styles.dropdownItem,
                      }}
                      onMouseOver={(e) =>
                        (e.target.style.backgroundColor = styles.dropdownItemHover.backgroundColor)
                      }
                      onMouseOut={(e) =>
                        (e.target.style.backgroundColor = "transparent")
                      }
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
        {/* <button style={styles.button}>
          <FaSearch />
        </button> */}

        {/* Authentication Links */}
        {isAuthenticated ? (
          <div
            style={styles.profileButton}
            onMouseEnter={() => setIsProfileDropdownOpen(true)}
            onMouseLeave={() => setIsProfileDropdownOpen(false)}
          >
            <FaUserCircle /> প্রোফাইল
            <div style={styles.profileDropdown}>
              <a href="/profile" style={styles.profileDropdownItem}>
                প্রোফাইল দেখুন
              </a>
              <button
                onClick={handleLogout}
                style={{
                  ...styles.profileDropdownItem,
                  color: "red",
                  border: "none",
                  background: "none",
                  textAlign: "left",
                  width: "100%",
                }}
              >
                লগ আউট
              </button>
            </div>
          </div>
        ) : (
          <div>
            <a href="/login" style={{ marginRight: "10px" , color: "white"}}>
              সাইন-ইন
            </a>
            <a href="/signup" style={{ marginRight: "10px" , color: "white"}}>সাইন আপ</a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default MainNavbar;
