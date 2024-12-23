"use client";

import React, { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Permissions = () => {
  const token = localStorage.getItem("access_token");
  const [groupedPermissions, setGroupedPermissions] = useState({});

  // Fetch permissions
  const fetchPermissions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();

        // Group permissions by module_name
        const grouped = data.reduce((acc, perm) => {
          if (!acc[perm.module_name]) acc[perm.module_name] = [];
          acc[perm.module_name].push(perm);
          return acc;
        }, {});
        setGroupedPermissions(grouped);
      } else {
        alert("Failed to fetch permissions.");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  const styles = {
    container: {
      padding: "20px",
      fontFamily: "'Poppins', sans-serif",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    moduleTitle: {
      fontSize: "1rem",
      fontWeight: "bold",
      margin: "10px 0",
      color: "#333",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
      fontSize: "0.9rem", // Smaller font
    },
    th: {
      backgroundColor: "#004080",
      color: "white",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ccc",
      padding: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Permissions Management</h1>

      {/* Permissions Table */}
      {Object.keys(groupedPermissions).map((moduleName) => (
        <div key={moduleName}>
          <h3 style={styles.moduleTitle}>{moduleName}</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Permission Name</th>
              </tr>
            </thead>
            <tbody>
              {groupedPermissions[moduleName].map((perm) => (
                <tr key={perm.id}>
                  <td style={styles.td}>{perm.id}</td>
                  <td style={styles.td}>{perm.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Permissions;
