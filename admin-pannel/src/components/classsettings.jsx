"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ClassSettings = () => {
  const [classes, setClasses] = useState(["Class 1", "Class 2", "Class 3"]);
  const [newClass, setNewClass] = useState("");
  const [editClass, setEditClass] = useState(null);

  // Add Class
  const handleAddClass = () => {
    if (!newClass.trim()) {
      alert("Class name cannot be empty.");
      return;
    }
    setClasses([...classes, newClass.trim()]);
    setNewClass("");
  };

  // Delete Class
  const handleDeleteClass = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this class?");
    if (!confirmDelete) return;
    setClasses(classes.filter((_, i) => i !== index));
  };

  // Update Class
  const handleUpdateClass = () => {
    if (!editClass.name.trim()) {
      alert("Class name cannot be empty.");
      return;
    }
    setClasses(classes.map((cls, i) => (i === editClass.index ? editClass.name.trim() : cls)));
    setEditClass(null);
  };

  return (
    <div>
      <h3 className="text-secondary">Class Settings</h3>

      {/* Add Class */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add new class"
          value={newClass}
          onChange={(e) => setNewClass(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddClass}>
          Add
        </button>
      </div>

      {/* Class List */}
      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Class Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((cls, index) => (
            <tr key={index}>
              <td>{cls}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditClass({ name: cls, index })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteClass(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editClass && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Class</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditClass(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editClass.name}
                  onChange={(e) => setEditClass({ ...editClass, name: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateClass}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditClass(null)}
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

export default ClassSettings;