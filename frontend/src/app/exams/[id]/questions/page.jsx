"use client";

import React, { useState } from "react";
import { useParams } from "next/navigation";

// Reusable Card Component
const ExamQuestionCard = ({ exam }) => {
  return (
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
  );
};

// Sample Question Data
const questionData = Array.from({ length: 30 }, (_, index) => ({
  id: index + 1,
  question: `This is a sample question #${index + 1}. What is the correct answer?`,
  options: [
    "Option A: Placeholder text for option A",
    "Option B: Placeholder text for option B",
    "Option C: Placeholder text for option C",
    "Option D: Placeholder text for option D",
  ],
  correctAnswer: "Option A",
  voteDistribution: {
    A: 90,
    B: 5,
    C: 3,
    D: 2,
  },
}));

// Main Page Component
const ExamQuestionsPage = () => {
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const [showSolution, setShowSolution] = useState({});
  const questionsPerPage = 10;

  const examDetails = {
    "0": {
      title: "AWS Certified Advanced Networking - Specialty ANS-C01",
      vendor: "Amazon",
      code: "ANS-C01",
      questions: 234,
      lastUpdated: "Nov. 25, 2024",
    },
    "1": {
      title: "Cisco Certified Network Associate (CCNA)",
      vendor: "Cisco",
      code: "CCNA",
      questions: 320,
      lastUpdated: "Oct. 12, 2024",
    },
    "2": {
      title: "AWS Certified DevOps Engineer - Professional",
      vendor: "Amazon",
      code: "DOP-C02",
      questions: 290,
      lastUpdated: "Sep. 30, 2024",
    },
  };

  const exam = examDetails[id];
  if (!exam) {
    return <h2 className="text-center mt-5">Exam Not Found</h2>;
  }

  // Pagination Logic
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questionData.slice(
    indexOfFirstQuestion,
    indexOfLastQuestion
  );

  const handleToggleSolution = (qId) => {
    setShowSolution((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="container mt-5">
      {/* Exam Question Card */}
      <ExamQuestionCard exam={exam} />

      {/* Questions Section */}
      <div className="mt-5">
        <h3 className="fw-bold mb-4">Exam Questions</h3>
        {currentQuestions.map((q) => (
          <div key={q.id} className="card mb-4 shadow-sm">
            <div
              className="card-header fw-bold text-white"
              style={{ backgroundColor: "#4636f0" }}
            >
              Question #{q.id}
            </div>
            <div className="card-body">
              <p>{q.question}</p>
              <ul className="list-unstyled">
                {q.options.map((option, idx) => (
                  <li key={idx} className="mb-2">
                    {option}
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className="d-flex justify-content-between mt-3">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleToggleSolution(q.id)}
                >
                  {showSolution[q.id] ? "Hide Solution" : "Reveal Solution"}
                </button>
                <button className="btn btn-secondary btn-sm">
                  Discussion <span className="badge bg-light text-dark ms-1">26</span>
                </button>
              </div>

              {/* Solution */}
              {showSolution[q.id] && (
                <div className="mt-3 border-top pt-3">
                  <p>
                    <strong>Correct Answer: {q.correctAnswer}</strong>
                  </p>
                  <p className="text-muted small">Community vote distribution:</p>
                  <div className="progress">
                    {Object.entries(q.voteDistribution).map(([option, percentage], index) => {
                        // Assign colors dynamically based on the index
                        const progressBarColors = ["bg-primary", "bg-success", "bg-warning", "bg-danger"];
                        const colorClass = progressBarColors[index % progressBarColors.length];

                        return (
                        <div
                            key={option}
                            className={`progress-bar ${colorClass}`}
                            role="progressbar"
                            style={{ width: `${percentage}%` }}
                        >
                            {option} ({percentage}%)
                        </div>
                        );
                    })}
                    </div>

                </div>
              )}
            </div>
          </div>
        ))}

        {/* Pagination */}
        <div className="d-flex justify-content-between mt-4">
          <button
            className="btn btn-secondary"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
          >
            &larr; Previous Page
          </button>
          {indexOfLastQuestion < questionData.length && (
            <button className="btn btn-primary" onClick={handleNextPage}>
              Next Page &rarr;
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


export default ExamQuestionsPage;
