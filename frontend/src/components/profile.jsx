"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    member_since: "January 2023",
    role: "admin", // Default role for testing
  });

  const [questions, setQuestions] = useState([
    {
      id: 1,
      title: "What is React?",
      created_at: "2024-04-16T10:30:00Z",
    },
    {
      id: 2,
      title: "Explain Event Loop in JavaScript",
      created_at: "2024-04-17T12:15:00Z",
    },
  ]);

  const styles = {
    page: {
      padding: "20px",
      fontFamily: "'Poppins', sans-serif",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "10px",
      fontWeight: "bold",
      color: "#333",
    },
    info: {
      fontSize: "1rem",
      marginBottom: "10px",
    },
    button: {
      backgroundColor: "#6a11cb",
      color: "#fff",
      padding: "10px 20px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontSize: "1rem",
      marginBottom: "20px",
      transition: "background-color 0.3s",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    th: {
      backgroundColor: "#6a11cb",
      color: "#fff",
      padding: "10px",
      textAlign: "left",
    },
    td: {
      border: "1px solid #ddd",
      padding: "10px",
    },
    rowEven: {
      backgroundColor: "#f9f9f9",
    },
    rowOdd: {
      backgroundColor: "#fff",
    },
  };

  const handleCreateQuestion = () => {
    router.push("/createquestion"); // Redirects to /createquestion
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>User Profile</h1>
      <p style={styles.info}>
        <strong>Name:</strong> {userData.name}
      </p>
      <p style={styles.info}>
        <strong>Email:</strong> {userData.email}
      </p>
      <p style={styles.info}>
        <strong>Member Since:</strong> {userData.member_since}
      </p>
      <p style={styles.info}>
        <strong>Role:</strong> {userData.role}
      </p>

      {/* Conditionally Render the "Create Question" Button */}
      {userData.role === "admin" && (
        <button style={styles.button} onClick={handleCreateQuestion}>
          Create Question
        </button>
      )}

      {/* Table for Question History */}
      <h2 style={{ marginTop: "20px" }}>Your Question History</h2>
      {questions.length > 0 ? (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Question ID</th>
              <th style={styles.th}>Title</th>
              <th style={styles.th}>Created At</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((question, index) => (
              <tr
                key={question.id}
                style={index % 2 === 0 ? styles.rowEven : styles.rowOdd}
              >
                <td style={styles.td}>{question.id}</td>
                <td style={styles.td}>{question.title}</td>
                <td style={styles.td}>
                  {new Date(question.created_at).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p style={{ marginTop: "10px", color: "#777" }}>No questions created yet.</p>
      )}
    </div>
  );
};

export default Profile;
