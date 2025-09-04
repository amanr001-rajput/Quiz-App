import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ResultsView from "../components/ResultsView.jsx";

export default function ResultsPage() {
  const navigate = useNavigate();
  const { state } = useLocation() || {};
  const questions = state?.questions || [];
  const selectedByIndex = state?.selectedByIndex || [];
  const score = state?.score ?? 0;

  const handleRestart = () => {
    navigate("/", { replace: true });
  };

  const isValid =
    questions.length > 0 && selectedByIndex.length === questions.length;

  return (
    <div className="container">
      <div className="card">
        <div className="space-between" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Results</h2>
          <span className="muted">Summary</span>
        </div>

        {!isValid ? (
          <>
            <p className="muted">No results to show. Start a new quiz.</p>
            <div className="row" style={{ marginTop: 16 }}>
              <button className="btn" onClick={handleRestart}>
                Back to Quiz
              </button>
            </div>
          </>
        ) : (
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
