"use client";

import React, { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Roles = () => {
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const [permissionsByModule, setPermissionsByModule] = useState({});
  const [selectedRolePermissions, setSelectedRolePermissions] = useState([]);
  const [pendingPermissions, setPendingPermissions] = useState([]);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState(null);

  // Fetch roles
  const fetchRoles = async () => {
    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        headers: { Authorization: `Bearer ${token}` },
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

  // Fetch permissions
  const fetchPermissions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/permissions`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        const groupedPermissions = data.reduce((acc, perm) => {
          const moduleId = perm.module_id;
          if (!acc[moduleId]) {
            acc[moduleId] = { module_name: perm.module_name, permissions: [] };
          }
          acc[moduleId].permissions.push(perm);
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

  // Open permissions modal
  const openPermissionModal = (permissions, role_id) => {
    setSelectedRolePermissions(permissions.map((perm) => perm.id));
    setPendingPermissions(permissions.map((perm) => perm.id));
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

  // Handle module select/deselect
  const handleModuleChange = (moduleId, isChecked) => {
    const modulePermissions = permissionsByModule[moduleId].permissions.map(
      (perm) => perm.id
    );
    const updatedPermissions = isChecked
      ? [...new Set([...pendingPermissions, ...modulePermissions])]
      : pendingPermissions.filter((id) => !modulePermissions.includes(id));
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
        alert("Permissions updated successfully!");
        closePermissionModal();
        fetchRoles(); // Refresh roles list after saving
      } else {
        alert("Failed to update permissions.");
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  // Open edit role modal
  const openEditModal = (role) => {
    setEditingRole(role);
  };

  // Close edit role modal
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
        alert("Role updated successfully!");
        setEditingRole(null);
        fetchRoles(); // Refresh roles after saving changes
      } else {
        alert("Failed to update role.");
      }
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  // Load token on client side
  useEffect(() => {
    const storedToken = localStorage.getItem("access_token");
    setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      fetchRoles();
      fetchPermissions();
    }
  }, [token]);

  return (
    <div style={{ fontFamily: "Arial, sans-serif", fontSize: "14px", color: "#333", padding: "20px" }}>
      <h1 style={{ fontSize: "20px", marginBottom: "20px", color: "#4A90E2" }}>Roles Management</h1>

      {/* Roles Table */}
      <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "20px" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Role ID</th>
            <th style={{ border: "1px solid #ccc", padding: "10px", textAlign: "left" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.map((role) => (
            <tr key={role.id} style={{ borderBottom: "1px solid #ccc" }}>
              <td style={{ padding: "10px" }}>{role.id}</td>
              <td style={{ padding: "10px" }}>{role.name}</td>
              <td style={{ padding: "10px" }}>{role.role_id}</td>
              <td style={{ padding: "10px" }}>
                <button
                  onClick={() => openEditModal(role)}
                  style={{
                    padding: "5px 10px",
                    marginRight: "10px",
                    backgroundColor: "#4CAF50",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => openPermissionModal(role.permissions, role.id)}
                  style={{
                    padding: "5px 10px",
                    backgroundColor: "#2196F3",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
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
            top: "0",
            left: "0",
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
            <h3 style={{ marginBottom: "15px" }}>Edit Role</h3>
            <label style={{ display: "block", marginBottom: "10px" }}>Role Name</label>
            <input
              type="text"
              value={editingRole.name}
              onChange={(e) =>
                setEditingRole({ ...editingRole, name: e.target.value })
              }
              style={{ width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <label style={{ display: "block", marginBottom: "10px" }}>Role ID</label>
            <input
              type="number"
              value={editingRole.role_id || ""}
              onChange={(e) =>
                setEditingRole({
                  ...editingRole,
                  role_id: parseInt(e.target.value, 10) || 0,
                })
              }
              style={{ width: "100%", padding: "10px", marginBottom: "15px", border: "1px solid #ccc", borderRadius: "4px" }}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={saveEditedRole}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                onClick={closeEditModal}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
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
            top: "0",
            left: "0",
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
            <h3 style={{ marginBottom: "20px" }}>Manage Permissions for Role ID: {selectedRoleId}</h3>
            {Object.entries(permissionsByModule).map(
              ([moduleId, moduleData]) => (
                <div key={moduleId}>
                  <h4 style={{ marginBottom: "10px" }}>
                    <label>
                      <input
                        type="checkbox"
                        checked={moduleData.permissions.every((perm) =>
                          pendingPermissions.includes(perm.id)
                        )}
                        onChange={(e) =>
                          handleModuleChange(moduleId, e.target.checked)
                        }
                      />
                      {moduleData.module_name} Module (Select All)
                    </label>
                  </h4>
                  <div style={{ marginLeft: "20px" }}>
                    {moduleData.permissions.map((perm) => (
                      <div key={perm.id} style={{ marginBottom: "5px" }}>
                        <label>
                          <input
                            type="checkbox"
                            checked={pendingPermissions.includes(perm.id)}
                            onChange={(e) =>
                              handlePermissionChange(
                                perm.id,
                                e.target.checked
                              )
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
            <div style={{ marginTop: "20px", textAlign: "right" }}>
              <button
                onClick={savePermissions}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#4CAF50",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  marginRight: "10px",
                }}
              >
                Save
              </button>
              <button
                onClick={closePermissionModal}
                style={{
                  padding: "10px 15px",
                  backgroundColor: "#f44336",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Roles;
