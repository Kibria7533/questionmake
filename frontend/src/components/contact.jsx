"use client";

// Contact Page
const Contact = () => {
  const styles = {
    page: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      backgroundImage: "url('https://images.unsplash.com/photo-1517841905240-472988babdf9?fit=crop&w=1600&q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      color: "#333",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "30px",
      borderRadius: "10px",
      maxWidth: "600px",
      width: "100%",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      textAlign: "center",
      color: "#004080",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    input: {
      padding: "15px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      outline: "none",
      transition: "box-shadow 0.3s",
    },
    inputFocus: {
      boxShadow: "0 0 5px rgba(0, 64, 128, 0.7)",
      border: "1px solid rgba(0, 64, 128, 0.7)",
    },
    textarea: {
      padding: "15px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      height: "150px",
      resize: "none",
      outline: "none",
      transition: "box-shadow 0.3s",
    },
    button: {
      backgroundColor: "#004080",
      color: "#fff",
      padding: "15px",
      fontSize: "1rem",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.2s",
    },
    buttonHover: {
      backgroundColor: "#003060",
      transform: "scale(1.02)",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Contact Us</h1>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Your Name"
            style={styles.input}
            onFocus={(e) => (e.target.style.boxShadow = styles.inputFocus.boxShadow)}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
          <input
            type="email"
            placeholder="Your Email"
            style={styles.input}
            onFocus={(e) => (e.target.style.boxShadow = styles.inputFocus.boxShadow)}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          />
          <textarea
            placeholder="Your Message"
            style={styles.textarea}
            onFocus={(e) => (e.target.style.boxShadow = styles.inputFocus.boxShadow)}
            onBlur={(e) => (e.target.style.boxShadow = "none")}
          ></textarea>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;