// Footer Component
import React from "react";

export const Footer = () => {
  const styles = {
    footer: {
      backgroundColor: "#004080",
      color: "#fff",
      textAlign: "center",
      padding: "10px 0",
      marginTop: "20px",
      position: "relative",
      width: "100%",
    },
    footerText: {
      fontSize: "1rem",
      margin: 0,
    },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.footerText}>© 2024 QuestionHat. All rights reserved.</p>
    </footer>
  );
};