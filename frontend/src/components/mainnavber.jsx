"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch } from "react-icons/fa";

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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleMouseEnter = () => setIsDropdownOpen(true);
  const handleMouseLeave = () => setIsDropdownOpen(false);

  return (
    <nav className="navbar navbar-expand-md navbar-dark bg-dark sticky-top px-4">
      <div className="container-fluid">
        {/* Brand */}
        <a className="navbar-brand fw-bold" href="/">
          QUESTIONHAT
        </a>

        {/* Navbar Links */}
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              aria-expanded={isDropdownOpen}
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
                      className="col-lg-4 border-end mb-3"
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

          {/* New News Menu */}
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

        {/* Search, Login, and Sign Up */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-primary">
            <FaSearch color="white" />
          </button>
          <div>
            <a href="/login" className="text-white me-2" style={{ textDecoration: "none" }}>
              Login
            </a>
            |
            <a href="/signup" className="text-white ms-2" style={{ textDecoration: "none" }}>
              Sign up
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNavbar;
