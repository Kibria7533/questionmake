"use client";

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "bootstrap/dist/css/bootstrap.min.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const userGrowthData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Number of Users",
        data: [50, 75, 150, 200, 250, 300, 350, 400, 450, 500, 550, 600],
        borderColor: "#4bc0c0",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const engagementData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    datasets: [
      {
        label: "Engagement Rate (%)",
        data: [65, 70, 75, 80, 78, 85, 90, 95, 93, 88, 92, 94],
        borderColor: "#ff6384",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        tension: 0.4,
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
      width: "600px",
      backgroundColor: "#f4f4f4",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Reports</h1>
      <div className="text-center mb-4">
        <h4>Total Users: <span className="text-success">600</span></h4>
      </div>
      <div style={styles.chartContainer}>
        <div style={styles.chartBox}>
          <h5 className="text-center">User Growth Over Time</h5>
          <Line data={userGrowthData} />
        </div>
        <div style={styles.chartBox}>
          <h5 className="text-center">Engagement Rate Over Time</h5>
          <Line data={engagementData} />
        </div>
      </div>
    </div>
  );
};

export default Reports;
