"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext"; // Import AuthContext

const menuData = [
  {
    category: "Engineering",
    items: [
      { name: "GATE", link: "/exams/gate" },
      { name: "JEE", link: "/exams/jee" },
      { name: "IES", link: "/exams/ies" },
    ],
  },
  {
    category: "Medical",
    items: [
      { name: "NEET", link: "/exams/neet" },
      { name: "AIIMS", link: "/exams/aiims" },
      { name: "JIPMER", link: "/exams/jipmer" },
    ],
  },
  {
    category: "Government",
    items: [
      { name: "UPSC", link: "/exams/upsc" },
      { name: "SSC", link: "/exams/ssc" },
      { name: "Railways", link: "/exams/railways" },
    ],
  },
];

const MainNavbar = () => {
  const { isLoggedIn, logout } = useAuth(); // Use global authentication state
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/login"); // Redirect to login page after logout
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top px-3">
      <div className="container-fluid">
        {/* Toggler for small screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Home */}
            <li className="nav-item">
              <a className="nav-link active" href="/">
                HOME
              </a>
            </li>

            {/* Mega Menu */}
            <li
              className={`nav-item dropdown position-static ${
                isDropdownOpen ? "show" : ""
              }`}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                POPULAR EXAMS
              </a>
              <div
                className={`dropdown-menu w-100 p-3 shadow ${
                  isDropdownOpen ? "show" : ""
                }`}
                aria-labelledby="navbarDropdown"
              >
                <div className="container">
                  <div className="row">
                    {menuData.map((menu, index) => (
                      <div
                        key={index}
                        className="col-md-4 border-end mb-3"
                        style={{ paddingLeft: "10px" }}
                      >
                        <h6 className="text-primary">{menu.category}</h6>
                        <ul className="list-unstyled">
                          {menu.items.map((item, idx) => (
                            <li key={idx} className="mb-1">
                              <a href={item.link} className="text-dark">
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </li>

            {/* Other Links */}
            <li className="nav-item">
              <a className="nav-link" href="/news">
                NEWS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/view-all-exam">
                VIEW ALL EXAMS
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact">
                CONTACT
              </a>
            </li>
          </ul>

          {/* Search, Login/Signup or Profile */}
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-primary">
              <FaSearch color="white" />
            </button>

            {isLoggedIn ? (
              // Profile Dropdown
              <div className="dropdown">
                <button
                  className="btn btn-outline-light dropdown-toggle"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle size={20} /> Profile
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <a className="dropdown-item" href="/profile">
                      View Profile
                    </a>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              // Login and Signup Links
              <div>
                <a
                  href="/login"
                  className="text-white me-2"
                  style={{ textDecoration: "none" }}
                >
                  Login
                </a>
                |
                <a
                  href="/signup"
                  className="text-white ms-2"
                  style={{ textDecoration: "none" }}
                >
                  Sign up
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
