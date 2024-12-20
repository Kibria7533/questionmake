"use client";

import React, { useState, useEffect } from "react";

const QuestionDownload = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
      textAlign: "center",
    },
    title: {
      fontSize: "2.5rem",
      color: "#004080",
      marginBottom: "20px",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#333",
      marginBottom: "30px",
    },
    card: {
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "20px",
      marginBottom: "20px",
      textAlign: "left",
      display: "inline-block",
      width: "60%",
      backgroundColor: "#f9f9f9",
    },
    button: {
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

  const [questionSet, setQuestionSet] = useState([]);
  const [downloadUrl, setDownloadUrl] = useState("");

  useEffect(() => {
    // Assuming the selected question set is stored in localStorage
    const storedQuestions = JSON.parse(localStorage.getItem("questionSet")) || [];
    setQuestionSet(storedQuestions);

    // Generate a downloadable question paper
    if (storedQuestions.length > 0) {
      const content = storedQuestions
        .map(
          (q, index) =>
            `Question Set ${index + 1}:\nClass: ${q.class.join(", ")}\nSubject: ${q.subject.join(
              ", "
            )}\nType: ${q.type.join(", ")}\nChapter: ${q.chapter.join(
              ", "
            )}\nWriter: ${q.writer.join(", ")}\nNumber of Questions: ${
              q.numberOfQuestions
            }\n\n`
        )
        .join("\n");

      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    }
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Download Your Question Paper</h1>
      <p style={styles.subtitle}>Here's your custom exam question paper!</p>

      {questionSet.length > 0 ? (
        <div>
          {questionSet.map((req, index) => (
            <div key={index} style={styles.card}>
              <p><strong>Class:</strong> {req.class.join(", ")}</p>
              <p><strong>Subject:</strong> {req.subject.join(", ")}</p>
              <p><strong>Type:</strong> {req.type.join(", ")}</p>
              <p><strong>Chapter:</strong> {req.chapter.join(", ")}</p>
              <p><strong>Writer:</strong> {req.writer.join(", ")}</p>
              <p><strong>Number of Questions:</strong> {req.numberOfQuestions}</p>
            </div>
          ))}
          <a href={downloadUrl} download="exam_question_paper.txt" style={styles.button}>
            Download Question Paper
          </a>
        </div>
      ) : (
        <p>No question set selected. Please go back and create a question set.</p>
      )}
    </div>
  );
};

export default QuestionDownload;
