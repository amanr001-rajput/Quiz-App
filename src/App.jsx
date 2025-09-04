import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import QuizPage from "./pages/QuizPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";

export default function App() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Routes>
        <Route path="/" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
        {/* unknown routes → redirect to quiz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
