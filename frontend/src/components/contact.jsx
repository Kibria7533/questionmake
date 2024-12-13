// Contact Page
export const Contact = () => {
  const styles = {
    page: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "10px",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      maxWidth: "400px",
      margin: "0 auto",
    },
    input: {
      marginBottom: "10px",
      padding: "10px",
      fontSize: "1rem",
    },
    textarea: {
      marginBottom: "10px",
      padding: "10px",
      fontSize: "1rem",
      height: "100px",
    },
    button: {
      backgroundColor: "#004080",
      color: "#fff",
      padding: "10px",
      fontSize: "1rem",
      cursor: "pointer",
      border: "none",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Contact Us</h1>
      <form style={styles.form}>
        <input type="text" placeholder="Your Name" style={styles.input} />
        <input type="email" placeholder="Your Email" style={styles.input} />
        <textarea placeholder="Your Message" style={styles.textarea}></textarea>
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </div>
  );
};