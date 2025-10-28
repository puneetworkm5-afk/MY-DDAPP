import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px" }}>
      <h1>My DApp</h1>
      <p>Welcome to the Microfinance Loan DApp</p>
      <button onClick={() => navigate("/apply")}>
        Apply for Loan
      </button>
    </div>
  );
};

export default Home;
