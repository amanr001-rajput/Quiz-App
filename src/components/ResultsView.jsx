import React from "react";

export default function ResultsView({
  questions,
  selectedByIndex,
  score,
  onRestart,
}) {
  const total = questions.length;

  return (
    <>
      <h3 style={{ marginTop: 0 }}>Results</h3>
      <p className="muted" style={{ marginTop: 0 }}>
        You scored <strong>{score}</strong>/{total}
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 8 }}>
        {questions.map((q, qi) => {
          const userIdx = selectedByIndex[qi];
          const isCorrect = userIdx === q.correctIndex;

          return (
            <div key={q.id} className="card" style={{ padding: 16 }}>
              <div className="space-between" style={{ marginBottom: 6 }}>
                <strong>Q{qi + 1}.</strong>
                <span className={`chip ${isCorrect ? "success" : "danger"}`}>
                  {isCorrect ? "✓ Correct" : "✗ Incorrect"}
                </span>
              </div>

              <div style={{ marginBottom: 8 }}>{q.question}</div>

              <div style={{ display: "grid", gap: 8 }}>
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

      <div className="row" style={{ marginTop: 16 }}>
        <button className="btn" type="button" onClick={onRestart}>
          Restart Quiz
        </button>
      </div>
    </>
  );
}
