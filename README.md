# LangGraphArena

A premium, modern AI evaluation platform where multiple LLMs battle head-to-head on user-provided coding challenges, evaluated instantly by an impartial AI judge.

![LangGraphArena Banner](https://via.placeholder.com/1200x400.png?text=LangGraphArena)

## Project Overview

LangGraphArena is built to demonstrate the power of parallel AI inference using LangChain's `LangGraph`. Users can submit a prompt, and the system concurrently invokes two separate AI models (Gemini and Mistral) to generate solutions. A third judge model (Cohere) evaluates both responses based on accuracy, clarity, and depth, providing detailed reasoning and a final score.

V2 introduces a massive UI/UX overhaul, turning a simple proof-of-concept into a sleek, venture-backed quality SaaS product complete with local persistence, analytics dashboards, and historical tracking.

## Features

- **Live AI Battles:** Parallel execution of Gemini and Mistral models.
- **Impartial AI Judging:** Cohere evaluates responses and assigns scores out of 10.
- **Modern UI/UX:** Built with React 19, Tailwind CSS v4, and Lucide Icons for a premium feel.
- **Dark Mode:** Full dark/light mode support out of the box.
- **Battle History:** All battles are saved locally in the browser so you never lose your past evaluations.
- **Analytics Dashboard:** Track win rates, total battles, and historical performance trends over time.
- **Copy & Share:** Easily copy generated code blocks with built-in markdown rendering tools.

## Architecture Overview

LangGraphArena uses a decoupled architecture:
1.  **Frontend:** React (Vite) application utilizing React Router for navigation and React Context + LocalStorage for state persistence.
2.  **Backend:** Express.js (Node) server executing LangGraph state machines to coordinate parallel API calls to AI providers.

## Tech Stack

**Frontend:**
- React 19
- Vite
- Tailwind CSS v4
- React Router DOM v7
- React Markdown

**Backend:**
- Node.js & Express
- TypeScript
- `@langchain/langgraph`
- `@langchain/google-genai` (Competitor A)
- `@langchain/mistralai` (Competitor B)
- `@langchain/cohere` (Judge)
- Zod (Structured Output Validation)

## Installation Guide

### Prerequisites
- Node.js (v18 or higher)
- API Keys for Google (Gemini), Mistral, and Cohere

### Environment Setup
Create a `.env` file in the `Backend` directory:
```env
GOOGLE_API_KEY=your_gemini_key
MISTRAL_API_KEY=your_mistral_key
COHERE_API_KEY=your_cohere_key
```

### Running Locally

You will need to run both the frontend and backend servers simultaneously.

**Terminal 1 (Backend):**
```bash
cd Backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd Frontend
npm install
npm run dev
```

The application will be available at `http://localhost:5173`.

## Usage Guide

1.  **Enter the Arena:** Navigate to the Arena page from the sidebar.
2.  **Submit a Prompt:** Type a challenging coding question or use one of the suggested templates.
3.  **Wait for the Verdict:** The backend will stream the prompt to both models, wait for their completion, and then ask the judge to evaluate the results.
4.  **Review the Results:** Read through the generated solutions, check the judge's reasoning in the footer of each card, and easily copy any code blocks you find useful.
5.  **Check Your Stats:** Head over to the Dashboard to see how the models perform against each other over time.

## Battle Workflow Explanation

Under the hood, the backend utilizes `StateGraph` from LangGraph:
1.  **State Initialization:** The user's input string is mapped to the `problem` field in the `StateSchema`.
2.  **Solution Node:** A single graph node invokes `mistralAIModel` and `cohereModel` in parallel via `Promise.all()`.
3.  **Judge Node:** Once both solutions exist in state, the `geminiModel` is invoked with `.withStructuredOutput(judgeSchema)`. It reads the problem and both solutions, then returns a strict JSON object containing scores and reasoning.
4.  **Client Delivery:** The final state is sent back to the React frontend.

## Configuration Options
- To change the evaluating judge or combatant models, edit `Backend/src/services/model.service.ts` to instantiate different LangChain chat models.
- To adjust the judge's grading criteria, edit the `SystemMessage` prompt within `Backend/src/services/graph.ai.service.ts`.

## Troubleshooting

- **CORS Errors:** Ensure your backend `.env` doesn't restrict origins, or update `app.ts` CORS configuration to match your frontend port.
- **API Key Errors:** If the models timeout or fail, verify that all three API keys are correctly loaded in the backend `.env`.

## Performance Notes
- Currently, the application buffers the entire response before returning it to the client. For extremely long generations, this may cause high perceived latency.
- State is intentionally kept in browser LocalStorage to keep the backend stateless and simple to host.

## Future Enhancement Suggestions
- **Streaming Responses:** Implement WebSockets or Server-Sent Events (SSE) to stream tokens to the UI in real-time.
- **Dynamic Model Selection:** Allow users to select which two models they want to battle from a dropdown menu in the UI.
- **Database Persistence:** Migrate from LocalStorage to PostgreSQL/Supabase for cross-device history syncing.

## Contributing Guidelines
Contributions are welcome! Please ensure any new UI components follow the existing Tailwind styling patterns and include dark mode variants. For backend changes, please update the Zod schemas if you modify the state shape.
