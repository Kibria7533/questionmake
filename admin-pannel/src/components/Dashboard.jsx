"use client";

import React from "react";
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

const Dashboard = () => {
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
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Dashboard</h1>
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
    </div>
  );
};

export default Dashboard;
