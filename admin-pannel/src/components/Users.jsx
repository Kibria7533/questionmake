"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Users = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@example.com", role: "Admin" },
    { id: 2, name: "Bob", email: "bob@example.com", role: "Editor" },
    { id: 3, name: "Charlie", email: "charlie@example.com", role: "Viewer" },
  ]);

  const [filter, setFilter] = useState("");
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== id));
    }
  };

  const handleEditSave = () => {
    setUsers(
      users.map((user) =>
        user.id === editModal.id ? editModal : user
      )
    );
    setEditModal(null);
  };

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
        placeholder="Search by name, email, or phone number"
        className="form-control mb-3"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
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
                  className="btn btn-warning me-2"
                  onClick={() => setEditModal({ ...user })}
                >
                  Edit
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

      {/* Edit Modal */}
      {editModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit User</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editModal.name}
                  onChange={(e) =>
                    setEditModal({ ...editModal, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  value={editModal.email}
                  onChange={(e) =>
                    setEditModal({ ...editModal, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editModal.role}
                  onChange={(e) =>
                    setEditModal({ ...editModal, role: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditModal(null)}
                >
                  Cancel
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
