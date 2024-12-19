"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "http://localhost:4000/api";

const ChapterSettings = () => {
  const token = localStorage.getItem("access_token"); // Access token from Redux
  const [chapters, setChapters] = useState([]);
  const [newChapter, setNewChapter] = useState("");
  const [editChapter, setEditChapter] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Chapters
  const fetchChapters = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/chapters`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        alert("You are not authorized to view this data.");
        setChapters([]);
        return;
      }
      const data = await response.json();
      setChapters(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch chapters:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add Chapter
  const handleAddChapter = async () => {
    if (!newChapter.trim()) {
      alert("Chapter name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/chapters`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newChapter.trim() }),
      });
      if (response.status === 401) {
        alert("You are not authorized to add chapters.");
        return;
      }
      const data = await response.json();
      setChapters([...chapters, data]);
      setNewChapter("");
    } catch (error) {
      console.error("Failed to add chapter:", error);
    }
  };

  // Delete Chapter
  const handleDeleteChapter = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this chapter?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/chapters/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        alert("You are not authorized to delete chapters.");
        return;
      }
      setChapters(chapters.filter((ch) => ch.id !== id));
    } catch (error) {
      console.error("Failed to delete chapter:", error);
    }
  };

  // Update Chapter
  const handleUpdateChapter = async () => {
    if (!editChapter.name.trim()) {
      alert("Chapter name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/chapters/${editChapter.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editChapter.name.trim() }),
      });
      if (response.status === 401) {
        alert("You are not authorized to update chapters.");
        return;
      }
      const updatedChapter = await response.json();
      setChapters(chapters.map((ch) => (ch.id === updatedChapter.id ? updatedChapter : ch)));
      setEditChapter(null);
    } catch (error) {
      console.error("Failed to update chapter:", error);
    }
  };

  useEffect(() => {
    fetchChapters();
  }, []);

  return (
    <div>
      <h3 className="text-secondary">Chapter Settings</h3>

      {/* Add Chapter */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add new chapter"
          value={newChapter}
          onChange={(e) => setNewChapter(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddChapter}>
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading chapters...</p>
      ) : (
        <>
          {chapters.length > 0 ? (
            <table className="table table-bordered">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Chapter Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {chapters.map((ch) => (
                  <tr key={ch.id}>
                    <td>{ch.name}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => setEditChapter(ch)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteChapter(ch.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No chapters available or unauthorized to view chapters.</p>
          )}
        </>
      )}

      {/* Edit Modal */}
      {editChapter && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Chapter</h5>
                <button className="btn-close" onClick={() => setEditChapter(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editChapter.name}
                  onChange={(e) => setEditChapter({ ...editChapter, name: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateChapter}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditChapter(null)}>
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

export default ChapterSettings;
