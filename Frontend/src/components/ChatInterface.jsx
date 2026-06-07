import { useState, useRef, useEffect } from 'react';
import UserMessage from './UserMessage';
import ArenaResponse, { API_URL } from './ArenaResponse';
import LoadingSkeleton from './LoadingSkeleton';
import axios from "axios"
import { data, input } from 'framer-motion/client';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const endOfMessagesRef = useRef(null);

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (e) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userProblem = inputValue.trim();

    setInputValue("");
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/invoke",
        {
          input: userProblem,
        }
      );

      console.log(response.data);

      const result = response.data.result;

      const newMessage = {
        id: Date.now(),
        problem: userProblem,
        solution_1: result.solution_1,
        solution_2: result.solution_2,
        judge: result.judge,
      };

      setMessages((prev) => [...prev, newMessage]);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
        err.message ||
        "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const dismissError = () => setError(null);

  return (
    <div className="flex flex-col h-screen bg-zinc-50 dark:bg-zinc-950 font-sans">
      {/* Header */}
      <header className="py-4 px-8 border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-10 flex justify-center">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⚔️</span>
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            LangGraph Arena
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 md:px-8 py-8 w-full max-w-6xl mx-auto flex flex-col">
        {messages.length === 0 && !isLoading ? (
          <div className="flex-1 flex items-center justify-center text-zinc-400">
            <div className="text-center space-y-4">
              <div className="text-5xl mb-2">⚔️</div>
              <h2 className="text-2xl font-light text-zinc-600 dark:text-zinc-300">
                Welcome to the Arena
              </h2>
              <p className="text-zinc-500 dark:text-zinc-500 max-w-md">
                Type a coding problem below to see two AI models go head-to-head, judged by a third.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg) => (
              <div key={msg.id} className="mb-12 animate-slide-up">
                <UserMessage message={msg.problem} />
                <ArenaResponse
                  solution1={msg.solution_1}
                  solution2={msg.solution_2}
                  judge={msg.judge}
                />
              </div>
            ))}

            {/* Loading state */}
            {isLoading && (
              <div className="mb-12 animate-slide-up">
                <UserMessage message={inputValue || messages[messages.length - 1]?.problem || '...'} />
                <LoadingSkeleton />
              </div>
            )}
          </>
        )}
        <div ref={endOfMessagesRef} />
      </main>

      {/* Error Banner */}
      {error && (
        <div className="px-4 pb-2 max-w-4xl mx-auto w-full animate-fade-in">
          <div className="bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-2xl px-5 py-3 flex items-center justify-between">
            <p className="text-red-700 dark:text-red-300 text-sm">
              <span className="font-medium">Error:</span> {error}
            </p>
            <button
              onClick={dismissError}
              className="text-red-500 hover:text-red-700 dark:hover:text-red-300 ml-4 text-lg leading-none cursor-pointer"
              aria-label="Dismiss error"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="p-6 bg-white dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isLoading ? 'Waiting for AI response...' : 'Ask a coding question...'}
              disabled={isLoading}
              className="w-full bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border-none rounded-full py-4 pl-6 pr-16 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-zinc-400 transition-shadow shadow-sm hover:shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              {isLoading ? (
                <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.404a.75.75 0 00-.926.941l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.404z" />
                </svg>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}