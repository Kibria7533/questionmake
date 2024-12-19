"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const BASE_URL = "http://localhost:4000/api";

const ClassSettings = () => {
  const token = useSelector((state) => state.user.userData?.token); // Access token from userData
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState("");
  const [editClass, setEditClass] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchClasses = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/classes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        alert("You are not authorized to view this data.");
        setClasses([]);
        return;
      }
      const data = await response.json();
      setClasses(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClass = async () => {
    if (!newClass.trim()) {
      alert("Class name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/classes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newClass.trim() }),
      });
      if (response.status === 401) {
        alert("You are not authorized to add classes.");
        return;
      }
      const data = await response.json();
      setClasses([...classes, data]);
      setNewClass("");
    } catch (error) {
      console.error("Failed to add class:", error);
    }
  };

  const handleDeleteClass = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this class?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${BASE_URL}/classes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 401) {
        alert("You are not authorized to delete classes.");
        return;
      }
      setClasses(classes.filter((cls) => cls.id !== id));
    } catch (error) {
      console.error("Failed to delete class:", error);
    }
  };

  const handleUpdateClass = async () => {
    if (!editClass.name.trim()) {
      alert("Class name cannot be empty.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/classes/${editClass.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editClass.name.trim() }),
      });
      if (response.status === 401) {
        alert("You are not authorized to update classes.");
        return;
      }
      const updatedClass = await response.json();
      setClasses(classes.map((cls) => (cls.id === updatedClass.id ? updatedClass : cls)));
      setEditClass(null);
    } catch (error) {
      console.error("Failed to update class:", error);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  return (
    <div>
      <h3 className="text-secondary">Class Settings</h3>

      {/* Add Class */}
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Add new class"
          value={newClass}
          onChange={(e) => setNewClass(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleAddClass}>
          Add
        </button>
      </div>

      {loading ? (
        <p>Loading classes...</p>
      ) : (
        <>
          {classes.length > 0 ? (
            <table className="table table-bordered">
              <thead className="bg-primary text-white">
                <tr>
                  <th>Class Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {classes.map((cls) => (
                  <tr key={cls.id}>
                    <td>{cls.name}</td>
                    <td>
                      <button
                        className="btn btn-warning me-2"
                        onClick={() => setEditClass(cls)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteClass(cls.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No classes available or unauthorized to view classes.</p>
          )}
        </>
      )}

      {editClass && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Class</h5>
                <button className="btn-close" onClick={() => setEditClass(null)}></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control"
                  value={editClass.name}
                  onChange={(e) => setEditClass({ ...editClass, name: e.target.value })}
                />
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={handleUpdateClass}>
                  Save
                </button>
                <button className="btn btn-secondary" onClick={() => setEditClass(null)}>
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

export default ClassSettings;
