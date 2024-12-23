"use client";

import React, { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Roles = () => {
  const [token, setToken] = useState(null); // Access token from localStorage
  const [roles, setRoles] = useState([]);
  const [permissionsByModule, setPermissionsByModule] = useState({});
  const [selectedRolePermissions, setSelectedRolePermissions] = useState([]);
  const [pendingPermissions, setPendingPermissions] = useState([]); // Collect changes here
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null); // Role currently being edited
  const [newRoleName, setNewRoleName] = useState(""); // For adding new role
  const [newRoleID, setNewRoleID] = useState(""); // For adding new role

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

  // Fetch all permissions
  const fetchPermissions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        // Group permissions by module
        const groupedPermissions = data.reduce((acc, perm) => {
          if (!acc[perm.module_id]) acc[perm.module_id] = [];
          acc[perm.module_id].push(perm);
          return acc;
        }, {});
        setPermissionsByModule(groupedPermissions);
      } else {
        alert("Failed to fetch permissions.");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Add a new role
  const addRole = async () => {
    if (!newRoleName.trim() || !newRoleID.trim()) {
      alert("Role name and Role ID are required.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newRoleName, role_id: parseInt(newRoleID, 10) }),
      });

      if (response.ok) {
        const newRole = await response.json();
        setRoles([...roles, newRole]);
        setNewRoleName("");
        setNewRoleID("");
        alert("Role added successfully!");
      } else {
        alert("Failed to add role.");
      }
    } catch (error) {
      console.error("Error adding role:", error);
    }
  };

  // Delete a role
  const deleteRole = async (role_id) => {
    if (!window.confirm("Are you sure you want to delete this role?")) {
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/roles/${role_id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setRoles(roles.filter((role) => role.id !== role_id));
        alert("Role deleted successfully!");
      } else {
        alert("Failed to delete role.");
      }
    } catch (error) {
      console.error("Error deleting role:", error);
    }
  };

  // Open modal to edit role
  const openEditModal = (role) => {
    setEditingRole(role);
  };

  // Close edit modal
  const closeEditModal = () => {
    setEditingRole(null);
  };

  // Save edited role
  const saveEditedRole = async () => {
    if (!editingRole.name.trim() || !editingRole.role_id) {
      alert("Role name and Role ID are required.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/roles/${editingRole.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingRole.name,
          role_id: parseInt(editingRole.role_id, 10),
        }),
      });

      if (response.ok) {
        const updatedRole = await response.json();
        setRoles((prevRoles) =>
          prevRoles.map((role) =>
            role.id === editingRole.id ? updatedRole : role
          )
        );
        closeEditModal();
        alert("Role updated successfully!");
      } else {
        alert("Failed to update role.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // Open permissions modal
  const openPermissionModal = (permissions, role_id) => {
    setSelectedRolePermissions(permissions.map((perm) => perm.id)); // Store assigned permissions
    setPendingPermissions(permissions.map((perm) => perm.id)); // Initialize pending changes
    setSelectedRoleId(role_id);
    setIsPermissionModalOpen(true);
  };

  // Close permissions modal
  const closePermissionModal = () => {
    setIsPermissionModalOpen(false);
    setSelectedRoleId(null);
    setSelectedRolePermissions([]);
    setPendingPermissions([]);
  };

  // Handle permission checkbox change
  const handlePermissionChange = (permissionId, isChecked) => {
    const updatedPermissions = isChecked
      ? [...pendingPermissions, permissionId]
      : pendingPermissions.filter((id) => id !== permissionId);
    setPendingPermissions(updatedPermissions);
  };

  // Save permissions changes
  const savePermissions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/roles/${selectedRoleId}/assign-permissions`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permission_ids: pendingPermissions }),
      });

      if (response.ok) {
        setSelectedRolePermissions(pendingPermissions);
        alert("Permissions updated successfully!");
        closePermissionModal();
      } else {
        alert("Failed to update permissions.");
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

         // Load token on client side
         useEffect(() => {
          if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("access_token");
            setToken(storedToken);
          }
        }, []);

  useEffect(() => {
    if(token){
      fetchRoles();
      fetchPermissions();
    }

  }, [token]);

  return (
    <div>
      <h1>Roles Management</h1>

      {/* Add Role */}
      <div>
        <input
          type="text"
          placeholder="Enter role name"
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter role ID"
          value={newRoleID}
          onChange={(e) => setNewRoleID(e.target.value)}
        />
        <button onClick={addRole}>Add Role</button>
      </div>

      {/* Roles Table */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id}>
              <td>{role.id}</td>
              <td>{role.name}</td>
              <td>{role.role_id}</td>
              <td>
                <button onClick={() => openEditModal(role)}>Edit</button>
                <button onClick={() => deleteRole(role.id)}>Delete</button>
                <button onClick={() => openPermissionModal(role.permissions, role.id)}>
                  Manage Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Role Modal */}
      {editingRole && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "400px",
            }}
          >
            <h3>Edit Role</h3>
            <div style={{ marginBottom: "10px" }}>
              <label>Role Name</label>
              <input
                type="text"
                value={editingRole.name}
                onChange={(e) =>
                  setEditingRole({ ...editingRole, name: e.target.value })
                }
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label>Role ID</label>
              <input
                type="text"
                value={editingRole.role_id}
                onChange={(e) =>
                  setEditingRole({
                    ...editingRole,
                    role_id: parseInt(e.target.value, 10),
                  })
                }
                style={{ width: "100%", padding: "8px", marginTop: "5px" }}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={saveEditedRole} style={{ padding: "10px 15px" }}>
                Save
              </button>
              <button onClick={closeEditModal} style={{ padding: "10px 15px" }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {isPermissionModalOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "8px",
              width: "600px",
              maxHeight: "80%",
              overflowY: "auto",
            }}
          >
            <h3>Manage Permissions for Role ID: {selectedRoleId}</h3>
            {Object.entries(permissionsByModule).map(
              ([moduleId, permissions]) => (
                <div key={moduleId}>
                  <h4>Module {moduleId}</h4>
                  <div>
                    {permissions.map((perm) => (
                      <div key={perm.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={pendingPermissions.includes(perm.id)}
                            onChange={(e) =>
                              handlePermissionChange(perm.id, e.target.checked)
                            }
                          />
                          {perm.name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )
            )}
            <button
              onClick={savePermissions}
              style={{
                marginTop: "20px",
                padding: "10px 15px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Save Permissions
            </button>
            <button
              onClick={closePermissionModal}
              style={{
                marginTop: "20px",
                marginLeft: "10px",
                padding: "10px 15px",
                backgroundColor: "#6c757d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
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
