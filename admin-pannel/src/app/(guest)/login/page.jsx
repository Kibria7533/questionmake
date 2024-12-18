"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ mobile: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("http://localhost:4000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Store the access token in localStorage
        localStorage.setItem("access_token", data.access_token);
        router.push("/"); // Redirect to the profile page
        // setTimeout(() => {
        //   window.location.reload();
        // }, 50); // Small delay to ensure navigation happens first
      } else {
        throw new Error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      padding: "20px",
      fontFamily: "'Poppins', sans-serif",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #6a11cb, #2575fc)",
    },
    overlay: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
      maxWidth: "400px",
      width: "100%",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "20px",
      textAlign: "center",
      color: "#333",
      fontWeight: "bold",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "20px",
    },
    label: {
      marginBottom: "8px",
      fontWeight: "bold",
      color: "#555",
      fontSize: "1rem",
    },
    input: {
      padding: "12px 15px",
      fontSize: "1rem",
      border: "1px solid #ccc",
      borderRadius: "8px",
      outline: "none",
      transition: "box-shadow 0.3s, border 0.3s",
    },
    button: {
      backgroundColor: "#6a11cb",
      color: "#fff",
      padding: "12px",
      fontSize: "1.1rem",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
      transition: "background-color 0.3s, transform 0.2s",
    },
    buttonDisabled: {
      backgroundColor: "#ccc",
      cursor: "not-allowed",
    },
    signupLink: {
      textAlign: "center",
      marginTop: "15px",
      fontSize: "0.9rem",
      color: "#6a11cb",
    },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Login</h1>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="mobile">
              Mobile Number
            </label>
            <input
              type="text"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label} htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <button
            type="submit"
            style={{
              ...styles.button,
              ...(loading && styles.buttonDisabled),
            }}
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;
