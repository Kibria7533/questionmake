"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Settings = () => {
  const [settings, setSettings] = useState({
    classes: ["Class 1", "Class 2", "Class 3"],
    subjects: ["Math", "Science", "English"],
    chapters: ["Chapter 1", "Chapter 2", "Chapter 3"],
    questionTypes: ["MCQ", "Fill in the Blanks", "Descriptive"],
  });

  const [selectedCategory, setSelectedCategory] = useState("classes");
  const [items, setItems] = useState(settings.classes);
  const [newItem, setNewItem] = useState("");
  const [editModal, setEditModal] = useState(null);
  const [viewModal, setViewModal] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setItems(settings[category]);
  };

  const handleAddItem = () => {
    if (newItem.trim() === "") return alert("Item cannot be empty");
    setSettings({
      ...settings,
      [selectedCategory]: [...settings[selectedCategory], newItem],
    });
    setNewItem("");
  };

  const handleDeleteItem = (item) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      setSettings({
        ...settings,
        [selectedCategory]: settings[selectedCategory].filter((i) => i !== item),
      });
    }
  };

  const handleEditSave = () => {
    setSettings({
      ...settings,
      [selectedCategory]: settings[selectedCategory].map((i, index) =>
        index === editModal.index ? editModal.value : i
      ),
    });
    setEditModal(null);
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Settings</h1>

      <div className="mb-4">
        <div className="btn-group w-100">
          {Object.keys(settings).map((category) => (
            <button
              key={category}
              className={`btn btn-${selectedCategory === category ? "primary" : "outline-primary"}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder={`Add new ${selectedCategory.slice(0, -1)}`}
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleAddItem}>
            Add
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>{selectedCategory.slice(0, -1)}</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => setViewModal(item)}
                >
                  View
                </button>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditModal({ value: item, index })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteItem(item)}
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
                <h5 className="modal-title">View {selectedCategory.slice(0, -1)}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{viewModal}</p>
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
                <h5 className="modal-title">Edit {selectedCategory.slice(0, -1)}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editModal.value}
                  onChange={(e) =>
                    setEditModal({ ...editModal, value: e.target.value })
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

export default Settings;
