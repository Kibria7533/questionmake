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

const ExamCategorySettings = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.examCategory);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    feedback: "",
    logoPath: "",
    logoFile: null,
  });

  const [editCategory, setEditCategory] = useState(null);
  const [viewCategory, setViewCategory] = useState(null);

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
     // Parse plain text response
    const filePath = await response.text();
    console.log("Uploaded File Path:", filePath); // Debugging

    // Ensure the response is not empty
    if (!filePath) {
      throw new Error("File upload response is empty.");
    }

    return filePath.trim(); // Ensure no leading/trailing spaces
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

    // Upload the logo file if provided
    if (newCategory.logoFile) {
      logoPath = await uploadLogo(newCategory.logoFile);
      console.log("logopath",logoPath)
      if (!logoPath) return;
    }
    console.log("logopathggggggggggg",logoPath)
    const categoryData = {
      name: newCategory.name,
      description: newCategory.description,
      feedback: newCategory.feedback,
      logo_path: logoPath,
    };

    console.log("categoryData",categoryData)
    // Dispatch the add category action
    dispatch(addExamCategory(categoryData))
      .unwrap()
      .then(() => {
        alert("Exam category added successfully!");
        setNewCategory({ name: "", description: "", feedback: "", logoPath: "", logoFile: null });
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

    // Upload a new logo file if provided
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
      ) : (
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
                      src={`${process.env.NEXT_PUBLIC_API_URL}/${category.logo_path}`}
                      alt="Category Logo"
                      style={{ width: "50px", height: "50px" }}
                    />
                  )}
                </td>
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

      {/* View and Edit Modals (same as your previous implementation) */}
    </div>
  );
};

export default ExamCategorySettings;
