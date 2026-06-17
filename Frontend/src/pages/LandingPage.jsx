import { useNavigate } from 'react-router-dom';
import { Swords, Zap, Brain, Shield, Hexagon, Cpu } from 'lucide-react';

// Landing page UI

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center animate-fade-in relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-semibold mb-8 border border-blue-200/50 dark:border-blue-800/50 shadow-sm shadow-blue-500/10 backdrop-blur-sm transition-all hover:border-blue-300 dark:hover:border-blue-700">
          <Zap size={14} className="text-blue-500 fill-blue-500 animate-pulse" /> Neural Showdown Active
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-zinc-900 dark:text-white tracking-tight leading-tight mb-6 md:mb-8">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-violet-500">LangGraphArena</span>
        </h1>
        
        <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed">
          Compare AI reasoning, creativity, and problem-solving through real head-to-head battles judged by an independent AI.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
          <button 
            onClick={() => navigate('/arena')}
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 flex items-center justify-center gap-3"
          >
            <div className="relative flex items-center justify-center w-5 h-5">
              <Hexagon className="absolute w-full h-full stroke-[2]" />
              <Cpu size={10} className="z-10" />
            </div>
            Enter the Arena
          </button>
          <button 
            onClick={() => navigate('/dashboard')}
            className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-800 rounded-full font-bold text-lg transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800"
          >
            View Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-left mt-8 md:mt-12 border-t border-zinc-200 dark:border-zinc-800 pt-12 md:pt-20">
          <div className="bg-white/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl flex items-center justify-center mb-4">
              <Swords size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Live Battles</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Run parallel inferences from Gemini and Mistral simultaneously to see who answers best.</p>
          </div>
          
          <div className="bg-white/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="w-12 h-12 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl flex items-center justify-center mb-4">
              <Shield size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Impartial Judging</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Cohere evaluates both responses based on accuracy, clarity, and depth, providing a clear verdict.</p>
          </div>

          <div className="bg-white/50 dark:bg-zinc-900/50 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
              <Brain size={24} />
            </div>
            <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">Detailed Analytics</h3>
            <p className="text-zinc-600 dark:text-zinc-400">Track performance over time, win rates, and reasoning breakdowns in your personal dashboard.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
