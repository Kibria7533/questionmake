"use client";

import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Brad Haverford",
      message: `আমি এটা করেছি! AZ-900-এ মহাকাব্য অনুশীলন পরীক্ষার জন্য পরীক্ষার বিষয়গুলিকে ধন্যবাদ! আমি আপনার ওয়েবসাইট খুঁজে পেয়ে আমার পরীক্ষার জন্য প্রস্তুতি নিরুৎসাহিত করা হয়েছে. এটি আমার প্রথমবার নয় যে আমি পাস করার চেষ্টা করেছি এবং আমি কিছুটা অনুভব করেছি যে আমি ডুবে যাচ্ছিলাম। AZ-900 কিছু লোকের জন্য অনেক টাকা নাও হতে পারে কিন্তু আমার জন্য, এটি ব্যয়বহুল ছিল, এবং এটি পুনরায় গ্রহণ করা আঘাত! আমি ইটি খুঁজে না পাওয়া পর্যন্ত আমি প্রায় ছেড়ে দিয়েছিলাম। বই কেনার জন্য যখন আমার কাছে নগদ অর্থ ছিল না তখন বিনামূল্যের উপকরণগুলি আমাকে সত্যিই সাহায্য করেছিল।`,
    },
    {
      name: "Steven Fasnacht",
      message: `প্রিয় পরীক্ষার বিষয় স্টাফ, আমি নিশ্চিত নই কে আপনার উপাদান তৈরি করে, তবে আমি এইমাত্র যে দুটি পরীক্ষা দিয়েছিলাম তার জন্য এটি ছিল। ধন্যবাদ! আমি বর্তমানে একটি CCNA হিসাবে আইটি জগতে প্রবেশ করছি এবং উভয় পরীক্ষাই আমার মাথায় ছিল। তারা সাহায্য করতে পারে কিনা তা দেখার জন্য আমি আপনার বিনামূল্যের অনলাইন অনুশীলন পরীক্ষাগুলি ব্যবহার করেছি। প্রায় 5টি প্রশ্নের উত্তর দেওয়ার পর আমি বিক্রি হয়ে গেলাম। তারা দৃঢ়, বাস্তব-বিশ্বের উদাহরণ যা আমাকে ICND1-এর জন্য প্রস্তুত করতে সাহায্য করেছিল।`,
    },
  ];

  const styles = {
    section: {
      padding: "60px 20px",
      backgroundColor: "#f8f9fa",
    },
    header: {
      textAlign: "center",
      marginBottom: "40px",
    },
    headerTitle: {
      fontSize: "2rem",
      fontWeight: "700",
      color: "#333",
    },
    headerSubtitle: {
      color: "#555",
      fontSize: "1rem",
      marginTop: "10px",
    },
    divider: {
      width: "80px",
      borderTop: "3px solid #007bff",
      margin: "10px auto",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "20px",
    },
    card: {
      border: "none",
      borderRadius: "10px",
      backgroundColor: "white",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "30px",
      minHeight: "250px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    iconLeft: {
      color: "#007bff",
      fontSize: "2rem",
      marginBottom: "10px",
    },
    iconRight: {
      color: "#007bff",
      fontSize: "2rem",
      textAlign: "right",
      marginTop: "10px",
    },
    name: {
      fontWeight: "bold",
      marginTop: "10px",
      color: "#333",
    },
    message: {
      color: "#555",
      lineHeight: "1.6",
      fontSize: "1rem",
      flexGrow: 1,
    },
  };

  return (
    <div style={styles.section}>
      {/* Section Header */}
      <div style={styles.header}>
        <h2 style={styles.headerTitle}>আমাদের পাঠানো কিছু চমৎকার ইমেল</h2>
        <p style={styles.headerSubtitle}>
          Here is a collection of our favorite emails we received from users.
        </p>
        <hr style={styles.divider} />
      </div>

      {/* Testimonials Grid */}
      <div style={styles.grid}>
        {testimonials.map((testimonial, index) => (
          <div style={styles.card} key={index}>
            <FaQuoteLeft style={styles.iconLeft} />
            <p style={styles.message}>{testimonial.message}</p>
            <FaQuoteRight style={styles.iconRight} />
            <h6 style={styles.name}>{testimonial.name}</h6>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
