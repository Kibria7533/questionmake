"use client";

import React, { useState, useEffect } from "react";

const Roles = () => {
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editingRoleName, setEditingRoleName] = useState("");
  const [userId, setUserId] = useState("");
  const [userRoleId, setUserRoleId] = useState("");

  // Fetch roles (dummy data for now)
  useEffect(() => {
    // Replace with API call to fetch roles
    setRoles([
      { id: 1, name: "Admin" },
      { id: 2, name: "Editor" },
      { id: 3, name: "Viewer" },
    ]);
  }, []);

  // Add a new role
  const handleAddRole = () => {
    if (!roleName) return alert("Role name is required");

    // Replace with API call to add role
    const newRole = { id: Date.now(), name: roleName };
    setRoles([...roles, newRole]);
    setRoleName("");
  };

  // Edit an existing role
  const handleEditRole = (id, name) => {
    setEditingRoleId(id);
    setEditingRoleName(name);
  };

  const handleSaveEdit = () => {
    if (!editingRoleName) return alert("Role name is required");

    // Replace with API call to update role
    setRoles(
      roles.map((role) =>
        role.id === editingRoleId ? { ...role, name: editingRoleName } : role
      )
    );
    setEditingRoleId(null);
    setEditingRoleName("");
  };

  // Delete a role
  const handleDeleteRole = (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    // Replace with API call to delete role
    setRoles(roles.filter((role) => role.id !== id));
  };

  // Assign role to user
  const handleAssignRole = () => {
    if (!userId || !userRoleId) return alert("Both User ID and Role ID are required");

    // Replace with API call to assign role
    alert(`Assigned role ID ${userRoleId} to user ID ${userId}`);
    setUserId("");
    setUserRoleId("");
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
      <h1 style={styles.title}>Roles Management</h1>

      {/* Add Role Form */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={handleAddRole}>
          Add Role
        </button>
      </div>

      {/* Assign Role to User */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          style={styles.input}
        />
        <select
          value={userRoleId}
          onChange={(e) => setUserRoleId(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
        <button style={styles.button} onClick={handleAssignRole}>
          Assign Role
        </button>
      </div>

      {/* Roles Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role, index) => (
            <tr
              key={role.id}
              style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
            >
              <td style={styles.td}>{role.id}</td>
              <td style={styles.td}>
                {editingRoleId === role.id ? (
                  <input
                    type="text"
                    value={editingRoleName}
                    onChange={(e) => setEditingRoleName(e.target.value)}
                    style={styles.input}
                  />
                ) : (
                  role.name
                )}
              </td>
              <td style={styles.td}>
                {editingRoleId === role.id ? (
                  <button style={styles.button} onClick={handleSaveEdit}>
                    Save
                  </button>
                ) : (
                  <button
                    style={styles.button}
                    onClick={() => handleEditRole(role.id, role.name)}
                  >
                    Edit
                  </button>
                )}
                <button
                  style={{ ...styles.button, ...styles.buttonDanger, marginLeft: "10px" }}
                  onClick={() => handleDeleteRole(role.id)}
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

export default Roles;
