"use client";

import { Geist, Geist_Mono } from "next/font/google";
//import "./globals.css";
import { Footer } from "../components/footer";
import TopNavbar from "@/components/topnavber";
import MainNavbar from "@/components/mainnavber";
import { AuthProvider } from "@/components/AuthContext";
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import {Suspense} from "react";

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
    <AuthProvider>
    <html lang="en">
    <head>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous"/>


      </head>
    <Suspense fallback={<>Loading...</>}>
      <body style={styles.body}>
       <TopNavbar />
       <MainNavbar />
        <main style={styles.content}>{children}</main>
        <Footer />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>
      </body>
      </Suspense>
      
    </html>
    </AuthProvider>
  );
}
