"use client";

import React, { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement,
} from "chart.js";
import { Pie, Bar, Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  LineElement,
  PointElement
);

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

const Dashboard = () => {
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [token, setToken] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filter, setFilter] = useState({ email: "", subject: "", date: "" });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("access_token");
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchContacts();
    }
  }, [token]);

  useEffect(() => {
    let filtered = contacts;

    if (filter.email) {
      filtered = filtered.filter((contact) =>
        contact.email.toLowerCase().includes(filter.email.toLowerCase())
      );
    }

    if (filter.subject) {
      filtered = filtered.filter((contact) =>
        contact.subject.toLowerCase().includes(filter.subject.toLowerCase())
      );
    }

    if (filter.date) {
      filtered = filtered.filter((contact) =>
        new Date(contact.date).toISOString().split("T")[0] === filter.date
      );
    }

    setFilteredContacts(filtered);
  }, [filter, contacts]);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${BASE_URL}/contact`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setContacts(data);
        setFilteredContacts(data);
      } else {
        console.error("Failed to fetch contacts");
      }
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  };

  const viewContact = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/contact/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSelectedContact(data);
        setIsModalOpen(true);
      } else {
        console.error("Failed to fetch contact");
      }
    } catch (error) {
      console.error("Error fetching contact:", error);
    }
  };

  const deleteContact = async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/contact/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setContacts(contacts.filter((contact) => contact.id !== id));
        setSelectedContact(null);
        setIsModalOpen(false);
      } else {
        console.error("Failed to delete contact");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const pieData = {
    labels: ["Math", "Science", "English", "History"],
    datasets: [
      {
        data: [30, 20, 25, 25],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56", "#4bc0c0"],
        hoverBackgroundColor: ["#ff6384cc", "#36a2ebcc", "#ffcd56cc", "#4bc0c0cc"],
      },
    ],
  };

  const barData = {
    labels: ["January", "February", "March", "April"],
    datasets: [
      {
        label: "Users",
        data: [50, 75, 150, 100],
        backgroundColor: "#36a2eb",
      },
    ],
  };

  const lineData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Activity",
        data: [10, 20, 15, 25],
        borderColor: "#ff6384",
        fill: false,
      },
    ],
  };

  const styles = {
    container: {
      padding: "20px",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "20px",
      textAlign: "center",
      color: "#004080",
    },
    chartContainer: {
      display: "flex",
      justifyContent: "space-around",
      flexWrap: "wrap",
      gap: "20px",
    },
    chartBox: {
      width: "300px",
      height: "300px",
      backgroundColor: "#f4f4f4",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    filterContainer: {
      display: "flex",
      justifyContent: "space-between",
      marginBottom: "20px",
    },
    filterInput: {
      padding: "10px",
      fontSize: "1rem",
      borderRadius: "5px",
      border: "1px solid #ccc",
      width: "30%",
    },
    contactsSection: {
      marginTop: "50px", // Added margin-top for gap between charts and contacts
    },
    contactTitle: {
      fontSize: "1.5rem",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
    },
    contactCard: {
      backgroundColor: "#f4f4f4",
      padding: "10px",
      margin: "10px 0",
      borderRadius: "5px",
      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    },
    button: {
      padding: "5px 10px",
      margin: "0 5px",
      backgroundColor: "#004080",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    },
    deleteButton: {
      backgroundColor: "#ff4d4d",
    },
    modal: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#fff",
      padding: "20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      zIndex: 1000,
      maxWidth: "400px",
      width: "90%",
    },
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: 999,
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>

      {/* Charts Section */}
      <div style={styles.chartContainer}>
        <div style={styles.chartBox}>
          <Pie data={pieData} />
        </div>
        <div style={styles.chartBox}>
          <Bar data={barData} />
        </div>
        <div style={styles.chartBox}>
          <Line data={lineData} />
        </div>
      </div>

      {/* Contacts Section */}
      <div style={styles.contactsSection}>
        <h2 style={styles.contactTitle}>Contacts Messeges</h2>

        {/* Filter Section */}
        <div style={styles.filterContainer}>
          <input
            type="text"
            name="email"
            placeholder="Filter by email"
            value={filter.email}
            onChange={handleFilterChange}
            style={styles.filterInput}
          />
          <input
            type="text"
            name="subject"
            placeholder="Filter by subject"
            value={filter.subject}
            onChange={handleFilterChange}
            style={styles.filterInput}
          />
          <input
            type="date"
            name="date"
            value={filter.date}
            onChange={handleFilterChange}
            style={styles.filterInput}
          />
        </div>

        {/* Contact List */}
        {filteredContacts.map((contact) => (
          <div key={contact.id} style={styles.contactCard}>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Subject:</strong> {contact.subject}</p>
            <p><strong>Body:</strong> {contact.body.substring(0, 50)}...</p>
            <button
              style={styles.button}
              onClick={() => viewContact(contact.id)}
            >
              View
            </button>
            <button
              style={{ ...styles.button, ...styles.deleteButton }}
              onClick={() => deleteContact(contact.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Modal for viewing full details */}
      {isModalOpen && selectedContact && (
        <>
          <div style={styles.overlay} onClick={closeModal}></div>
          <div style={styles.modal}>
            <h3>Contact Details</h3>
            <p><strong>Email:</strong> {selectedContact.email}</p>
            <p><strong>Subject:</strong> {selectedContact.subject}</p>
            <p><strong>Body:</strong> {selectedContact.body}</p>
            <button style={styles.button} onClick={closeModal}>
              Close
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
