import React from "react";

// This component shows the final quiz results and handles the restart functionality
// It displays each question, the user's answers, and correct answers in a card layout
export default function ResultsView({
  questions, // Array containing all quiz questions
  selectedByIndex, // Object tracking which answers the user selected for each question
  score, // Number of correctly answered questions
  onRestart, // Function to handle restarting the quiz
}) {
  // Calculate total number of questions for score display
  const total = questions.length;

  return (
    <>
      <h3 style={{ marginTop: 0 }}>Results</h3>
      <p className="muted" style={{ marginTop: 0 }}>
        You scored <strong>{score}</strong>/{total}
      </p>

      {/* Main container for all question review cards */}
      <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
        {questions.map((q, qi) => {
          // Check if user's answer matches the correct answer
          const userIdx = selectedByIndex[qi];
          const isCorrect = userIdx === q.correctIndex;

          return (
            // Individual question review card
            <div key={q.id} className="card" style={{ padding: 16 }}>
              {/* Question header showing question number and result status */}
              <div className="space-between" style={{ marginBottom: 6 }}>
                <strong>Q{qi + 1}.</strong>
                <span className={`chip ${isCorrect ? "success" : "danger"}`}>
                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </div>

              {/* Display the actual question text */}
              <div style={{ marginBottom: 8 }}>{q.question}</div>

              {/* Container for showing answer comparison */}
              <div style={{ display: "grid", gap: 8 }}>
                {/* User's selected answer with disabled radio button for visual indication */}
                <div className="option" style={{ borderStyle: "dashed" }}>
                  <input
                    type="radio"
                    checked
                    readOnly
                    disabled
                    aria-hidden="true"
                  />
                  <span>
                    <strong>Your answer:</strong>{" "}
                    {userIdx != null ? q.options[userIdx] : "—"}
                  </span>
                </div>
                {/* Correct answer display with disabled radio button */}
                <div className="option" style={{ borderStyle: "dashed" }}>
                  <input
                    type="radio"
                    checked
                    readOnly
                    disabled
                    aria-hidden="true"
                  />
                  <span>
                    <strong>Correct answer:</strong> {q.options[q.correctIndex]}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Restart quiz button at the bottom */}
      <div className="row" style={{ marginTop: 16 }}>
        <button className="btn" type="button" onClick={onRestart}>
          Restart Quiz
        </button>
      </div>
    </>
  );
}
