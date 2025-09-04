import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import QuizPage from "./pages/QuizPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";

// Root application component that handles routing between quiz and results pages
export default function App() {
  return (
    // Main container with centered content layout
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center" }}>
      <Routes>
        {/* Homepage route showing the quiz interface */}
        <Route path="/" element={<QuizPage />} />

        {/* Results page showing quiz summary and scores */}
        <Route path="/results" element={<ResultsPage />} />

        {/* Fallback route - redirects invalid URLs back to quiz */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}
