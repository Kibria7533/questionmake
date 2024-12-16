"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Sample Certification Providers Data
const providers = [
  { name: "A10 Networks", exams: 1 },
  { name: "ACAMS", exams: 1 },
  { name: "AHIMA", exams: 2 },
  { name: "AIWMI", exams: 1 },
  { name: "AndroidATC", exams: 3 },
  { name: "Apple", exams: 5 },
  { name: "ASQ", exams: 7 },
  { name: "AWS", exams: 25 },
  { name: "CISSP", exams: 23 },
  { name: "CompTIA", exams: 44 },
  { name: "Microsoft", exams: 210 },
  { name: "Cisco", exams: 194 },
  { name: "Dell", exams: 72 },
  { name: "Fortinet", exams: 61 },
  { name: "IBM", exams: 104 },
  { name: "Juniper", exams: 55 },
  { name: "Oracle", exams: 58 },
  { name: "Google", exams: 23 },
  { name: "Huawei", exams: 19 },
  { name: "Hitachi", exams: 3 },
  { name: "VMware", exams: 32 },
  { name: "Isaca", exams: 9 },
  { name: "Nutanix", exams: 6 },
  { name: "ISC", exams: 23 },
  { name: "ServiceNow", exams: 13 },
  { name: "EC-Council", exams: 11 },
];

const ViewAllExams = () => {
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
