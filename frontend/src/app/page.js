"use client";

import React from "react";

const Home = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    title: {
      fontSize: "2.5rem",
      color: "#004080",
      marginBottom: "10px",
    },
    subtitle: {
      fontSize: "1.2rem",
      color: "#333",
      marginBottom: "5px",
    },
    searchSection: {
      marginTop: "30px",
      textAlign: "center",
    },
    searchTitle: {
      fontSize: "2rem",
      marginBottom: "10px",
    },
    filterForm: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "15px",
      maxWidth: "500px",
      margin: "0 auto",
    },
    input: {
      padding: "10px",
      width: "100%",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "5px",
    },
    buttonSearch: {
      backgroundColor: "#004080",
      color: "#fff",
      padding: "10px 20px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0066cc",
    },
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Question Creation Made Simple</h1>
        <p style={styles.subtitle}>Generating questions for any class, subject, or pattern is now super easy!</p>
        <p style={styles.subtitle}>Simply select your topic and create questions in just a second!</p>
      </header>

      <div style={styles.searchSection}>
        <h2 style={styles.searchTitle}>Create Questions for Students</h2>
        <form style={styles.filterForm}>
          <input
            type="text"
            placeholder="Enter Class (e.g., One, Two)"
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Enter Chapter"
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Enter Subject"
            style={styles.input}
          />
          <input
            type="text"
            placeholder="Enter Writer"
            style={styles.input}
          />
          <button
            type="submit"
            style={styles.buttonSearch}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.buttonSearch.backgroundColor)}
          >
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default Home;
