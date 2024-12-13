import { Geist, Geist_Mono } from "next/font/google";
//import "./globals.css";
import Navbar from "../components/navbar";
import { Footer } from "../components/footer";

export default function RootLayout({ children }) {
  const styles = {
    body: {
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      margin: 0,
    },
    content: {
      flex: 1,
    },
  };

  return (
    <html lang="en">
      <body style={styles.body}>
        <Navbar />
        <main style={styles.content}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
