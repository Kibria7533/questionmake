"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const ViewAllExams = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    pageContainer: {
      padding: "40px",
      backgroundColor: "#fff",
      minHeight: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      textAlign: "center",
      marginBottom: "20px",
      color: "#222",
    },
    subtitle: {
      textAlign: "center",
      color: "#555",
      fontSize: "1rem",
      marginBottom: "30px",
    },
    gridContainer: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
      margin: "0 auto",
    },
    providerCard: {
      backgroundColor: "#f8f9fa",
      padding: "15px",
      borderRadius: "8px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      textAlign: "center",
      transition: "transform 0.3s ease",
    },
    providerCardHover: {
      transform: "scale(1.03)",
    },
    providerName: {
      fontSize: "1.1rem",
      fontWeight: "bold",
      color: "#007bff",
      marginBottom: "5px",
    },
    examCount: {
      fontSize: "0.9rem",
      color: "#555",
    },
  };

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/exam-category/exam-with-categories");
        if (!response.ok) {
          throw new Error("Failed to fetch providers");
        }
        const data = await response.json();
        setProviders(
          data.map(category => ({
            name: category.name,
            exams: category.exams.length,
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
    return <div style={styles.pageContainer}>Loading...</div>;
  }

  if (error) {
    return <div style={styles.pageContainer}>Error: {error}</div>;
  }

  return (
    <div style={styles.pageContainer}>
      <h1 style={styles.title}>Select a Certification Provider</h1>
      <p style={styles.subtitle}>
        Browse through all available certification providers and their top exams.
      </p>

      <div style={styles.gridContainer}>
        {providers.map((provider, index) => (
          <div
            key={index}
            className="provider-card"
            style={styles.providerCard}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = styles.providerCardHover.transform)
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div style={styles.providerName}>{provider.name}</div>
            <div style={styles.examCount}>({provider.exams} exams)</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewAllExams;
