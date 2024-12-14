"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Operators = () => {
  const [operators, setOperators] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", phone: "123-456-7890", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", phone: "987-654-3210", status: "Inactive" },
  ]);

  const [filter, setFilter] = useState("");
  const [viewModal, setViewModal] = useState(null);
  const [editModal, setEditModal] = useState(null);
  const [addModal, setAddModal] = useState(false);
  const [newOperator, setNewOperator] = useState({
    name: "",
    email: "",
    phone: "",
    status: "Active",
  });

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this operator?");
    if (confirmDelete) {
      setOperators(operators.filter((operator) => operator.id !== id));
    }
  };

  const handleEditSave = () => {
    setOperators(
      operators.map((operator) =>
        operator.id === editModal.id ? editModal : operator
      )
    );
    setEditModal(null);
  };

  const handleAddSave = () => {
    const newId = Math.max(...operators.map((op) => op.id)) + 1;
    setOperators([...operators, { id: newId, ...newOperator }]);
    setNewOperator({ name: "", email: "", phone: "", status: "Active" });
    setAddModal(false);
  };

  const filteredOperators = operators.filter(
    (operator) =>
      operator.name.toLowerCase().includes(filter.toLowerCase()) ||
      operator.email.toLowerCase().includes(filter.toLowerCase()) ||
      operator.phone.includes(filter)
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
        <button
          className="btn btn-success"
          onClick={() => setAddModal(true)}
        >
          Add Operator
        </button>
      </div>
      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOperators.map((operator) => (
            <tr key={operator.id}>
              <td>{operator.name}</td>
              <td>{operator.email}</td>
              <td>{operator.phone}</td>
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
                <h5 className="modal-title">View Operator</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p><strong>Name:</strong> {viewModal.name}</p>
                <p><strong>Email:</strong> {viewModal.email}</p>
                <p><strong>Phone:</strong> {viewModal.phone}</p>
                <p><strong>Status:</strong> {viewModal.status}</p>
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
                <h5 className="modal-title">Edit Operator</h5>
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
                  value={editModal.phone}
                  onChange={(e) =>
                    setEditModal({ ...editModal, phone: e.target.value })
                  }
                />
                <select
                  className="form-control mb-2"
                  value={editModal.status}
                  onChange={(e) =>
                    setEditModal({ ...editModal, status: e.target.value })
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
                  placeholder="Phone"
                  value={newOperator.phone}
                  onChange={(e) =>
                    setNewOperator({ ...newOperator, phone: e.target.value })
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
