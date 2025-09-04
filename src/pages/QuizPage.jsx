import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import rawQuestions from "../data/questions.json";

export default function QuizPage() {
  // --- State ---
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedByIndex, setSelectedByIndex] = useState([]);
  const [isBusy, setIsBusy] = useState(false);

  const navigate = useNavigate();
  const questionRef = useRef(null);

  // --- Load questions once ---
  useEffect(() => {
    setQuestions(rawQuestions);
    setSelectedByIndex(Array(rawQuestions.length).fill(null));
    setCurrentIndex(0);
  }, []);

  // --- Focus on question change ---
  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.focus();
    }
  }, [currentIndex]);

  // --- Derived values ---
  const total = questions.length || 0;
  const currentQ = useMemo(
    () => (total ? questions[currentIndex] : null),
    [questions, currentIndex, total]
  );
  const selected = selectedByIndex?.[currentIndex] ?? null;

  const atFirst = currentIndex === 0;
  const atLast = currentIndex === total - 1;

  const canNext = selected != null && !atLast;
  const canSubmit = selected != null && atLast;

  // progress bar
  const answeredCount = selectedByIndex.filter((v) => v != null).length;
  const progressPct = total ? Math.round((answeredCount / total) * 100) : 0;

  // --- Handlers ---
  const handleSelect = (optIndex) => {
    setSelectedByIndex((prev) => {
      const copy = [...prev];
      copy[currentIndex] = optIndex;
      return copy;
    });
  };

  const guardDelay = 220;

  const handlePrev = () => {
    if (isBusy || atFirst) return;
    setIsBusy(true);
    setCurrentIndex((i) => i - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsBusy(false), guardDelay);
  };

  const handleNext = () => {
    if (isBusy) return;
    if (selectedByIndex[currentIndex] == null) return;
    if (currentIndex >= total - 1) return;
    setIsBusy(true);
    setCurrentIndex((i) => i + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setIsBusy(false), guardDelay);
  };

  const handleSubmit = () => {
    if (isBusy) return;
    if (!total) return;
    if (selectedByIndex[currentIndex] == null) return;

    setIsBusy(true);

    // compute score
    let s = 0;
    for (let i = 0; i < total; i++) {
      if (selectedByIndex[i] === questions[i].correctIndex) s++;
    }

    // navigate to results
    navigate("/results", {
      replace: true,
      state: {
        questions,
        selectedByIndex,
        score: s,
      },
    });

    setTimeout(() => setIsBusy(false), guardDelay);
  };

  // --- Render ---
  return (
    <div className="container">
      <div className="card">
        {/* Header */}
        <div className="space-between" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>Quiz</h2>
          <span className="muted">
            {total > 0
              ? `Question ${currentIndex + 1} of ${total}`
              : "Loading..."}
          </span>
        </div>

        {/* Progress */}
        <div className="progress" aria-label={`Progress: ${progressPct}%`}>
          <div className="progress__track">
            <div
              className="progress__bar"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="muted">
            Progress: {answeredCount}/{total}
          </span>
        </div>

        {/* Body */}
        <div
          ref={questionRef}
          tabIndex={-1}
          aria-live="polite"
          style={{ outline: "none" }}
        >
          {!currentQ ? (
            <p className="muted">Loading questions…</p>
          ) : (
            <>
              <p
                id="question-text"
                style={{ marginTop: 0, fontSize: "1.1rem" }}
              >
                {currentQ.question}
              </p>

              <div
                role="group"
                aria-labelledby="question-text"
                style={{ display: "grid", gap: 10, marginTop: 8 }}
              >
                {currentQ.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`option ${selected === idx ? "selected" : ""}`}
                    htmlFor={`q${currentQ.id}-opt${idx}`}
                  >
                    <input
                      id={`q${currentQ.id}-opt${idx}`}
                      type="radio"
                      name={`q${currentQ.id}`}
                      checked={selected === idx}
                      onChange={() => handleSelect(idx)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="row" style={{ marginTop: 16 }}>
          <button
            className="btn secondary"
            type="button"
            onClick={handlePrev}
            disabled={atFirst || isBusy}
            aria-disabled={atFirst || isBusy}
          >
            Previous
          </button>

          <button
            className="btn"
            type="button"
            onClick={handleNext}
            disabled={!canNext || isBusy}
            aria-disabled={!canNext || isBusy}
            title={!selected ? "Select an option to continue" : ""}
          >
            Next
          </button>

          <button
            className="btn ghost"
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit || isBusy}
            aria-disabled={!canSubmit || isBusy}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
