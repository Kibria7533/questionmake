"use client";

import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const CertificationProviders = () => {
  const providers = [
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
      exams: [
        "AWS Certified Advanced Networking - Specialty ANS-C01",
        "AWS Certified AI Practitioner AIF-C01",
        "AWS Certified Cloud Practitioner CLF-C02",
        "AWS Certified Data Engineer - Associate DEA-C01",
        "AWS Certified Developer - Associate DVA-C02",
        "AWS Certified Solutions Architect - Associate SAA-C03",
      ],
    },
    {
      name: "Cisco",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Cisco_logo.svg",
      exams: [
        "200-201: Cisco Cybersecurity Operations",
        "300-301: Cisco Certified Network Associate (CCNA)",
        "300-420: Designing Cisco Enterprise Networks",
        "350-401: Cisco Enterprise Network Core Technologies",
        "500-220: Cisco Meraki Solutions Specialist",
      ],
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
      exams: [
        "AZ-104: Microsoft Azure Administrator",
        "AZ-204: Developing Microsoft Azure Solutions",
        "AZ-500: Microsoft Azure Security Technologies",
        "DP-100: Data Science Solution on Azure",
        "SC-900: Microsoft Security Fundamentals",
      ],
    },
    {
      name: "CompTIA",
      logo: "https://upload.wikimedia.org/wikipedia/commons/8/83/CompTIA_logo.svg",
      exams: [
        "220-1101: CompTIA A+ Certification Exam",
        "N10-008: CompTIA Network+",
        "SY0-701: CompTIA Security+ 2023",
        "PT0-002: CompTIA PenTest+",
        "XK0-005: CompTIA Linux+",
      ],
    },
  ];

  const styles = {
    section: {
      padding: "50px 20px",
      fontFamily: "'Arial', sans-serif",
    },
    header: {
      textAlign: "center",
      marginBottom: "30px",
    },
    logo: {
      height: "50px",
      marginBottom: "10px",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      boxShadow: "0px 2px 5px rgba(0,0,0,0.1)",
      padding: "20px",
      textAlign: "center",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      height: "100%", // Ensures cards stretch evenly
    },
    examList: {
      textAlign: "left",
      paddingLeft: "0",
    },
    examItem: {
      fontSize: "0.9rem",
      color: "#007bff",
      textDecoration: "none",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.section}>
      {/* Header */}
      <div style={styles.header}>
        <h2 className="fw-bold">Top Exams & Certification Providers</h2>
        <p className="text-muted">
          QuestionHat is not affiliated or certified by any certification provider.
        </p>
      </div>

      {/* Grid of Providers */}
      <div className="container">
        <div className="row">
          {providers.map((provider, index) => (
            <div key={index} className="col-md-6 col-lg-3 d-flex align-items-stretch mb-4">
              <div style={styles.card}>
                {/* Logo */}
                <img
                  src={provider.logo}
                  alt={`${provider.name} Logo`}
                  style={styles.logo}
                />
                <h5 className="mb-3">Top {provider.name} Exams</h5>
                {/* Exam List */}
                <ul style={styles.examList} className="list-unstyled">
                  {provider.exams.map((exam, idx) => (
                    <li key={idx}>
                      <a href={`/exams/${idx}`} style={styles.examItem}>
                        {exam}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* View All Exams */}
      <div className="text-center mt-4">
        <a href="/view-all-exam" className="btn btn-primary">
          View All Exams &rarr;
        </a>
      </div>
    </div>
  );
};

export default CertificationProviders;
