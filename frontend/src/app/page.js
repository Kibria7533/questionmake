"use client";

import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";

const Home = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "2.5rem",
      color: "#004080",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#333",
      marginBottom: "5px",
    },
    formSection: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      maxWidth: "500px",
      margin: "0 auto",
    },
    input: {
      padding: "10px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "100%",
      height: "45px",
    },
    dropdown: {
      border: "1px solid #ccc",
      borderRadius: "5px",
      width: "100%",
      height: "45px",
    },
    button: {
      backgroundColor: "#004080",
      color: "#fff",
      padding: "10px 20px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    card: {
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "10px",
      margin: "10px 0",
      backgroundColor: "#f9f9f9",
    },
    totalSection: {
      marginTop: "20px",
      fontWeight: "bold",
    },
    generateButton: {
      backgroundColor: "#004080",
      color: "#fff",
      padding: "10px 20px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      marginTop: "20px",
      transition: "background-color 0.3s",
    },
  };

  const [requirements, setRequirements] = useState([]);
  const [formData, setFormData] = useState({
    class: [],
    chapter: [],
    subject: [],
    writer: [],
    type: [],
    numberOfQuestions: "",
  });

  const handleMultiSelectChange = (selectedList, name) => {
    setFormData({ ...formData, [name]: selectedList });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddRequirement = () => {
    // Validate inputs
    if (
      formData.class.length === 0 ||
      formData.chapter.length === 0 ||
      formData.subject.length === 0 ||
      formData.writer.length === 0 ||
      formData.type.length === 0 ||
      !formData.numberOfQuestions
    ) {
      alert("All fields are required. Please fill in all selections and input fields.");
      return;
    }

    setRequirements([...requirements, formData]);
    setFormData({
      class: [],
      chapter: [],
      subject: [],
      writer: [],
      type: [],
      numberOfQuestions: "",
    });
    document.querySelectorAll(".multi-select-container").forEach((dropdown) => {
      dropdown.querySelectorAll("button").forEach((btn) => btn.click());
    });
  };

  const totalQuestions = requirements.reduce(
    (total, req) => total + Number(req.numberOfQuestions),
    0
  );

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Question Creation Made Simple</h1>
        <p style={styles.subtitle}>Generate tailored questions with ease!</p>
      </header>

      <div style={styles.formSection}>
        <Multiselect
          options={["Class 10", "Class 9", "Class 8"]}
          isObject={false}
          onSelect={(selectedList) => handleMultiSelectChange(selectedList, "class")}
          onRemove={(selectedList) => handleMultiSelectChange(selectedList, "class")}
          placeholder="Select Classes"
          style={styles.dropdown}
        />

        <Multiselect
          options={["Math", "Science", "English"]}
          isObject={false}
          onSelect={(selectedList) => handleMultiSelectChange(selectedList, "subject")}
          onRemove={(selectedList) => handleMultiSelectChange(selectedList, "subject")}
          placeholder="Select Subjects"
          style={styles.dropdown}
        />

        <Multiselect
          options={["MCQ", "Multiple Choice", "Creative", "Fill in the Gap"]}
          isObject={false}
          onSelect={(selectedList) => handleMultiSelectChange(selectedList, "type")}
          onRemove={(selectedList) => handleMultiSelectChange(selectedList, "type")}
          placeholder="Select Question Types"
          style={styles.dropdown}
        />

        <Multiselect
          options={["Chapter 1", "Chapter 2", "Chapter 3"]}
          isObject={false}
          onSelect={(selectedList) => handleMultiSelectChange(selectedList, "chapter")}
          onRemove={(selectedList) => handleMultiSelectChange(selectedList, "chapter")}
          placeholder="Select Chapters"
          style={styles.dropdown}
        />

        <Multiselect
          options={["Writer A", "Writer B", "Writer C"]}
          isObject={false}
          onSelect={(selectedList) => handleMultiSelectChange(selectedList, "writer")}
          onRemove={(selectedList) => handleMultiSelectChange(selectedList, "writer")}
          placeholder="Select Writers"
          style={styles.dropdown}
        />

        <input
          type="number"
          name="numberOfQuestions"
          value={formData.numberOfQuestions}
          onChange={handleInputChange}
          placeholder="Enter Number of Questions"
          style={styles.input}
        />

        <button onClick={handleAddRequirement} style={styles.button}>
          Add Question Details
        </button>
      </div>

      <div>
        {requirements.map((req, index) => (
          <div key={index} style={styles.card}>
            <p>Class: {req.class.join(", ")}</p>
            <p>Subject: {req.subject.join(", ")}</p>
            <p>Type: {req.type.join(", ")}</p>
            <p>Chapter: {req.chapter.join(", ")}</p>
            <p>Writer: {req.writer.join(", ")}</p>
            <p>Number of Questions: {req.numberOfQuestions}</p>
          </div>
        ))}
      </div>

      <div style={styles.totalSection}>Total Questions: {totalQuestions}</div>

      <button style={styles.generateButton}>Generate Questions</button>
    </div>
  );
};

export default Home;
