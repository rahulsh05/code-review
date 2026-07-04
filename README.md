# ✨ Aura Reviewer: AI-Powered Code Review Dashboard

Aura Reviewer is a modern, high-fidelity web application that provides real-time AI-powered code reviews. Developers can paste JavaScript or React snippets into an interactive editor and receive feedback from an automated "Senior Software Engineer" AI reviewer.

The application automatically checks for critical bugs, security vulnerabilities (like SQL injection or memory leaks), performance issues, and general code quality, returning structured feedback along with drop-in code fixes.

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

Follow these steps to run the application locally:

### 1. Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- A Gemini API Key. You can get one from the [Google AI Studio](https://aistudio.google.com/).

### 2. Backend Setup
1. Open your terminal and navigate to the `BackEnd` directory:
   ```bash
   cd BackEnd
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Create your environment configuration file:
   - Copy or rename `.env.example` to `.env`.
   - Open `.env` and paste your Google Gemini API Key:
     ```env
     GOOGLE_GEMINI_KEY=your_gemini_api_key_here
     ```
4. Start the backend server (runs on `http://localhost:3000` by default):
   ```bash
   node server.js
   ```

### 3. Frontend Setup
1. In a new terminal window, navigate to the `Frontend` directory:
   ```bash
   cd Frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open the displayed local address (usually `http://localhost:5173`) in your browser to start using Aura Reviewer!

---

## 📂 Project Structure

```text
code-review/
├── BackEnd/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/       # Contains Gemini AI configurations & system instructions
│   ├── .env.example        # Template for env variables
│   ├── server.js           # Server startup script
│   └── package.json
├── Frontend/
│   ├── src/
│   │   ├── App.jsx         # Main App dashboard logic
│   │   ├── App.css         # Custom dark-theme / glassmorphic styles
│   │   └── main.jsx
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── .gitignore              # Tells Git what to ignore (node_modules, .env secrets)
└── README.md               # You are here!
```

---

## 📝 License

This project is licensed under the ISC License.
