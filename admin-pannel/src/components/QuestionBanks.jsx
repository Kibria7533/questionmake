"use client";

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";

const Questionbank = () => {
  const [token, setToken] = useState(null);
  const [filters, setFilters] = useState({
    examCategory: "",
    exam: "",
    class: "",
    subject: "",
    chapter: "",
    type: "",
  });

  const [filterOptions, setFilterOptions] = useState({
    examCategories: [],
    exams: [],
    classes: [],
    subjects: [],
    chapters: [],
    types: [
      { id: 2, name: "MULTIPLE CHOICE" },
      { id: 3, name: "TRUE/FALSE" },
      { id: 4, name: "CREATIVE" },
    ],
  });

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token");
      setToken(storedToken);
    }


    // Fetch filter options from the APIs
    const fetchFilterOptions = async () => {
      try {
        const [examCategoryRes, examRes, classRes, subjectRes, chapterRes] = await Promise.all([
          axios.get("http://localhost:4000/api/exam-category", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:4000/api/exam", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:4000/api/classes", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:4000/api/subjects", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
          axios.get("http://localhost:4000/api/chapters", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        ]);

        setFilterOptions((prevOptions) => ({
          ...prevOptions,
          examCategories: examCategoryRes.data,
          exams: examRes.data,
          classes: classRes.data,
          subjects: subjectRes.data,
          chapters: chapterRes.data,
        }));
      } catch (error) {
        console.error("Error fetching filter options:", error);
      }
    };

    // Fetch all questions initially from the filter endpoint
    const fetchAllQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/questions/filter", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setQuestions(response.data);
      } catch (error) {
        console.error("Error fetching all questions:", error);
      }
    };

    if (token) {
      fetchFilterOptions();
      fetchAllQuestions();
    }
  }, [token]);

  const fetchQuestions = async () => {
    try {
      const { examCategory, exam, class: className, subject, chapter, type } = filters;
      const response = await axios.get("http://localhost:4000/api/questions/filter", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          examCategory,
          exam,
          class: className,
          subject,
          chapter,
          type,
        },
      });
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };
// Example function to update the state after deleting
const removeQuestionFromState = (questionId) => {
  setQuestions((prevQuestions) =>
    prevQuestions.filter((question) => question.id !== questionId)
  );
};
  const handleDeleteQuestion = async (questionId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this question?"
    );
  
    if (!confirmDelete) return;
  
    try {
      const response = await fetch(`http://localhost:4000/api/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          'accept': '*/*',
        },
      });
  
      if (response.ok) {
        alert("Question deleted successfully!");
        // Optionally, refresh the list of questions or update the state
        removeQuestionFromState(questionId);
      } else {
        const errorData = await response.json();
        alert(`Failed to delete question: ${errorData.message || response.status}`);
      }
    } catch (error) {
      console.error("Error deleting question:", error);
      alert("An error occurred while deleting the question. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Questionbank</h1>
      <div className="mb-3">
        <div className="mb-2">
          <select
            className="form-select"
            name="examCategory"
            value={filters.examCategory}
            onChange={handleFilterChange}
          >
            <option value="">Select Exam Category</option>
            {filterOptions.examCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <select
            className="form-select"
            name="exam"
            value={filters.exam}
            onChange={handleFilterChange}
          >
            <option value="">Select Exam</option>
            {filterOptions.exams.map((exam) => (
              <option key={exam.id} value={exam.name}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <select
            className="form-select"
            name="class"
            value={filters.class}
            onChange={handleFilterChange}
          >
            <option value="">Select Class</option>
            {filterOptions.classes.map((cls) => (
              <option key={cls.id} value={cls.name}>
                {cls.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <select
            className="form-select"
            name="subject"
            value={filters.subject}
            onChange={handleFilterChange}
          >
            <option value="">Select Subject</option>
            {filterOptions.subjects.map((subject) => (
              <option key={subject.id} value={subject.name}>
                {subject.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <select
            className="form-select"
            name="chapter"
            value={filters.chapter}
            onChange={handleFilterChange}
          >
            <option value="">Select Chapter</option>
            {filterOptions.chapters.map((chapter) => (
              <option key={chapter.id} value={chapter.name}>
                {chapter.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-2">
          <select
            className="form-select"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="">Select Type</option>
            {filterOptions.types.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>
        <button className="btn btn-primary" onClick={fetchQuestions}>
          Apply Filters
        </button>
      </div>


{/* Question display start */}

<div className="row">
  {questions.map((question, index) => (
    <div className="col-md-6 mb-3" key={index}>
      <div className="card">
        <div className="card-body">
        {
          question.type !== "CREATIVE" && (
            <h5 className="card-title text-primary">
              {question.questionText || "Untitled Question"}
            </h5>
          )
        }
          {question.type === "MULTIPLE CHOICE" && (
            <div>
              <strong>Options:</strong>
              <div>
                {question.options.map((option, optIndex) => (
                  <div
                    key={optIndex}
                    className={
                      option.isCorrect
                        ? "text-success fw-bold"
                        : "text-secondary"
                    }
                  >
                    {String.fromCharCode(97 + optIndex)}) {option.text}{" "}
                    {option.isCorrect && "(Correct Answer)"}
                  </div>
                ))}
              </div>
            </div>
          )}
          {question.type === "TRUE/FALSE" && (
            <div>
              <h2>{question.correctAnswer}</h2>
            </div>
          )}
          {question.type === "CREATIVE" && (
            <div>
              <strong>Description:</strong> {question.description || "N/A"}
              <div>
                {question.creativeQuestions?.map((cq, cqIndex) => (
                  <div key={cqIndex}>
                    {String.fromCharCode(97 + cqIndex)}) {cq}
                  </div>
                ))}
              </div>
              {question.image && question.image.url && (
                <div className="mt-2">
                  <img
                    src={question.image.url}
                    alt="Creative Question Image"
                    className="img-fluid mt-3"
                  />
                </div>
              )}
            </div>
          )}
          {question.image && !question.type === "CREATIVE" && (
            <div className="mt-2">
              <strong>Image:</strong>
              {question.image.url ? (
                <img
                  src={question.image.url}
                  alt="Question Image"
                  className="img-fluid mt-2"
                />
              ) : (
                <span>No Image Available</span>
              )}
            </div>
          )}
          {!question.type && (
            <div>
              <strong>Note:</strong> This question lacks a type and may be incomplete.
            </div>
          )}
          <div className="mt-3 d-flex justify-content-between">
            <button
              className="btn btn-warning btn-sm"
              onClick={() => handleEditQuestion(question.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteQuestion(question.id)}
            >
              Delete
            </button>
          </div>
        </div>
        <div className="card-footer text-muted text-center small">
          {question.classes}, {question.subjects}, {question.exams},{" "}
          {question.chapters}, {question.type || "N/A"}
        </div>
      </div>
    </div>
  ))}
</div>



{/* Question display end */}
    </div>
  );
};

export default Questionbank;
