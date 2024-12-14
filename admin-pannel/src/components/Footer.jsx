"use client";

const Footer = () => {
  const styles = {
    footer: {
      height: "50px",
      backgroundColor: "#004080",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
      fontSize: "0.9rem",
    },
  };

  return (
    <footer style={styles.footer}>
      © 2024 Question Hat. All Rights Reserved.
    </footer>
  );
};

export default Footer;
