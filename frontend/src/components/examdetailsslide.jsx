"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaQuoteLeft } from "react-icons/fa";

// Dummy testimonials data
const testimonials = [
  {
    name: "Terry J",
    feedback:
      "I've used numerous platforms to prep for my exams. However, QuestionHat stands out for its incredibly relevant and up-to-date material. It's been a game-changer for me, keeping me ahead in my certification journey.",
  },
  {
    name: "Justin W",
    feedback:
      "Unlike other sites I've tried, the depth and accuracy of their content is unmatched. It's clear they prioritize keeping their material current, which has been invaluable for my certification goals. It's my go-to resource now, lol.",
  },
  {
    name: "Evelyn C",
    feedback:
      "Their commitment to providing the latest and most relevant content has significantly impacted my certification progress. And I did make it, by the way. Thanks, QuestionHat!",
  },
];

const ExamDetailsSlide = () => {
  const styles = {
    section: {
      padding: "50px 20px",
      textAlign: "center",
      fontFamily: "'Arial', sans-serif",
    },
    title: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      marginBottom: "20px",
    },
    sliderContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
    },
    card: {
      flex: "0 0 30%",
      padding: "30px",
      borderRadius: "10px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      backgroundColor: "#fff",
      textAlign: "center",
    },
    icon: {
      color: "#007bff",
      fontSize: "2rem",
      marginBottom: "15px",
    },
    name: {
      fontWeight: "bold",
      marginTop: "15px",
      color: "#333",
    },
  };

  return (
    <div style={styles.section}>
      <h2 style={styles.title}>
        How People Have Benefitted from AWS Certified Advanced Networking - Specialty ANS-C01 Exam
      </h2>

      <div style={styles.sliderContainer}>
        {testimonials.map((testimonial, index) => (
          <div key={index} style={styles.card}>
            <FaQuoteLeft style={styles.icon} />
            <p>{testimonial.feedback}</p>
            <p style={styles.name}>{testimonial.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExamDetailsSlide;
