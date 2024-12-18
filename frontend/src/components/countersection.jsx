"use client";

import React, { useEffect, useState } from "react";

const CounterSection = () => {
  const counters = [
    { label: "Cert Providers", value: 156 },
    { label: "Exams", value: 1936 },
    { label: "Avg. Daily Updates", value: 126 },
    { label: "Online Users", value: 2097 },
  ];

  const [countValues, setCountValues] = useState(
    counters.map(() => 0) // Start counters at 0
  );

  // Animate counters
  useEffect(() => {
    counters.forEach((counter, index) => {
      const interval = setInterval(() => {
        setCountValues((prev) => {
          const newValue = [...prev];
          if (newValue[index] < counter.value) {
            newValue[index] += Math.ceil(counter.value / 100);
          } else {
            newValue[index] = counter.value;
            clearInterval(interval);
          }
          return newValue;
        });
      }, 20);
    });
  }, []);

  const styles = {
    section: {
      backgroundColor: "#f8f9fa",
      padding: "60px 20px",
      textAlign: "center",
    },
    header: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#333",
      marginBottom: "20px",
    },
    subHeader: {
      color: "#666",
      fontSize: "1.1rem",
      marginBottom: "40px",
    },
    cardContainer: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      gap: "30px",
    },
    card: {
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "20px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      width: "200px",
      textAlign: "center",
    },
    counterValue: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      color: "#007bff",
      marginBottom: "10px",
    },
    label: {
      color: "#555",
      fontSize: "1rem",
      fontWeight: "600",
    },
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.header}>QuestionHat</h2>
      <p style={styles.subHeader}>
        The only source for free & accurate actual exam questions & answers,
        passing your exam easily is guaranteed, and for free!
      </p>
      <div style={styles.cardContainer}>
        {counters.map((counter, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.counterValue}>{countValues[index]}</div>
            <div style={styles.label}>{counter.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CounterSection;
