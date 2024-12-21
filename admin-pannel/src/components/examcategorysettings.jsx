"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchExamCategories,
  addExamCategory,
  updateExamCategory,
  deleteExamCategory,
} from "../redux/examCategorySlice";
import { Modal, Button, Form } from "react-bootstrap";

const ExamCategorySettings = () => {
  const dispatch = useDispatch();
  const { categories = [], loading } = useSelector((state) => state.examCategory);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    feedback: "",
    logoPath: "",
  });

  const [editCategory, setEditCategory] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    dispatch(fetchExamCategories());
  }, [dispatch]);

  const uploadLogo = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/file-upload/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to upload logo.");
      }

      const filePath = await response.text();
      return filePath.trim();
    } catch (error) {
      console.error("Error uploading logo:", error);
      alert("Failed to upload logo. Please try again.");
      return null;
    }
  };

  const handleAddExamCategory = async () => {
    if (!newCategory.name || !newCategory.description) {
      return alert("Category name and description cannot be empty.");
    }

    let logoPath = newCategory.logoPath;

    if (newCategory.logoFile) {
      logoPath = await uploadLogo(newCategory.logoFile);
      if (!logoPath) return;
    }

    const categoryData = {
      name: newCategory.name,
      description: newCategory.description,
      feedback: newCategory.feedback,
      logo_path: logoPath,
    };

    dispatch(addExamCategory(categoryData))
      .unwrap()
      .then(() => {
        alert("Exam category added successfully!");
        setNewCategory({ name: "", description: "", feedback: "", logoPath: "" });
      })
      .catch((error) => {
        console.error("Error adding category:", error);
        alert("Failed to add exam category. Please try again.");
      });
  };

  const handleUpdateExamCategory = async () => {
    if (!editCategory.name || !editCategory.description) {
      return alert("Category name and description cannot be empty.");
    }

    let logoPath = editCategory.logo_path;

    if (editCategory.logo) {
      logoPath = await uploadLogo(editCategory.logo);
      if (!logoPath) return;
    }

    const categoryData = {
      id: editCategory.id,
      name: editCategory.name,
      description: editCategory.description,
      feedback: editCategory.feedback,
      logo_path: logoPath,
    };

    dispatch(updateExamCategory(categoryData))
      .unwrap()
      .then(() => {
        alert("Exam category updated successfully!");
        setShowEditModal(false);
        setEditCategory(null);
      })
      .catch((error) => {
        console.error("Error updating category:", error);
        alert("Failed to update exam category. Please try again.");
      });
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
        <div className="d-flex flex-column">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Category Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
          />
          <textarea
            className="form-control mb-2"
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
          />
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Feedback"
            value={newCategory.feedback}
            onChange={(e) =>
              setNewCategory({ ...newCategory, feedback: e.target.value })
            }
          />
          <input
            type="file"
            className="form-control mb-2"
            onChange={(e) =>
              setNewCategory({ ...newCategory, logoFile: e.target.files[0] })
            }
          />
          <button className="btn btn-success" onClick={handleAddExamCategory}>
            Add
          </button>
        </div>
      </div>

      {loading ? (
        <p>Loading categories...</p>
      ) : categories.length > 0 ? (
        <table className="table table-bordered">
          <thead className="bg-primary text-white">
            <tr>
              <th>Category Name</th>
              <th>Description</th>
              <th>Feedback</th>
              <th>Logo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>{category.description}</td>
                <td>{category.feedback}</td>
                <td>
                  {category.logo_path && (
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}/file-upload/view-file/${category.logo_path}`}
                      alt="Category Logo"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() => {
                      setEditCategory(category);
                      setShowEditModal(true);
                    }}
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
      ) : (
        <p>No categories available.</p>
      )}

      {/* Edit Modal */}
      {editCategory && (
        <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Exam Category</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  type="text"
                  value={editCategory.name}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, name: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  value={editCategory.description}
                  onChange={(e) =>
                    setEditCategory({
                      ...editCategory,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Feedback</Form.Label>
                <Form.Control
                  type="text"
                  value={editCategory.feedback}
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, feedback: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Upload Logo</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) =>
                    setEditCategory({ ...editCategory, logo: e.target.files[0] })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateExamCategory}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ExamCategorySettings;
