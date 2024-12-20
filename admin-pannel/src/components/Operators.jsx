"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "http://localhost:4000/api";

const Operators = () => {
  const token = localStorage.getItem("access_token");
  const [operators, setOperators] = useState([]);
  const [filter, setFilter] = useState("");
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [newOperator, setNewOperator] = useState({
    name: "",
    email: "",
    mobile: "",
    gender: "1", // Default to Male
    dob: "",
    password: "",
    confirm_password: "",
    status: "Active",
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

  // Add a new operator
  const handleAddSave = async () => {
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
        const newOperatorData = await response.json();
        setOperators([...operators, newOperatorData]);
        setNewOperator({
          name: "",
          email: "",
          mobile: "",
          gender: "1",
          dob: "",
          password: "",
          confirm_password: "",
          status: "Active",
        });
        setAddModal(false);
      } else {
        const errorData = await response.json();
        alert(`Failed to add operator: ${errorData.message.join(", ")}`);
      }
    } catch (error) {
      console.error("Error adding operator:", error);
    }
  };

  // Edit an operator
  const handleEditSave = async () => {
    try {
      const response = await fetch(`${BASE_URL}/users/${editModal.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editModal),
      });
      if (response.ok) {
        const updatedOperator = await response.json();
        setOperators(
          operators.map((operator) =>
            operator.id === updatedOperator.id ? updatedOperator : operator
          )
        );
        setEditModal(null);
      } else {
        alert("Failed to update operator.");
      }
    } catch (error) {
      console.error("Error updating operator:", error);
    }
  };

  // Delete an operator
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this operator?")) return;

    try {
      const response = await fetch(`${BASE_URL}/users/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setOperators(operators.filter((operator) => operator.id !== id));
      } else {
        alert("Failed to delete operator.");
      }
    } catch (error) {
      console.error("Error deleting operator:", error);
    }
  };

  useEffect(() => {
    fetchOperators();
  }, []);

  const filteredOperators = operators.filter(
    (operator) =>
      operator.name.toLowerCase().includes(filter.toLowerCase()) ||
      operator.email.toLowerCase().includes(filter.toLowerCase()) ||
      operator.mobile.includes(filter)
  );

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Operators</h1>
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Search by name, email, or phone number"
          className="form-control w-75"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className="btn btn-success" onClick={() => setAddModal(true)}>
          Add Operator
        </button>
      </div>
      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOperators.map((operator) => (
            <tr key={operator.id}>
              <td>{operator.name}</td>
              <td>{operator.email}</td>
              <td>{operator.mobile}</td>
              <td>{operator.status}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => setViewModal(operator)}
                >
                  View
                </button>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditModal({ ...operator })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(operator.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Modal */}
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
                    setNewOperator({ ...newOperator, confirm_password: e.target.value })
                  }
                />
                <select
                  className="form-control mb-2"
                  value={newOperator.status}
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, status: e.target.value })
                  }
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleAddSave}
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
    </div>
  );
};

export default Operators;
