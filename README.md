# Quiz App (React + Vite)

This is a small quiz application built with **React** and **Vite**.  
The goal was to demonstrate React fundamentals like state, props, controlled inputs, and routing, while keeping the UI clean and responsive.

---

## 🎯 What it does

- Loads multiple-choice questions from a local JSON file
- Shows one question at a time with 4 options
- Blocks **Next** until the user selects an option
- Provides **Previous**, **Next**, and **Submit** actions
- Calculates the final score and shows a detailed results summary
- Restart button resets everything back to the first question
- Displays progress with a small progress bar
- Handles edge cases like rapid clicks, empty data, or direct access to results

---

## 🛠️ Tech Stack

- React (functional components + hooks)
- Vite (development & build)
- React Router (`react-router-dom`)
- CSS (mobile-first, dark theme)

---

## 📂 Project Structure

```
src/
  components/
    ResultsView.jsx
  data/
    questions.json
  pages/
    QuizPage.jsx
    ResultsPage.jsx
  App.jsx
  index.css
  main.jsx
```

- **QuizPage.jsx** → main quiz flow
- **ResultsPage.jsx** → summary view after submit
- **ResultsView.jsx** → presentational component for results
- **questions.json** → local data source

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Run locally

```bash
npm run dev
```

App will be available at `http://localhost:5173`

### 3. Build for production

```bash
npm run build
```

### 4. Preview build

```bash
npm run preview
```

---

## 📊 Data Model

Questions are defined in `src/data/questions.json`:

```json
[
  {
    "id": 1,
    "question": "Which HTML tag is used to define an unordered list?",
    "options": ["<ol>", "<ul>", "<li>", "<list>"],
    "correctIndex": 1,
    "difficulty": "easy"
  }
]
```

- `id`: unique integer
- `question`: string
- `options`: exactly 4 strings
- `correctIndex`: index (0–3) of the right answer
- `difficulty`: optional tag for difficulty

---

## 🧭 Routes

- `/` → Quiz page
- `/results` → Results summary page

If someone visits `/results` directly without quiz state, they’ll see a simple “No results to show” message.

---

## 🔍 Design Notes

- Used **controlled inputs** for radio buttons so state is always in sync.
- **useRef + focus**: after navigation, the current question container gets focus (better keyboard UX).
- Small guard (`isBusy`) prevents accidental double clicks on **Next** or **Submit**.
- Progress bar is pure CSS with a smooth width transition.
- Local JSON is easier for a demo; swapping in the Open Trivia DB API later is straightforward.

---

## 🌐 Deployment

### Vercel

1. Push code to GitHub.
2. Import the repo on Vercel.
3. Framework preset → **Vite**.
4. Build command → `npm run build`
5. Output directory → `dist`
6. Deploy.

### Netlify

1. Import repo in Netlify.
2. Build command → `npm run build`
3. Publish directory → `dist`
4. Deploy.

---

## 🚧 Possible Enhancements

- Fetch live questions from [Open Trivia DB](https://opentdb.com/)
- Add difficulty filter (easy/medium/hard)
- Timer per question with auto-submit
- Store high scores in localStorage
- Subtle animations with Framer Motion

## 🔗 Live Demo

[Quiz App on Vercel](https://quiz-app-three-psi-93.vercel.app)
