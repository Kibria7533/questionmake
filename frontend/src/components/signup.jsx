"use client";

// Signup Page
export const Signup = () => {
  const styles = {
    page: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      backgroundImage: "url('https://via.placeholder.com/1200x800?text=Signup+Background')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    },
    overlay: {
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      maxWidth: "400px",
      width: "100%",
    },
    title: {
      fontSize: "2rem",
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
    loginLink: {
      textAlign: "center",
      marginTop: "15px",
      fontSize: "0.9rem",
      color: "#004080",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Sign Up</h1>
        <form style={styles.form}>
          <input
            type="text"
            placeholder="Full Name"
            style={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            style={styles.input}
          />
          <button type="submit" style={styles.button}>Sign Up</button>
        </form>
        <div style={styles.loginLink}>
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};
