import { Briefcase, Megaphone, GraduationCap, FlaskConical, PenTool, TrendingUp, Brain, Cpu, Code2 } from 'lucide-react';

// Predefined prompts

export default function PromptTemplates({ onSelectTemplate }) {
  const templates = [
    {
      category: "Business",
      icon: <Briefcase size={18} />,
      color: "text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30",
      prompt: "Create a go-to-market strategy for a new AI startup."
    },
    {
      category: "Marketing",
      icon: <Megaphone size={18} />,
      color: "text-pink-600 dark:text-pink-400 bg-pink-100 dark:bg-pink-900/30",
      prompt: "Write a viral launch campaign for a productivity app."
    },
    {
      category: "Education",
      icon: <GraduationCap size={18} />,
      color: "text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/30",
      prompt: "Explain quantum computing to a 12-year-old."
    },
    {
      category: "Science",
      icon: <FlaskConical size={18} />,
      color: "text-cyan-600 dark:text-cyan-400 bg-cyan-100 dark:bg-cyan-900/30",
      prompt: "Could humans realistically colonize Mars within 50 years?"
    },
    {
      category: "Writing",
      icon: <PenTool size={18} />,
      color: "text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-900/30",
      prompt: "Write a compelling opening chapter for a mystery novel."
    },
    {
      category: "Finance",
      icon: <TrendingUp size={18} />,
      color: "text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30",
      prompt: "Should a young investor choose index funds or individual stocks?"
    },
    {
      category: "Psychology",
      icon: <Brain size={18} />,
      color: "text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-900/30",
      prompt: "How can someone overcome procrastination effectively?"
    },
    {
      category: "Technology",
      icon: <Cpu size={18} />,
      color: "text-indigo-600 dark:text-indigo-400 bg-indigo-100 dark:bg-indigo-900/30",
      prompt: "What is the future impact of AGI on society?"
    },
    {
      category: "Coding",
      icon: <Code2 size={18} />,
      color: "text-zinc-600 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-800",
      prompt: "Build an optimized solution for finding duplicate records."
    }
  ];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold tracking-wider uppercase text-zinc-500 dark:text-zinc-400">
          Try a Featured Template
        </h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((t, index) => (
          <button 
            key={index}
            onClick={() => onSelectTemplate(t.prompt)}
            className="flex flex-col text-left p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl hover:border-blue-500 hover:shadow-md dark:hover:border-blue-500 transition-all group"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className={`p-2 rounded-lg ${t.color}`}>
                {t.icon}
              </div>
              <span className="font-semibold text-zinc-800 dark:text-zinc-200">{t.category}</span>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2 group-hover:text-zinc-900 dark:group-hover:text-zinc-200 transition-colors">
              "{t.prompt}"
            </p>
          </button>
        ))}
      </div>
    </div>
  );
}
