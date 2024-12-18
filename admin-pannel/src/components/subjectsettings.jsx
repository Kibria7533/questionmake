"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const SubjectSettings = () => {
  const [subjects, setSubjects] = useState(["Math", "Science", "English"]);
  const [newSubject, setNewSubject] = useState("");
  const [editSubject, setEditSubject] = useState(null);

  // Add Subject
  const handleAddSubject = () => {
    if (!newSubject.trim()) {
      alert("Subject name cannot be empty.");
      return;
    }
    setSubjects([...subjects, newSubject.trim()]);
    setNewSubject("");
  };

  // Delete Subject
  const handleDeleteSubject = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
    if (!confirmDelete) return;
    setSubjects(subjects.filter((_, i) => i !== index));
  };

  // Update Subject
  const handleUpdateSubject = () => {
    if (!editSubject.name.trim()) {
      alert("Subject name cannot be empty.");
      return;
    }
    setSubjects(subjects.map((sub, i) => (i === editSubject.index ? editSubject.name.trim() : sub)));
    setEditSubject(null);
  };

  return (
    <div>
      <h3 className="text-secondary">Subject Settings</h3>

      {/* Add Subject */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add new subject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddSubject}>
          Add
        </button>
      </div>

      {/* Subject List */}
      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Subject Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((sub, index) => (
            <tr key={index}>
              <td>{sub}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditSubject({ name: sub, index })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteSubject(index)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editSubject && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Subject</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditSubject(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editSubject.name}
                  onChange={(e) => setEditSubject({ ...editSubject, name: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateSubject}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditSubject(null)}
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

export default SubjectSettings;
