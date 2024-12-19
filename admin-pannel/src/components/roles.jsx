"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const BASE_URL = "http://localhost:4000/api";

const Roles = () => {
  const token = useSelector((state) => state.user.userData?.token); // Access token from Redux
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editingRoleName, setEditingRoleName] = useState("");
  const [userId, setUserId] = useState("");
  const [userRoleId, setUserRoleId] = useState("");

  const [permissions, setPermissions] = useState([]);
  const [selectedRolePermissions, setSelectedRolePermissions] = useState([]);

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

  // Fetch permissions for a role
  const fetchPermissions = async (roleId) => {
    try {
      const response = await fetch(`${BASE_URL}/roles/${roleId}/permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedRolePermissions(data);
      } else {
        alert("Failed to fetch permissions.");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Add a new role
  const handleAddRole = async () => {
    if (!roleName) return alert("Role name is required");

    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: roleName }),
      });
      if (response.ok) {
        const newRole = await response.json();
        setRoles([...roles, newRole]);
        setRoleName("");
      } else {
        alert("Failed to add role.");
      }
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  // Edit an existing role
  const handleEditRole = (id, name) => {
    setEditingRoleId(id);
    setEditingRoleName(name);
  };

  const handleSaveEdit = async () => {
    if (!editingRoleName) return alert("Role name is required");

    try {
      const response = await fetch(`${BASE_URL}/roles/${editingRoleId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editingRoleName }),
      });
      if (response.ok) {
        const updatedRole = await response.json();
        setRoles(
          roles.map((role) =>
            role.id === editingRoleId ? { ...role, name: updatedRole.name } : role
          )
        );
        setEditingRoleId(null);
        setEditingRoleName("");
      } else {
        alert("Failed to update role.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // Delete a role
  const handleDeleteRole = async (id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) return;

    try {
      const response = await fetch(`${BASE_URL}/roles/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setRoles(roles.filter((role) => role.id !== id));
      } else {
        alert("Failed to delete role.");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  // Assign role to user
  const handleAssignRole = async () => {
    if (!userId || !userRoleId) return alert("Both User ID and Role ID are required");

    try {
      const response = await fetch(`${BASE_URL}/roles/${userRoleId}/assign-permissions`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        alert("Role assigned successfully.");
        setUserId("");
        setUserRoleId("");
      } else {
        alert("Failed to assign role.");
      }
    } catch (error) {
      console.error("Error assigning role:", error);
    }
  };

  useEffect(() => {
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
                <button
                  style={{ ...styles.button, marginLeft: "10px" }}
                  onClick={() => fetchPermissions(role.id)}
                >
                  View Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Display Permissions */}
      {selectedRolePermissions.length > 0 && (
        <div>
          <h3>Permissions for Selected Role:</h3>
          <ul>
            {selectedRolePermissions.map((perm) => (
              <li key={perm.id}>{perm.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Roles;
