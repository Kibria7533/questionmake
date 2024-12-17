"use client";

import React, { useState } from "react";

// Sample Data for Questions
const questions = [
  {
    id: 1,
    topic: "Exam A - Topic 1",
    title: "Question #1",
    description:
      "A company is planning to create a service that requires encryption in transit. The traffic must not be decrypted between the client and the backend of the service. The company will implement the service by using the gRPC protocol over TCP port 443. The service will scale up to thousands of simultaneous connections. The backend of the service will be hosted on an Amazon Elastic Kubernetes Service (Amazon EKS) cluster with the Kubernetes Cluster Autoscaler and the Horizontal Pod Autoscaler configured. The company needs to use mutual TLS for two-way authentication between the client and the backend. Which solution will meet these requirements?",
    options: [
      "A. Install the AWS Load Balancer Controller for Kubernetes...",
      "B. Install the AWS Load Balancer Controller for Kubernetes...",
      "C. Create a target group and configure an Application Load Balancer...",
      "D. Create a target group with a Network Load Balancer and TLS...",
    ],
  },
  // Add more questions here (simulated 20 for pagination)
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 2,
    topic: `Exam A - Topic ${Math.ceil((i + 2) / 5)}`,
    title: `Question #${i + 2}`,
    description: `This is a placeholder description for Question #${i + 2}. Add detailed question text here.`,
    options: [
      `A. Placeholder option A for Question ${i + 2}`,
      `B. Placeholder option B for Question ${i + 2}`,
      `C. Placeholder option C for Question ${i + 2}`,
      `D. Placeholder option D for Question ${i + 2}`,
    ],
  })),
];

const EachQuestionShowPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 10;

  // Calculate paginated questions
  const startIndex = (currentPage - 1) * questionsPerPage;
  const currentQuestions = questions.slice(
    startIndex,
    startIndex + questionsPerPage
  );

  const totalPages = Math.ceil(questions.length / questionsPerPage);

  return (
    <div className="container mt-5">
      <h2 className="fw-bold text-center mb-4">Topic {currentPage} - Exam A</h2>

      {/* Render Questions */}
      {currentQuestions.map((question) => (
        <div
          key={question.id}
          className="card mb-4 shadow-sm"
          style={{ border: "1px solid #e0e0e0" }}
        >
          <div className="card-header text-white fw-bold" style={{ backgroundColor: "#4636f0" }}>
            {question.title} <em style={{ fontSize: "0.9rem" }}>{question.topic}</em>
          </div>
          <div className="card-body">
            <p>{question.description}</p>
            <ul className="list-unstyled">
              {question.options.map((option, index) => (
                <li key={index} className="mb-2">
                  {option}
                </li>
              ))}
            </ul>
          </div>
          <div className="card-footer d-flex justify-content-end gap-3">
            <button className="btn btn-primary">Reveal Solution</button>
            <button className="btn btn-secondary">
              Discussion <span className="badge bg-dark ms-1">56</span>
            </button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div className="d-flex justify-content-center mt-4">
        {currentPage > 1 && (
          <button
            className="btn btn-outline-primary me-2"
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Previous Page
          </button>
        )}
        {currentPage < totalPages && (
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Next Page
          </button>
        )}
      </div>
    </div>
  );
};

export default EachQuestionShowPage;
