import React from "react";

const News = () => {
  const styles = {
    page: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    banner: {
      width: "100%",
      height: "250px",
      backgroundImage: "url('https://via.placeholder.com/1200x250?text=Educational+News+Banner')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      fontSize: "2.5rem",
      fontWeight: "bold",
      textShadow: "2px 2px 5px rgba(0,0,0,0.7)",
    },
    title: {
      fontSize: "2.5rem",
      marginBottom: "20px",
      textAlign: "center",
      color: "#004080",
      animation: "fadeIn 2s",
    },
    articleContainer: {
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
    },
    card: {
      width: "300px",
      border: "1px solid #ccc",
      borderRadius: "8px",
      overflow: "hidden",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      animation: "slideIn 1.5s",
    },
    cardImage: {
      width: "100%",
      height: "200px",
      objectFit: "cover",
    },
    cardContent: {
      padding: "15px",
    },
    articleTitle: {
      fontSize: "1.5rem",
      color: "#004080",
      marginBottom: "10px",
    },
    articleContent: {
      fontSize: "1rem",
      color: "#333",
    },
    animatedText: {
      fontSize: "1.5rem",
      fontWeight: "bold",
      color: "#004080",
      textAlign: "center",
      margin: "20px 0",
      animation: "colorChange 3s infinite",
    },
    blogContainer: {
      marginTop: "40px",
    },
    blogTitle: {
      fontSize: "2rem",
      marginBottom: "20px",
      textAlign: "center",
      color: "#0080ff",
      animation: "fadeIn 2s",
    },
    blogCard: {
      backgroundColor: "#f4f4f4",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      padding: "20px",
      marginBottom: "20px",
      animation: "slideIn 1.5s",
    },
    blogContent: {
      fontSize: "1.1rem",
      color: "#333",
    },
  };

  const newsArticles = [
    {
      title: "Free Online Education Resources",
      content: "Discover the top platforms offering free educational resources for students of all ages.",
      image: "https://via.placeholder.com/300x200?text=Free+Resources",
    },
    {
      title: "AI in Education",
      content: "Explore how artificial intelligence is transforming the way we learn.",
      image: "https://via.placeholder.com/300x200?text=AI+in+Education",
    },
    {
      title: "Top 10 Study Tips",
      content: "Learn effective study techniques to boost your academic performance.",
      image: "https://via.placeholder.com/300x200?text=Study+Tips",
    },
    {
      title: "New STEM Initiatives",
      content: "Check out the latest STEM programs inspiring young minds around the world.",
      image: "https://via.placeholder.com/300x200?text=STEM+Programs",
    },
  ];

  const blogs = [
    {
      title: "How to Excel in Remote Learning",
      content: "Remote learning is here to stay. Learn how to make the most out of online classes and keep your motivation high.",
    },
    {
      title: "The Importance of Mental Health for Students",
      content: "Academic success is tied to mental well-being. Discover tips and resources for maintaining mental health as a student.",
    },
    {
      title: "Top Career Opportunities in STEM",
      content: "Explore the booming job market in science, technology, engineering, and mathematics, and see how to prepare for it.",
    },
  ];

  return (
    <div style={styles.page}>
      <div style={styles.banner}>Educational News</div>

      <h1 style={styles.title}>Latest News</h1>

      <div style={styles.animatedText}>Stay Updated with Real-Life Educational Trends</div>

      <div style={styles.articleContainer}>
        {newsArticles.map((article, index) => (
          <div key={index} style={styles.card}>
            <img src={article.image} alt={article.title} style={styles.cardImage} />
            <div style={styles.cardContent}>
              <h2 style={styles.articleTitle}>{article.title}</h2>
              <p style={styles.articleContent}>{article.content}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.blogContainer}>
        <h2 style={styles.blogTitle}>Educational Blogs</h2>
        {blogs.map((blog, index) => (
          <div key={index} style={styles.blogCard}>
            <h3 style={styles.articleTitle}>{blog.title}</h3>
            <p style={styles.blogContent}>{blog.content}</p>
          </div>
        ))}
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes slideIn {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }

          @keyframes colorChange {
            0% { color: #004080; }
            50% { color: #0080ff; }
            100% { color: #004080; }
          }
        `}
      </style>
    </div>
  );
};

export default News;
