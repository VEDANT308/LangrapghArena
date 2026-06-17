# ⚔️ LANGGRAPH ARENA

## 🧠 **WHAT THIS PROJECT IS**

LangGraph Arena is a real-time AI battle system where multiple large language models compete using the same prompt.

Instead of reading comparisons, you **watch intelligence being tested live**.

Right now it runs a head-to-head battle between **Google Gemini** and **Mistral AI**, while **Cohere** acts as the independent judge that evaluates both responses and decides the winner.

---

## ⚔️ **CORE IDEA**

One prompt → Multiple AI models → Real-time responses → One fair judge → Final winner

---

## 🚀 **FEATURES**

⚔️ Real-time AI battles between models
🧑‍⚖️ Independent AI judging system with scoring + reasoning
⚡ Parallel response generation for speed
🎯 Clean comparison-based UI
🔐 Production-ready architecture with secure config

---

## 🧰 **TECH STACK**

### 💻 FRONTEND

⚛️ React (Vite) – fast UI system
🎨 Tailwind CSS – modern responsive design
📡 Axios – API communication layer
✨ Lucide Icons – clean UI icons
📝 Markdown Renderer – formatted AI responses

### ⚙️ BACKEND

🟢 Node.js + Express – server logic
🧠 LangGraph + LangChain – AI orchestration flow
📊 Zod – validation layer
🔷 TypeScript – type-safe development

---

## 📁 **PROJECT STRUCTURE**

**Backend** → Handles AI orchestration, model communication, and judging logic
**Frontend** → Handles UI where prompts and results are displayed in real time

---

## 🛠️ **LOCAL SETUP**

---

### 🔧 BACKEND

```bash
cd backend
npm install
```

Create `.env`:

```
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173

GOOGLE_API_KEY=your_key
MISTRAL_API_KEY=your_key
COHERE_API_KEY=your_key
```

Run backend:

```bash
npm run dev
```

Runs at:
[http://localhost:3000](http://localhost:3000)

---

### 🎨 FRONTEND

```bash
cd frontend
npm install
```

Create `.env`:

```
VITE_API_URL=http://localhost:3000
```

Run frontend:

```bash
npm run dev
```

Runs at:
[http://localhost:5173](http://localhost:5173)

---

## 🔄 **HOW IT WORKS**

1. User submits a prompt
2. Prompt is sent to multiple AI models simultaneously
3. Each model generates its own response independently
4. A judge model compares both outputs
5. Scores + reasoning are generated
6. Final result is shown in UI

---

## 🌍 **DEPLOYMENT**

**Backend**
Deploy on Render or any Node hosting platform and set environment variables properly.

**Frontend**
Deploy on Vercel and update API URL to production backend.

---

## 📌 **WHY THIS PROJECT EXISTS**

This project was built to observe how different AI models behave under identical conditions.

It helps visualize differences in:

* reasoning style
* creativity
* problem-solving approach

Instead of theory, you see real-time AI behavior.
