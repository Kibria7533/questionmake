"use client";

import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";

const Home = () => {
  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      padding: "20px",
    },
    banner: {
      backgroundColor: "#004080",
      color: "white",
      textAlign: "center",
      padding: "50px 20px",
      marginBottom: "20px",
    },
    bannerText: {
      fontSize: "2.5rem",
      marginBottom: "10px",
    },
    carouselContainer: {
      marginBottom: "30px",
    },
    newsSection: {
      marginTop: "20px",
    },
    newsTitle: {
      fontSize: "1.8rem",
      marginBottom: "20px",
      color: "#004080",
    },
    newsItem: {
      marginBottom: "10px",
    },
    animatedText: {
      animation: "slide-in 2s ease-in-out",
    },
    "@keyframes slide-in": {
      from: {
        opacity: 0,
        transform: "translateX(-100%)",
      },
      to: {
        opacity: 1,
        transform: "translateX(0)",
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.banner}>
        <h1 style={styles.bannerText}>Welcome to Question Hat</h1>
        <p style={styles.animatedText}>Your trusted platform for creating educational content.</p>
      </div>

      <div style={styles.carouselContainer}>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x300?text=Slide+1"
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>Educational Excellence</h3>
              <p>Discover new ways to engage your students.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x300?text=Slide+2"
              alt="Second slide"
            />
            <Carousel.Caption>
              <h3>Interactive Content</h3>
              <p>Craft questions tailored to your needs.</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x300?text=Slide+3"
              alt="Third slide"
            />
            <Carousel.Caption>
              <h3>Join the Community</h3>
              <p>Collaborate and share knowledge globally.</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>

      <div style={styles.newsSection}>
        <h2 style={styles.newsTitle}>Latest News</h2>
        <div style={styles.newsItem}>
          <h4>Interactive Learning Tools</h4>
          <p>Explore the latest updates in educational technology.</p>
        </div>
        <div style={styles.newsItem}>
          <h4>Global Collaborations</h4>
          <p>Learn how educators worldwide are joining forces.</p>
        </div>
        <div style={styles.newsItem}>
          <h4>Upcoming Events</h4>
          <p>Stay tuned for webinars and workshops tailored to educators.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;