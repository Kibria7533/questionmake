"use client";

const Header = () => {
  const styles = {
    header: {
      height: "60px",
      backgroundColor: "#004080",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "0 20px",
      boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    },
    profileContainer: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
      color: "white",
      cursor: "pointer",
    },
    profileIcon: {
      width: "30px",
      height: "30px",
      borderRadius: "50%",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "#004080",
      fontWeight: "bold",
      fontSize: "1rem",
    },
  };

  const isLoggedIn = true; // Placeholder for authentication state

  return (
    <header style={styles.header}>
      <div>Admin Panel</div>
      {isLoggedIn && (
        <div style={styles.profileContainer}>
          <div style={styles.profileIcon}>P</div>
          <div>Logout</div>
        </div>
      )}
    </header>
  );
};

export default Header;
