"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ExamList = () => {
  const { id } = useParams(); // Use useParams in the App Router

  const [exams, setExams] = useState([]);
  const [providerName, setProviderName] = useState("");
  const [providerLogo, setProviderLogo] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    container: {
      padding: "40px",
      fontFamily: "'Arial', sans-serif",
      color: "#333",
      maxWidth: "900px",
      margin: "0 auto",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "20px",
      textAlign: "center",
    },
    logo: {
      display: "block",
      margin: "0 auto 20px",
      maxHeight: "100px",
    },
    examList: {
      listStyleType: "none",
      padding: "0",
    },
    examItem: {
      fontSize: "1rem",
      marginBottom: "10px",
    },
    examLink: {
      color: "#007bff",
      textDecoration: "none",
    },
    tag: {
      display: "inline-block",
      marginLeft: "10px",
      padding: "2px 8px",
      fontSize: "0.8rem",
      backgroundColor: "#007bff",
      color: "#fff",
      borderRadius: "5px",
    },
  };

  useEffect(() => {
    if (id) {
      const fetchExams = async () => {
        try {
          // Fetch provider details and exams
          const response = await fetch(`${BASE_URL}/exam-category/${id}/exams`);
          if (!response.ok) {
            throw new Error("Failed to fetch exams");
          }
          const data = await response.json();

          setProviderName(data.providerName);
          setProviderLogo(`${BASE_URL}/file-upload/view-file/${data.logo_path}`);
          setExams(data.exams);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      fetchExams();
    }
  }, [id]);

  if (loading) {
    return <div style={styles.container}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.container}>Error: {error}</div>;
  }

  return (
    <div style={styles.container}>
      {/* Provider Logo */}
      {providerLogo && <img src={providerLogo} alt={providerName} style={styles.logo} />}

      {/* Provider Name */}
      <h1 style={styles.title}>List of all {providerName} exams</h1>

      {/* Exam List */}
      <ul style={styles.examList}>
        {exams.map((exam) => (
          <li key={exam.id} style={styles.examItem}>
            <a href={`/exams/${exam.id}`} style={styles.examLink}>
              {exam.code}: {exam.name}
            </a>
            {exam.isPopular && <span style={styles.tag}>Popular</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamList;
