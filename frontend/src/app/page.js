"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CertificationProviders from "@/components/certificationproviders";
import Testimonials from "@/components/testimonials";
import CounterSection from "@/components/countersection";
import { Provider, useDispatch } from "react-redux";
import { login, logout } from "../redux/store";
import { useRouter } from "next/navigation";

const Home = () => {
  const styles = {
    container: {
      backgroundColor: "#1e1e1e",
      color: "#fff",
      padding: "50px 20px",
      textAlign: "center",
      fontFamily: "'Arial', sans-serif",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
    },
    subheading: {
      fontSize: "1rem",
      color: "#bbb",
    },
    stats: {
      display: "flex",
      justifyContent: "center",
      gap: "50px",
      marginTop: "20px",
    },
    statItem: {
      textAlign: "center",
    },
    statValue: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#00a8ff",
    },
    formContainer: {
      marginTop: "30px",
      backgroundColor: "#333",
      padding: "20px",
      borderRadius: "5px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    inputGroup: {
      display: "flex",
      width: "100%",
      maxWidth: "700px",
    },
    dropdown: {
      flex: "1",
      border: "none",
      padding: "10px",
      fontSize: "1rem",
    },
    input: {
      flex: "2",
      border: "none",
      padding: "10px",
      fontSize: "1rem",
    },
    button: {
      backgroundColor: "#00a8ff",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      fontSize: "1rem",
      cursor: "pointer",
    },
    footerText: {
      marginTop: "15px",
      fontSize: "0.9rem",
      color: "#bbb",
    },
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <h1 style={styles.heading}>সমসাময়িক সকল পরীক্ষার প্রশ্ন সম্ভার</h1>
      <p style={styles.subheading}>আপনি যেখানে  অন্তর্ভুক্ত হতে পারেন৷</p>

      {/* Stats */}
      <div style={styles.stats}>
        <div style={styles.statItem}>
          <p style={styles.statValue}>৯৪ %</p>
          <p>ছাত্র ছাত্রী পরীক্ষার প্রশ্ন প্রায় একই ছিল</p>
        </div>
        <div style={styles.statItem}>
          <p style={styles.statValue}>৯৭ %</p>
          <p>এই উপকরণ গুলো পড়ে পাশ করেন </p>
        </div>
        <div style={styles.statItem}>
          <p style={styles.statValue}>৯৮ %</p>
          <p>অধ্যয়ন নির্দেশিকাগুলি কার্যকর এবং সহায়ক পাওয়া গেছে</p>
        </div>
      </div>
      



      {/* Form */}
      <div style={styles.formContainer}>
        <div style={styles.inputGroup}>
          <select style={styles.dropdown}>
            <option>Select Provider</option>
            <option>Provider 1</option>
            <option>Provider 2</option>
          </select>
          <input
            type="text"
            placeholder="Exam Code Or Keyword..."
            style={styles.input}
          />
          <button style={styles.button}>VIEW ALL EXAMS</button>
        </div>
      </div>



      {/* Footer Text */}
      <p style={styles.footerText}>
      গত 24 ঘন্টায় 245 জন সাইন আপ করেছেন • পরীক্ষার বিষয়বস্তু আপডেট করা হয়েছে • 1200+ পরীক্ষা
      </p>

      <CertificationProviders />
      <Testimonials />
      <CounterSection />
    </div>
  );
};

export default Home;
