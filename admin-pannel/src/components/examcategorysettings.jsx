"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import {fetchExamCategories,addExamCategory,updateExamCategory,deleteExamCategory} from "../redux/examCategorySlice";

const ExamCategorySettings = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.examCategory);

  const [newCategory, setNewCategory] = useState("");
  const [editCategory, setEditCategory] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);

  useEffect(() => {
    dispatch(fetchExamCategories());
  }, [dispatch]);

  const handleAddExamCategory = () => {
    if (!newCategory) return alert("Category name cannot be empty.");
    dispatch(addExamCategory(newCategory));
    setNewCategory("");
  };

  const handleUpdateExamCategory = () => {
    if (!editCategory.name) return alert("Category name cannot be empty.");
    dispatch(updateExamCategory(editCategory));
    setEditCategory(null);
  };

  const handleDeleteExamCategory = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (confirmDelete) {
      dispatch(deleteExamCategory(id));
    }
  };

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

      {loading ? (
        <p>Loading categories...</p>
      ) : (
        <table className="table table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th>Category Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <button
                    className="btn btn-info me-2"
                    onClick={() => setViewCategory(category)}
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
      )}

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
