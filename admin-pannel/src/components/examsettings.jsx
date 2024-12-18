"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "http://localhost:4000/api";

const ExamSettings = () => {
  const [exams, setExams] = useState([]);
  const [examCategories, setExamCategories] = useState([]);
  const [newExam, setNewExam] = useState({ name: "", categoryId: "" });
  const [editExam, setEditExam] = useState(null);

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

  // Fetch Exams
  const fetchExams = async () => {
    try {
      const response = await fetch(`${BASE_URL}/exam`);
      const data = await response.json();
      setExams(data);
    } catch (error) {
      console.error("Failed to fetch exams:", error);
    }
  };

  // Add Exam
  const handleAddExam = async () => {
    if (!newExam.name || !newExam.categoryId) {
      return alert("Please provide both exam name and category.");
    }
    try {
      const response = await fetch(`${BASE_URL}/exam`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newExam.name,
          exam_category_id: Number(newExam.categoryId),
        }),
      });
      const data = await response.json();
      setExams([...exams, data]);
      setNewExam({ name: "", categoryId: "" });
    } catch (error) {
      console.error("Failed to add exam:", error);
    }
  };

  // Delete Exam
  const handleDeleteExam = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (!confirmDelete) return;
    try {
      await fetch(`${BASE_URL}/exam/${id}`, { method: "DELETE" });
      setExams(exams.filter((exam) => exam.id !== id));
    } catch (error) {
      console.error("Failed to delete exam:", error);
    }
  };

  // Update Exam
  const handleUpdateExam = async () => {
    if (!editExam.name || !editExam.categoryId) {
      return alert("Please provide both exam name and category.");
    }
    try {
      const response = await fetch(`${BASE_URL}/exam/${editExam.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editExam.name,
          exam_category_id: Number(editExam.categoryId),
        }),
      });
      const updatedExam = await response.json();
      setExams(
        exams.map((exam) => (exam.id === updatedExam.id ? updatedExam : exam))
      );
      setEditExam(null);
    } catch (error) {
      console.error("Failed to update exam:", error);
    }
  };

  useEffect(() => {
    fetchExamCategories();
    fetchExams();
  }, []);

  return (
    <div>
      <h3 className="text-secondary">Exam Settings</h3>

      {/* Add Exam */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Exam Name"
          value={newExam.name}
          onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
        />
        <select
          className="form-control me-2"
          value={newExam.categoryId}
          onChange={(e) => setNewExam({ ...newExam, categoryId: e.target.value })}
        >
          <option value="">Select Category</option>
          {examCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <button className="btn btn-success" onClick={handleAddExam}>
          Add
        </button>
      </div>

      {/* Exam List */}
      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Exam Name</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.id}>
              <td>{exam.name}</td>
              <td>
                {
                  examCategories.find((category) => category.id === exam.exam_category_id)
                    ?.name || "Unknown"
                }
              </td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => setEditExam({ ...exam, categoryId: exam.exam_category_id })}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDeleteExam(exam.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editExam && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Exam</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditExam(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editExam.name}
                  onChange={(e) => setEditExam({ ...editExam, name: e.target.value })}
                />
                <select
                  className="form-control"
                  value={editExam.categoryId}
                  onChange={(e) => setEditExam({ ...editExam, categoryId: e.target.value })}
                >
                  <option value="">Select Category</option>
                  {examCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleUpdateExam}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditExam(null)}
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

export default ExamSettings;
