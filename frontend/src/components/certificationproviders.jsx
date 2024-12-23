"use client";

import React, { useEffect, useState } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const CertificationProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    section: {
      padding: "50px 20px",
      fontFamily: "'Arial', sans-serif",
      color: "#333", // Default text color for the section
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    headerTitle: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "white", // Darker color for visibility
    },
    headerSubtitle: {
      fontSize: "1rem",
      color: "white", // Softer color for subtitle
    },
    logo: {
      height: "80px",
      width: "80px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "15px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "12px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
      backgroundColor: "#fff",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
      gap: "20px", // Adjusts spacing between cards
      marginTop: "20px",
    },
    examList: {
      textAlign: "left",
      paddingLeft: "0",
      margin: "0",
      listStyleType: "none",
    },
    examItem: {
      fontSize: "0.9rem",
      color: "#007bff",
      textDecoration: "none",
      lineHeight: "1.6",
    },
    button: {
      display: "inline-block",
      padding: "10px 20px",
      backgroundColor: "#007bff",
      color: "#fff",
      borderRadius: "5px",
      textDecoration: "none",
      textAlign: "center",
      fontWeight: "bold",
      marginTop: "20px",
    },
    loading: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "1.2rem",
      color: "#555",
    },
    error: {
      textAlign: "center",
      marginTop: "20px",
      fontSize: "1.2rem",
      color: "red",
    },
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(`${BASE_URL}/exam-category/exam-with-categories`);
        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }
        const data = await response.json();
        setProviders(
          data.map((category) => ({
            name: category.name,
            logo: `${BASE_URL}/file-upload/view-file/${category.logo_path}`,
            exams: category.exams.map((exam) => ({
              id: exam.id,
              name: exam.name,
            })),
          }))
        );
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  if (loading) {
    return <div style={styles.loading}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.error}>Error: {error}</div>;
  }

  return (
    <div style={styles.section}>
      {/* Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>শীর্ষ পরীক্ষা এবং সার্টিফিকেশন প্রদানকারী</h2>
        <p style={styles.headerSubtitle}>
          QuestionHat কোনো সার্টিফিকেশন প্রদানকারীর দ্বারা অনুমোদিত বা প্রত্যয়িত নয়।
        </p>
      </div>

      {/* Grid of Providers */}
      <div style={styles.grid}>
        {providers.map((provider, index) => (
          <div key={index} style={styles.card}>
            {/* Logo */}
            <img
              src={provider.logo}
              alt={`${provider.name} Logo`}
              style={styles.logo}
            />
            <h5 style={{ marginBottom: "15px", color: "#222" }}>Top {provider.name} Exams</h5>
            {/* Exam List */}
            <ul style={styles.examList}>
              {provider.exams.map((exam) => (
                <li key={exam.id}>
                  <a href={`/exams/${exam.id}`} style={styles.examItem}>
                    {exam.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* View All Exams */}
      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <a href="/view-all-exam" style={styles.button}>
          View All Exams &rarr;
        </a>
      </div>
    </div>
  );
};

export default CertificationProviders;
