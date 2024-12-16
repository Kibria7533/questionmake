"use client";

import React, { useState } from "react";
import Multiselect from "multiselect-react-dropdown";
import "bootstrap/dist/css/bootstrap.min.css";

const Questionbank = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      class: "Class 10",
      subject: "Math",
      type: "MCQ",
      question: "What is 2 + 2?",
      status: "Active",
    },
    {
      id: 2,
      class: "Class 9",
      subject: "Science",
      type: "Descriptive",
      question: "Explain photosynthesis.",
      status: "Flagged",
    },
  ]);

  const [filter, setFilter] = useState({
    class: [],
    subject: [],
    type: [],
    search: "",
  });

  const [editModal, setEditModal] = useState(null);

  const handleFilterChange = (selectedList, name) => {
    setFilter({ ...filter, [name]: selectedList });
  };

  const handleSearchChange = (e) => {
    setFilter({ ...filter, search: e.target.value });
  };

  const handleEdit = (question) => {
    setEditModal({ ...question });
  };

  const handleEditSave = () => {
    setQuestions(
      questions.map((q) =>
        q.id === editModal.id ? editModal : q
      )
    );
    setEditModal(null);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this question?");
    if (confirmDelete) {
      setQuestions(questions.filter((q) => q.id !== id));
    }
  };

  const handleFlag = (id) => {
    setQuestions(
      questions.map((q) =>
        q.id === id ? { ...q, status: "Flagged" } : q
      )
    );
  };

  const filteredQuestions = questions.filter((q) => {
    const matchesClass = filter.class.length
      ? filter.class.includes(q.class)
      : true;
    const matchesSubject = filter.subject.length
      ? filter.subject.includes(q.subject)
      : true;
    const matchesType = filter.type.length
      ? filter.type.includes(q.type)
      : true;
    const matchesSearch = q.question
      .toLowerCase()
      .includes(filter.search.toLowerCase());

    return matchesClass && matchesSubject && matchesType && matchesSearch;
  });

  return (
    <div className="container mt-4">
      <h1 className="text-center text-primary mb-4">Questionbank</h1>
      <div className="mb-3">
        <Multiselect
          options={["Class 10", "Class 9", "Class 8"]}
          isObject={false}
          onSelect={(selectedList) => handleFilterChange(selectedList, "class")}
          onRemove={(selectedList) => handleFilterChange(selectedList, "class")}
          placeholder="Filter by Class"
          className="mb-2"
        />
        <Multiselect
          options={["Math", "Science", "English"]}
          isObject={false}
          onSelect={(selectedList) =>
            handleFilterChange(selectedList, "subject")
          }
          onRemove={(selectedList) =>
            handleFilterChange(selectedList, "subject")
          }
          placeholder="Filter by Subject"
          className="mb-2"
        />
        <Multiselect
          options={["MCQ", "Descriptive", "Fill in the Blank"]}
          isObject={false}
          onSelect={(selectedList) => handleFilterChange(selectedList, "type")}
          onRemove={(selectedList) => handleFilterChange(selectedList, "type")}
          placeholder="Filter by Type"
          className="mb-2"
        />
        <input
          type="text"
          className="form-control"
          placeholder="Search by question text"
          value={filter.search}
          onChange={handleSearchChange}
        />
      </div>

      <table className="table table-bordered">
        <thead className="bg-primary text-white">
          <tr>
            <th>Class</th>
            <th>Subject</th>
            <th>Type</th>
            <th>Question</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredQuestions.map((q) => (
            <tr key={q.id} className={q.status === "Flagged" ? "table-warning" : ""}>
              <td>{q.class}</td>
              <td>{q.subject}</td>
              <td>{q.type}</td>
              <td>{q.question}</td>
              <td>{q.status}</td>
              <td>
                <button
                  className="btn btn-warning me-2"
                  onClick={() => handleEdit(q)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger me-2"
                  onClick={() => handleDelete(q.id)}
                >
                  Delete
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => handleFlag(q.id)}
                >
                  Flag
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Question</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setEditModal(null)}
                ></button>
              </div>
              <div className="modal-body">
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editModal.class}
                  onChange={(e) =>
                    setEditModal({ ...editModal, class: e.target.value })
                  }
                  placeholder="Class"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editModal.subject}
                  onChange={(e) =>
                    setEditModal({ ...editModal, subject: e.target.value })
                  }
                  placeholder="Subject"
                />
                <input
                  type="text"
                  className="form-control mb-2"
                  value={editModal.type}
                  onChange={(e) =>
                    setEditModal({ ...editModal, type: e.target.value })
                  }
                  placeholder="Type"
                />
                <textarea
                  className="form-control mb-2"
                  value={editModal.question}
                  onChange={(e) =>
                    setEditModal({ ...editModal, question: e.target.value })
                  }
                  placeholder="Question"
                ></textarea>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleEditSave}
                >
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setEditModal(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questionbank;
