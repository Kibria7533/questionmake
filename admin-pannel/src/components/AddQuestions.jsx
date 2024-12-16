"use client";
import { useState } from "react";
import Select from "react-select";

const AddQuestion = () => {
  const [questionType, setQuestionType] = useState("mcq");
  const [options, setOptions] = useState([""]);
  const [subQuestions, setSubQuestions] = useState([
    { question: "", correctAnswer: "" },
  ]);
  const [formData, setFormData] = useState({
    classes: [],
    subjects: [],
    chapters: [],
    questionText: "",
    correctAnswer: "",
    description: "",
    image: null,
  });

  const classOptions = [
    { value: "Class 1", label: "Class 1" },
    { value: "Class 2", label: "Class 2" },
    { value: "Class 3", label: "Class 3" },
    { value: "Class 4", label: "Class 4" },
    { value: "Class 5", label: "Class 5" },
  ];

  const subjectOptions = [
    { value: "Mathematics", label: "Mathematics" },
    { value: "Science", label: "Science" },
    { value: "History", label: "History" },
    { value: "English", label: "English" },
  ];

  const chapterOptions = [
    { value: "Chapter 1", label: "Chapter 1" },
    { value: "Chapter 2", label: "Chapter 2" },
    { value: "Chapter 3", label: "Chapter 3" },
    { value: "Chapter 4", label: "Chapter 4" },
  ];

  const handleMultiSelectChange = (field, selectedOptions) => {
    setFormData({
      ...formData,
      [field]: selectedOptions.map((opt) => opt.value),
    });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const addOption = () => {
    setOptions([...options, ""]);
  };

  const removeOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    setOptions(updatedOptions);
  };

  const handleSubQuestionChange = (index, field, value) => {
    const updatedSubQuestions = [...subQuestions];
    updatedSubQuestions[index][field] = value;
    setSubQuestions(updatedSubQuestions);
  };

  const addSubQuestion = () => {
    setSubQuestions([...subQuestions, { question: "", correctAnswer: "" }]);
  };

  const removeSubQuestion = (index) => {
    const updatedSubQuestions = subQuestions.filter((_, i) => i !== index);
    setSubQuestions(updatedSubQuestions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const questionData = {
      ...formData,
      type: questionType,
      options: questionType === "mcq" ? options : undefined,
      subQuestions: questionType === "creative" ? subQuestions : undefined,
    };

    console.log("Submitted Question:", questionData);
    alert("Question added successfully!");
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
        {/* Responsive Grid for Multi-Select Inputs */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Class:
            </label>
            <Select
              options={classOptions}
              isMulti
              onChange={(selectedOptions) =>
                handleMultiSelectChange("classes", selectedOptions)
              }
              placeholder="Select Classes"
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Subject:
            </label>
            <Select
              options={subjectOptions}
              isMulti
              onChange={(selectedOptions) =>
                handleMultiSelectChange("subjects", selectedOptions)
              }
              placeholder="Select Subjects"
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Chapter:
            </label>
            <Select
              options={chapterOptions}
              isMulti
              onChange={(selectedOptions) =>
                handleMultiSelectChange("chapters", selectedOptions)
              }
              placeholder="Select Chapters"
            />
          </div>

          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
              Question Type:
            </label>
            <select
              value={questionType}
              onChange={(e) => setQuestionType(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
                width: "100%",
              }}
            >
              <option value="mcq">Multiple Choice</option>
              <option value="truefalse">True/False</option>
              <option value="shortanswer">Short Answer</option>
              <option value="creative">Creative</option>
            </select>
          </div>
        </div>

        {/* Inputs for Question Text */}
        {questionType !== "creative" && (
          <>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
              Question Text:
            </label>
            <textarea
              name="questionText"
              value={formData.questionText}
              onChange={handleInputChange}
              placeholder="Enter the question"
              required
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "20px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            ></textarea>
          </>
        )}

        {/* Options for MCQ */}
        {questionType === "mcq" && (
          <div>
            <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
              Options:
            </label>
            {options.map((option, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  marginBottom: "10px",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                  required
                  style={{
                    flex: "1",
                    padding: "10px",
                    marginRight: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeOption(index)}
                  style={{
                    padding: "10px",
                    backgroundColor: "#d9534f",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
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
                padding: "10px 20px",
                backgroundColor: "#5bc0de",
                color: "white",
                fontWeight: "bold",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                display: "inline-block",
                marginTop: "10px",
              }}
            >
              + Add Option
            </button>
          </div>
        )}

        {/* Correct Answer Input */}
        <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
          Correct Answer:
        </label>
        <input
          type="text"
          name="correctAnswer"
          value={formData.correctAnswer}
          onChange={handleInputChange}
          placeholder="Enter the correct answer"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />

        {/* Creative Question Type */}
        {questionType === "creative" && (
          <div>
            <label style={{ display: "block", fontWeight: "bold", marginBottom: "10px" }}>
              Description:
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter the description"
              style={{
                width: "100%",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "1px solid #ddd",
              }}
            ></textarea>

            <label style={{ display: "block", marginBottom: "10px", fontWeight: "bold" }}>
              Attach Image (Optional):
            </label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              style={{
                marginBottom: "20px",
              }}
            />

            <h4>Sub-Questions:</h4>
            {subQuestions.map((subQ, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr auto",
                  gap: "10px",
                  marginBottom: "10px",
                }}
              >
                <input
                  type="text"
                  placeholder={`Sub-Question ${index + 1}`}
                  value={subQ.question}
                  onChange={(e) =>
                    handleSubQuestionChange(index, "question", e.target.value)
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
                <input
                  type="text"
                  placeholder="Correct Answer"
                  value={subQ.correctAnswer}
                  onChange={(e) =>
                    handleSubQuestionChange(index, "correctAnswer", e.target.value)
                  }
                  style={{
                    padding: "10px",
                    borderRadius: "5px",
                    border: "1px solid #ddd",
                  }}
                />
                <button
                  type="button"
                  onClick={() => removeSubQuestion(index)}
                  style={{
                    padding: "10px",
                    backgroundColor: "#d9534f",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addSubQuestion}
              style={{
                padding: "10px 20px",
                backgroundColor: "#5bc0de",
                color: "white",
                fontWeight: "bold",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              + Add Sub-Question
            </button>
          </div>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "20px",
            backgroundColor: "#5cb85c",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;
