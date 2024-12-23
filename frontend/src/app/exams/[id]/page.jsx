"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ExamDetailsSlide from "@/components/examdetailsslide";
import ExamDetailsFAQ from "@/components/examdetailsfaq";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ExamDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/exam`);
        if (!response.ok) {
          throw new Error("Failed to fetch exam details.");
        }
        const data = await response.json();
        const selectedExam = data.find((exam) => exam.id === parseInt(id));
        if (!selectedExam) {
          throw new Error("Exam not found.");
        }
        setExam(selectedExam);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [id]);

  const styles = {
    container: {
      maxWidth: "900px",
      margin: "50px auto",
      padding: "20px",
      fontFamily: "'Arial', sans-serif",
      color: "#333",
      textAlign: "center",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    stats: {
      display: "flex",
      justifyContent: "space-around",
      marginTop: "20px",
    },
    statItem: {
      textAlign: "center",
    },
    statValue: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#007bff",
    },
    description: {
      marginTop: "20px",
    },
    button: {
      marginTop: "20px",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      fontSize: "1rem",
      cursor: "pointer",
    },
  };

  if (loading) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;
  if (error) return <h2 style={{ textAlign: "center", marginTop: "50px" }}>{error}</h2>;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>{exam.name}</h1>

      {/* Stats */}
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <h3 style={styles.statValue}>{exam.questions}</h3>
          <p>Questions and Answers</p>
        </div>
        <div style={styles.statItem}>
          <h3 style={styles.statValue}>{exam.passed}</h3>
          <p>Students Passed</p>
        </div>
        <div style={styles.statItem}>
          <h3 style={styles.statValue}>{exam.score || "N/A"}</h3>
          <p>Average Score</p>
        </div>
      </div>

      {/* Description */}
      <div style={styles.description}>
        <p>{exam.description || "No description available."}</p>
        <button
          style={styles.button}
          onClick={() => router.push(`/exams/${id}/questions`)}
        >
          Browse {exam.questions} Questions
        </button>
      </div>

      {/* Additional Components */}
      <ExamDetailsSlide />
      <ExamDetailsFAQ />
    </div>
  );
};

export default ExamDetail;
