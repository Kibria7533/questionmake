"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const Users = () => {
  const [token, setToken] = useState(null);
  const [operators, setOperators] = useState([]);
  const [filter, setFilter] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [roles, setRoles] = useState([]); // Store available roles
  const [newOperator, setNewOperator] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "1", // Default to Male
    dob: "",
    password: "",
    confirm_password: "",
    status: true, // Default to Active
  });

  // Fetch all operators
  const fetchOperators = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOperators(data);
      } else {
        alert("Failed to fetch operators.");
      }
    } catch (error) {
      console.error("Error fetching operators:", error);
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

  // Add a new operator
  const handleAddOperator = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOperator),
      });
      if (response.ok) {
        const createdOperator = await response.json();
        setOperators([...operators, createdOperator]);
        setAddModal(false);
        setNewOperator({
          name: "",
          email: "",
          mobile: "",
          gender: "1",
          dob: "",
          password: "",
          confirm_password: "",
          status: true, // Reset to default Active
        });
      } else {
        const errorData = await response.json();
        alert(`Failed to add operator: ${errorData.message.join(", ")}`);
      }
    } catch (error) {
      console.error("Error adding operator:", error);
    }
  };

  // Update operator role
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
        alert("Operator role updated successfully!");
        setEditModal(null);
        fetchOperators(); // Refresh operators
      } else {
        alert("Failed to update operator role.");
      }
    } catch (error) {
      console.error("Error updating operator role:", error);
    }
  };

  // Toggle operator status (Activate/Deactivate)
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
        const updatedOperator = await response.json();
        setOperators(
          operators.map((operator) =>
            operator.id === updatedOperator.id ? updatedOperator : operator
          )
        );
      } else {
        alert("Failed to toggle operator status.");
      }
    } catch (error) {
      console.error("Error toggling operator status:", error);
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
      fetchOperators();
      fetchRoles();
    }

  }, [token]);

  const filteredOperators = operators.filter(
    (operator) =>
      operator.name.toLowerCase().includes(filter.toLowerCase()) ||
      operator.email.toLowerCase().includes(filter.toLowerCase()) ||
      operator.mobile.includes(filter)
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Users</h1>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by name, email, or phone number"
          className="form-control w-100"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
{/*         <button className="btn btn-success" onClick={() => setAddModal(true)}> */}
{/*           Add Operator */}
{/*         </button> */}
      </div>
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
          {filteredOperators.map((operator) => (
            <tr key={operator.id}>
              <td>{operator.id}</td>
              <td>{operator.name}</td>
              <td>{operator.email}</td>
              <td>{operator.rolename}</td>
              <td>{operator.status ? "Active" : "Inactive"}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => setEditModal(operator)}
                >
                  Edit
                </button>
                <button
                  className={`btn ${
                    operator.status ? "btn-danger" : "btn-success"
                  }`}
                  onClick={() => handleToggleStatus(operator.id, operator.status)}
                >
                  {operator.status ? "Deactivate" : "Activate"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Operator Modal */}
      {addModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Operator</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setAddModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Name"
                  value={newOperator.name}
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, name: e.target.value })
                  }
                />
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Email"
                  value={newOperator.email}
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, email: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  placeholder="Mobile"
                  value={newOperator.mobile}
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, mobile: e.target.value })
                  }
                />
                <select
                  className="form-control mb-2"
                  value={newOperator.gender}
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, gender: e.target.value })
                  }
                >
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </select>
                <input
                  type="date"
                  className="form-control mb-2"
                  placeholder="Date of Birth"
                  value={newOperator.dob}
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, dob: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Password"
                  value={newOperator.password}
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, password: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="form-control mb-2"
                  placeholder="Confirm Password"
                  value={newOperator.confirm_password}
                  onChange={(e) =>
                    setNewOperator({
                      ...newOperator,
                      confirm_password: e.target.value,
                    })
                  }
                />
                <select
                  className="form-control mb-2"
                  value={newOperator.status ? "true" : "false"}
                  onChange={(e) =>
                    setNewOperator({
                      ...newOperator,
                      status: e.target.value === "true",
                    })
                  }
                >
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddOperator}
                >
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setAddModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Operator Modal */}
      {editModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Operator: {editModal.name}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <form>
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
                          setEditModal({
                            ...editModal,
                            role: parseInt(e.target.value, 10),
                          })
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
