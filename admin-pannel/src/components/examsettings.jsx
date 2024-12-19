"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchExamCategories } from "../redux/examCategorySlice";
import { fetchExams, addExam, updateExam, deleteExam } from "../redux/examSlice";

const ExamSettings = () => {
  const dispatch = useDispatch();

  // Access Redux state
  const examCategories = useSelector((state) => state.examCategory.categories);
  const exams = useSelector((state) => state.exam.exams);
  const loading = useSelector((state) => state.exam.loading);

  const [newExam, setNewExam] = useState({ name: "", categoryId: "" });
  const [editExam, setEditExam] = useState(null);

  useEffect(() => {
    // Fetch categories and exams from Redux store
    dispatch(fetchExamCategories());
    dispatch(fetchExams());
  }, [dispatch]);

  const handleAddExam = () => {
    if (!newExam.name || !newExam.categoryId) {
      return alert("Please provide both exam name and category.");
    }
    dispatch(
      addExam({
        name: newExam.name,
        exam_category_id: Number(newExam.categoryId),
      })
    );
    setNewExam({ name: "", categoryId: "" });
  };

  const handleUpdateExam = () => {
    if (!editExam.name || !editExam.categoryId) {
      return alert("Please provide both exam name and category.");
    }
    dispatch(
      updateExam({
        id: editExam.id,
        name: editExam.name,
        exam_category_id: Number(editExam.categoryId),
      })
    );
    setEditExam(null);
  };

  const handleDeleteExam = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this exam?");
    if (confirmDelete) {
      dispatch(deleteExam(id));
    }
  };

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
      {loading ? (
        <p>Loading...</p>
      ) : (
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
      )}

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
