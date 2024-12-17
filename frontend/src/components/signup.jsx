"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirm_password: "",
    dob: "",
    gender: 1,
  });

  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Full Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";

    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{11}$/.test(formData.mobile)) newErrors.mobile = "Mobile must be 11 digits";

    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (formData.password !== formData.confirm_password)
      newErrors.confirm_password = "Passwords do not match";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);
    try {
      const response = await fetch("http://localhost:4000/api/auth/registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Registration successful! Redirecting...");
        setTimeout(() => router.push("/login"), 2000);
      } else {
        throw new Error(data.message || "Something went wrong!");
      }
    } catch (err) {
      setErrors({ api: err.message });
    } finally {
      setLoading(false);
    }
  };

  const styles = {
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "linear-gradient(to right, #6a11cb, #2575fc)",
      fontFamily: "'Poppins', sans-serif",
    },
    overlay: {
      backgroundColor: "white",
      padding: "40px",
      borderRadius: "12px",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)",
      maxWidth: "450px",
      width: "100%",
    },
    title: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#333",
      textAlign: "center",
      marginBottom: "20px",
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "15px",
    },
    label: {
      marginBottom: "5px",
      fontWeight: "bold",
      color: "#555",
    },
    input: {
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "1rem",
      outline: "none",
    },
    button: {
      marginTop: "10px",
      backgroundColor: "#6a11cb",
      color: "white",
      border: "none",
      borderRadius: "8px",
      padding: "12px",
      fontSize: "1.1rem",
      cursor: "pointer",
    },
    linkToLogin: {
      marginTop: "15px",
      textAlign: "center",
      fontSize: "0.9rem",
      color: "#2575fc",
    },
    error: { color: "red", fontSize: "0.9rem" },
    success: { color: "green", fontSize: "0.9rem", textAlign: "center" },
  };

  return (
    <div style={styles.page}>
      <div style={styles.overlay}>
        <h1 style={styles.title}>Sign Up</h1>
        {errors.api && <p style={styles.error}>{errors.api}</p>}
        {success && <p style={styles.success}>{success}</p>}
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.name && <span style={styles.error}>{errors.name}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.email && <span style={styles.error}>{errors.email}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Mobile Number</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.mobile && <span style={styles.error}>{errors.mobile}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.dob && <span style={styles.error}>{errors.dob}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={styles.input}
            >
              <option value={1}>Male</option>
              <option value={2}>Female</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.password && <span style={styles.error}>{errors.password}</span>}
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Confirm Password</label>
            <input
              type="password"
              name="confirm_password"
              value={formData.confirm_password}
              onChange={handleChange}
              style={styles.input}
            />
            {errors.confirm_password && (
              <span style={styles.error}>{errors.confirm_password}</span>
            )}
          </div>
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
        <div style={styles.linkToLogin}>
          Already have an account?{" "}
          <a href="/login" style={{ textDecoration: "none", color: "#6a11cb" }}>
            Go to Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
