"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const SubjectSettings = () => {
  const [token, setToken] = useState(null);// Access token from Redux
  const [subjects, setSubjects] = useState([]);
  const [newSubject, setNewSubject] = useState("");
  const [editSubject, setEditSubject] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch Subjects
  const fetchSubjects = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/subjects`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        alert("You are not authorized to view this data.");
        setSubjects([]);
        return;
      }
      const data = await response.json();
      setSubjects(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add Subject
  const handleAddSubject = async () => {
    if (!newSubject.trim()) {
      alert("Subject name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/subjects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newSubject.trim() }),
      });
      if (response.status === 401) {
        alert("You are not authorized to add subjects.");
        return;
      }
      const data = await response.json();
      setSubjects([...subjects, data]);
      setNewSubject("");
    } catch (error) {
      console.error("Failed to add subject:", error);
    }
  };

  // Delete Subject
  const handleDeleteSubject = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this subject?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/subjects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        alert("You are not authorized to delete subjects.");
        return;
      }
      setSubjects(subjects.filter((sub) => sub.id !== id));
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  };

  // Update Subject
  const handleUpdateSubject = async () => {
    if (!editSubject.name.trim()) {
      alert("Subject name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/subjects/${editSubject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editSubject.name.trim() }),
      });
      if (response.status === 401) {
        alert("You are not authorized to update subjects.");
        return;
      }
      const updatedSubject = await response.json();
      setSubjects(subjects.map((sub) => (sub.id === updatedSubject.id ? updatedSubject : sub)));
      setEditSubject(null);
    } catch (error) {
      console.error("Failed to update subject:", error);
    }
  };

     // Load token on client side
     useEffect(() => {
      if (typeof window !== "undefined") {
        const storedToken = localStorage.getItem("access_token");
        setToken(storedToken);
      }
    }, []);


  useEffect(() => {
    if(token){
      fetchSubjects();
    }
  }, [token]);

  return (
    <div>
      <h3 className="text-secondary">Subject Settings</h3>

      {/* Add Subject */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add new subject"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddSubject}>
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading subjects...</p>
      ) : (
        <>
          {subjects.length > 0 ? (
            <table className="table table-bordered">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Subject Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {subjects.map((sub) => (
                  <tr key={sub.id}>
                    <td>{sub.name}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => setEditSubject(sub)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteSubject(sub.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No subjects available or unauthorized to view subjects.</p>
          )}
        </>
      )}

      {/* Edit Modal */}
      {editSubject && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Subject</h5>
                <button className="btn-close" onClick={() => setEditSubject(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editSubject.name}
                  onChange={(e) => setEditSubject({ ...editSubject, name: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateSubject}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditSubject(null)}>
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

export default SubjectSettings;
