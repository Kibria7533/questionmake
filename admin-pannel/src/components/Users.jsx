"use client";

import React, { useState, useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Users = () => {
  const [token, setToken] = useState(null); // State to store token
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [roles, setRoles] = useState([]); // Store available roles

  // Fetch users
  const fetchUsers = async () => {
    if (!token) return;

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
    if (!token) return;

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

  // Toggle user status (Activate/Deactivate)
  const handleToggleStatus = async (id, currentStatus) => {
    try {
      const response = await fetch(`${BASE_URL}/users/${id}/status`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: !currentStatus }), // Toggle status
      });
      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(
          users.map((user) =>
            user.id === updatedUser.id ? updatedUser : user
          )
        );
      } else {
        alert("Failed to toggle user status.");
      }
    } catch (error) {
      console.error("Error toggling user status:", error);
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

  // Load token on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token");
      setToken(storedToken);
    }
  }, []);

  // Fetch users and roles when token is available
  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchRoles();
    }
  }, [token]);

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
            <th>Status</th>
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
              <td>{user.status ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => setEditModal(user)}
                >
                  Edit
                </button>
                <button
                  className={`btn ${
                    user.status ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => handleToggleStatus(user.id, user.status)}
                >
                  {user.status ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
