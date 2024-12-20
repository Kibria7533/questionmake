"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import ExamDetailsSlide from "@/components/examdetailsslide";
import ExamDetailsFAQ from "@/components/examdetailsfaq";
const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
const ExamDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const [exam, setExam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/exam`);
        if (!response.ok) {
          throw new Error("Failed to fetch exam details.");
        }
        const data = await response.json();
        const selectedExam = data.find((exam) => exam.id === parseInt(id));
        if (!selectedExam) {
          throw new Error("Exam not found.");
        }
        setExam(selectedExam);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [id]);

  if (loading) return <h2 className="text-center mt-5">Loading...</h2>;
  if (error) return <h2 className="text-center mt-5">{error}</h2>;

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4 fw-bold">{exam.name}</h1>

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
          <h3>{exam.score || "N/A"}</h3>
          <p>Average Score</p>
        </div>
      </div>

      {/* Description */}
      <div className="text-center mt-4">
        <p>{exam.description || "No description available."}</p>
        <button
          className="btn btn-primary mt-3"
          onClick={() => router.push(`/exams/${id}/questions`)}
        >
          Browse {exam.questions} Questions
        </button>
      </div>

      {/* Placeholder for additional components */}
      <ExamDetailsSlide />
      <ExamDetailsFAQ />
    </div>
  );
};

export default ExamDetail;
