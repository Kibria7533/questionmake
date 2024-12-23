"use client";
import React, { useState } from "react";

const SiteSettings = () => {
  // Initial state for managing the home page texts
  const [texts, setTexts] = useState([
    { id: 1, title: "94%", description: "Said the test questions were almost same" },
    { id: 2, title: "97%", description: "Passed the exams with materials" },
    { id: 3, title: "98%", description: "Found the study guides effective and helpful" },
  ]);

  const [form, setForm] = useState({ id: null, title: "", description: "" });
  const [isEditing, setIsEditing] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle adding a new text
  const handleAdd = (e) => {
    e.preventDefault();
    const newText = { ...form, id: Date.now() };
    setTexts([...texts, newText]);
    setForm({ id: null, title: "", description: "" });
  };

  // Handle editing a text
  const handleEdit = (text) => {
    setForm(text);
    setIsEditing(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setTexts(texts.map((t) => (t.id === form.id ? form : t)));
    setForm({ id: null, title: "", description: "" });
    setIsEditing(false);
  };

  // Handle deleting a text
  const handleDelete = (id) => {
    setTexts(texts.filter((text) => text.id !== id));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Site Settings</h2>

      {/* Texts List */}
      <div style={{ marginBottom: "20px" }}>
        <h4>Home Page Texts</h4>
        {texts.map((text) => (
          <div
            key={text.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
              padding: "10px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          >
            <div>
              <strong>{text.title}</strong>
              <p>{text.description}</p>
            </div>
            <div>
              <button
                style={{
                  marginRight: "10px",
                  padding: "5px 10px",
                  border: "none",
                  backgroundColor: "#007bff",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleEdit(text)}
              >
                Edit
              </button>
              <button
                style={{
                  padding: "5px 10px",
                  border: "none",
                  backgroundColor: "#dc3545",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
                onClick={() => handleDelete(text.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add/Edit Form */}
      <div>
        <h4>{isEditing ? "Edit Text" : "Add New Text"}</h4>
        <form onSubmit={isEditing ? handleUpdate : handleAdd}>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Title:
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              />
            </label>
          </div>
          <div style={{ marginBottom: "10px" }}>
            <label>
              Description:
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  margin: "5px 0",
                  borderRadius: "5px",
                  border: "1px solid #ddd",
                }}
              ></textarea>
            </label>
          </div>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              border: "none",
              backgroundColor: isEditing ? "#007bff" : "#28a745",
              color: "white",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            {isEditing ? "Update" : "Add"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SiteSettings;
