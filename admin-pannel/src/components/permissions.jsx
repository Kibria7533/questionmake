"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Permissions = () => {
  const token = localStorage.getItem("access_token"); // Access token from Redux
  const [permissions, setPermissions] = useState([]);
  const [groupedPermissions, setGroupedPermissions] = useState({});
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedPermissionId, setSelectedPermissionId] = useState("");

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

        // Group permissions by module_id
        const grouped = data.reduce((acc, perm) => {
          if (!acc[perm.module_id]) acc[perm.module_id] = [];
          acc[perm.module_id].push(perm);
          return acc;
        }, {});
        setPermissions(data);
        setGroupedPermissions(grouped);
      } else {
        alert("Failed to fetch permissions.");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRoles(data);
      } else {
        alert("Failed to fetch roles.");
      }
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  // Assign permission to role
  const handleAssignPermission = async () => {
    if (!selectedRoleId || !selectedPermissionId) {
      return alert("Both Role ID and Permission ID are required");
    }

    try {
      const response = await fetch(`${BASE_URL}/roles/${selectedRoleId}/assign-permissions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ permissionId: selectedPermissionId }),
      });

      if (response.ok) {
        alert(`Permission ID "${selectedPermissionId}" assigned to role ID ${selectedRoleId}`);
        setSelectedRoleId("");
        setSelectedPermissionId("");
      } else {
        alert("Failed to assign permission.");
      }
    } catch (error) {
      console.error("Error assigning permission:", error);
    }
  };

  useEffect(() => {
    fetchPermissions();
    fetchRoles();
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
    form: {
      display: "flex",
      alignItems: "center",
      marginBottom: "20px",
      gap: "10px",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
    },
    button: {
      padding: "10px 15px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      backgroundColor: "#004080",
      color: "white",
      transition: "background-color 0.3s",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "20px",
    },
    th: {
      backgroundColor: "#004080",
      color: "white",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ccc",
      padding: "10px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Permissions Management</h1>

      {/* Assign Permission to Role */}
      <div style={styles.form}>
        <select
          value={selectedRoleId}
          onChange={(e) => setSelectedRoleId(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <select
          value={selectedPermissionId}
          onChange={(e) => setSelectedPermissionId(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Permission</option>
          {permissions.map((perm) => (
            <option key={perm.id} value={perm.id}>
              {perm.name}
            </option>
          ))}
        </select>
        <button style={styles.button} onClick={handleAssignPermission}>
          Assign Permission
        </button>
      </div>

      {/* Permissions Table */}
      {Object.keys(groupedPermissions).map((moduleId) => (
        <div key={moduleId}>
          <h3>Module ID: {moduleId}</h3>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Permission Name</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {groupedPermissions[moduleId].map((perm) => (
                <tr key={perm.id}>
                  <td style={styles.td}>{perm.id}</td>
                  <td style={styles.td}>{perm.name}</td>
                  <td style={styles.td}>
                    <button
                      style={{ ...styles.button, backgroundColor: "#d9534f" }}
                      onClick={() => alert("Delete functionality can be added here.")}
                    >
                      Delete
                    </button>
                  </td>
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
