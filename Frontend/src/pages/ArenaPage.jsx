import { useState, useRef, useEffect } from 'react';
import UserMessage from '../components/UserMessage';
import ArenaResponse from '../components/ArenaResponse';
import LoadingSkeleton from '../components/LoadingSkeleton';
import axios from "axios";
import { useAppContext } from '../context/AppContext';
import PromptTemplates from '../components/PromptTemplates';
import { Hexagon, Cpu } from 'lucide-react';

// Arena page

export default function ArenaPage() {
  const [currentBattle, setCurrentBattle] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const endOfMessagesRef = useRef(null);
  
  const { addBattleToHistory } = useAppContext();

  const scrollToBottom = () => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [currentBattle, isLoading]);

  const handleSend = async (e, directPrompt = null) => {
    if (e) e.preventDefault();

    const problemToSend = directPrompt || inputValue;
    if (!problemToSend.trim() || isLoading) return;

    setCurrentBattle(null);
    setInputValue("");
    setError(null);
    setIsLoading(true);

    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const response = await axios.post(
        `${API_URL}/invoke`,
        {
          input: problemToSend.trim(),
        }
      );

      const result = response.data.result;

      const newBattle = {
        id: Date.now(),
        date: new Date().toISOString(),
        problem: problemToSend.trim(),
        solution_1: result.solution_1,
        solution_2: result.solution_2,
        judge: result.judge,
      };

      setCurrentBattle(newBattle);
      addBattleToHistory(newBattle);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.error ||
        err.message ||
        "Something went wrong. Please try again."
      );
      setInputValue(problemToSend);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTemplateClick = (prompt) => {
    handleSend(null, prompt);
  };

  const dismissError = () => setError(null);

  return (
    <div className="flex flex-col h-full font-sans">
      {currentBattle && !isLoading && (
        <div className="px-4 md:px-8 py-4 flex justify-end">
          <button 
            onClick={() => setCurrentBattle(null)}
            className="px-4 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
          >
            + New Battle
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto px-4 md:px-8 pb-8 w-full max-w-6xl mx-auto flex flex-col">
        {!currentBattle && !isLoading ? (
          <div className="flex-1 flex flex-col items-center justify-center text-zinc-400 py-12">
            <div className="text-center space-y-4 mb-12">
              <div className="flex justify-center mb-4">
                <div className="relative flex items-center justify-center w-16 h-16 text-blue-600 dark:text-blue-500">
                  <Hexagon className="absolute w-full h-full stroke-[1.5]" />
                  <Cpu size={24} className="z-10" />
                </div>
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white tracking-tight">
                LangGraphArena
              </h2>
              <p className="text-lg text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                Compare AI reasoning, creativity, and problem-solving through real head-to-head battles judged by an independent AI.
              </p>
            </div>
            
            <div className="w-full max-w-4xl mx-auto">
               <PromptTemplates onSelectTemplate={handleTemplateClick} />
            </div>
          </div>
        ) : (
          <>
            {currentBattle && (
              <div className="mb-12 animate-slide-up">
                <UserMessage message={currentBattle.problem} />
                <ArenaResponse
                  solution1={currentBattle.solution_1}
                  solution2={currentBattle.solution_2}
                  judge={currentBattle.judge}
                />
              </div>
            )}

            {isLoading && (
              <div className="mb-12 animate-slide-up mt-8">
                <UserMessage message={inputValue || "Initializing new battle..."} />
                <LoadingSkeleton />
              </div>
            )}
          </>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {error && (
        <div className="px-4 pb-2 max-w-4xl mx-auto w-full animate-fade-in absolute bottom-24 left-0 right-0 z-50">
          <div className="bg-red-50 dark:bg-red-950/90 backdrop-blur-md border border-red-200 dark:border-red-800 rounded-2xl px-5 py-3 flex items-center justify-between shadow-lg">
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

      <div className="p-6 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-t border-zinc-200 dark:border-zinc-800 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={(e) => handleSend(e)} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={isLoading ? 'Arena is busy...' : 'Enter a challenge for the models...'}
              disabled={isLoading}
              className="w-full bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-full py-4 pl-6 pr-16 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-zinc-400 transition-shadow shadow-sm hover:shadow-md text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              className="absolute right-2 bg-blue-600 hover:bg-blue-700 text-white p-2.5 rounded-full transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-md"
              disabled={!inputValue.trim() || isLoading}
              aria-label="Start Battle"
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
          <div className="text-center mt-2 text-xs text-zinc-500 dark:text-zinc-500">
            {inputValue.length}/1000 characters
          </div>
        </div>
      </div>
    </div>
  );
}
