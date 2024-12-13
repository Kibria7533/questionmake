import React from "react";

const News = () => {
  const styles = {
    page: {
      padding: "20px",
      fontFamily: "Arial, sans-serif",
    },
    title: {
      fontSize: "2rem",
      marginBottom: "10px",
    },
    article: {
      marginBottom: "15px",
    },
    articleTitle: {
      fontSize: "1.5rem",
      color: "#004080",
    },
    articleContent: {
      fontSize: "1rem",
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Latest News</h1>
      <div style={styles.article}>
        <h2 style={styles.articleTitle}>Article 1</h2>
        <p style={styles.articleContent}>
          This is the content of the first article. Stay tuned for more updates.
        </p>
      </div>
      <div style={styles.article}>
        <h2 style={styles.articleTitle}>Article 2</h2>
        <p style={styles.articleContent}>
          Here is another exciting piece of news for our readers!
        </p>
      </div>
    </div>
  );
};

export default News;
