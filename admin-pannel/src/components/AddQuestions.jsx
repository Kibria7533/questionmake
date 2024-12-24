"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const AddQuestion = () => {
  const [questionType, setQuestionType] = useState("");
  const [classOptions, setClassOptions] = useState([]);
  const [examOptions, setExamOptions] = useState([]);
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [chapterOptions, setChapterOptions] = useState([]);
  const [questionTypeOptions, setQuestionTypeOptions] = useState([
    { id: 2, name: "MULTIPLE CHOICE" },
    { id: 3, name: "TRUE/FALSE" },
    { id: 4, name: "CREATIVE" },
  ]);
  const [formData, setFormData] = useState({
    classes: "",
    exams: "",
    subjects: "",
    chapters: "",
    description: "",
    questionText: "",
    correctAnswer: "",
    image: null,
  });

  const [options, setOptions] = useState([{ text: "", isCorrect: false }]);
  const [creativeQuestions, setCreativeQuestions] = useState([{ text: "" }]);

  const fetchData = async () => {
    try {
      const headers = {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImlhdCI6MTczNTAyNjkxNiwiZXhwIjoxNzM1NjMxNzE2fQ.CKevHW7RDJIrZYt_4DwexXBqQcxZ7S-Ok4svy0BJPdo",
      };

      const [classRes, examRes, subjectRes, chapterRes] = await Promise.all([
        axios.get("http://localhost:4000/api/classes", { headers }),
        axios.get("http://localhost:4000/api/exam", { headers }),
        axios.get("http://localhost:4000/api/subjects", { headers }),
        axios.get("http://localhost:4000/api/chapters", { headers }),
      ]);

      setClassOptions(classRes.data.map((cls) => cls.name));
      setExamOptions(examRes.data.map((exam) => exam.name));
      setSubjectOptions(subjectRes.data.map((subject) => subject.name));
      setChapterOptions(chapterRes.data.map((chapter) => chapter.name));
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = [...options];
    updatedOptions[index][field] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => setOptions([...options, { text: "", isCorrect: false }]);

  const removeOption = (index) => setOptions(options.filter((_, i) => i !== index));

  const handleCreativeQuestionChange = (index, value) => {
    const updatedCreativeQuestions = [...creativeQuestions];
    updatedCreativeQuestions[index].text = value;
    setCreativeQuestions(updatedCreativeQuestions);
  };

  const addCreativeQuestion = () =>
    setCreativeQuestions([...creativeQuestions, { text: "" }]);

  const removeCreativeQuestion = (index) =>
    setCreativeQuestions(creativeQuestions.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const questionData = {
      ...formData,
      type: questionType,
      options: questionType === "MULTIPLE CHOICE" ? options : undefined,
      creativeQuestions:
        questionType === "CREATIVE" ? creativeQuestions.map((q) => q.text) : undefined,
    };
  
    try {
      const response = await fetch("http://localhost:4000/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(questionData),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log("Submitted Question:", data);
        alert("Question added successfully!");
  
        // Reset form fields
        setFormData({
          classes: "",
          exams: "",
          subjects: "",
          chapters: "",
          description: "",
          questionText: "",
          correctAnswer: "",
          image: null,
        });
        setOptions([{ text: "", isCorrect: false }]);
        setCreativeQuestions([{ text: "" }]);
      } else {
        console.error("Failed to add question:", response.statusText);
        alert("Failed to add question. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting question:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ddd",
        borderRadius: "10px",
        backgroundColor: "#f9f9f9",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add Question</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
          <div>
            <label>Class:</label>
            <select
              name="classes"
              value={formData.classes}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            >
              <option value="">Select a class</option>
              {classOptions.map((cls, index) => (
                <option key={index} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Exam:</label>
            <select
              name="exams"
              value={formData.exams}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            >
              <option value="">Select an exam</option>
              {examOptions.map((exam, index) => (
                <option key={index} value={exam}>
                  {exam}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Subject:</label>
            <select
              name="subjects"
              value={formData.subjects}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            >
              <option value="">Select a subject</option>
              {subjectOptions.map((subject, index) => (
                <option key={index} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Chapter:</label>
            <select
              name="chapters"
              value={formData.chapters}
              onChange={handleInputChange}
              style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            >
              <option value="">Select a chapter</option>
              {chapterOptions.map((chapter, index) => (
                <option key={index} value={chapter}>
                  {chapter}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Question Type:</label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            >
              <option value="">Select a question type</option>
              {questionTypeOptions.map((type) => (
                <option key={type.id} value={type.name}>
                  {type.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Conditional Inputs */}
        {questionType === "MULTIPLE CHOICE" && (
          <div>
            <label>Question:</label>
            <textarea
              name="questionText"
              value={formData.questionText}
              onChange={handleInputChange}
              placeholder="Enter the question"
              style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            ></textarea>

            <label>Options:</label>
            {options.map((option, index) => (
              <div key={index} style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) =>
                    handleOptionChange(index, "text", e.target.value)
                  }
                  placeholder={`Option ${index + 1}`}
                  style={{ flex: 1, marginRight: "10px", padding: "10px" }}
                />
                <label style={{ marginRight: "10px" }}>
                  <input
                    type="checkbox"
                    checked={option.isCorrect}
                    onChange={(e) =>
                      handleOptionChange(index, "isCorrect", e.target.checked)
                    }
                  />{" "}
                  Correct
                </label>
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  style={{
                    padding: "10px",
                    backgroundColor: "#d9534f",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addOption}
              style={{
                padding: "10px",
                backgroundColor: "#5bc0de",
                color: "white",
                border: "none",
                borderRadius: "5px",
                margin: "20px 0px 30px"
              }}
            >
              + Add Option
            </button>
          </div>
        )}

        {questionType === "TRUE/FALSE" && (
          <div>
            <label>Question:</label>
            <textarea
              name="questionText"
              value={formData.questionText}
              onChange={handleInputChange}
              placeholder="Enter the question"
              style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            ></textarea>

            <label>Correct Answer:</label>
            <div style={{ marginBottom: "20px" }}>
              <label style={{ marginRight: "20px" }}>
                <input
                  type="radio"
                  name="correctAnswer"
                  value="True"
                  checked={formData.correctAnswer === "True"}
                  onChange={handleInputChange}
                />{" "}
                True
              </label>
              <label>
                <input
                  type="radio"
                  name="correctAnswer"
                  value="False"
                  checked={formData.correctAnswer === "False"}
                  onChange={handleInputChange}
                />{" "}
                False
              </label>
            </div>
          </div>
        )}

        {questionType === "CREATIVE" && (
          <div>
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter the description"
              style={{ width: "100%", padding: "10px", marginBottom: "20px" }}
            ></textarea>

            <label>Questions:</label>
            {creativeQuestions.map((question, index) => (
              <div key={index} style={{ display: "flex", marginBottom: "10px", alignItems: "center" }}>
                <input
                  type="text"
                  value={question.text}
                  onChange={(e) =>
                    handleCreativeQuestionChange(index, e.target.value)
                  }
                  placeholder={`Question ${index + 1}`}
                  style={{ flex: 1, marginRight: "10px", padding: "10px" }}
                />
                <button
                  type="button"
                  onClick={() => removeCreativeQuestion(index)}
                  style={{
                    padding: "10px",
                    backgroundColor: "#d9534f",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addCreativeQuestion}
              style={{
                padding: "10px",
                backgroundColor: "#5bc0de",
                color: "white",
                border: "none",
                borderRadius: "5px",
              }}
            >
              + Add Question
            </button>

            <label style={{marginLeft:"30px"}}>Attach Image (Optional):</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              style={{ marginBottom: "20px" }}
            />
          </div>
        )}

        <button type="submit" style={{ padding: "10px 20px", backgroundColor: "#5cb85c", color: "white", border: "none", borderRadius: "5px" }}>
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
