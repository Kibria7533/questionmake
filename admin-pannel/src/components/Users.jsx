"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Users = () => {
  const token = useSelector((state) => state.user.userData?.token); // Access token from Redux
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [viewModal, setViewModal] = useState(null);
  const [permissionsModal, setPermissionsModal] = useState(null);

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

  // Fetch user permissions
  const fetchUserPermissions = async (userId) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setPermissionsModal(data.permissions || []); // Assuming the API returns a permissions array
      } else {
        alert("Failed to fetch permissions.");
      }
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        alert("Failed to delete user.");
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
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
              <td>{user.role}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => setViewModal(user)}
                >
                  View
                </button>
                <button
                  className="btn btn-secondary me-2"
                  onClick={() => fetchUserPermissions(user.id)}
                >
                  View Permissions
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {viewModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>ID:</strong> {viewModal.id}</p>
                <p><strong>Name:</strong> {viewModal.name}</p>
                <p><strong>Email:</strong> {viewModal.email}</p>
                <p><strong>Role:</strong> {viewModal.role}</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewModal(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Modal */}
      {permissionsModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">User Permissions</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setPermissionsModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                {permissionsModal.length > 0 ? (
                  <ul>
                    {permissionsModal.map((perm, index) => (
                      <li key={index}>{perm.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No permissions assigned to this user.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setPermissionsModal(null)}
                >
                  Close
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
