"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "http://localhost:4000/api";

const ExamCategorySettings = () => {
  const [examCategories, setExamCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);

  // Fetch Exam Categories
  const fetchExamCategories = async () => {
    try {
      const response = await fetch(`${BASE_URL}/exam-category`);
      const data = await response.json();
      setExamCategories(data);
    } catch (error) {
      console.error("Failed to fetch exam categories:", error);
    }
  };

  // Add Exam Category
  const handleAddExamCategory = async () => {
    if (!newCategory) return alert("Category name cannot be empty.");
    try {
      const response = await fetch(`${BASE_URL}/exam-category`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategory }),
      });
      const data = await response.json();
      setExamCategories([...examCategories, data]);
      setNewCategory("");
    } catch (error) {
      console.error("Failed to add exam category:", error);
    }
  };

  // Delete Exam Category
  const handleDeleteExamCategory = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this category?");
    if (!confirmDelete) return;
    try {
      await fetch(`${BASE_URL}/exam-category/${id}`, { method: "DELETE" });
      setExamCategories(examCategories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Failed to delete exam category:", error);
    }
  };

  // Update Exam Category
  const handleUpdateExamCategory = async () => {
    if (!editCategory.name) return alert("Category name cannot be empty.");
    try {
      const response = await fetch(`${BASE_URL}/exam-category/${editCategory.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editCategory.name }),
      });
      const updatedCategory = await response.json();
      setExamCategories(
        examCategories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        )
      );
      setEditCategory(null);
    } catch (error) {
      console.error("Failed to update exam category:", error);
    }
  };

  // Fetch View Exam Category
  const handleViewExamCategory = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/exam-category/${id}`);
      const data = await response.json();
      setViewCategory(data);
    } catch (error) {
      console.error("Failed to view exam category:", error);
    }
  };

  useEffect(() => {
    fetchExamCategories();
  }, []);

  return (
    <div>
      <h3 className="text-secondary">Exam Category Settings</h3>

      <div className="mb-3">
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button className="btn btn-success" onClick={handleAddExamCategory}>
            Add
          </button>
        </div>
      </div>

      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Category Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {examCategories.map((category) => (
            <tr key={category.id}>
              <td>{category.name}</td>
              <td>
                <button
                  className="btn btn-info me-2"
                  onClick={() => handleViewExamCategory(category.id)}
                >
                  View
                </button>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditCategory(category)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteExamCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* View Modal */}
      {viewCategory && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">View Exam Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setViewCategory(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  <strong>ID:</strong> {viewCategory.id}
                </p>
                <p>
                  <strong>Name:</strong> {viewCategory.name}
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setViewCategory(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editCategory && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Exam Category</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditCategory(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editCategory.name}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateExamCategory}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditCategory(null)}
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

export default ExamCategorySettings;
