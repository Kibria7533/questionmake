import { Geist, Geist_Mono } from "next/font/google";
//import "./globals.css";
import { Footer } from "../components/footer";
import TopNavbar from "@/components/topnavber";
import MainNavbar from "@/components/mainnavber";

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
       <TopNavbar />
       <MainNavbar />
        <main style={styles.content}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
