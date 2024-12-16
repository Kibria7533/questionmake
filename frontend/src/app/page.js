"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CertificationProviders from "@/components/certificationproviders";
import Testimonials from "@/components/testimonials";
import CounterSection from "@/components/countersection";

const Home = () => {
  const styles = {
    container: {
      backgroundColor: "#1e1e1e",
      color: "#fff",
      padding: "50px 20px",
      textAlign: "center",
      fontFamily: "'Arial', sans-serif",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    subheading: {
      fontSize: "1rem",
      color: "#bbb",
    },
    stats: {
      display: "flex",
      justifyContent: "center",
      gap: "50px",
      marginTop: "20px",
    },
    statItem: {
      textAlign: "center",
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#00a8ff",
    },
    formContainer: {
      marginTop: "30px",
      backgroundColor: "#333",
      padding: "20px",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    inputGroup: {
      display: "flex",
      width: "100%",
      maxWidth: "700px",
    },
    dropdown: {
      flex: "1",
      border: "none",
      padding: "10px",
      fontSize: "1rem",
    },
    input: {
      flex: "2",
      border: "none",
      padding: "10px",
      fontSize: "1rem",
    },
    button: {
      backgroundColor: "#00a8ff",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      fontSize: "1rem",
      cursor: "pointer",
    },
    footerText: {
      marginTop: "15px",
      fontSize: "0.9rem",
      color: "#bbb",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.heading}>UPDATED ACTUAL EXAM MATERIALS</h1>
      <p style={styles.subheading}>A COMMUNITY YOU CAN BELONG TO</p>

      {/* Stats */}
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <p style={styles.statValue}>94%</p>
          <p>Said the test questions were almost same</p>
        </div>
        <div style={styles.statItem}>
          <p style={styles.statValue}>97%</p>
          <p>Passed the exams with materials</p>
        </div>
        <div style={styles.statItem}>
          <p style={styles.statValue}>98%</p>
          <p>Found the study guides effective and helpful</p>
        </div>
      </div>

      {/* Form */}
      <div style={styles.formContainer}>
        <div style={styles.inputGroup}>
          <select style={styles.dropdown}>
            <option>Select Provider</option>
            <option>Provider 1</option>
            <option>Provider 2</option>
          </select>
          <input
            type="text"
            placeholder="Exam Code Or Keyword..."
            style={styles.input}
          />
          <button style={styles.button}>VIEW ALL EXAMS</button>
        </div>
      </div>



      {/* Footer Text */}
      <p style={styles.footerText}>
        245 People Signed up in the Last 24H • Updated Exam Content • 1200+ Exams
      </p>

      <CertificationProviders />
      <Testimonials />
      <CounterSection />
    </div>
  );
};

export default Home;
