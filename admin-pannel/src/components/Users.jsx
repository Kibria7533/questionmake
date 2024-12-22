"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Users = () => {
  const token = useSelector((state) => state.user.userData?.token); // Access token from Redux
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [allPermissions, setAllPermissions] = useState([]);

  // Fetch users
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        alert("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Fetch all permissions
  const fetchAllPermissions = async () => {
    try {
      const response = await fetch(`${BASE_URL}/permissions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setAllPermissions(data);
      } else {
        alert("Failed to fetch permissions.");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Update user permissions
  const handleUpdatePermissions = async (userId, updatedPermissions) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}/permissions`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ permissions: updatedPermissions }),
      });
      if (response.ok) {
        alert("Permissions updated successfully.");
        setEditModal(null);
        fetchUsers(); // Refresh users
      } else {
        alert("Failed to update permissions.");
      }
    } catch (error) {
      console.error("Error updating permissions:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchAllPermissions();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(filter.toLowerCase()) ||
      user.email.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Users</h1>
      <input
        type="text"
        placeholder="Search by name or email"
        className="form-control mb-3"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.rolename}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => setEditModal(user)}
                >
                  Edit Permissions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Permissions Modal */}
      {editModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Permissions for {editModal.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                {allPermissions.length > 0 ? (
                  <ul>
                    {allPermissions.map((perm) => (
                      <li key={perm.id}>
                        <label>
                          <input
                            type="checkbox"
                            checked={editModal.permissions.some(
                              (p) => p.id === perm.id
                            )}
                            onChange={(e) => {
                              const updatedPermissions = e.target.checked
                                ? [...editModal.permissions, perm]
                                : editModal.permissions.filter((p) => p.id !== perm.id);
                              setEditModal({
                                ...editModal,
                                permissions: updatedPermissions,
                              });
                            }}
                          />{" "}
                          {perm.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Loading permissions...</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() =>
                    handleUpdatePermissions(
                      editModal.id,
                      editModal.permissions.map((perm) => perm.id)
                    )
                  }
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
