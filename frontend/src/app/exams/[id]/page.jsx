"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import ExamDetailsSlide from "@/components/examdetailsslide";
import ExamDetailsFAQ from "@/components/examdetailsfaq";

const examDetails = {
  "0": {
    title: "Amazon AWS Certified Advanced Networking - Specialty ANS-C01",
    questions: 234,
    passed: 1056,
    score: "95.1%",
    description:
      "234 Questions and Answers for the AWS Certified Advanced Networking - Specialty ANS-C01 Exam",
    userFeedback: "94% student found the test questions almost same",
    users: [
      "https://i.pravatar.cc/40?img=1",
      "https://i.pravatar.cc/40?img=2",
      "https://i.pravatar.cc/40?img=3",
    ],
  },
  1: {
    title: "Cisco Certified Network Associate (CCNA)",
    questions: 320,
    passed: 870,
    score: "92.5%",
    description: "Cisco Certified Network Associate Exam Preparation.",
    userFeedback: "93% student found the test questions helpful",
    users: [
      "https://i.pravatar.cc/40?img=4",
      "https://i.pravatar.cc/40?img=5",
      "https://i.pravatar.cc/40?img=6",
    ],
  },
};

const ExamDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const exam = examDetails[id];

  if (!exam) return <h2 className="text-center mt-5">Exam Not Found</h2>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">{exam.title}</h1>

      {/* Stats */}
      <div className="d-flex justify-content-around mt-4">
        <div className="text-center">
          <h3>{exam.questions}</h3>
          <p>Questions and Answers</p>
        </div>
        <div className="text-center">
          <h3>{exam.passed}</h3>
          <p>Students Passed</p>
        </div>
        <div className="text-center">
          <h3>{exam.score}</h3>
          <p>Average Score</p>
        </div>
      </div>

      {/* Description */}
      <div className="text-center mt-4">
        <p>{exam.description}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => router.push(`/exams/${id}/questions`)}
        >
          Browse {exam.questions} Questions
        </button>
      </div>

      {/* User Feedback */}
      <div className="text-center mt-5">
        <div className="d-flex justify-content-center align-items-center gap-2">
          {exam.users.map((user, index) => (
            <img
              key={index}
              src={user}
              alt={`User ${index}`}
              className="rounded-circle"
              style={{ width: "40px", height: "40px", marginRight: "5px" }}
            />
          ))}
          <span className="fw-bold">{exam.userFeedback}</span>
        </div>
      </div>
      <ExamDetailsSlide />
      <ExamDetailsFAQ />
    </div>
  );
};

export default ExamDetail;
