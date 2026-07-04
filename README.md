# ✨ Aura Reviewer: AI-Powered Code Review Dashboard

Aura Reviewer is a modern, high-fidelity web application that provides real-time AI-powered code reviews. Developers can paste JavaScript or React snippets into an interactive editor and receive feedback from an automated **Senior Software Engineer** AI reviewer.

The application automatically checks for critical bugs, security vulnerabilities (like SQL injection or memory leaks), performance issues, and general code quality, returning structured feedback along with drop-in code fixes.

---

## 🌐 Live Demo

🚀 **Link:** https://code-review-zu8d.onrender.com/


---

## 🚀 Features

- **Interactive Editor:** High-fidelity code input editor with real-time syntax highlighting using PrismJS.
- **Dynamic Stats Dashboard:** Automatically parses the AI review to extract and count:
  - ❌ **Critical Issues** (Security flaws, infinite loops, memory leaks)
  - ⚠️ **Warnings & Suggestions** (Performance, clean code, code smells)
  - ✅ **Strengths & Best Practices** (Good patterns, modular design)
- **Pre-loaded Vulnerability Templates:** Instantly try out standard templates representing typical bugs:
  - SQL Injection Vulnerabilities
  - Infinite React Loops
  - Memory Leaks (uncleaned event listeners)
  - Concurrent API Race Conditions
- **High-Fidelity UI:** Features smooth micro-animations (powered by Framer Motion), glassmorphic card layouts, responsive grids, and glowing decorative elements.
- **AI Engine:** Powered by Google's `gemini-2.5-flash` model, configured with strict instructions to deliver precise and actionable reviews.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React + Vite
- **Styling:** CSS (Modern styling, Glassmorphism, Dark-mode first)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Editor / Code Viewers:** React Simple Code Editor, PrismJS, React Markdown, Rehype Highlight

### Backend
- **Framework:** Node.js, Express
- **AI Integration:** `@google/generative-ai` (Gemini API)
- **Utilities:** Axios, Cors, dotenv

---

## ⚙️ Setup and Installation

Follow these steps to run the application locally.

### 1. Prerequisites

- Node.js installed on your machine.
- A Gemini API Key from Google AI Studio.

### 2. Backend Setup

Navigate to the backend directory:

```bash
cd BackEnd
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
GOOGLE_GEMINI_KEY=your_gemini_api_key_here
```

Start the backend server:

```bash
node server.js
```

The backend runs on **http://localhost:3000** by default.

---

### 3. Frontend Setup

Navigate to the frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the displayed local address (usually **http://localhost:5173**) in your browser.

---

## 📂 Project Structure

```text
code-review/
├── BackEnd/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/       # Gemini AI configuration & system instructions
│   ├── .env.example
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore
└── README.md
```

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new feature branch.
3. Commit your changes.
4. Push your branch.
5. Open a Pull Request.

---

---

⭐ If you found this project useful, consider giving it a **star** on GitHub!
