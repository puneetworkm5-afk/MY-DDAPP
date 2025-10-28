import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ApplyLoan from "./pages/ApplyLoan";
import Lenders from "./pages/Lenders";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Router>
      <div style={{ padding: "20px" }}>
        <h1>My DApp</h1>
        <nav>
          <Link to="/apply-loan" style={{ marginRight: "10px" }}>Apply Loan</Link>
          <Link to="/lenders" style={{ marginRight: "10px" }}>Lenders</Link>
          <Link to="/dashboard">Local Blockchain</Link>
        </nav>

        <Routes>
          <Route path="/apply-loan" element={<ApplyLoan />} />
          <Route path="/lenders" element={<Lenders />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
