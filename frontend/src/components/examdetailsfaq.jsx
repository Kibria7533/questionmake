"use client";

import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const faqData = [
  {
    title: "Get Ready To Prepare Like You’ve Never Prepared Before",
    content: `As we often say at QuestionHat, work smarter not harder. You are holding a study guide that took hours of hard collection work, expert preparation, and constant feedback. That’s why we know this exam prep will help you get that high-score on your certification.`,
  },
  {
    title: "Your Journey To Pass The AWS Certified Advanced Networking - Specialty ANS-C01",
    content: `Perhaps this is your first step toward the certification, or perhaps you are coming back for another round. This could be the first step to a new high-paying job and an AMAZING career.`,
  },
  {
    title: "What Should You Know Before Studying The AWS Certified Advanced Networking - Specialty ANS-C01?",
    content: `Every exam has different requirements. Make sure to read the prerequisites before proceeding. Nothing is worse than wasting months studying for an exam you can’t take.`,
  },
  {
    title: "What Is The AWS Certified Advanced Networking - Specialty ANS-C01 Focused On?",
    content: `The AWS Certified Advanced Networking - Specialty ANS-C01 tests on many subjects. Experience requirements exist because they’ve observed the average person and what is required.`,
  },
  {
    title: "Rome Wasn’t Built In A Day",
    content: `Remember that incredible things take time. Certification is not as easy or quick either, but it is worth it!`,
  },
  {
    title: "Tips To Pass AWS Certified Advanced Networking - Specialty ANS-C01",
    content: `Stay consistent with your preparation. Make use of QuestionHat's resources, and practice as much as possible to solidify your understanding of the topics.`,
  },
  {
    title: "Additional Resources for Certification Preparation",
    content: `Leverage online study groups, practice tests, and expert advice. Engaging with a community can help you gain confidence and pass the exam.`,
  },
];

const ExamDetailsFAQ = () => {
  const [showMore, setShowMore] = useState(false);

  const styles = {
    section: {
      padding: "50px 20px",
      fontFamily: "'Arial', sans-serif",
    },
    title: {
      fontWeight: "bold",
      fontSize: "1.2rem",
      marginBottom: "10px",
    },
    content: {
      fontSize: "1rem",
      lineHeight: "1.6",
      marginBottom: "15px",
    },
    buttonContainer: {
      textAlign: "center",
      marginTop: "30px",
    },
    button: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "10px 20px",
      fontSize: "1rem",
      borderRadius: "5px",
      cursor: "pointer",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
    },
  };

  const visibleFAQs = showMore ? faqData : faqData.slice(0, 5);

  return (
    <div style={styles.section}>
      {/* FAQ Items */}
      {visibleFAQs.map((faq, index) => (
        <div key={index} className="mb-4">
          <h4 style={styles.title}>{faq.title}</h4>
          <p style={styles.content}>{faq.content}</p>
        </div>
      ))}

      {/* Read More Button */}
      <div style={styles.buttonContainer}>
        <button
          style={styles.button}
          onClick={() => setShowMore(!showMore)}
          onMouseOver={(e) =>
            (e.currentTarget.style.backgroundColor =
              styles.buttonHover.backgroundColor)
          }
          onMouseOut={(e) =>
            (e.currentTarget.style.backgroundColor = styles.button.backgroundColor)
          }
        >
          {showMore ? "Show Less" : "Read More FAQs"}
        </button>
      </div>
    </div>
  );
};

export default ExamDetailsFAQ;
