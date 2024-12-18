"use client";

import React, { useState, useEffect } from "react";

const Permissions = () => {
  const [permissions, setPermissions] = useState([]);
  const [permissionKey, setPermissionKey] = useState("");
  const [roles, setRoles] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState("");
  const [selectedPermissionKey, setSelectedPermissionKey] = useState("");

  // Fetch permissions and roles (dummy data for now)
  useEffect(() => {
    // Replace with API call to fetch permissions
    setPermissions([
      { id: 1, key: "view_dashboard" },
      { id: 2, key: "edit_users" },
      { id: 3, key: "manage_roles" },
    ]);

    // Replace with API call to fetch roles
    setRoles([
      { id: 1, name: "Admin" },
      { id: 2, name: "Editor" },
      { id: 3, name: "Viewer" },
    ]);
  }, []);

  // Add a new permission
  const handleAddPermission = () => {
    if (!permissionKey) return alert("Permission key is required");

    // Replace with API call to add permission
    const newPermission = { id: Date.now(), key: permissionKey };
    setPermissions([...permissions, newPermission]);
    setPermissionKey("");
  };

  // Assign permission to role
  const handleAssignPermission = () => {
    if (!selectedRoleId || !selectedPermissionKey)
      return alert("Both Role ID and Permission Key are required");

    // Replace with API call to assign permission
    alert(
      `Assigned permission "${selectedPermissionKey}" to role ID ${selectedRoleId}`
    );
    setSelectedRoleId("");
    setSelectedPermissionKey("");
  };

  // Delete a permission
  const handleDeletePermission = (id) => {
    if (!window.confirm("Are you sure you want to delete this permission?"))
      return;

    // Replace with API call to delete permission
    setPermissions(permissions.filter((perm) => perm.id !== id));
  };

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
    buttonDanger: {
      backgroundColor: "#d9534f",
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
    rowEven: {
      backgroundColor: "#f9f9f9",
    },
    rowOdd: {
      backgroundColor: "#fff",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Permissions Management</h1>

      {/* Add Permission Form */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter permission key"
          value={permissionKey}
          onChange={(e) => setPermissionKey(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleAddPermission}>
          Add Permission
        </button>
      </div>

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
          value={selectedPermissionKey}
          onChange={(e) => setSelectedPermissionKey(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Permission</option>
          {permissions.map((perm) => (
            <option key={perm.id} value={perm.key}>
              {perm.key}
            </option>
          ))}
        </select>
        <button style={styles.button} onClick={handleAssignPermission}>
          Assign Permission
        </button>
      </div>

      {/* Permissions Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Key</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {permissions.map((perm, index) => (
            <tr
              key={perm.id}
              style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
            >
              <td style={styles.td}>{perm.id}</td>
              <td style={styles.td}>{perm.key}</td>
              <td style={styles.td}>
                <button
                  style={{
                    ...styles.button,
                    ...styles.buttonDanger,
                    marginLeft: "10px",
                  }}
                  onClick={() => handleDeletePermission(perm.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Permissions;
