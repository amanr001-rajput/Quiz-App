import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultsView from "../components/ResultsView.jsx";

// Results page component that handles displaying quiz results
// It receives quiz state through router navigation and manages restart functionality
export default function ResultsPage() {
  const navigate = useNavigate();
  // Extract quiz results from router state, with fallback values for safety
  const { state } = useLocation() || {};
  const questions = state?.questions || [];
  const selectedByIndex = state?.selectedByIndex || [];
  const score = state?.score ?? 0;

  // Handler to restart the quiz by navigating back to the home page
  const handleRestart = () => {
    navigate("/", { replace: true });
  };

  // Validate that we have complete quiz data before showing results
  const isValid =
    questions.length > 0 && selectedByIndex.length === questions.length;

  return (
    <div className="container">
      <div className="card">
        {/* Header section with title and summary indicator */}
        <div className="space-between" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Results</h2>
          <span className="muted">Summary</span>
        </div>

        {/* Show either error state or results based on data validity */}
        {!isValid ? (
          <>
            {/* Fallback UI when no valid quiz data is available */}
            <p className="muted">No results to show. Start a new quiz.</p>
            <div className="row" style={{ marginTop: 16 }}>
              <button className="btn" onClick={handleRestart}>
                Back to Quiz
              </button>
            </div>
          </>
        ) : (
          /* Results component showing detailed quiz outcome */
          <ResultsView
            questions={questions}
            selectedByIndex={selectedByIndex}
            score={score}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
}
