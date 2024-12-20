"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchExamCategories } from "../redux/examCategorySlice";
import { fetchExams, addExam, updateExam, deleteExam } from "../redux/examSlice";

const ExamSettings = () => {
  const dispatch = useDispatch();

  const examCategories = useSelector((state) => state.examCategory.categories);
  const exams = useSelector((state) => state.exam.exams);
  const loading = useSelector((state) => state.exam.loading);

  const [newExam, setNewExam] = useState({
    name: "",
    categoryId: "",
    questions: "",
    passed: "",
    score: "",
    description: "",
  });

  const [editExam, setEditExam] = useState(null);

  useEffect(() => {
    dispatch(fetchExamCategories());
    dispatch(fetchExams());
  }, [dispatch]);

  const handleAddExam = () => {
    if (
      !newExam.name ||
      !newExam.categoryId ||
      !newExam.questions ||
      !newExam.passed ||
      !newExam.score ||
      !newExam.description
    ) {
      return alert("Please fill out all fields.");
    }
    dispatch(
      addExam({
        name: newExam.name,
        exam_category_id: Number(newExam.categoryId),
        questions: Number(newExam.questions),
        passed: Number(newExam.passed),
        score: newExam.score,
        description: newExam.description,
      })
    );
    setNewExam({
      name: "",
      categoryId: "",
      questions: "",
      passed: "",
      score: "",
      description: "",
    });
  };

  const handleUpdateExam = () => {
    if (
      !editExam.name ||
      !editExam.categoryId ||
      !editExam.questions ||
      !editExam.passed ||
      !editExam.score ||
      !editExam.description
    ) {
      return alert("Please fill out all fields.");
    }
    dispatch(
      updateExam({
        id: editExam.id,
        name: editExam.name,
        exam_category_id: Number(editExam.categoryId),
        questions: Number(editExam.questions),
        passed: Number(editExam.passed),
        score: editExam.score,
        description: editExam.description,
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
      <div className="mb-3">
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Exam Name"
          value={newExam.name}
          onChange={(e) => setNewExam({ ...newExam, name: e.target.value })}
        />
        <select
          className="form-control mb-2"
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
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Number of Questions"
          value={newExam.questions}
          onChange={(e) => setNewExam({ ...newExam, questions: e.target.value })}
        />
        <input
          type="number"
          className="form-control mb-2"
          placeholder="Number of Students Passed"
          value={newExam.passed}
          onChange={(e) => setNewExam({ ...newExam, passed: e.target.value })}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Average Score (e.g., '95.1%')"
          value={newExam.score}
          onChange={(e) => setNewExam({ ...newExam, score: e.target.value })}
        />
        <textarea
          className="form-control mb-2"
          placeholder="Description"
          value={newExam.description}
          onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
        />
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
              <th>Questions</th>
              <th>Passed</th>
              <th>Score</th>
              <th>Description</th>
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
                <td>{exam.questions}</td>
                <td>{exam.passed}</td>
                <td>{exam.score}</td>
                <td>{exam.description}</td>
                <td>
                  <button
                    className="btn btn-warning me-2"
                    onClick={() =>
                      setEditExam({
                        ...exam,
                        categoryId: exam.exam_category_id,
                      })
                    }
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
                <div className="mb-3">
                  <label className="form-label">Exam Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editExam.name}
                    onChange={(e) =>
                      setEditExam({ ...editExam, name: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
                    className="form-control"
                    value={editExam.categoryId}
                    onChange={(e) =>
                      setEditExam({ ...editExam, categoryId: e.target.value })
                    }
                  >
                    <option value="">Select Category</option>
                    {examCategories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Number of Questions</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editExam.questions}
                    onChange={(e) =>
                      setEditExam({ ...editExam, questions: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Number of Students Passed</label>
                  <input
                    type="number"
                    className="form-control"
                    value={editExam.passed}
                    onChange={(e) =>
                      setEditExam({ ...editExam, passed: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Average Score</label>
                  <input
                    type="text"
                    className="form-control"
                    value={editExam.score}
                    onChange={(e) =>
                      setEditExam({ ...editExam, score: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Description</label>
                  <textarea
                    className="form-control"
                    value={editExam.description}
                    onChange={(e) =>
                      setEditExam({ ...editExam, description: e.target.value })
                    }
                  />
                </div>
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
