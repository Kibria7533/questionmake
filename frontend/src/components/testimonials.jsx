"use client";

import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Brad Haverford",
      message: `I did it! Thank you Exam Topics for the epic practice test on AZ-900! I had been discouraged prepping for my Exam when I found your website. It wasn’t my first time I attempted to pass and I felt a little bit like I had been drowning. The AZ-900 might not be a lot of money for some people but for me, it was expensive, and retaking it hurt! I almost gave up until I found ET. The free materials really helped me out when I didn’t have cash to buy books.`,
    },
    {
      name: "Steven Fasnacht",
      message: `Dear Exam Topics Staff, I’m not sure who makes your material, but it was spot on for both the exams I just took. Thank you! I’m currently breaking into the IT world as a CCNA and both the exams were over my head. I used your free online practice exams on a whim to see if they could help. After answering about 5 questions, I was sold. They were solid, real-world examples that helped me prepare for the ICND1.`,
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
        <h2 style={styles.headerTitle}>Some Nice Emails We Received</h2>
        <p style={styles.headerSubtitle}>
          Here is a collection of our favorite emails we received from users.
        </p>
        <hr
          className="mx-auto"
          style={{
            width: "80px",
            borderTop: "3px solid #007bff",
            marginTop: "10px",
          }}
        />
      </div>

      {/* Testimonials Cards */}
      <div className="container">
        <div className="row g-4">
          {testimonials.map((testimonial, index) => (
            <div className="col-md-6" key={index}>
              <div style={styles.card}>
                <FaQuoteLeft style={styles.iconLeft} />
                <p style={styles.message}>{testimonial.message}</p>
                <FaQuoteRight style={styles.iconRight} />
                <h6 style={styles.name}>{testimonial.name}</h6>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
