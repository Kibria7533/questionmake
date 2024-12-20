"use client";

import React, { useState, useEffect } from "react";

const BASE_URL = "http://localhost:4000/api";

const Roles = () => {
  const token = localStorage.getItem("access_token"); // Access token from Redux
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editingRoleId, setEditingRoleId] = useState(null);
  const [editingRoleName, setEditingRoleName] = useState("");
  const [selectedRolePermissions, setSelectedRolePermissions] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

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

  // Add a new role
  const addRole = async () => {
    if (!roleName.trim()) {
      alert("Role name is required");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
  const editRole = (roleId, name) => {
    setEditingRoleId(roleId);
    setEditingRoleName(name);
  };

  const saveEditedRole = async () => {
    if (!editingRoleName.trim()) {
      alert("Role name is required");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/roles/${editingRoleId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: editingRoleName }),
      });

      if (response.ok) {
        const updatedRole = await response.json();
        setRoles(roles.map((role) => (role.id === editingRoleId ? updatedRole : role)));
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
  const deleteRole = async (roleId) => {
    if (!window.confirm("Are you sure you want to delete this role?")) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/roles/${roleId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRoles(roles.filter((role) => role.id !== roleId));
      } else {
        alert("Failed to delete role.");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  // Open modal and set permissions
  const openPermissionModal = (permissions, roleId) => {
    setSelectedRolePermissions(permissions);
    setSelectedRoleId(roleId);
    setIsPermissionModalOpen(true);
  };

  // Close Permission Modal
  const closePermissionModal = () => {
    setIsPermissionModalOpen(false);
    setSelectedRoleId(null);
    setSelectedRolePermissions([]);
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
      marginBottom: "20px",
    },
    input: {
      padding: "10px",
      marginRight: "10px",
      borderRadius: "5px",
      border: "1px solid #ccc",
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
    modal: {
      position: "fixed",
      top: "0",
      left: "0",
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    modalContent: {
      backgroundColor: "white",
      padding: "20px",
      borderRadius: "5px",
      width: "50%",
      maxHeight: "80%",
      overflowY: "auto",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Roles Management</h1>

      {/* Add Role */}
      <div style={styles.form}>
        <input
          type="text"
          placeholder="Enter role name"
          value={roleName}
          onChange={(e) => setRoleName(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={addRole}>Add Role</button>
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
          {roles.map((role) => (
            <tr key={role.id}>
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
                  <button style={styles.button} onClick={saveEditedRole}>Save</button>
                ) : (
                  <button style={styles.button} onClick={() => editRole(role.id, role.name)}>Edit</button>
                )}
                <button
                  style={{ ...styles.button, ...styles.buttonDanger, marginLeft: "10px" }}
                  onClick={() => deleteRole(role.id)}
                >
                  Delete
                </button>
                <button
                  style={{ ...styles.button, marginLeft: "10px" }}
                  onClick={() => openPermissionModal(role.permissions, role.id)}
                >
                  View Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Permission Modal */}
      {isPermissionModalOpen && (
        <div style={styles.modal}>
          <div style={styles.modalContent}>
            <h3>Permissions for Role ID: {selectedRoleId}</h3>
            {selectedRolePermissions.length > 0 ? (
              <ul>
                {selectedRolePermissions.map((perm) => (
                  <li key={perm.id}>{perm.name}</li>
                ))}
              </ul>
            ) : (
              <p>No permissions assigned to this role.</p>
            )}
            <button
              style={{ ...styles.button, marginTop: "20px" }}
              onClick={closePermissionModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
