"use client";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

// Root Layout with Sidebar and Header
export default function RootLayout({ children }) {
  const styles = {
    container: {
      display: "flex",
      height: "100vh",
      fontFamily: "Arial, sans-serif",
    },
    content: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      backgroundColor: "#f4f4f4",
      overflowY: "auto",
    },
    main: {
      flex: 1,
      padding: "20px",
    },
  };

  return (
    <html lang="en">
      <body style={styles.container}>
        <Sidebar />
        <div style={styles.content}>
          <Header />
          <main style={styles.main}>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
