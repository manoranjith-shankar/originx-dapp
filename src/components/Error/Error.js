import React from "react";

const NotFoundPage = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f1f1f1",
        color: "#333",
        fontSize: "24px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h1
          style={{
            fontSize: "72px",
            marginBottom: "16px",
          }}
        >
          404
        </h1>
        <p
          style={{
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "24px",
          }}
        >
          Page Not Found
        </p>
        <p
          style={{
            fontSize: "18px",
            marginBottom: "24px",
          }}
        >
          Sorry, the page you are looking for does not exist.
        </p>
        <a
          href="/"
          style={{
            fontSize: "18px",
            color: "#333",
            textDecoration: "none",
          }}
        >
          Go to Home Page
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;