"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Users = () => {
  const token = localStorage.getItem("access_token"); // Access token from localStorage
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [roles, setRoles] = useState([]); // Store available roles

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

  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      const response = await fetch(`${BASE_URL}/roles`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "*/*",
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

  // Update user role
  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/change-role`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: editModal.id,
          role: editModal.role,
        }),
      });
      if (response.ok) {
        alert("User role updated successfully!");
        setEditModal(null);
        fetchUsers(); // Refresh users
      } else {
        alert("Failed to update user role.");
      }
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
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
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit User Modal */}
      {editModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User: {editModal.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  {/* User Details */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={editModal.name}
                        disabled
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="email" className="form-label">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={editModal.email}
                        disabled
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="role" className="form-label">
                        Role
                      </label>
                      <select
                        className="form-select"
                        id="role"
                        value={editModal.role}
                        onChange={(e) =>
                          setEditModal({ ...editModal, role: parseInt(e.target.value, 10) })
                        }
                      >
                        <option value="">Select Role</option>
                        {roles.map((role) => (
                          <option key={role.id} value={role.id}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Permissions */}
                  <div className="mb-3">
                    <h5 className="form-label">Permissions</h5>
                    <div className="row">
                      {editModal.permissions.map((perm) => (
                        <div className="col-md-4" key={perm.id}>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`perm-${perm.id}`}
                              checked
                              disabled
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`perm-${perm.id}`}
                            >
                              {perm.name}
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </form>
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
                  onClick={handleSaveChanges}
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
