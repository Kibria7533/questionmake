// Profile Page
export const Profile = () => {
  const styles = {
    page: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "10px",
    },
    info: {
      fontSize: "1rem",
      marginBottom: "10px",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>User Profile</h1>
      <p style={styles.info}><strong>Name:</strong> John Doe</p>
      <p style={styles.info}><strong>Email:</strong> johndoe@example.com</p>
      <p style={styles.info}><strong>Member Since:</strong> January 2023</p>
    </div>
  );
};
