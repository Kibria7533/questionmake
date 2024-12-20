"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "http://localhost:4000/api";

const QuestionTypeSettings = () => {
  const token = localStorage.getItem("access_token"); // Access token from Redux
  const [questionTypes, setQuestionTypes] = useState([]);
  const [newQuestionType, setNewQuestionType] = useState("");
  const [editQuestionType, setEditQuestionType] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Question Types
  const fetchQuestionTypes = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/question-types`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        alert("You are not authorized to view this data.");
        setQuestionTypes([]);
        return;
      }
      const data = await response.json();
      setQuestionTypes(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch question types:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add Question Type
  const handleAddQuestionType = async () => {
    if (!newQuestionType.trim()) {
      alert("Question type name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/question-types`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newQuestionType.trim() }),
      });
      if (response.status === 401) {
        alert("You are not authorized to add question types.");
        return;
      }
      const data = await response.json();
      setQuestionTypes([...questionTypes, data]);
      setNewQuestionType("");
    } catch (error) {
      console.error("Failed to add question type:", error);
    }
  };

  // Delete Question Type
  const handleDeleteQuestionType = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question type?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/question-types/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        alert("You are not authorized to delete question types.");
        return;
      }
      setQuestionTypes(questionTypes.filter((qt) => qt.id !== id));
    } catch (error) {
      console.error("Failed to delete question type:", error);
    }
  };

  // Update Question Type
  const handleUpdateQuestionType = async () => {
    if (!editQuestionType.name.trim()) {
      alert("Question type name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/question-types/${editQuestionType.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editQuestionType.name.trim() }),
      });
      if (response.status === 401) {
        alert("You are not authorized to update question types.");
        return;
      }
      const updatedQuestionType = await response.json();
      setQuestionTypes(
        questionTypes.map((qt) =>
          qt.id === updatedQuestionType.id ? updatedQuestionType : qt
        )
      );
      setEditQuestionType(null);
    } catch (error) {
      console.error("Failed to update question type:", error);
    }
  };

  useEffect(() => {
    fetchQuestionTypes();
  }, []);

  return (
    <div>
      <h3 className="text-secondary">Question Type Settings</h3>

      {/* Add Question Type */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add new question type"
          value={newQuestionType}
          onChange={(e) => setNewQuestionType(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddQuestionType}>
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading question types...</p>
      ) : (
        <>
          {questionTypes.length > 0 ? (
            <table className="table table-bordered">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Question Type Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questionTypes.map((qt) => (
                  <tr key={qt.id}>
                    <td>{qt.name}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => setEditQuestionType(qt)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteQuestionType(qt.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No question types available or unauthorized to view question types.</p>
          )}
        </>
      )}

      {/* Edit Modal */}
      {editQuestionType && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Question Type</h5>
                <button
                  className="btn-close"
                  onClick={() => setEditQuestionType(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editQuestionType.name}
                  onChange={(e) =>
                    setEditQuestionType({ ...editQuestionType, name: e.target.value })
                  }
                />
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={handleUpdateQuestionType}
                >
                  Save
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => setEditQuestionType(null)}
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

export default QuestionTypeSettings;
