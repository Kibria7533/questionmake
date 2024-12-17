"use client";

import React from "react";
import { useParams } from "next/navigation";

const ExamQuestionCard = () => {
  const { id } = useParams();
  const examDetails = {
    "0": {
      title: "AWS Certified Advanced Networking - Specialty ANS-C01",
      vendor: "Amazon",
      code: "ANS-C01",
      questions: 234,
      lastUpdated: "Nov. 25, 2024",
    },
  };

  const exam = examDetails[id] || null;

  if (!exam) return <h2 className="text-center mt-5">Exam Not Found</h2>;

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "600px" }}>
        <h2 className="text-center fw-bold mb-3">
          {exam.title} Actual Exam Questions
        </h2>
        <p className="text-center text-muted">
          Last updated on {exam.lastUpdated}
        </p>
        <hr />
        <div className="d-flex justify-content-between">
          <div>
            <strong>Vendor:</strong>
            <p>{exam.vendor}</p>
          </div>
          <div>
            <strong>Exam Code:</strong>
            <p>{exam.code}</p>
          </div>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <strong>Exam Name:</strong>
            <p>{exam.title}</p>
          </div>
          <div>
            <strong>Exam Questions:</strong>
            <p>{exam.questions}</p>
          </div>
        </div>
        <button className="btn btn-primary w-100 mt-3">
          View Custom Settings
        </button>
        <p className="text-center mt-2 text-success fw-bold">
          97% Passed the exam with this material
        </p>
      </div>
    </div>
  );
};

export default ExamQuestionCard;
