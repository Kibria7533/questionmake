"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CertificationProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const styles = {
    section: {
      padding: "50px 20px",
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    logo: {
      height: "50px",
      marginBottom: "10px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      padding: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%",
    },
    examList: {
      textAlign: "left",
      paddingLeft: "0",
    },
    examItem: {
      fontSize: "0.9rem",
      color: "#007bff",
      textDecoration: "none",
      lineHeight: "1.6",
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
            logo: `https://via.placeholder.com/150?text=${category.name}`, // Replace with actual logo URLs
            exams: category.exams.map(exam => ({
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
    return <div className="text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">Error: {error}</div>;
  }

  return (
    <div style={styles.section}>
      {/* Header */}
      <div style={styles.header}>
        <h2 className="fw-bold">Top Exams & Certification Providers</h2>
        <p className="text-muted">
          QuestionHat is not affiliated or certified by any certification provider.
        </p>
      </div>

      {/* Grid of Providers */}
      <div className="container">
        <div className="row">
          {providers.map((provider, index) => (
            <div key={index} className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4">
              <div style={styles.card}>
                {/* Logo */}
                <img
                  src={provider.logo}
                  alt={`${provider.name} Logo`}
                  style={styles.logo}
                />
                <h5 className="mb-3">Top {provider.name} Exams</h5>
                {/* Exam List */}
                <ul style={styles.examList} className="list-unstyled">
                  {provider.exams.map((exam) => (
                    <li key={exam.id}>
                      <a href={`/exams/${exam.id}`} style={styles.examItem}>
                        {exam.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Exams */}
      <div className="text-center mt-4">
        <a href="/view-all-exam" className="btn btn-primary">
          View All Exams &rarr;
        </a>
      </div>
    </div>
  );
};

export default CertificationProviders;
