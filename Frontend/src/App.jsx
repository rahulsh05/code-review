import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import EditorComponent from "react-simple-code-editor"
const Editor = (typeof EditorComponent === 'function' || (EditorComponent && EditorComponent.$$typeof))
  ? EditorComponent
  : (EditorComponent?.default?.default || EditorComponent?.default || EditorComponent);
import prism from "prismjs"
import "prismjs/components/prism-clike"
import "prismjs/components/prism-javascript"
import "prismjs/components/prism-markup"
import "prismjs/components/prism-css"

import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight"
import "highlight.js/styles/github-dark.css"
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Code2, 
  Sparkles, 
  Copy, 
  Check, 
  Trash2, 
  AlertTriangle, 
  Bug, 
  CheckCircle2, 
  Terminal, 
  FileText,
  Activity
} from 'lucide-react'
import './App.css'

const CODE_TEMPLATES = [
  {
    name: "SQL Injection",
    code: `// Express route with SQL injection vulnerability\napp.post('/login', async (req, res) => {\n  const { username, password } = req.body;\n  \n  // CRITICAL: Interpolating strings directly into query\n  const query = \`SELECT * FROM users WHERE username = '\${username}' AND password = '\${password}'\`;\n  \n  const dbResult = await db.query(query);\n  res.json(dbResult);\n});`
  },
  {
    name: "React Loop",
    code: `import React, { useState, useEffect } from 'react';\n\nfunction Counter() {\n  const [count, setCount] = useState(0);\n\n  useEffect(() => {\n    // CRITICAL: Updating state without dependency array creates infinite loop\n    const newCount = count + 1;\n    setCount(newCount);\n  });\n\n  return <div>Count: {count}</div>;\n}`
  },
  {
    name: "Memory Leak",
    code: `import { useState, useEffect } from 'react';\n\nfunction Tracker() {\n  const [coords, setCoords] = useState({ x: 0, y: 0 });\n\n  useEffect(() => {\n    // WARNING: Event listener added but never cleaned up on unmount\n    window.addEventListener('mousemove', (e) => {\n      setCoords({ x: e.clientX, y: e.clientY });\n    });\n  }, []);\n\n  return <div>X: {coords.x}, Y: {coords.y}</div>;\n}`
  },
  {
    name: "Race Condition",
    code: `let cache = {};\n\nasync function fetchUserData(userId) {\n  // Fetch data asynchronously\n  const response = await fetch(\`/api/user/\${userId}\`);\n  const data = await response.json();\n  \n  // Issue: Concurrent calls can overwrite newer state with stale responses\n  cache[userId] = data;\n  return data;\n}`
  }
];

function App() {
  const [code, setCode] = useState(CODE_TEMPLATES[0].code);
  const [review, setReview] = useState('');
  const [loading, setLoading] = useState(false);
  const [copiedReview, setCopiedReview] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [errorToast, setErrorToast] = useState(null);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    if (!code.trim()) {
      setErrorToast("Please write some code first before submitting for review.");
      return;
    }
    setLoading(true);
    setReview('');
    setErrorToast(null);
    try {
      const response = await axios.post('http://localhost:3000/ai/get-review', { code });
      setReview(response.data);
    } catch (err) {
      console.error(err);
      setErrorToast("Unable to reach the backend review service. Make sure backend is running on port 3000.");
    } finally {
      setLoading(false);
    }
  }

  const copyToClipboard = async (text, setCopiedState) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedState(true);
      setTimeout(() => setCopiedState(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const countOccurrences = (str, subStr) => {
    if (!str) return 0;
    return str.split(subStr).length - 1;
  };

  const criticalCount = countOccurrences(review, '❌');
  const warningCount = countOccurrences(review, '⚠️');
  const successCount = countOccurrences(review, '✅');

  return (
    <div className="app-container">
      {/* Decorative Glow Orbs */}
      <div className="bg-glow-orb glow-purple"></div>
      <div className="bg-glow-orb glow-indigo"></div>

      {/* Header bar */}
      <header className="header-bar">
        <div className="logo-section">
          <h1>
            <Sparkles className="logo-icon" size={24} />
            Aura Reviewer
          </h1>
          <span className="tagline">AI-Powered Senior Developer Reviews</span>
        </div>
        
        <div className="templates-container">
          <span className="template-label">Try templates:</span>
          {CODE_TEMPLATES.map((tmpl, idx) => (
            <button 
              key={idx} 
              onClick={() => setCode(tmpl.code)}
              className="template-btn"
            >
              {tmpl.name}
            </button>
          ))}
        </div>
      </header>

      {/* Main Grid */}
      <main>
        {/* Left Side: Code Editor */}
        <section className="panel-card">
          <div className="panel-header">
            <div className="panel-title">
              <Code2 className="panel-icon" size={18} />
              <span>source_code.js</span>
            </div>
            <div className="panel-actions">
              <button 
                onClick={() => copyToClipboard(code, setCopiedCode)}
                className="action-icon-btn" 
                title="Copy Code"
              >
                {copiedCode ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
              </button>
              <button 
                onClick={() => setCode('')} 
                className="action-icon-btn" 
                title="Clear Code"
              >
                <Trash2 size={15} />
              </button>
            </div>
          </div>

          <div className="editor-container">
            <Editor
              value={code}
              onValueChange={newCode => setCode(newCode)}
              highlight={c => prism.highlight(c, prism.languages.javascript, "javascript")}
              padding={16}
              className="npm-editor"
              style={{
                fontSize: 14,
                width: "100%",
                height: "100%",
                outline: "none"
              }}
            />
          </div>

          <div className="editor-footer">
            <div className="editor-info">UTF-8 | JavaScript</div>
            <button 
              onClick={reviewCode} 
              disabled={loading}
              className="btn-review"
            >
              {loading ? (
                <>
                  <Activity size={16} className="animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles size={16} />
                  Review Code
                </>
              )}
            </button>
          </div>
        </section>

        {/* Right Side: AI Review Report */}
        <section className="panel-card">
          <div className="panel-header">
            <div className="panel-title">
              <Terminal className="panel-icon" size={18} />
              <span>review_report.md</span>
            </div>
            {review && (
              <div className="panel-actions">
                <button 
                  onClick={() => copyToClipboard(review, setCopiedReview)}
                  className="action-icon-btn" 
                  title="Copy Report"
                >
                  {copiedReview ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>
            )}
          </div>

          <div className="review-content">
            {loading ? (
              // High Fidelity Animated Skeleton Loading State
              <div className="skeleton-container">
                <div className="skeleton-title"><div className="skeleton-shimmer"></div></div>
                <div className="review-metric-cards">
                  <div className="metric-card"><div className="skeleton-text"><div className="skeleton-shimmer"></div></div></div>
                  <div className="metric-card"><div className="skeleton-text"><div className="skeleton-shimmer"></div></div></div>
                  <div className="metric-card"><div className="skeleton-text"><div className="skeleton-shimmer"></div></div></div>
                </div>
                <div className="skeleton-text"><div className="skeleton-shimmer"></div></div>
                <div className="skeleton-text medium"><div className="skeleton-shimmer"></div></div>
                <div className="skeleton-text short"><div className="skeleton-shimmer"></div></div>
                <div className="skeleton-code"><div className="skeleton-shimmer"></div></div>
              </div>
            ) : review ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="markdown-body"
              >
                {/* Dynamically Extracted Stats */}
                <div className="review-metric-cards">
                  <div className="metric-card critical">
                    <span className="metric-label">Critical Issues</span>
                    <span className="metric-value">{criticalCount}</span>
                  </div>
                  <div className="metric-card warning">
                    <span className="metric-label">Warnings</span>
                    <span className="metric-value">{warningCount}</span>
                  </div>
                  <div className="metric-card success">
                    <span className="metric-label">Fixes / Strengths</span>
                    <span className="metric-value">{successCount}</span>
                  </div>
                </div>

                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {review}
                </Markdown>
              </motion.div>
            ) : (
              // Empty / Initial State
              <div className="empty-state">
                <FileText className="empty-icon" size={48} />
                <h3>No Review Yet</h3>
                <p>Paste your JavaScript code on the left and click <b>Review Code</b> to receive a detailed AI review.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Error Toasts */}
      <AnimatePresence>
        {errorToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="toast-alert"
          >
            <AlertTriangle size={18} />
            <span>{errorToast}</span>
            <button className="toast-close" onClick={() => setErrorToast(null)}>&times;</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default App