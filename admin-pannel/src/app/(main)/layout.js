"use client";

import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import store from "../../redux/store";
import { login, logout } from "../../redux/store";
import { Provider, useDispatch } from "react-redux";
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


  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      // Simulate user data fetch or token validation
      dispatch(login({ token }));
    } else {
      router.push("/login");
    }
  }, [dispatch, router]);


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
